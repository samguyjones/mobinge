import React from 'react';
import PanelLibrarian from './panellibrarian';
import PanelMover from './panelmover.js';
import SnapDraggable from './snapdraggable.js';
import Arrows from './arrows.js';

export default class PanelSet extends React.Component
{
  constructor(props) {
    super(props);
    this.librarian = new PanelLibrarian(props.manifest);
    this.state = {
      panels: [<b key="placeHolder">Waiting</b>],
      width: props.width,
      height: props.height,
      startPanel: props.startPanel
    };
    this.mover = new PanelMover(this.state.width);
  }

  componentDidMount() {
    const panelStyle = {
      width: this.state.width + 'px',
      height: this.state.height + 'px'
    };
    const PANEL_MARGIN=8;
    this.librarian.fetchPanels(this.state.width + 'px')
        .then(panelUrls => {
          var cushion = 0;
          this.setState({
            panels: panelUrls.map(panel => {
              const key = 'panel-' + panel.sequence;
              const lazy = 'lazy-' + panel.sequence;
              return <img key={key} style={panelStyle} src={panel.url}
                onDragStart={e => {e.preventDefault()}}/>;
            })
          });
        });
  }

  moveFunction(goDirection) {
    const distance = this.props.arrowWidth * this.state.width;
    return () => {
      this.mover.snapDistance(distance * goDirection);
    }
  }

  getArrows() {
    if (!this.props.arrowWidth) {
      return null;
    }
    return <Arrows width={this.props.arrowWidth * this.state.width}
        onNext={this.moveFunction(1)} onBack={this.moveFunction(-1)}/>;
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
    const startX = this.state.width * this.state.startPanel;
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
