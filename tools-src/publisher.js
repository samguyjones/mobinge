#!/usr/bin/env node
import jsonFile from 'jsonfile';
import s3 from 's3';
import invalidate from 'cloudfront-invalidate';

const MANIFEST_DEFAULT = '../lib/manifest.json';
const BASE_IMAGE_DIR = '../lib/images';
const BASE_REMOTE_DIR = 'images';
const MANIFEST_TEMP = 'tmp-manifest.json';
const MANIFEST_NAME = 'manifest.json';
const awsClient = s3.createClient();
const DISTRIBUTION_ID = 'EYNVPTWQCSICU';

function getManifest(src)
{
    return new Promise((resolve, reject) => {
        jsonFile.readFile(src, function(error, response) {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          });
    });
}

function entryWhen(entry, comparison)
{
    const now = new Date();
    now.add
    const entryDate = new Date(entry.date);
    return comparison(entryDate, now);
}

function entryCurrent(entry)
{
    return entryWhen(entry, (entryDate, now) => {
        const diff = Math.abs(entryDate.getTime() - now.getTime());
        return diff < 1000 * 3600 * 48;
    });
}

function entryPublic(entry)
{
    return entryWhen(entry, (entryDate, now) => {
        return entryDate.getTime() < now.getTime();
    });
}

function imageFiles(entry)
{
    let imageList = [];
    entry.images.forEach((myImage) => {
        for (let dimension in myImage.file) {
            imageList.push(myImage.file[dimension]);
        }
    });
    return imageList;
}

function uploadFile(localBase, remoteBase, fileName, remoteFileName) {
    remoteFileName = remoteFileName || fileName;
    return new Promise((resolve, reject) => {
        let uploader = awsClient.uploadFile({
            localFile: localBase + fileName,
            s3Params: {
                Bucket: "www.inhumaneresourcescomic.com",
                Key:    remoteBase + remoteFileName,
                ACL: 'public-read'
            }
        });
        uploader.on('end', () => {
            resolve('Finished ' + remoteBase + remoteFileName);
        });
        uploader.on('error', (error) => {
            reject('Failed to upload:' + error.stack);
        })
    });
}

function uploadImage(fileName) {
    return uploadFile(BASE_IMAGE_DIR, BASE_REMOTE_DIR, fileName, false);
}

function invalidPromise(distId, paths) {
    return new Promise((resolve, reject) => {
        console.log('ready to invalidate');
        invalidate(distId, paths, null, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

let operations = [
    (entry) => {
        console.log('Uploading Panels:');
        let allUploads = [];
        imageFiles(entry).forEach((fileName) => {
            allUploads.push(uploadImage(fileName));
        });
        return Promise.all(allUploads);
    },
    (entry) => {
        console.log('Uploading Thumbnail');
        return uploadImage(entry.thumbnail);
    },
    (entry, manifest) => {
        console.log('Make Temporary Manifest');
        let tempManifest = JSON.parse(JSON.stringify(manifest));
        tempManifest.entries = tempManifest.entries.filter(entryPublic);
        let output = jsonFile.writeFile(MANIFEST_TEMP, tempManifest, { spaces: 2 });
        return output;
    },
    () => {
        console.log('Upload Temporary Manifest');
        return uploadFile('', '', MANIFEST_TEMP, MANIFEST_NAME) ;
    },
    () => {
        console.log('Invalidate Cache');
        return invalidPromise(DISTRIBUTION_ID, ['/manifest.json']);
    }
];

function runOperations(entry, manifest)
{
    operations.shift()(entry, manifest)
        .then((response) => {
            if (response) {
                console.log(response);
            }
            if (!operations.length) {
                return;
            }
            runOperations(entry, manifest);
        });
}

getManifest(MANIFEST_DEFAULT)
    .then((manifest) => {
        const newEntry = manifest.entries.find(entryCurrent);
        if (!newEntry) {
            console.log('No entry ready for publication.');
            return;
        }
        runOperations(newEntry, manifest);
    });

