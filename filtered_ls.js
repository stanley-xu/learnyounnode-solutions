/**
 * This program imports the filtered_ls function to perform filtered ls
 */

const filterFn = require('./filtered_ls_module.js'); // you can ommit '.js'
const pathToFile = process.argv[2];
const ext = process.argv[3];

// It is by Node CONVENTION that modules accept a final CALLBACK ARGUMENT
// The module should call the callback with the first (error) argument if an
//  error is detected during execution
// Otherwise, it must call the callback with the first error argument as null
filterFn(pathToFile, ext, (err, data) => {
    if (err) return console.error(err);
    data.forEach(e => {
        console.log(e);
    });
})