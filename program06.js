// Lesson 6

var concat = require('concat-stream');

function reverse(s){
    return s.split('').reverse().join('');
}

var reversedResult = function (data) {
    var text = data.toString();
    var result = reverse(text);

    console.log(result);
};

process.stdin.pipe(concat(reversedResult));
