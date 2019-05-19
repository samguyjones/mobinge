import ReactDOM from 'react-dom';
import React from 'react';
import Mobinge from './components/Mobinge';
import EntrySet from './components/EntrySet';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import 'whatwg-fetch';
import config from 'react-global-configuration';

const Reader = ({match}) => {
  const panelNo = (match.params.panelNo) ? match.params.panelNo : 0;
  return  <Mobinge startPanel={panelNo}/>;
}

const Index = () => {
  return <EntrySet/>;
}


window.addEventListener('DOMContentLoaded', () => {
  const settingsFile = 'settings.json';
  fetch(settingsFile).then((response) => {
    return response.json();
  })
  .then((settings) => {
    config.set(settings);
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
});
