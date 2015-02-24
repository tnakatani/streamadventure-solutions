// Lesson 12
var duplex = require('duplexer');
var through = require('through');

module.exports = function (counter) {
    // "Create object to keep count of all countries"
    var counts = {};

    // Through functions
    function write(buf) {
        // buf.country = 2 letter country codes
        // any easier way to set counts[buf.country]
        // as a number?
        counts[buf.country] = (counts[buf.country] || 0) + 1;
    }
    function end() {
        counter.setCounts(counts);
    }

    var input = through(write, end);
    return duplex(input, counter);
};