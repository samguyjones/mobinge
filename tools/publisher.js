#!/usr/bin/env node
'use strict';

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _s = require('s3');

var _s2 = _interopRequireDefault(_s);

var _cloudfrontInvalidate = require('cloudfront-invalidate');

var _cloudfrontInvalidate2 = _interopRequireDefault(_cloudfrontInvalidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MANIFEST_DEFAULT = '../lib/manifest.json';
var BASE_IMAGE_DIR = '../lib/images';
var BASE_REMOTE_DIR = 'images';
var MANIFEST_TEMP = 'tmp-manifest.json';
var MANIFEST_NAME = 'manifest.json';
var awsClient = _s2.default.createClient();
var DISTRIBUTION_ID = 'EYNVPTWQCSICU';

function getManifest(src) {
    return new Promise(function (resolve, reject) {
        _jsonfile2.default.readFile(src, function (error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

function entryWhen(entry, comparison) {
    var now = new Date();
    now.add;
    var entryDate = new Date(entry.date);
    return comparison(entryDate, now);
}

function entryCurrent(entry) {
    return entryWhen(entry, function (entryDate, now) {
        var diff = Math.abs(entryDate.getTime() - now.getTime());
        return diff < 1000 * 3600 * 48;
    });
}

function entryPublic(entry) {
    return entryWhen(entry, function (entryDate, now) {
        return entryDate.getTime() < now.getTime();
    });
}

function imageFiles(entry) {
    var imageList = [];
    entry.images.forEach(function (myImage) {
        for (var dimension in myImage.file) {
            imageList.push(myImage.file[dimension]);
        }
    });
    return imageList;
}

function uploadFile(localBase, remoteBase, fileName, remoteFileName) {
    remoteFileName = remoteFileName || fileName;
    return new Promise(function (resolve, reject) {
        var uploader = awsClient.uploadFile({
            localFile: localBase + fileName,
            s3Params: {
                Bucket: "www.inhumaneresourcescomic.com",
                Key: remoteBase + remoteFileName,
                ACL: 'public-read'
            }
        });
        uploader.on('end', function () {
            resolve('Finished ' + remoteBase + remoteFileName);
        });
        uploader.on('error', function (error) {
            reject('Failed to upload:' + error.stack);
        });
    });
}

function uploadImage(fileName) {
    return uploadFile(BASE_IMAGE_DIR, BASE_REMOTE_DIR, fileName, false);
}

function invalidPromise(distId, paths) {
    return new Promise(function (resolve, reject) {
        console.log('ready to invalidate');
        (0, _cloudfrontInvalidate2.default)(distId, paths, null, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

var operations = [function (entry) {
    console.log('Uploading Panels:');
    var allUploads = [];
    imageFiles(entry).forEach(function (fileName) {
        allUploads.push(uploadImage(fileName));
    });
    return Promise.all(allUploads);
}, function (entry) {
    console.log('Uploading Thumbnail');
    return uploadImage(entry.thumbnail);
}, function (entry, manifest) {
    console.log('Make Temporary Manifest');
    var tempManifest = JSON.parse(JSON.stringify(manifest));
    tempManifest.entries = tempManifest.entries.filter(entryPublic);
    var output = _jsonfile2.default.writeFile(MANIFEST_TEMP, tempManifest, { spaces: 2 });
    return output;
}, function () {
    console.log('Upload Temporary Manifest');
    return uploadFile('', '', MANIFEST_TEMP, MANIFEST_NAME);
}, function () {
    console.log('Invalidate Cache');
    return invalidPromise(DISTRIBUTION_ID, ['/manifest.json']);
}];

function runOperations(entry, manifest) {
    operations.shift()(entry, manifest).then(function (response) {
        if (response) {
            console.log(response);
        }
        if (!operations.length) {
            return;
        }
        runOperations(entry, manifest);
    });
}

getManifest(MANIFEST_DEFAULT).then(function (manifest) {
    var newEntry = manifest.entries.find(entryCurrent);
    if (!newEntry) {
        console.log('No entry ready for publication.');
        return;
    }
    runOperations(newEntry, manifest);
});