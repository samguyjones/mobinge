import React from 'react';
export default class Panel extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      style: props.style,
      loaded: false
    }
  }

  load() {
    this.setState({
      loaded: true
    });
  }

  render() {
    const DONT_DRAG_ME = e => e.preventDefault();
    if (this.state.loaded) {
      return(<img style={this.state.style} src={this.state.image}
        onDragStart={DONT_DRAG_ME}/>);
    }
    return (
      <div style={this.state.style} onDragStart={DONT_DRAG_ME}>
          If you are reading this, you might have lost network connectivity
          or this app broke.  If you could go to <a
          href="https://www.facebook.com/inhumaneresourcescomic/">this link</a>,
          click "Send Message" and tell me what you did before you saw this
          message, I would be grateful.  First, wait a second and see if this
          disappears and gets replaced by an image.
      </div>
    );
  }
}
