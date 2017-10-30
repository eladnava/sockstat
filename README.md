# sockstat
[![npm version](https://badge.fury.io/js/sockstat.svg)](https://www.npmjs.com/package/sockstat)

A Node.js package that parses the `/proc/net/sockstat` file for socket connectivity statistics.

## Usage

First, install the package using npm:

```shell
npm install sockstat --save
```

Then, start using the package by importing it and running the main function:

```js
var sockstat = require('sockstat');

// Get current sockstat info
sockstat.get()
    .then(function (stats) {
        // Log stats
        console.log(stats);
    }).catch(function (err) {
        // Log error
        console.log(err);
    });
```

For the following `/proc/net/sockstat`:
```
sockets: used 123
TCP: inuse 19 orphan 105 tw 2115 alloc 132 mem 1638
UDP: inuse 1 mem 1
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
```

The package returns the following output:

```json
{
   "sockets": {
      "used": 123
   },
   "tcp": {
      "inuse": 19,
      "orphan": 105,
      "tw": 2115,
      "alloc": 132,
      "mem": 1638
   },
   "udp": {
      "inuse": 1,
      "mem": 1
   },
   "udplite": {
      "inuse": 0
   },
   "raw": {
      "inuse": 0
   },
   "frag": {
      "inuse": 0,
      "mem": 0
   }
}
```

## Requirements

* Node.js v6.x.x or newer

## License

Apache 2.0
