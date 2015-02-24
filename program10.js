// Lesson 10

var trumpet = require('trumpet');
var through = require('through');

// Trumpet stuff
var tr = trumpet();
var stream = tr.select('.loud').createStream();

// CORRECT
stream.pipe(through(function (buf) {
    this.queue(buf.toString().toUpperCase());
})).pipe(stream);

// WRONG
// tr.select('.loud', function (span) {
//     var stream = span.createStream();
//     stream.pipe(through(function (buf) {
//         this.queue(buf.toString().toUpperCase());
//     })).pipe(stream);
// });

// Stream
process.stdin.pipe(tr).pipe(process.stdout);


