var bundle = require('browserify')(),
    fs = require('fs');

bundle.add('./index');
bundle.bundle({standalone: 'getMediaDevices'}).pipe(fs.createWriteStream('getMediaDevices.bundle.js'));
