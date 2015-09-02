var assign = require("object-assign");
var stream = require("stream");
var reactDocs = require('react-docgen')
var path   = require("path");
var util   = require("util");

module.exports = Redocify;
util.inherits(Redocify, stream.Transform);

function Redocify(filename, opts) {
  if (!(this instanceof Redocify)) {
    return Redocify.configure(opts)(filename);
  }

  stream.Transform.call(this);
  this._data = "";
  this._opts = assign({filename: filename}, opts);
}

Redocify.prototype._transform = function (buf, enc, callback) {
  this._data += buf;
  callback();
};

Redocify.prototype._flush = function (callback) {
  try {
    var result = reactDocs.parse(this._data)
    this.push(this._data + ';\n' + 'var doc = '+JSON.stringify(result)+';\n if (exports.default) { exports.default.doc = doc } else { module.exports.doc = doc }');
  } catch(err) {
    return;
  }
  callback();
};
const REGEX = /\.jsx$/
function canCompile(file) {
  return REGEX.test(file)
}

Redocify.configure = function (opts) {
  opts = assign({}, opts);

  return function (filename) {
    if (!canCompile(filename)) {
      return stream.PassThrough();
    }

    return new Redocify(filename, opts);
  };
};