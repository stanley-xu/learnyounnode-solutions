/**
 * TCP time server
 * 
 * Listens on the port provided in arg
 * Returns YYYY-MM-DD hh:mm
 */

// Node core offers a net module which has basic networking functions
const net = require('net');
const port = +process.argv[2];

function connectionListener(socket) {
    console.log('Serving request');
    retDate = format(createDate());
    socket.write(retDate);
    socket.end();
}

const server = net.createServer(connectionListener)
server.listen(port);

// console.log('Listening on port ' + port);

// ---

// helpers

function twoDigitFormat(num) {
    return ('0' + num).slice(-2);
}

// more elegant two digit formatter?
function zeroFill(num) {
    return (num < 10 ? '0' : '') + num;
}

function format(date) {
    let str = '';
    str += date.year + '-';
    str += twoDigitFormat(date.month) + '-';
    str += twoDigitFormat(date.day);
    str += ' ';
    str += twoDigitFormat(date.hour) + ':';
    str += twoDigitFormat(date.min);
    str += '\n';
    return str;
}

function createDate() {
    let date = new Date();
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // starts at 0
        day: date.getDate(),
        hour: date.getHours(),
        min: date.getMinutes()
    };
}