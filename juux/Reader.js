var exports = module.exports  = {};

var read_str = function(str) {
    var tokens = tokenizer(str);
    var reader = new Reader(tokens);
    read_form(reader);
};

var tokenizer = function(str) {
    var token_re = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/;
    return token_re.exec(str);
};

var tokenizer_tests = ['1', '(+ 1 2)', '(+ 2 (+ 2 3))'];
tokenizer_tests.map(function(e, i, c) {
    console.log(e, tokenizer(e));
});


var read_form = function() {

};

var Reader = function() {
    return {
        next: function() {

        },
        peek: function() {

        }

    };
};

exports.Reader = Reader;
