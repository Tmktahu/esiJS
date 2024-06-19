const chalk = require('chalk');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { URLSearchParams } = require('node:url');
const { projectPath, projectConfig, localConfig } = require('./constants');
const { version } = require('../../package.json');
const DEFAULT_USER_AGENT = `esiJS-v${version}`;
/**
 * @private
 */
class Cache {
  cache = {};
  constructor() {}
  /**
   * @param {String} identifier The identifier assigned to the object.
   * @param {Object} item The item to cache.
   * @param {Number} timeout The time to cache for, in seconds.
   */
  add(identifier, item, timeout) {
    this.cache[identifier] = item;
    setTimeout(() => {
      if (this.cache[identifier]) {
        delete this.cache[identifier];
      }
    }, timeout * 1000);
  }
  /**
   * Force-delete a cached request.
   * @param {String} identifier
   */
  delete(identifier) {
    delete this.cache[identifier];
  }
  has(identifier) {
    return this.cache[identifier] ? true : false;
  }
  get(identifier) {
    return this.cache[identifier];
  }
}

const cache = new Cache();

// documented in utility.js
function getSettings() {
  let settings;
  if (checkForConfig()) {
    settings = fs.readFileSync(projectConfig, 'utf8');
    return JSON.parse(settings);
  } else {
    log(`No project config file! Attempting to revert to default configuration...`, 'WARN');
    settings = fs.readFileSync(localConfig, 'utf8');
  }
  return JSON.parse(settings);
}
/**
 * @private
 * @param {string} msg - The error message.
 * @param {string} code - The error code.
 * @param {string} url - The endpoint url the error occured on.
 */
function buildError(msg, code, url) {
  let error = new Error(msg);
  url ? (error.url = url) : false;
  error.code = code ? code : 'NO_CODE_DEFINED';
  return error;
}
/**
 * @private
 * @param {string} message The log message.
 * @param {string} type Either 'INFO', 'WARN', or 'WARNING'.
 */
function log(message, type = 'info') {
  if (message) {
    switch (type.toLowerCase()) {
      case 'info': {
        console.log(`${chalk.green(`[esiJS:${type.toUpperCase()}]:`)} ${message}`);
        break;
      }
      case 'warn':
      case 'warning': {
        console.log(`${chalk.yellow(`[esiJS:${type.toUpperCase()}]:`)} ${message}`);
        break;
      }
      case 'error': {
        return `${chalk.red(`[esiJS:${type.toUpperCase()}]:`)} ${message}`;
      }
      default: {
        return;
      }
    }
  }
}
/**
 * @private
 * @param {*} args
 * @param {any} args.input The input to validate.
 * @param {string} args.type The type `args.input` should be.
 * @param {string} args.message The error message to respond with if there's a mismatch.
 * @param {array} args.options If `args.input` has set options, pass them as an array here.
 * @param {boolean} args.optional Marks this input as optional so we don't throw an error
 * if `args.input` is undefined.
 * @returns
 */
function inputValidation({ input, type, message, options, optional = false }) {
  // If is optional and input is undefined, no need to validate
  if (optional && input === undefined) {
    return;
  }

  // Do not check for !input or you are making that you won't accept falsy values such as empty '' or id = 0
  if (input === undefined) {
    throw buildError(message, `INPUT_UNDEFINED`);
  }
  if (typeof input !== type) {
    throw buildError(message, `INPUT_NOT_EQUAL_TO_REQUIRED_TYPE`);
  }
  // If options is provided, check that input is included
  if (options && !options.includes(input)) {
    throw buildError(message, `GIVEN_OPTION_NOT_VALID_OPTION`);
  }
}
/**
 * @private
 *  subUrl -> remaining url part specific to the function call
 *
 *  requestType -> state the request type, defaults to GET
 *
 *  body -> data to pass to the request body for requests of type post
 *
 *  query -> aditional query parameters
 *
 * needsAuth -> flag a endpoint as authed
 */
