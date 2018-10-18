/**
 * HTTP Collect but juggles the async responses from 3 separate servers
 * Must return the responses IN ORDER from the urls specified in the args
 * 
 * arg1, arg2, arg3: urls
 * 
 * note: cannot accept secure HTTP (protocol not supported by http module)
 * 
 * note: this problem is a class of async problems that implies ORDER
 *  SHOULD BE RESPECTED
 * If the result of all async work could be combined in any order
 *  then we can just register a callback that is run asynchronously and
 *  do something once all tasks are done
 * Non-blocking behavior is default in Node so you don't even have to
 *  think about this
 */

const urls = [process.argv[2], process.argv[3], process.argv[4]];
const blCollect = require('./bufferlist_collect');

/**
 * Use promises or async (npm module) or asnyc/await (node 7+)
 */

// ---

// Correct solutions

/**
 * Attempt 4: Official solution
 * 
 * Correctness: the sequential for loop ensures this
 * Performance: but it's blocking (?)
 */
let results = [];

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

/**
 * Attempt 2: Naive
 * 
 * It's callback hell but it's easy to come up with
 * 
 * Correctness: guaranteed by sequencing of callbacks
 * Performance: would execute sequentially (in effect)
 */
blCollect(urls[0], (err, data) => {
    if (err) return console.error(err);
    console.log(data);
    blCollect(urls[1], (err, data) => {
        if (err) return console.error(err);
        console.log(data);
        blCollect(urls[2], (err, data) => {
            if (err) return console.error(err);
            console.log(data);
        });
    
    });

});

// ---

// Incorrect solutions

/**
 * Attempt 3: keep watch of the length of our received results
 *  and act on it once it's filled (array length = 3)
 * 
 * Correctness:
 * This doesn't work--not because forEach is asynchronous (it's not)
 *  but because blCollect is asynchronous (?)
 * 
 * BUT, this does let us know when all async requests have been served
 *  and act accordingly (print output)
 * In problems where we don't care about the order the requests have been 
 *  served, this solution is perfectly fine
 * 
 */

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

/**
 * Attempt 1
 * see attempt 3 above
 */
// urls.forEach(e => {
//     blCollect(e, (err, data) => {
//         if (err) return console.error(err);
//         console.log(data);
//     });
// });