// Lesson 5
var split = require('split');
var through = require('through');
var i = 0;

function oddOrEven(argument, response) {
    if (argument % 2 === 0) {
        return response.toLowerCase() + '\n';
    }
    return response.toUpperCase() + '\n';
}

// so... each line is a through function?
var tr = through(function (buf) {
    var line = buf.toString();
    this.queue(oddOrEven(i, line));
    i++;
});

process.stdin
    .pipe(split())
    .pipe(tr)
    .pipe(process.stdout);
