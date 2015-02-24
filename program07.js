// Lesson 7
var http = require('http');
var through = require('through');

// WRONG
// var tr = through(function (buf) {
//     this.queue(buf.toString().toUpperCase());
// });

// CORRECT
var tr = function (buf) {
    this.queue(buf.toString().toUpperCase());
};

var server = http.createServer(function (req, res) {
    if (req.method.toUpperCase() === 'POST') {
        // WRONG
        // req.pipe(tr).pipe(res);

        // CORRECT
        req.pipe(through(tr)).pipe(res);
    }
    else res.end('nope');
});

server.listen(process.argv[2]);