#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _zeroFill = require('zero-fill');

var _zeroFill2 = _interopRequireDefault(_zeroFill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optDef = [{
  name: 'src',
  type: String,
  defaultOption: true
}, {
  name: 'add',
  type: String,
  alias: 'a'
}, {
  name: 'date',
  type: String,
  alias: 'd'
}, {
  name: 'thumbnail',
  type: String,
  alias: 't'
}];

var emptyManifest = {
  project: null,
  path: null,
  images: []
};

function readSource(src) {
  return new Promise(function (resolve, reject) {
    if (!src) {
      resolve(emptyManifest);
    }
    _jsonfile2.default.readFile(options.src, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

function writeSource(contents, out) {
  return new Promise(function (resolve, reject) {
    if (!out) {
      resolve(contents);
    }
    _jsonfile2.default.writeFile(out, contents, { spaces: 2 }, function (err) {
      reject(err);
    });
    resolve("");
  });
}

function currentDate() {
  var now = new Date();
  return now.getYear() + "-" + (0, _zeroFill2.default)(2, now.getMonth()) + "-" + (0, _zeroFill2.default)(2, now.getDate());
}

function getEntry(options, files) {
  return {
    images: files,
    date: options.date || currentDate(),
    thumbnail: options.thumbnail
  };
}

var options = (0, _commandLineArgs2.default)(optDef);
readSource(options.src).then(function (obj) {
  if (options.add) {
    var first = void 0,
        last = void 0;
    var files = [];

    var _options$add$split = options.add.split('-');

    var _options$add$split2 = _slicedToArray(_options$add$split, 2);

    first = _options$add$split2[0];
    last = _options$add$split2[1];

    for (var count = parseInt(first); count <= parseInt(last); count++) {
      files.push({
        file: {
          "320px": "/ir" + (0, _zeroFill2.default)(4, count) + "-320.png"
        },
        "sequence": count
      });
    }
    obj.entries.push(getEntry(options, files));
  }
  return obj;
}).then(function (contents) {
  return writeSource(contents, options.src);
}).then(function (response) {
  console.log(response);
}).catch(function (err) {
  console.log('File Error:', err);
});