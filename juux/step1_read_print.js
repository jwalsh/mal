var read_str = require('./Reader').read_str;

var READ = function(s1, s2) {
    return s1;
};

var EVAL = function(s1, s2) {
    return s1;
};

var PRINT = function(s1, s2) {
    return s1;
};

var rep = function(s1) {
    return PRINT(EVAL(READ(s1)));
};

var PROMPT = 'user> ';

process.stdin.setEncoding('utf8');
process.stdout.write(PROMPT);

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
    if (chunk !== null) {
        process.stdout.write(rep(chunk));
        process.stdout.write(PROMPT);
  }
});

process.stdin.on('end', function() {
    process.stdout.write('juux done...');
});



var tests = ['1', '(+ 1 2)', '(+ 2 (+ 2 3))'];
tests.map(function(e, i, c) {
    console.log(e, ':\n', JSON.stringify(read_str(e)));
});
