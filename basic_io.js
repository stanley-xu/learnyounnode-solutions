/**
 * This program reads a file synchronously using the fs library
 * and returns the number of newlines present in the file
 */

const fs = require('fs');

// file path is in program arg
const path = process.argv[2]; 
const buffer = fs.readFileSync(path);
// note: the buffer object is a generic object that must first be
//  coerced into a string before using string methods

// determine the number of newlines
const numNewlines = buffer.toString().split('\n'); // \n delim
console.log(numNewlines.length - 1);