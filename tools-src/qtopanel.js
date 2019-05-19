#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import jsonFile from 'jsonfile';
import zeroFill from 'zero-fill';
import shell from 'child_process';

const BASE_DIR = '/home/samjones/Dev/mobinge/lib';
const MANIFEST_DEFAULT = BASE_DIR + '/manifest.json';
const BASE_IMAGE_DIR = BASE_DIR + '/images';
const DAY_INTERVAL = 8;
const IMAGE_COMMAND = "/usr/bin/flatpak run org.gimp.GIMP -i -b '(mass-panel-export \"ir%04d.xcf.gz\" \"320,640\" .75 \"%s\")' -b '(gimp-quit 0)'";
const SOURCE_DIRECTORY = '/home/samjones/Dropbox/IRDrafts';

const optDef = [
    {
        name: 'panel',
        type: String,
        defaultOption: true
    }
];

const options = commandLineArgs(optDef);

function convertImages(fromPanel, toPanel)
{
    for (let count = fromPanel; count <= toPanel; count++) {
        const myCommand = IMAGE_COMMAND
            .replace('%04d', zeroFill(4,count))
            .replace('%s', BASE_IMAGE_DIR);
        console.log(myCommand);
        shell.execSync(myCommand, { cwd: SOURCE_DIRECTORY });
    }
}

function isoDate(myDate)
{
    if (myDate == null) {
        myDate = new Date();
    }
    return (myDate.getYear() + 1900) + "-" + zeroFill(2,myDate.getMonth() + 1) + "-"
        + zeroFill(2,myDate.getDate());
}

function makeEntry(fromPanel, toPanel, entryDate, entryNum) {
    let newEntry = {
        images: [],
        date: isoDate(entryDate),
        thumbnail: '/snapshot' + zeroFill(4, entryNum) + '.png'
    };
    for (let count = fromPanel; count <= toPanel; count++) {
        newEntry.images.push({
            file: {
                '640px': '/ir' + zeroFill(4,count) + '-640.png'
            },
            sequence: count
        })
    }
    return newEntry;
}

jsonFile.readFile(MANIFEST_DEFAULT)
    .then(manifestData => {
        const entryCount = manifestData.entries.length;
        const lastEntry = manifestData.entries[entryCount - 1];
        const nextPanel = lastEntry.images[lastEntry.images.length - 1]
          .sequence + 1;
        let nextDate = new Date(lastEntry.date);
        nextDate.setDate(nextDate.getDate() + DAY_INTERVAL);
        convertImages(nextPanel, options.panel);
        manifestData.entries.push(
            makeEntry(nextPanel, options.panel, nextDate, entryCount + 1)
        );
        jsonFile.writeFile(MANIFEST_DEFAULT, manifestData, {
            spaces: 2
        })
        .then(output => {
            console.log('Manifest written.');
        })
        .catch(error => {
            console.error('Write error:' + error);
        });
    }) 
    .catch(error => {
        console.error('Read error:' + error);
    });

