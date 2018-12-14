import React from 'react';
import PanelSet from './panelset';
import config from 'react-global-configuration';

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
      startPanel: startPanel ? startPanel - 1 : false,
      panelRes: config.get('panelResolution'),
      manifest: config.get('manifest'),
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

  getPanelCount() {
    return Math.min(config.get('maxPanel'), Math.floor(
      (this.state.browserSize - config.get('padding')) / config.get('panelWidth')));
  }

  getPanelWidth(panelCount) {
    return Math.min(config.get('panelWidth') * 2, Math.round(
      (this.state.browserSize - config.get('padding')) / panelCount));
  }

  getPanelHeight(panelWidth) {
    return Math.round(panelWidth * config.get('ratio'));
  }

  getDimensions() {
    const panelCount = this.getPanelCount();
    const panelWidth = this.getPanelWidth(panelCount);
    const panelHeight = this.getPanelHeight(panelWidth);
    return {
      count: panelCount,
      width: panelWidth,
      height: panelHeight,
    };
  }

  getPanelFrame() {
    const panelStats = this.getDimensions();
    return(
      <div style={this.getStyle(panelStats.width, panelStats.count)}>
        <PanelSet width={panelStats.width} height={panelStats.height}
            arrowWidth={(panelStats.count >= config.get('arrowThreshold')) ?
              panelStats.count : false} startPanel={this.state.startPanel}
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
