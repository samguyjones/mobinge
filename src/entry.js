import React from 'react';
import { Link } from 'react-router-dom'
export default class Entry extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      panel: props.panel,
      number: props.number
    }
  }

  render() {
    const panelPath = {
      pathname: '/panel/' + this.state.panel
    }
    return(<Link to={panelPath}><img src={this.state.image}/></Link>);
  }
}
