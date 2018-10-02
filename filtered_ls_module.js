/**
 * This program performs a 'ls' but filters for a custom file extension
 * arguments:
 * 1) path to directory
 * 2) extension to filter for
 * 3) callback
 */

const fs = require('fs');
const path = require('path');

// by Node convention, the callback must be called:
//  - if an error arises in execution
//  - AFTER this module is finished processing (pass 'null' into the error arg)
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