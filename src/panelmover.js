export default class PanelMover {

  constructor(width) {
    this.landfall = false;
    this.boundary = 30;
    this.dragComponent = null;
    this.chunkWidth = width;
  }

  draggable(myDraggable) {
    if (myDraggable) {
      this.dragComponent = myDraggable;
      return this;
    }
    return dragComponent;
  }

  grab(e, data) {
    if (this.landfall === false) {
      this.landfall = data.x;
    }
  }

  release(e, data) {
    this.snap(data.x);
    this.landfall = false;
  }

  snap(mouseX) {
    const dragX = this.dragComponent.state.x;
    if (isNaN(dragX)) console.log('state', this.dragComponent.state);
    const chunkOffset = dragX % this.chunkWidth;
    const direction = this.toBoundary(Math.abs(chunkOffset)) || this.toDirection(mouseX);
    this.dragComponent.snapTo(this.getSnapDestination(dragX, chunkOffset,
      direction));
  }

  snapTo(destX)
  {
    this.dragComponent.snapTo(destX);
  }

  snapDistance(distance) {
    if (distance % this.chunkWidth) {
      throw "Distance isn't divisible by the item width ${this.chunkWidth}.";
    }
    this.dragComponent.snapDistance(distance);
  }

  toDirection(lastPosition) {
    return lastPosition < this.landfall ? 1 : -1;
  }

  toBoundary(offset) {
    if (offset > this.chunkWidth - this.boundary) {
      return 1;
    }
    if (offset < this.boundary) {
      return -1;
    }
    return 0;
  }

  getSnapDestination(xPosition, offset, direction) {
    if (direction == -1) {
      return xPosition - offset;
    }
    return xPosition - (this.chunkWidth + offset);
  }
  //
  // xFromEvent(e) {
  //   let event = e;
  //   if (e.nativeEvent !== undefined) {
  //     event = event.nativeEvent;
  //   }
  //   if ((e.touches !== undefined) && (e.touches.length)) {
  //     event = event.touches[0];
  //   }
  //   if ((e.changedTouches !== undefined) && (e.changedTouches.length)) {
  //     e = e.changedTouches[0];
  //   }
  //   if (e.screenX) {
  //     return e.screenX;
  //   }
  //   return undefined;
  // }
}
