// Change '../' to 'sockstat' to use this code in your own project
var sockstat = require('../');

// Get current sockstat info
sockstat.get()
    .then(function (stats) {
        // Log stats
        console.log(stats);
    }).catch(function (err) {
        // Log error
        console.log(err);
    });