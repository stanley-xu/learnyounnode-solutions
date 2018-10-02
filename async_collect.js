/**
 * HTTP Collect but juggles the async responses from 3 separate servers
 * 
 * Returns char sequence from each URL specified in cmdline (in that order)
 */

const urls = [process.argv[2], process.argv[3], process.argv[4]];

// ATTEMPT 4
let results = [];
let index = 0;

const http = require('http');
const bl = require('bl');

function print() {
    results.forEach(e => console.log(e));
}

function doGet(urlIndex) {
    http.get(urls[urlIndex], (res) => {
        res.pipe(bl((err, data) => {
            if (err) console.error(err);
            results[urlIndex] = data.toString();

            if (results.length === 3) print();
        }))
    });
}

for (let i = 0; i < urls.length; i++) {
    doGet(i);
}

// ---

// FAILED ATTEMPTS

//const blCollect = require('./bufferlist_collect');

// ATTEMPT 3
// this doesn't work because there is no guarantee
//  about when forEach will execute its function
//  against its urls

// let results = [];
// let index = 0;

// urls.forEach(url => {
//     blCollect(url, (err, data) => {
//         if (err) console.error(err);
//         results[index] = data;
//         index++;

//         if (results.length === 3) {
//             results.forEach(e => console.log(e));
//         }
//     });
// });

// ATTEMPT 2
// blCollect(urls[0], (err, data) => {
//     if (err) return console.error(err);
//     console.log(data);
//     blCollect(urls[1], (err, data) => {
//         if (err) return console.error(err);
//         console.log(data);
//         blCollect(urls[2], (err, data) => {
//             if (err) return console.error(err);
//             console.log(data);
//         });
    
//     });

// });

// ATTEMPT 1
// urls.forEach(e => {
//     blCollect(e, (err, data) => {
//         if (err) return console.error(err);
//         console.log(data);
//     });
// });