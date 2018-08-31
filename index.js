const fs = require('fs');

exports.get = function () {
    // Return a promise
    return new Promise(function (resolve, reject) {
        // Run the sockstat terminal command
        fs.readFile('/proc/net/sockstat', 'utf8', function (error, data) {
            // Sockstat command failed?
            if (error)
                return reject(new Error('Sockstat failed: ' + error));

            // Define RegEx pattern to extract stats from the sockstat command output (is there a better way to do this?)
            const pattern = /sockets: used ([0-9]+) TCP: inuse ([0-9]+) orphan ([0-9]+) tw ([0-9]+) alloc ([0-9]+) mem ([0-9]+) UDP: inuse ([0-9]+) mem ([0-9]+) UDPLITE: inuse ([0-9]+) RAW: inuse ([0-9]+) FRAG: inuse ([0-9]+) memory ([0-9]+)/;

            // Use ES6 destructuring assignment to assign groups to variables
            let [
                match,
                socketsUsed,
                tcpInuse,
                tcpOrphan,
                tcpTw,
                tcpAlloc,
                tcpMem,
                udpInuse,
                udpMem,
                udpliteInuse,
                rawInuse,
                fragInuse,
                fragMem
            ] = pattern.exec(data.replace(/\n/g, ' ')) || [];

            // Parse failed?
            if (!match)
                return reject(new Error('Sockstat parse failed, command output: ' + stdout));

            // Prepare result
            let sockstat = {
                sockets: {
                    used: socketsUsed
                },
                tcp: {
                    inuse: tcpInuse,
                    orphan: tcpOrphan,
                    tw: tcpTw,
                    alloc: tcpAlloc,
                    mem: tcpMem
                },
                udp: {
                    inuse: udpInuse,
                    mem: udpMem
                },
                udplite: {
                    inuse: udpliteInuse
                },
                raw: {
                    inuse: rawInuse
                },
                frag: {
                    inuse: fragInuse,
                    mem: fragMem
                },
            };

            // Convert statistics into integers
            for (let category in sockstat) {
                for (let statistic in sockstat[category]) {
                    sockstat[category][statistic] = parseInt(sockstat[category][statistic]);
                }
            }

            // Resolve the promise with the stats
            resolve(sockstat);
        });
    });
};