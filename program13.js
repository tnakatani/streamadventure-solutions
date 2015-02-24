// Lesson 13
// Notes:
// -  through's write and end function must be inside the module.exports,
//    or it won't be able to access the library object
var combine = require('stream-combiner');
var through = require('through');
var split = require('split');
var zlib = require('zlib');

module.exports = function () {
    var library;
    var group = through(write, end);

    function write(row) {
        // Dont really understand this line...
        // for end of stream?
        if (row.length === 0) { return; }

        var parsedRow = JSON.parse(row);

        if (parsedRow.type === 'genre') {
            // If new genre, previous set needs to be JSON-ified
            // with a carriage return.
            if (library) {
                this.queue(JSON.stringify(library) + '\n');
            }

            library = { 'name': parsedRow.name, 'books': [] };
        }
        else if (parsedRow.type === 'book' ) {
            library.books.push(parsedRow.name);
        }
    }

    function end() {
        if (library) {
            this.queue(JSON.stringify(library) + '\n');
        }
        this.queue(null);
    }

    return combine(split(), group, zlib.createGzip());
};