module.exports = function (cb) {
    if (!cb || typeof cb !== 'function') {
        throw new Error('callback must be provided to enumerate devices');
    }

    var processDevices = function (devices) {
        var normalizedDevices = [];
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            normalizedDevices.push({
                facing: device.facing || null,
                id: device.id || device.deviceId || null,
                label: device.label || null,
                kind: device.kind || null,
                groupId: device.groupId || null
            });
        }
        cb(null, normalizedDevices);
    };

    if (window.navigator && window.navigator.mediaDevices && window.navigator.enumerateDevices) {
        window.navigator.mediaDevices.enumerateDevices().then(processDevices);
    } else if (window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
        window.MediaStreamTrack.getSources(processDevices);
    } else {
        cb(new Error('Device enumeration not supported.'));
    }
};
