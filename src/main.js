import ReactDOM from 'react-dom';
import React from 'react';
import Mobinge from './mobinge';
import EntrySet from './entryset';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Reader = ({match}) => {
  const headerStyle={
    width: '320px',
    height: '60px',
    backgroundColor: 'black'
  };
  const panelNo = (match.params.panelNo) ? match.params.panelNo : 0;
  return <div>
      <div id="header" style={headerStyle}>
      <Link to='/index'>
          <img src="/images/entry-list.png"/>
      </Link>
      <img src="/images/title.png"/>
      </div>
      <Mobinge width="320" maxPanel="4" arrowThreshold="2" startPanel={panelNo}
      manifest="manifest.json" panelRes="640"/>
    </div>;
}

const Index = () => {
  const headerStyle={
    width: '384px',
    height: '60px',
    backgroundColor: 'black'
  };
  return <div>
  <div id="header" style={headerStyle}>
  <img src="/images/entry-list-disabled.png"/>
  <img src="/images/title.png"/>
  </div>      <EntrySet/>
  </div>;
}


window.addEventListener('DOMContentLoaded', () => {
  const mobinge = <Router>
    <div>
      <Route path="/panel/:panelNo" component={Reader}/>
      <Route path="/index" component={Index}/>
      <Route exact path="/" component={Reader}/>
    </div>
  </Router>;
  ReactDOM.render(
    mobinge,
    document.getElementById('root')
  );
});
