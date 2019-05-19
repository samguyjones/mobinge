#!/usr/bin/env node
'use strict';

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _zeroFill = require('zero-fill');

var _zeroFill2 = _interopRequireDefault(_zeroFill);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_DIR = '/home/samjones/Dev/mobinge/lib';
var MANIFEST_DEFAULT = BASE_DIR + '/manifest.json';
var BASE_IMAGE_DIR = BASE_DIR + '/images';
var DAY_INTERVAL = 8;
var IMAGE_COMMAND = "/usr/bin/flatpak run org.gimp.GIMP -i -b '(mass-panel-export \"ir%04d.xcf.gz\" \"320,640\" .75 \"%s\")' -b '(gimp-quit 0)'";
var SOURCE_DIRECTORY = '/home/samjones/Dropbox/IRDrafts';

var optDef = [{
    name: 'panel',
    type: String,
    defaultOption: true
}];

var options = (0, _commandLineArgs2.default)(optDef);

function convertImages(fromPanel, toPanel) {
    for (var count = fromPanel; count <= toPanel; count++) {
        var myCommand = IMAGE_COMMAND.replace('%04d', (0, _zeroFill2.default)(4, count)).replace('%s', BASE_IMAGE_DIR);
        console.log(myCommand);
        _child_process2.default.execSync(myCommand, { cwd: SOURCE_DIRECTORY });
    }
}

function isoDate(myDate) {
    if (myDate == null) {
        myDate = new Date();
    }
    return myDate.getYear() + 1900 + "-" + (0, _zeroFill2.default)(2, myDate.getMonth() + 1) + "-" + (0, _zeroFill2.default)(2, myDate.getDate());
}

function makeEntry(fromPanel, toPanel, entryDate, entryNum) {
    var newEntry = {
        images: [],
        date: isoDate(entryDate),
        thumbnail: '/snapshot' + (0, _zeroFill2.default)(4, entryNum) + '.png'
    };
    for (var count = fromPanel; count <= toPanel; count++) {
        newEntry.images.push({
            file: {
                '640px': '/ir' + (0, _zeroFill2.default)(4, count) + '-640.png'
            },
            sequence: count
        });
    }
    return newEntry;
}

_jsonfile2.default.readFile(MANIFEST_DEFAULT).then(function (manifestData) {
    var entryCount = manifestData.entries.length;
    var lastEntry = manifestData.entries[entryCount - 1];
    var nextPanel = lastEntry.images[lastEntry.images.length - 1].sequence + 1;
    var nextDate = new Date(lastEntry.date);
    nextDate.setDate(nextDate.getDate() + DAY_INTERVAL);
    convertImages(nextPanel, options.panel);
    manifestData.entries.push(makeEntry(nextPanel, options.panel, nextDate, entryCount + 1));
    _jsonfile2.default.writeFile(MANIFEST_DEFAULT, manifestData, {
        spaces: 2
    }).then(function (output) {
        console.log('Manifest written.');
    }).catch(function (error) {
        console.error('Write error:' + error);
    });
}).catch(function (error) {
    console.error('Read error:' + error);
});