function makeRequest({ subUrl, body, query, requestType = 'GET', needsAuth = false }) {
  const { link, authToken, language, programName } = getSettings();
  const urlTest = /\/(?=\/)(?<!https:\/)/g;
  let headers = {
    accept: 'application/json',
    'Accept-Language': `${language}`,
    'Content-Type': 'application/json',
  };
  let request;
  let fullURL = `${link}${subUrl}/?datasource=tranquility`;

  // If query params are defined, add them to the end of the full url
  if (query) {
    fullURL += `?${new URLSearchParams(query).toString()}`; // URLSearchParams doesn't add the beginning "?"
  }

  // Add in the language
  if (language !== '') {
    fullURL += `&language=${language.split('/').join('-')}`;
  }
  // and the auth token if needed
  if (needsAuth && authToken !== '') {
    // Include both the headers and the query just in case one or the other fails
    headers['authorization'] = `Bearer ${authToken}`;
    fullURL += `&token=${authToken}`;
  } else if (needsAuth && authToken === '') {
    throw buildError(`You used a authenicated function without a token. Please set a token in the 'esi.json' file in ${path.join(__dirname, '../../../')}.`, `NO_AUTH_TOKEN`);
  }
  // if the request isnt cached, send a request
  // if (!cache.has(fullURL)) { DISABLED FOR MY CURRENT USE CASE
  // Add in the program name if specified, else default to 'esiJS-v{version}'
  if (programName && programName !== '') {
    headers['x-user-agent'] = `${programName}:${DEFAULT_USER_AGENT}`;
  } else {
    headers['x-user-agent'] = DEFAULT_USER_AGENT;
  }

  // Check the URL for extra forward slashes and delete them
  fullURL = fullURL.replace(urlTest, '');

  // Check for request type
  switch (requestType.toUpperCase()) {
    case 'GET': {
      request = axios.get(fullURL, {
        headers,
      });
      break;
    }
    case 'POST': {
      request = axios.post(fullURL, body, {
        headers,
      });
      break;
    }
    case 'PUT': {
      request = axios.put(fullURL, body, {
        headers,
      });
      break;
    }
    case 'DELETE': {
      request = axios.delete(fullURL, body, {
        headers,
      });
      break;
    }
    default: {
      const url = fullURL.split('&token')[0];
      throw buildError(`ESIJS ERROR: Endpoint function not configured properly. Please report this error on the GitHub repository.`, 'ESIJS_ERROR', url);
    }
  }
  // add the request to the cache
  //   cache.add(`${fullURL}`, request, 300);
  // } else { DISABLED FOR MY CURRENT USE CASE
  //     request = cache.get(fullURL)
  // }
  // Return the promise request, pre set the 'then' and 'catch' clauses
  return request
    .then((response) => {
      let data = {
        headers: response.headers,
        data: response.data,
      };

      return data;
    })
    .catch((error) => {
      if (error.response) {
        // if its a error from ESI
        const esiError = `${error.response.data.error}${error.response.data.error_description}`;
        const url = fullURL.split('&token')[0];
        throw buildError(esiError, `ESI_ERROR`, url);
      }
      // if its another error, just send the full error
      throw buildError(error, 'ESIJS_ERROR');
    });
}
function checkForConfig(logging) {
  let localLog = log;
  // Check for a ESI config file in the project directory
  if (!logging) {
    localLog = () => {};
  }
  try {
    let fileExists = fs.existsSync(projectConfig);

    // If the file exists...
    if (fileExists) {
      // ...see if we can read it...
      try {
        fs.accessSync(projectConfig, fs.constants.R_OK);

        // ...then see if we can write into it
        try {
          fs.accessSync(projectConfig, fs.constants.W_OK);
          // eslint-disable-next-line no-unused-vars
        } catch (e) {
          localLog(`Couldn't write to 'esi.json', reverting to default configuration`, 'WARNING');
          return false;
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        localLog(`Couldn't read config file, reverting to default configuration`, 'WARNING');
        return false;
      }
    } else {
      // If the file doesn't exist...
      localLog(`The config file doesn't exist! Reverting to default configuration and attempting to write to "${projectConfig}"...`, 'INFO');
      try {
        // ...attempt to create it
        fs.writeFileSync(projectConfig, JSON.stringify(require(localConfig), null, 2));
        localLog(`Sucessfully created config file in ${projectPath}!`, 'INFO');
      } catch (e) {
        throw buildError(`There was a error while attempting to create the config file! Error: \n${e}`);
      }
      return false;
    }
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return false;
  }
  localLog(`I can read the config file!`, 'INFO');
  return true;
}

module.exports = {
  log,
  request: makeRequest,
  inputValidation,
  buildError,
  checkForConfig,
  getSettings,
  cache,
};
