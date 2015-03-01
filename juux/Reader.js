var exports = module.exports  = {};

// var PCRE = require('pcre').PCRE;

var read_str = function(str) {
    var tokens = tokenizer(str);
    var reader = new Reader(tokens);
    read_form(reader);
};

var tokenizer = function(str) {
    var re_tokenizer = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g;
    var match;
    var results = [];
    while (match = re_tokenizer.exec(str)[1]) {
        results.push(match[0]);
    }
    return results;
};

var tokenizer_tests = ['1', '(+ 1 2)', '(+ 2 (+ 2 3))'];
tokenizer_tests.map(function(e, i, c) {
    console.log(e, ':\n', JSON.stringify(tokenizer(e)));
});


var read_form = function() {

};

var Reader = function(tokens) {
    this.tokens = tokens;
    this.position = 0;
    var next = function() {
        position++;
        return peek();
    };
    var peek = function() {
        return tokens[position];
    };

    return {
        next: next,
        peek: peek

    };
};

exports.Reader = Reader;
