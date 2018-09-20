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
  const panelNo = (match.params.panelNo) ? match.params.panelNo : 0;
  return <div>
      <Mobinge width="320" maxPanel="4" arrowThreshold="2" startPanel={panelNo}
      manifest="manifest.json"/>
    </div>;
}

const Index = () => {
  return <div>
      <EntrySet/>
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
