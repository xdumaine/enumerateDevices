module.exports = (cb) ->
    if not cb or typeof cb isnt 'function'
        throw new Error 'callback must be provided to enumerate devices'

    processDevices = (devices) ->
        normalizedDevices = []
        for device in devices
            normalizedDevices.push
                facing: device.facing or null
                id: device.id or device.deviceId or null
                label: device.label or null
                kind: device.kind or null
                groupId: device.groupId or null
        cb normalizedDevices

    window.navigator.mediaDevices?.enumerateDevices?().then processDevices
    window.MediaStreamTrack?.getSources? processDevices
    null
