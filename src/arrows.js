import React from 'react';

export default class Arrows extends React.Component
{
  render() {
    const barStyle = {
      width: this.props.width,
      position: 'relative'
    }
    const leftStyle = {
      left: '0px'
    }
    const rightStyle = {
      right: '0px',
      position: 'absolute'
    }
    return(
      <div key="arrows" style={barStyle}>
        <span style={leftStyle}>
        <a onClick={this.props.onFirst} class="first-arrow"><img src="images/first-arrow.png"/></a>
          <a onClick={this.props.onBack} class="back-arrow"><img src="images/back-arrow.png"/></a>
        </span>
        <span style={rightStyle}>
          <a onClick={this.props.onNext} class="next-arrow"><img src="images/next-arrow.png"/></a>
          <a onClick={this.props.onLast} class="last-arrow"><img src="images/last-arrow.png"/></a>
        </span>
      </div>
    );
  }
}
