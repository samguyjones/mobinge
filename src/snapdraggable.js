import Draggable from 'react-draggable';

export default class SnapDraggable extends Draggable
{
  constructor(props) {
    super(props);
    this.state.x = -props.startX;
    this.timeout = false;
    this.moveInterval = 5;
  }

  snapDistance(distance) {
    this.snapTo(this.getLimit(this.state.x - distance));
  }

  snapTo(newX = this.state.x, newY = this.state.y, ongoing=false) {
    if (!ongoing) {
      newX = this.getLimit(newX);
    }
    if (isNaN(newX)) {
      throw 'Destination not a number.';
    }
    if ((this.state.x == newX) && (this.state.y == newY)) {
      this.timeout = false;
      return;
    }
    const newPosition = {
      x: this.getTickDestination(this.state.x, newX),
      y: this.getTickDestination(this.state.y, newY)
    };
    this.setState(newPosition);
    if (ongoing || !this.timeout) {
      this.timeout = setTimeout(() => this.snapTo(newX, newY, true), this.moveInterval);
    }
  }

  clearMovement()
  {
    if (this.timeout) {
      clearTimeout(this.timeOut);
    }
  }

  getLimit(newX) {
    newX = Math.min(newX,this.props.bounds.right);
    newX = Math.max(newX, this.props.bounds.left);
    return newX;
  }

  // The distance to move between two numbers in a tick.
  getTickDestination(current, goal) {
    const lastSnap = 8;
    const distance = Math.abs(current-goal);
    const steps = 8;
    if (distance < lastSnap) {
      return goal;
    }
    return goal > current ? current + (distance/steps) : current - (distance/steps);
  }
}
