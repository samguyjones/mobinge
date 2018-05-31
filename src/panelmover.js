export default class PanelMover {

  constructor(width, moveResponse) {
    this.landfall = false;
    this.boundary = 10;
    this.dragComponent = null;
    this.chunkWidth = width;
    this.moveResponse = moveResponse;
  }

  draggable(myDraggable) {
    if (myDraggable) {
      this.dragComponent = myDraggable;
      return this;
    }
    return this.dragComponent;
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
    const direction = this.toBoundary(chunkOffset) || this.toDirection(mouseX);
    const destination = this.getSnapDestination(dragX, chunkOffset,
      direction);
    this.moveResponse(destination);
    this.dragComponent.snapTo(destination);
  }

  snapTo(destX)
  {
    this.dragComponent.snapTo(destX);
  }

  sudoSnapTo(destX)
  {
    this.dragComponent.clearMovement();
    this.dragComponent.snapTo(destX);
  }

  snapPanels(distance) {
    this.dragComponent.snapDistance(distance * this.chunkWidth);
  }

  toDirection(lastPosition) {
    return lastPosition < this.landfall ? -1 : 1;
  }

  toBoundary(offset) {
    const direction = (offset >= 0) ? 1 : -1;
    const difference = Math.abs(offset);
    if (difference > this.chunkWidth - this.boundary) {
      return direction;
    }
    if (difference < this.boundary) {
      return -direction;
    }
    return 0;
  }

  getSnapDestination(xPosition, offset, direction) {
    const positive = offset > 0;
    const toCenter = positive ? (direction == 1) : (direction == -1);
    if (toCenter) {
      return xPosition + ((this.chunkWidth - (offset*direction) ) * direction);
    }
    return xPosition - offset;
  }
}
