const http = require('http');
const bl = require('bl');

module.exports = function(url, cb) {
    http.get(url, (res) => {
        res.setEncoding('utf-8');
        
        res.pipe(bl((err, data) => { 
            if (err) return cb(err);
            data = data.toString();
            cb(null, data); // remember, the first arg is error by Node convention
            // we've assigned null to that to indicate there was no error on our (the module's) part
        }));
    })
}
