module.exports = function (cb) {
    return new Promise(function(resolve, reject) {
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
            resolve(normalizedDevices);
            if (cb) {
                console.warn('module now uses promise based api - callback is deprecated');
                cb(null, normalizedDevices);
            }
        };

        if (window.navigator && window.navigator.mediaDevices && window.navigator.mediaDevices.enumerateDevices) {
            window.navigator.mediaDevices.enumerateDevices().then(processDevices);
        } else if (window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
            window.MediaStreamTrack.getSources(processDevices);
        } else {
            err = {
                message: 'Device enumeration not supported.',
                kind: 'METHOD_NOT_AVAILABLE'
            };
            reject(err);
            if (cb) {
                console.warn('module now uses promise based api - callback is deprecated');
                cb(err);
            }
        }
    });
};
