var exports = module.exports  = {};

var read_str = function(str) {
    var tokens = tokenizer(str);
    console.log(tokens);
    var reader = new Reader(tokens);
    var result = read_form(reader);
    return result;
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

var read_form = function(reader) {
    //    console.log('read_form:', reader);
    var result;
    var form = reader.peek();

    // console.log('read_form, token: ', form);
    switch(form) {
    case '(': // list
        console.log('list start');
        return read_list(reader);
    case ')': // list
        console.error('list end in read_form not read_list');
        return null;
    default: // atom
        return read_atom(reader);
    }
};

var read_list = function(reader) {
    var result = [];
    // console.log(reader);
    var token = reader.next();
    // Clear the list start
    if (token !== '(') {
        console.warn('Expected: list start "("');
    }
    while ((token = reader.peek()) !== ')') {
        console.log('parsed:', token);
        result.push(read_form(reader));
    }
    // Clear the list end
    console.log('list end');
    reader.next();
    return result;
};

var read_atom = function(reader) {
    var number;
    var atom = reader.next();
    console.log('read_atom', atom);
    if (number = parseInt(atom, 10)) {
        return number;
    } else {
        return new Symbol(atom);
    }
};

var Symbol = function(value) {
    this.name = value;
    this.type = 'Symbol';
    return this.name;
};

var Reader = function(tokens) {
    this.tokens = tokens;
    this.position = 0;
    //    console.log('Tokens: ', this.tokens);
    this.next = function() {
        var token = this.peek();
        this.position++;
        return token;

    };
    this.peek =function() {
        return this.tokens[this.position];
    };

};

var pr_str = function(ast) {
    console.log(ast);
    // ast.map(function(e, i, c) {
    //     switch(typeof e) {
    //     case 'array': return a.join(' ');
    //     default: return e;
    //     };
    // });
};

exports.read_str = read_str;

var tests = ['1', '(+ 1 2)', '(+ 2 (+ 2 (- 4 1)))'];
tests.map(function(e, i, c) {
    console.log('-------------------------------');
    console.log(e, ':\n',
                JSON.stringify(read_str(e)),
                pr_str(read_str(e)));
});
