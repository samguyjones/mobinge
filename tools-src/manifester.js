#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import jsonFile from 'jsonfile';
import zeroFill from 'zero-fill';

const optDef = [
  {
    name: 'src',
    type: String,
    defaultOption: true
  },
  {
    name: 'add',
    type: String,
    alias: 'a'
  },
  {
    name: 'date',
    type: String,
    alias: 'd'
  },
  {
    name: 'thumbnail',
    type: String,
    alias: 't'
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

function currentDate() {
  let now = new Date();
  return now.getYear() + "-" + zeroFill(2,now.getMonth()) + "-"
      + zeroFill(2,now.getDate());
}

function getEntry(options, files)
{
  return {
    images: files,
    date: options.date || currentDate(),
    thumbnail: options.thumbnail
  }
}

const options = commandLineArgs(optDef);
readSource(options.src)
.then(function(obj) {
  if (options.add) {
    let first,last;
    let files = [];
    [first, last] = options.add.split('-');
    for (let count = parseInt(first); count <= parseInt(last); count++) {
      files.push({
        file: {
          "320px": "/ir" + zeroFill(4, count) + "-320.png"
        },
        "sequence": count
      });
    }
    obj.entries.push(getEntry(options, files));
  }
  return obj;
})
.then(function(contents) {
  return writeSource(contents, options.src);
})
.then(function(response) {
  console.log(response);
})
.catch(function(err) {
  console.log('File Error:', err);
});
