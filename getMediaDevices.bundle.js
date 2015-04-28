(function(e){if("function"==typeof bootstrap)bootstrap("getmediadevices",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeGetMediaDevices=e}else"undefined"!=typeof window?window.getMediaDevices=e():global.getMediaDevices=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
;