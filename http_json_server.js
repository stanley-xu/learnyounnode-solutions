/**
 * HTTP JSON API Server
 * 
 * Serves current time in hours, mins, seconds in JSON format
 * 
 * arg: port
 * 
 * request: /api/parsetime?iso=<ISO formatted date>
 * response: { "hour": xx, "minute": xx, "second": xx }
 * 
 * request: /api/unixtime
 * response: { "unixtime": x }
 */

const http = require('http');
const port = +process.argv[2];

// the Node core url library contains URL and query string
//  parsing functions
// parsing the URL will also help ROUTE our requests
//  to the proper end points
const url = require('url');

// functions to parse the url
// returns pathname: /endpoint
function getPath(reqUrl) {
    return url.parse(reqUrl, false).pathname;
}

// returns query: { key: value }
function getQueryString(reqUrl) {
    return url.parse(reqUrl, true).query;
}

// routing
const PARSE_TIME_ENDPOINT = '/api/parsetime'
const UNIXTIME_ENDPOINT = '/api/unixtime';
function route(pathname) {
    if (pathname === PARSE_TIME_ENDPOINT) {
        return parseTime;
    } else if (pathname === UNIXTIME_ENDPOINT) {
        return unixTime;
    }
}

// processing
function parseTime(args) {
    let date;
    let retObj = { };
    Object.keys(args).forEach(k => {
        if (k === 'iso') {
            // ctor will parse ISO date
            date = new Date(args[k]);
            retObj['hour'] = date.getHours();
            retObj['minute'] = date.getMinutes();
            retObj['second'] = date.getSeconds();
        }
    });
    return retObj;
}

function unixTime(args) {
    let isoVal = args['iso'];
    return { 'unixtime': new Date(isoVal).getTime() };
}

// ---

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (req.method !== 'GET') {
        return res.end('Please send a GET request!\n');
    }

    const fn = route(getPath(req.url));
    const jsonResp = JSON.stringify(
        fn(getQueryString(req.url))
    );

    res.end(jsonResp);

}).listen(port);

console.log('Listening on port ' + port);