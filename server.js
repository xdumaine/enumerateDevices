var connect = require('connect'),
    serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen('8880');

console.log('Server running at http://127.0.0.1:8880/');
