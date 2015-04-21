####What
This is a simple module for normalizing the differences in enumerating media devices in webkit (Chrome/Opera) and Mozilla (Firefox).

####Why
Because the usages and results of the two implementations differ, and it's nice to normalize the behavior and results.

####How

```javascript
getMediaDevices = require('getMediaDevices');

getMediaDevices(function(devices) {
    console.log(devices);
});
```

Test by running `npm start` and visiting [http://localhost:8880](http://localhost:8880)

####Who

[@xanderdumaine](https://twitter.com/xanderdumaine)
