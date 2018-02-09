import React from 'react';
import PanelSet from './panelset';
import MediaQuery from 'react-responsive';

class Mobinge extends React.Component {
  constructor(props) {
    const ratio=.75;
    const width = parseInt(props.width);
    const startPanel = parseInt(props.startPanel);
    super(props);
    this.state = {
      width: width,
      height: width/ratio,
      startPanel: startPanel - 1,
      manifest: props.manifest
    };
  }

  getOffset() {
    return (this.state.offset * this.state.width);
  }

  getQueryParam(count) {
    const padding = 20;
    let queryParam = {
      key: 'query-' + count
    };
    if (count > 1) {
      queryParam.minWidth = (this.props.width * count) + padding;
    }
    if (count < this.props.maxPanel) {
      queryParam.maxWidth = (this.props.width * (count + 1)) + padding - 1;
    }
    return queryParam;
  }

  getStyle(count) {
    return {
      'overflow': 'hidden',
      'width': (this.state.width * count) + 'px'
    };
  }

  render() {
    let queries = [];
    for (var count = this.props.maxPanel; count; count--) {
      queries.push(<MediaQuery {...this.getQueryParam(count)}>
        <div key={'strip-' + count} style={this.getStyle(count)}>
          <PanelSet width={this.state.width} height={this.state.height}
              arrowWidth={(count >= this.props.arrowThreshold) ?
                count : false} startPanel={this.state.startPanel}
                manifest={this.state.manifest}/>
        </div>
      </MediaQuery>);
    }
    return <div key="strip">
      {queries}
    </div>;
  }
}

export default Mobinge;
