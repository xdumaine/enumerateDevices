module.exports = function (cb) {
    if (!cb || typeof cb !== 'function') {
        throw new Error('callback must be provided to enumerate devices');
    }

    var processDevices = function (devices) {
        var normalizedDevices = [];
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            //make chrome values match spec
            var kind = device.kind || null;
            if (kind && kind.toLowerCase() === 'audio') {
                kind = 'audioinput';
            } else if (kind && kind.toLowerCase() === 'video') {
                kind = 'videoinput';
            }
            normalizedDevices.push({
                facing: device.facing || null,
                deviceId: device.id || device.deviceId || null,
                label: device.label || null,
                kind: kind,
                groupId: device.groupId || null
            });
        }
        cb(null, normalizedDevices);
    };

    if (window.navigator && window.navigator.mediaDevices && window.navigator.mediaDevices.enumerateDevices) {
        return window.navigator.mediaDevices.enumerateDevices().then(processDevices);
    } else if (window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
        window.MediaStreamTrack.getSources(processDevices);
    } else {
        cb({
            message: 'Device enumeration not supported.',
            kind: 'METHOD_NOT_AVAILABLE'
        });
    }
};
