/**
 * This program performs a 'ls' but filters for a custom file extension
 * arguments:
 * 1) path to directory
 * 2) extension to filter for
 * 3) callback
 * 
 * see client code: 'filtered_ls.js'
 */

const fs = require('fs');
const path = require('path');

// by Node convention, our module must accept a callback passed to us from
//  the client
// the module will run the callback regardless of whether it runs into any errors
module.exports = function (dir, ext, cb) {
    fs.readdir(dir, (err, files) => {
        if (err) return cb(err);

        // let filteredFiles = [];
        // files.forEach(e => {
        //     if (path.extname(e) === ext) filteredFiles.push(e);
        // })

        // more elegant solution
        files = files.filter(f => {
            return path.extname(f) === ('.' + ext) // don't forget to 'fix' the ext!
        })
        
        cb(null, files);
    });
}