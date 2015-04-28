module.exports = function (cb, errCb) {
    if (!cb || typeof cb !== 'function') {
        throw new Error('callback must be provided to enumerate devices');
    }

    var processDevices = function (devices) {
        var normalizedDevices = [];
        for (var i = 0; i < devices.length; i++) {
            normalizedDevices.push({
                facing: device.facing || null,
                id: device.id || device.deviceId || null,
                label: device.label || null,
                kind: device.kind || null,
                groupId: device.groupId || null
            });
            cb(normalizedDevices);
        }
    };

    if (window.navigator && window.navigator.mediaDevices && window.navigator.enumerateDevices) {
        window.navigator.mediaDevices.enumerateDevices().then(processDevices);
    } else if (window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
        window.MediaStreamTrack.getSources(processDevices);
    } else {
        errCb(new Error('Device enumeration not supported.'));
    }
};
