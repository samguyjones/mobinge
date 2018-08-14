import React from 'react';
import PanelLibrarian from './panellibrarian';
import Panel from './panel.js';

export default class PanelFinder {
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
    const destination = (toStart) ? 0 : (this.panelRefs.length-arrowWidth);
    return () => {
      this.goToPanel(destination);
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
    this.loadPanels();
  }

  sudoSnapTo(destX)
  {
    this.dragComponent.clearMovement();
    this.dragComponent.snapTo(destX);
  }

  snapPanels(distance) {
    this.dragComponent.snapDistance(distance * this.width);
    this.loadPanels();
  }

  getDragXIfChanged(posX) {
    const dragX = this.dragComponent.state.x;
    if (isNaN(dragX)) console.log('state', this.dragComponent.state);
    return (dragX === posX) ? false : dragX;
  }
}
