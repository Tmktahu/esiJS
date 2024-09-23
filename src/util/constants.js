const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
let path;

if (isNode) {
    path = require('path');
}

const baseDir = isNode ? process.cwd() : ''; // Use process.cwd() in Node.js, empty string for browser

module.exports = {
    localConfig: isNode ? path.join(baseDir, 'esi.json') : '/esi.json', // Adjust paths accordingly
    projectConfig: isNode ? path.join(baseDir, 'esi.json') : '/esi.json',
    projectPath: isNode ? path.join(baseDir, '../../') : '/', // Adjust for browser
    routes: ['latest', 'v1', 'legacy', 'dev'],
    server: 'esi.evetech.net'
};
