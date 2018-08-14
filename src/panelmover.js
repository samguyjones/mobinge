export default class PanelMover {

  constructor(finder) {
    this.clickSpot = false;
    this.landfall = false;
    this.boundary = 10;
    this.chunkWidth = finder.width;
    this.leftOffset = false;
    this.rightOffset = false;
    this.finder = finder;
  }

  left(myLeft) {
    if (myLeft) {
      this.leftOffset = myLeft;
      return this;
    }
    return this.leftOffset;
  }

  right(myRight) {
    if (myRight) {
      this.rightOffset = myRight;
      return this;
    }
    return this.rightOffset;
  }

  clickIsDirection() {
    if (this.clickSpot < this.left() + this.right()/2) {
      return true;
    }
  }

  clickIsEdge() {
    const margin=15;
    if (this.clickSpot < this.left() + margin) {
      return -1;
    }
    if (this.clickSpot > this.right() - margin) {
      return 1;
    }
    return 0;
  }

  setClickSpot(e) {
    if (e instanceof MouseEvent) {
      this.clickSpot = e.clientX;
      return;
    }
    this.clickSpot = e.changedTouches[0].clientX;
  }

  grab(e, data) {
    if (this.landfall === false) {
      this.landfall = data.x;
    }
  }

  release(e, data) {
    this.setClickSpot(e);
    this.snap(data.x);
    this.landfall = false;
  }

  snap(mouseX) {
    const dragX = this.finder.getDragXIfChanged();
    if (!dragX) {
      if (this.clickIsEdge()) {
        this.finder.snapPanels(this.clickIsEdge());
      }
      return;
    }
    const chunkOffset = dragX % this.chunkWidth;
    const direction = this.toBoundary(chunkOffset) || this.toDirection(mouseX);
    const destination = this.getSnapDestination(dragX, chunkOffset,
      direction);
    this.finder.snapTo(destination);
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
