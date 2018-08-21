import 'whatwg-fetch'
const PANLIB_DEFAULT_START = 1;
const PANLIB_DEFAULT_END = null;
const PANLIB_DEFAULT_RESOLUTION = "300px";
const PANLIB_DEFAULT_MANIFEST = "./manifest.json";
const _images = Symbol('images');
const _entries = Symbol('entries');

export default class PanelLibrarian {

  constructor(manifest, start, end) {
    this.startAt((start === undefined) ? PANLIB_DEFAULT_START : start)
        .manifest((manifest === undefined) ? PANLIB_DEFAULT_MANIFEST : manifest)
        .endAt((end === undefined) ? PANLIB_DEFAULT_END : end)
        .panels = null;
    this[_images] = false;
  }

  startAt(start) {
    if (start === undefined) {
      return this.start;
    }
    this.start = start;
    return this;
  }

  endAt(end) {
    if (end === undefined) {
      return this.end;
    }
    this.end = end;
    return this;
  }

  manifest(manifest) {
    if (manifest === undefined) {
      return this.manifest;
    }
    // You can set manifest to false to load nothing, as you might for a unit
    // test.
    if (manifest) {
      this.manifest = manifest;
      this.getPanelData = fetch(manifest, {cache: "no-store"});
    }
    return this;
  }

  pickPanels(resolution)
  {
    return this.getImages().filter((panel) => {
      return (panel.sequence >= this.start) && ((this.end === null ) ||
          (panel.sequence <= this.end));
    })
    .map((panel) => {
      return {
        sequence: panel.sequence,
        url: this.panelData.path + panel.file[resolution]
      }
    });
  }

  getImages()
  {
    if (!this[_images]) {
      const justImages = (imageList, currentEntry, entryNum) => {
        if (currentEntry.images) {
          let images = currentEntry.images.map(image => {
            image.entryNum = entryNum;
            return image;
          });
          imageList = imageList.concat(images);
        }
        return imageList;
      }
      this[_images] = this.panelData.entries.reduce(justImages, []);
    }
    return this[_images];
  }

  getImageEntry(imageNum)
  {
    return this.getImages()[imageNum].entryNum;
  }

  getEntryFirstImage(entryNum)
  {
    return this.panelData.entries[entryNum].images[0].sequence - 1;
  }

  fetchManifestJson()
  {
    if (!this.getPanelData) {
      throw {
        'message': 'No manifest is set.'
      };
    }
    return this.getPanelData.then((response) => {
      return response.json();
    });
  }

  getCurrentEntry()
  {
    const lastEntry = this.panelData.entries.length -1;
    return this.panelData.entries[lastEntry].images[0].sequence;
  }

  fetchPanels(resolution) {
    resolution = (resolution == undefined) ? PANLIB_DEFAULT_RESOLUTION : resolution;
    if (this.panels !== null) {
      return new Promise(() => {
        return this.pickPanels(resolution);
      });
    }
    return this.fetchManifestJson()
    .then(panelData => {
      this.panelData = panelData;
      return this.pickPanels(resolution);
    })
  }
}
