var bundle = require('browserify')(),
    fs = require('fs');

bundle.add('./bin/tmp');
bundle.bundle({standalone: 'getMediaDevices'}).pipe(fs.createWriteStream('bin/index.js'));
