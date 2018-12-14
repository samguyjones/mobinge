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
2. Run "yarn install" to set up the libraries.
4. Run "yarn run build".  This will make a bundle.js in the lib directory.
3. Set up your images and manifest (see "manifest.json" below).
5. Set up an index.html that loads this bundle.js (see "index page" further below").
6. Put the index, bundle.js, manifest and images somewhere a web server can serve them.

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

## Index Page
This is an HTML page that loads the bundle.js and kicks off Mobinge.  The page for my comic looks like this:
```html
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </meta>
    <title>InhumaneResources</title>
    <script type="text/javascript" src="bundle.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
The content attribute for the meta tag is important if you're going to display this on Mobile.  Other than that, this just has the bare essentials.  If you wanted special style or framing for the page, this is where you'd put it.

## Main.js
I need to move a lot of this page to different settings files, but until then, you have to edit the main.js if you want to change how far Mobinge expands, what resolution to use for the panels or what you use for a title image.  Right now, it runs with a React Router and a couple of paths.

### Reader
This is the basic comic.  It displays the panels.  Right now, it has a header with a link to the index.  It calls "Mobinge", the entity that draws the panels, with these attributes:

* *width* This is the width of each panel.  It should match a width given to each image in the manifest as described above.
The entire set of panels can take up a few times this width, depending how many panels display at once.
* *maxPanel* Mobinge will grow responsively.  If you have a width of 400 and a screen 1650 pixels wide, Mobinge will display four panels.  MaxPanel sets a maximum.  So if you had a 3000 pixel wide monitor and a maxPanel of 4, only four panels would display, though it could go up to 7 if maxPanel were set that high.
* *arrowThreshold* Normally, navigation arrows appear below the panels.  Mobinge will hide the arrows if there are fewer than arrowThreshold panels showing.
* *startPanel* Mobinge will start at the specified panel.  If no panel is specified, Mobinge will start at the first panel of the last entry.
* *manifest* This is the file that keeps an index of all panels and entries as described above.  Here is where you set its location.

### EntrySet
I just finished this component.  It displays a list of thumbnails for each entry, and each one acts as a link to the first panel of that entry.  This should take 'manifest' as an argument, but it's currently stuck to "manifest.json".

## Manifester
This is a tool.  Its source is in the tools-src directory, and it's built with "yarn run build-tool".  That will create a complete manifester.js in the tools directory.  This code exists as an example right now.   If you run "./manifester *path_to_manifest* -a *startpanelno*-*endpanelno* -t *thumbnail path" -d *date*" (date is year-mo-da, and it's optional), it will add an entry.  It's currently hard-coded to my scheme of ir####.png as the panel file name.
