/**
 * This program performs an HTTP GET request to the cmdline arg
 *  and returns the response line-by-line into stdout
 */

const http = require('http');

const url = process.argv[2];

// named functions to explain semantics:

// we define a callback for the get() method to process the returned object
//  it must be of the signature fn(resp) { ... }
// note: the returned response object is a Node STREAM which emits events
function responseHandler(response) {
    // to process streams, we LISTEN on them
    //  the HTTP GET response stream has the events: data, error, end
    // events are only available when emitted 
    response.on('data', dataHandler);

    // error handler
    response.on('error', console.error);

    // stream formatting
    response.setEncoding('utf-8');
    // setEncoding coveniently converts the object into something legible :3
    //  otherwise, we'll need to use toString
}

// notice that we can define the response stream handlers in any which order we want!

function dataHandler(data) { console.log(data); }

http.get(url, responseHandler);