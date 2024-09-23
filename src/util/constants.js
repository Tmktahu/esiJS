const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
let path, __dirname;

if (isNode) {
    // Only require 'path' and use __dirname in Node.js
    path = require('path');
    __dirname = __dirname || process.cwd();
}

module.exports = {
    localConfig: isNode ? path.join(__dirname, `../../esi.json`) : '/esi.json', // Browser uses relative URL
    projectConfig: isNode ? path.join(__dirname, '../../../esi.json') : '/esi.json', // Adjust for browser
    projectPath: isNode ? path.join(__dirname, `../../../../`) : '/', // Root or relative path for browser
    routes: ['latest', 'v1', 'legacy', 'dev'],
    server: 'esi.evetech.net'
};
