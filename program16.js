// Lesson 16
var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var through = require('through');

var parser = tar.Parse();
parser.on('entry', function (e) {
    if (e.type !== 'File') return;
    var hasher = crypto.createHash('md5', {encoding: 'hex'});
    e.pipe(hasher).pipe(through(write, null)).pipe(process.stdout);

    function write (md5) {
        this.queue(md5 + ' ' + e.path + '\n');
    }
});

process.stdin
    .pipe(crypto.createDecipher(process.argv[2], process.argv[3])) // decipher the tar
    .pipe(zlib.createGunzip()) // open the tar
    .pipe(parser); // parse and log the content


// Official Solution
// var crypto = require('crypto');
// var tar = require('tar');
// var zlib = require('zlib');
// var through = require('through');

// var parser = tar.Parse();
// parser.on('entry', function (e) {
//     if (e.type !== 'File') return;

//     var h = crypto.createHash('md5', { encoding: 'hex' });
//     e.pipe(h).pipe(through(null, end)).pipe(process.stdout);

//     function end () { this.queue(' ' + e.path + '\n') }
// });

// var cipher = process.argv[2];
// var pw = process.argv[3];
// process.stdin
//     .pipe(crypto.createDecipher(cipher, pw))
//     .pipe(zlib.createGunzip())
//     .pipe(parser)
// ;
