/**
 * This program performs a 'ls' but filters for a custom file extension
 * which is provided in the second argument
 * 
 * First arg is the directory to perform ls
 */

const fs = require('fs');
const path = require('path');

const file = process.argv[2];
const ext = '.' + process.argv[3];

fs.readdir(file, (err, files) => {
    if (err) return console.error(err);
    files.forEach(e => {
        if (path.extname(e) === ext) console.log(e);
    })
});
