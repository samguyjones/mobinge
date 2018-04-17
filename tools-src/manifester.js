#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import jsonFile from 'jsonfile';
import zeroFill from 'zero-fill';

const optDef = [
  {
    name: 'dest',
    type: String,
    defaultOption: true
  },
  {
    name: 'src',
    type: String,
    alias: 's'
  },
  {
    name: 'extend',
    type: Number,
    alias: 'x'
  }
];

const emptyManifest = {
  project: null,
  path: null,
  images: []
};

function readSource(src) {
  return new Promise((resolve, reject) => {
    if (!src) {
      resolve(emptyManifest);
    }
    jsonFile.readFile(options.src, function(error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

function writeSource(contents, out) {
  return new Promise((resolve, reject) => {
    if (!out) {
      resolve(contents);
    }
    jsonFile.writeFile(out, contents, {spaces: 2}, function(err) {
      reject(err);
    });
    resolve("");
  })
}

const options = commandLineArgs(optDef);
readSource(options.src)
.then(function(obj) {
  if (options.extend) {
    obj.currentEntry = obj.images.length + 1;
    for (let count = obj.currentEntry; count <= options.extend; count++) {
      obj.images.push({
        file: {
          "320px": "/ir" + zeroFill(4, count) + "-320.png"
        },
        "sequence": count
      });
    }
  }
  return obj;
})
.then(function(contents) {
  return writeSource(contents, options.dest);
})
.then(function(response) {
  console.log(response);
})
.catch(function(err) {
  console.log('File Error:', err);
});
