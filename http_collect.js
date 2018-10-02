/**
 * This program performs a GET request and returns 2 lines
 * - the number of characters received from the server (integer)
 * - complete string of characters received
 */

// 2 approaches:
//  1) ground up: collect data from each stream event and somehow concatenate them
//  can use the 'end' event to signal
//  2) use popular stream collection libraries: buffer list or concat-stream

const http = require('http');
const url = process.argv[2];

// approach 2: using buffer list
const bl = require('bl');

http.get(url, (res) => {
    res.pipe(bl((err, data) => { 
        if (err) return console.error(err);
        let bufferStr = data.toString();
        console.log(bufferStr.length);
        console.log(bufferStr);
    }));
})

// approach 1: ground up
// http.get(url, (res) => {
//     res.setEncoding('utf-8');

//     let charStream = [];
//     let charStreamAdd = (data) => {
//         data = String(data).split('');
//         charStream.concat(data);
//     }
//     res.on('data', charStreamAdd);
//     res.on('error', charStreamAdd);
//     res.on('readable', charStreamAdd);

//     res.on('end', () => {
//         let stream = charStream.join('');
//         console.log(stream.length);
//         console.log(stream);
//     })
// })