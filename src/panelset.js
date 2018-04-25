import React from 'react';
import PanelLibrarian from './panellibrarian';
import PanelMover from './panelmover.js';
import SnapDraggable from './snapdraggable.js';
import Arrows from './arrows.js';
import Panel from './panel.js';

export default class PanelSet extends React.Component
{
  constructor(props) {
    super(props);
    this.librarian = new PanelLibrarian(props.manifest);
    this.currentPanel = props.startPanel;
    this.state = {
      panels: [<b key="placeHolder">Waiting</b>],
      width: props.width,
      height: props.height
    };
    this.mover = new PanelMover(this.state.width, (x) => {this.loadFromPanel(-x/this.state.width);});
    this.panelRef = [];
  }

  componentDidMount() {
    const panelStyle = {
      width: this.state.width + 'px',
      height: this.state.height + 'px',
      display: 'inline-block'
    };
    this.librarian.fetchPanels(this.state.width + 'px')
        .then(panelUrls => {
          var cushion = 0;
          this.setState({
            panels: panelUrls.map(panel => {
              const key = 'panel-' + panel.sequence;
              return <Panel style={panelStyle} image={panel.url} key={key}
              ref={(input) => { this.panelRef.push(input); }}/>;
            })
          });
          if (this.currentPanel === 0) {
            this.goToPanel(this.librarian.getCurrentEntry() - 1);
          } else {
            this.loadPanels();
          }
        });
  }

  moveFunction(goDirection) {
    const panelDrift = this.props.arrowWidth * goDirection;
    const newPanel = this.currentPanel + panelDrift;
    return () => {
      this.goToPanel(this.currentPanel + panelDrift);
    }
  }

  endFunction(toStart) {
    const destination = (toStart) ? 0 : (this.state.panels.length-this.props.arrowWidth);
    return () => {
      this.goToPanel(destination);
    }
  }

  goToPanel(panelNumber) {
    panelNumber = Math.max(panelNumber,0);
    panelNumber = Math.min(panelNumber, this.state.panels.length - 1);
    let destinationLeft = panelNumber * -this.state.width;
    this.mover.snapTo(destinationLeft)
    this.loadFromPanel(panelNumber);
  }

  loadFromPanel(panelNumber) {
    this.currentPanel = panelNumber;
    this.loadPanels();
  }

  getArrows() {
    if (!this.props.arrowWidth) {
      return null;
    }
    return <Arrows width={this.props.arrowWidth * this.state.width}
        onNext={this.moveFunction(1)} onBack={this.moveFunction(-1)}
        onFirst={this.endFunction(true)} onLast={this.endFunction(false)}/>;
  }

  loadPanels() {
    const backBuffer = 4;
    const frontBuffer = 8;
    const fromPanel = Math.max(0, this.currentPanel - backBuffer);
    const toPanel = Math.min(this.state.panels.length - 1, this.currentPanel + frontBuffer);
    for (let count = fromPanel; count <= toPanel; count++) {
      this.panelRef[count].load();
    }
  }

  render() {
    const panelSetStyle = {
      height: this.state.height,
      width: (this.state.panels.length * this.state.width) + 'px',
      position: 'relative',
      left: '0px'
    };
    const boundStats = {
      left: -(this.state.width * (this.state.panels.length -1)),
      top: 0,
      bottom: 0,
      right: 0
    };
    const start = (e, data) => { this.mover.grab(e, data); };
    const stop = (e, data) => { this.mover.release(e, data); };
    const startX = this.state.width * this.currentPanel;
    return (
    <div key="panelWrapper">
      <SnapDraggable axis="x" bounds={boundStats} mover={this.mover} onStart={start}
        onStop={stop} startX={startX}>
        <div key="panelset" style={panelSetStyle}>
          {this.state.panels}
        </div>
      </SnapDraggable>
      {this.getArrows()}
    </div>
    );
  }
}
