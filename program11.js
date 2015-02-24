// Lesson 11
// Note:  Did not really understand the purpose of spawn...

var spawn = require('child_process').spawn;
var duplex = require('duplexer');

module.exports = function (cmd, args) {
    var exec = spawn(cmd, args);
    return duplex(exec.stdin, exec.stdout);
};