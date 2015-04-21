var bundle = require('browserify')(),
    fs = require('fs');

bundle.add('./tmp');
bundle.bundle({standalone: 'getMediaDevices'}).pipe(fs.createWriteStream('index.js'));
