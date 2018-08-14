import React from 'react';
import PanelLibrarian from './panellibrarian';
import PanelMover from './panelmover.js';
import SnapDraggable from './snapdraggable.js';
import Arrows from './arrows.js';
import Panel from './panel.js';
import PanelFinder from './panelfinder.js';

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
    this.finder = new PanelFinder(this.librarian, props.startPanel, this.state.width);
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
              ref={input => this.finder.addPanel(input)}/>;
            })
          });
          if (this.currentPanel === false) {
            this.finder.goToPanel(this.librarian.getCurrentEntry() - 1);
          } else {
            this.finder.loadPanels();
          }
        });
  }

  getArrows() {
    if (!this.props.arrowWidth) {
      return null;
    }
    return <Arrows width={this.props.arrowWidth * this.state.width}
        onNext={this.finder.moveFunction(1)} onBack={this.finder.moveFunction(-1)}
        onFirst={this.finder.endFunction(true)} onLast={this.finder.endFunction(false)}/>;
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
    let mover = new PanelMover(this.finder);
    const start = (e, data) => { mover.grab(e, data); };
    const stop = (e, data) => { mover.release(e, data); };
    const startX = this.state.width * this.currentPanel;
    const setDimensions = el => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mover.left(rect.left).right(rect.right);
    };
    return (
    <div key="panelWrapper" ref={setDimensions}>
      <SnapDraggable axis="x" bounds={boundStats}
        ref={(draggable)=>this.finder.draggable(draggable)} onStart={start}
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
