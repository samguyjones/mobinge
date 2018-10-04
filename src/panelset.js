import React from 'react';
import PanelLibrarian from './panellibrarian';
import PanelInput from './panelinput.js';
import SnapDraggable from './snapdraggable.js';
import Arrows from './arrows.js';
import Panel from './panel.js';
import PanelMover from './panelmover.js';

export default class PanelSet extends React.Component
{
  constructor(props) {
    super(props);
    this.librarian = new PanelLibrarian(props.manifest);
    this.currentPanel = props.startPanel;
    this.state = {
      panels: [<b key="placeHolder">Waiting</b>],
      width: props.width,
      height: props.height,
      panelRes: props.panelRes
    };
    this.mover = new PanelMover(this.librarian, props.startPanel, this.state.width);
  }

  componentDidMount() {
    const panelStyle = {
      width: this.state.width + 'px',
      height: this.state.height + 'px',
      display: 'inline-block',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none',
      pointerEvent: 'none',
      MsUserSelect: 'none',
      WebkitTouchCallout: 'none'
    };
    this.librarian.fetchPanels(this.state.panelRes + 'px')
        .then(panelUrls => {
          this.setState({
            panels: panelUrls.map(panel => {
              const key = 'panel-' + panel.sequence;
              return <Panel style={panelStyle} image={panel.url} key={key}
              ref={input => this.mover.addPanel(input)}/>;
            })
          });
          if (this.currentPanel === false) {
            this.mover.goToPanel(this.librarian.getCurrentEntry() - 1);
          } else {
            this.mover.loadPanels();
          }
        });
  }

  getArrows() {
    if (!this.props.arrowWidth) {
      return null;
    }
    const next = this.mover.moveFunction(1, this.props.arrowWidth);
    const back = this.mover.moveFunction(-1, this.props.arrowWidth);
    const first = this.mover.endFunction(true, this.props.arrowWidth);
    const last = this.mover.endFunction(false, this.props.arrowWidth);
    return <Arrows width={this.props.arrowWidth * this.state.width}
        onNext={next} onBack={back}
        onFirst={first} onLast={last}/>;
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
    let input = new PanelInput(this.mover);
    const start = (e, data) => { input.grab(e, data); };
    const stop = (e, data) => { input.release(e, data); };
    const startX = this.state.width * this.currentPanel;
    const setDimensions = el => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      input.left(rect.left).right(rect.right);
    };
    return (
    <div key="panelWrapper" ref={setDimensions}>
      <SnapDraggable axis="x" bounds={boundStats}
        ref={(draggable)=>this.mover.draggable(draggable)} onStart={start}
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
