import React from 'react';
import PanelLibrarian from './panellibrarian';
import Panel from './panel.js';

export default class PanelMover {
  constructor(librarian, currentPanel, width) {
    this.librarian = librarian;
    this.currentPanel = currentPanel;
    this.width = width;
    this.panelRefs = [];
    this.dragComponent=null;
  }

  resizeAll(width, height) {
    if (width == this.width) {
      return;
    }
    this.width = width;
    this.panelRefs.forEach(function(myPanel) {
      myPanel.resize(width, height);
    });
    this.snapTo(0);
  }

  addPanel(panel) {
    this.panelRefs.push(panel);
  }

  loadPanels() {
    const backBuffer = 4;
    const frontBuffer = 8;
    const fromPanel = Math.max(0, this.currentPanel - backBuffer);
    const toPanel = Math.min(this.panelRefs.length - 1, this.currentPanel + frontBuffer);
    for (let count = fromPanel; count <= toPanel; count++) {
      this.panelRefs[count].load();
    }
  }

  loadFromPanel(panelNumber) {
    this.currentPanel = panelNumber;
    this.loadPanels();
  }

  loadFromPoint(destX) {
    this.loadFromPanel(-destX / this.width);
  }

  moveFunction(goDirection, arrowWidth) {
    const panelDrift = arrowWidth * goDirection;
    return () => {
      this.goToPanel(this.currentPanel + panelDrift);
    }
  }

  endFunction(toStart, arrowWidth) {
    return () => {
      this.goToPanel((toStart) ? 0 : (this.panelRefs.length-arrowWidth), true);
    }
  }

  draggable(myDraggable) {
    if (myDraggable) {
      this.dragComponent = myDraggable;
      return this;
    }
    return this.dragComponent;
  }

  snapPanels(distance, locking) {
    this.goToPanel(this.currentPanel + distance, locking);
  }


  skipEntry(direction) {
    const currentEntry = this.librarian.getImageEntry(this.currentPanel);
    if (direction > 0) {
      if (currentEntry < this.librarian.getLastEntry()) {
        this.goToPanel(this.librarian.getEntryFirstImage(currentEntry+1));
      }
      return;
    }
    const entryStart = this.librarian.getEntryFirstImage(currentEntry);
    if (entryStart < this.currentPanel) {
        this.goToPanel(entryStart);
      return;
    }
    if (currentEntry == 0) {
      return;
    }
    this.goToPanel(this.librarian.getEntryFirstImage(currentEntry-1))
  }

  goToPanel(panelNumber, locking) {
    panelNumber = Math.max(panelNumber,0);
    panelNumber = Math.min(panelNumber, this.panelRefs.length - 1);
    let destinationLeft = panelNumber * -this.width;
    if (!locking) {
      this.dragComponent.clearMovement();
    }
    this.snapTo(destinationLeft);
  }

  snapTo(destX)
  {
    this.dragComponent.snapTo(destX);
    this.loadFromPoint(destX);
  }

  getDragXIfChanged(posX) {
    const dragX = this.dragComponent.state.x;
    if (isNaN(dragX)) console.log('state', this.dragComponent.state);
    return (dragX === posX) ? false : dragX;
  }
}
