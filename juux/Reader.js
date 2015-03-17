var exports = module.exports  = {};

var read_str = function(str) {
  var tokens = tokenizer(str);
  // console.log(tokens);
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
  var result;
  var form = reader.peek();
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
  var token = reader.next();
  if (token !== '(') {
    console.warn('Expected: list start "("');
  }
  while ((token = reader.peek()) !== ')') {
    console.log('parsed:', token);
    result.push(read_form(reader));
  }
  reader.next();
  return result;
};

var read_atom = function(reader) {
  var number;
  var atom = reader.next();
  if (/^\d+$/.test(atom)) {
    return parseInt(atom, 10);
  } else if (atom === "true") {
    return true;
  } else if (atom === "false") {
    return false;
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
};

exports.read_str = read_str;

