# mobinge
React library for Infinite Canvas webcomic.

Mobinge (portmanteau of "mobile" and "binge") is a mobile-friendly, client-side platform for infinite canvas webcomics.

"Mobile Friendly" is because Mobinge is built to be responsive and instead of having to search around a large page from
panel to panel, you can always flip in a single direction.

"Client Side" means there's no server code and no database.  You can serve a Mobinge comic off S3,
[and I do](http://www.inhumaneresourcescomic.com).

"Infinite Canvas" means that the webcomic doesn't have strict boundaries in its navigation.  You can keep advancing
from panel to panel from the beginning to the end.  Infinite Canvas was proposed by Scott McCloud in his book "Reinventing
Comics."

## How to Set Up

1. Clone this repo to a directory.
2. Set up your images and manifest (see "manifest.json" below).
3. Run "yarn run build".  This will make a bundle.js in the lib directory.
4. Set up an index.html that loads this bundle.js (see "index page" further below").
5. Put the index, bundle.js, manifest and images somewhere a web server can serve them.

## Manifest.json

This file tells Mobinge everything it needs to know about the images of the webcomic.  It keeps data about the comic.  Here's
an example:

```javascript
    'project': 'test',
    'path': '/test/',
    'entries': [
      {
          'images': [
            {
              'file': {
                '320px': 'test1-320.png',
                '640px': 'test1-640.png'
              },
              sequence: 1
            },
            {
              'file': {
                '320px': 'test2-320.png',
                '640px': 'test2-640.png'
              },
              sequence: 2
            }
          ],
          "date": "2018-01-07",
          "thumbnail": "snapshot0001.png"
      },
      {
          'images': [
            {
              'file': {
                '320px': 'test3-320.png',
                '640px': 'test3-640.png'
              },
              sequence: 3
            },
            {
              'file': {
                '320px': 'test4-320.png',
                '640px': 'test4-640.png'
              },
              sequence: 4
            }
          ],
          "date": "2018-01-07",
          "thumbnail": "snapshot0002.png"
    }]
  }
```
Here's a list of what all this means:
 * *project* The name of your project.  It's not currently used.
 * *path* The base path to all the images in your project.  It can be absolute or relative to your index page.
 * *entries* An "entry" is a set fo panels released at the same time.  Each entry is an object with its own properties:
   * *images* A list of panel images.  Each one is again, an object with two properties:
     * *file* A list of files with the resolution as the key to the list and the file name as the value.  The file name
     can be a path, relative to the master path listed above.
     * *sequence* The number sequence of this panel, starting at 1.  I may get rid of sequence, since the program could
     easily establish this as it reads the file.
   * *date* The day the entry was released.  Currently, this is unused.
   * *thumbnail* This is a small image representing the entry.  It can appear on the index, if you want to set one up.

When you add a new entry to the project, you put the images in a visible folder and update the manifest to point to the
images.  There's a manifest tool in Mobinge called the "manifester.js".  I'll describe that later on as well.

## Setting up the index page.
