import React from 'react';
import PanelSet from './panelset';

export default class Mobinge extends React.Component {
  constructor(props) {
    const width = parseInt(props.width);
    const startPanel = parseInt(props.startPanel);
    // Make your peace --GS
    super(props);
    window.addEventListener("resize", () => {
      this.resize();
    });
    this.state = {
      width: width,
      ratio: 1.5,
      padding: 20,
      startPanel: startPanel ? startPanel - 1 : false,
      panelRes: props.panelRes,
      manifest: props.manifest,
      browserSize: window.innerWidth
    };
  }

  resize() {
    this.setState({
      browserSize: window.innerWidth
    });
    const panelStats = this.getDimensions();
    this.panelSet.resize(panelStats.width, panelStats.height);
  }

  getOffset() {
    return (this.state.offset * this.state.width);
  }

  getPanelCount() {
    return Math.min(this.props.maxPanel, Math.round(this.state.browserSize /
      this.state.width));
  }

  getPanelWidth(panelCount) {
    return (panelCount==this.props.maxPanel) ? this.state.width :
        Math.round((this.state.browserSize - this.state.padding) / panelCount);
  }

  getPanelHeight(panelWidth) {
    return Math.round(panelWidth * this.state.ratio);
  }

  getDimensions() {
    const panelCount = this.getPanelCount();
    const panelWidth = this.getPanelWidth(panelCount);
    const panelHeight = this.getPanelHeight(panelWidth);
    return {
      count: panelCount,
      width: panelWidth,
      height: panelHeight
    };
  }

  getPanelFrame() {
    const panelStats = this.getDimensions();
    return(
      <div style={this.getStyle(panelStats.width, panelStats.count)}>
        <PanelSet width={panelStats.width} height={panelStats.height}
            arrowWidth={(panelStats.count >= this.props.arrowThreshold) ?
              panelStats.count : false} startPanel={this.state.startPanel}
              manifest={this.state.manifest}
              panelRes={this.state.panelRes}
              ref={input => this.panelSet = input}/>
      </div>);
  }

  getStyle(count, panelWidth) {
    return {
      'overflow': 'hidden',
      'width': (panelWidth * count) + 'px'
    };
  }

  render() {
    return <div key="strip">
      {this.getPanelFrame()}
    </div>;
  }
}
