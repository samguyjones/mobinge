import ReactDOM from 'react-dom';
import React from 'react';
import Mobinge from './mobinge';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const Reader = ({match}) => {
  const panelNo = (match.params.panelNo) ? match.params.panelNo : 1;
  return <div>
      <Mobinge width="320" maxPanel="4" arrowThreshold="2" startPanel={panelNo}
      manifest="manifest.json"/>
    </div>;
}


window.addEventListener('DOMContentLoaded', () => {
  const mobinge = <Router>
    <div>
      <Route path="/panel/:panelNo" component={Reader}/>
      <Route exact path="/" component={Reader}/>
    </div>
  </Router>;
  ReactDOM.render(
    mobinge,
    document.getElementById('root')
  );
});

// window.addEventListener('DOMContentLoaded', () => {
//   const mobinge = <div>
//     <Moose name="Billy"/>
//     <Strip width="320" maxPanel="4" arrowThreshold="2" startPanel="18"/>
//   </div>;
//   ReactDOM.render(
//     mobinge,
//     document.getElementById('root')
//   );
// });
