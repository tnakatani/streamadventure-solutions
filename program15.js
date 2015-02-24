// Lesson 15
var fs = require('fs');
var crypto = require('crypto');
var tar = require('tar');
var parser = tar.Parse();
var zlib = require('zlib');
var stream = crypto.createDecipher('md5', { encoding: 'hex'});

process.stdin.pipe(stream);