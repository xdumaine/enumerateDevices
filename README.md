####What
This is a simple module for normalizing the differences in enumerating media devices in webkit (Chrome/Opera) and Mozilla (Firefox).

####Why
Because the usages and results of the two implementations differ, and it's nice to normalize the behavior and results.

####How

getMediaDevices = require('getMediaDevices');

```javascript
getMediaDevices(function(devices) {
    console.log(devices);
});
```

####Who

[@xanderdumaine](https://twitter.com/xanderdumaine)
