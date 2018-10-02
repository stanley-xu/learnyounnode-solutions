/**
 * This program reads a file asynchronously using fs library
 * and returns the number of newlines present in the file
 */

const fs = require('fs');

// file path is in program arg
const path = process.argv[2]; 
let numNewlines = 0;
fs.readFile(path, (err, data) => {
    if (err) return console.error(err);
    numNewlines = data.toString().split('\n').length - 1;
    console.log(numNewlines);
});
