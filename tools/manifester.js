#!/usr/bin/env node
'use strict';

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _zeroFill = require('zero-fill');

var _zeroFill2 = _interopRequireDefault(_zeroFill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optDef = [{
  name: 'dest',
  type: String,
  defaultOption: true
}, {
  name: 'src',
  type: String,
  alias: 's'
}, {
  name: 'extend',
  type: Number,
  alias: 'x'
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

var options = (0, _commandLineArgs2.default)(optDef);
readSource(options.src).then(function (obj) {
  if (options.extend) {
    obj.currentEntry = obj.images.length + 1;
    for (var count = obj.currentEntry; count <= options.extend; count++) {
      obj.images.push({
        file: {
          "320px": "/ir" + (0, _zeroFill2.default)(4, count) + "-320.png"
        },
        "sequence": count
      });
    }
  }
  return obj;
}).then(function (contents) {
  return writeSource(contents, options.dest);
}).then(function (response) {
  console.log(response);
}).catch(function (err) {
  console.log('File Error:', err);
});