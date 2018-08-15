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

  goToPanel(panelNumber) {
    panelNumber = Math.max(panelNumber,0);
    panelNumber = Math.min(panelNumber, this.panelRefs.length - 1);
    let destinationLeft = panelNumber * -this.width;
    this.sudoSnapTo(destinationLeft, true);
    this.loadFromPanel(panelNumber);
  }

  moveFunction(goDirection, arrowWidth) {
    const panelDrift = arrowWidth * goDirection;
    return () => {
      this.goToPanel(this.currentPanel + panelDrift);
    }
  }

  endFunction(toStart, arrowWidth) {
    return () => {
      this.goToPanel((toStart) ? 0 : (this.panelRefs.length-arrowWidth));
    }
  }

  draggable(myDraggable) {
    if (myDraggable) {
      this.dragComponent = myDraggable;
      return this;
    }
    return this.dragComponent;
  }

  snapTo(destX)
  {
    this.dragComponent.snapTo(destX);
    this.loadFromPoint(destX);
  }

  sudoSnapTo(destX)
  {
    this.dragComponent.clearMovement();
    this.snapTo(destX);
  }

  snapPanels(distance) {
    this.dragComponent.snapDistance(distance * this.width);
    this.loadFromPanel(this.currentPanel + distance);
  }

  skipEntry(direction) {
    console.log("SkipEntry", direction);
  }

  getDragXIfChanged(posX) {
    const dragX = this.dragComponent.state.x;
    if (isNaN(dragX)) console.log('state', this.dragComponent.state);
    return (dragX === posX) ? false : dragX;
  }
}
