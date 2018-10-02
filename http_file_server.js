/**
 * HTTP server that serves a static file
 * 
 * arg1: port
 * arg2: file location
 */

const http = require('http');
const fs = require('fs');
const port = process.argv[2];
const path = process.argv[3];

// HTTP request and response objects are both streams!
// This also means we must STREAM THE FILE to the response stream
function connectionHandler(req, res) {
    res.writeHead(200, { 'content-type': 'text/plain'});
    
    // serve file contents
    const fileStream = fs.createReadStream(path);
    
    // pipe file stream to http resp stream
    fileStream.pipe(res);
}

const server = http.createServer(connectionHandler);
server.listen(+port);

// console.log('Listening on port ' + port);
