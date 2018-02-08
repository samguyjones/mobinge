import 'whatwg-fetch'
const PANLIB_DEFAULT_START = 1;
const PANLIB_DEFAULT_END = null;
const PANLIB_DEFAULT_RESOLUTION = "300px";
const PANLIB_DEFAULT_MANIFEST = "./manifest.json";

export default class PanelLibrarian {
  constructor(manifest, start, end) {
    this.startAt((start === undefined) ? PANLIB_DEFAULT_START : start)
        .manifest((manifest === undefined) ? PANLIB_DEFAULT_MANIFEST : manifest)
        .endAt((end === undefined) ? PANLIB_DEFAULT_END : end)
        .panels = null;
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
    this.manifest = manifest;
    this.getPanelData = fetch(manifest);
    return this;
  }

  pickPanels(resolution)
  {
    return this.panelData.images.filter((panel) => {
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

  fetchPanels(resolution) {
    resolution = (resolution == undefined) ? PANLIB_DEFAULT_RESOLUTION : resolution;
    if (this.panels !== null) {
      return new Promise(() => {
        return this.pickPanels(resolution);
      });
    }
    if (!this.getPanelData) {
      throw {
        'message': 'No manifest is set.'
      };
    }
    return this.getPanelData.then((response) => {
      return response.json();
    })
    .then(panelData => {
      this.panelData = panelData;
      return this.pickPanels(resolution);
    })
  }
}
