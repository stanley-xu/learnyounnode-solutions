/**
 * HTTP Server that serves POST request by returning post BODY characters into upper case
 * 
 * arg: port
 */

const http = require('http');
// through2-map is a specialized module 
//  (see through2: https://www.npmjs.com/package/through2)
const map = require('through2-map');
const port = +process.argv[2];

http.createServer((req, res) => {
    if (req.method !== 'POST') {
        return res.end('send me a POST\n');
    }

    // transform request stream
    req.pipe(map(chunk => {
        return chunk.toString().toUpperCase();
    })).pipe(res);

}).listen(port);

// console.log('Listening on port ' + port);