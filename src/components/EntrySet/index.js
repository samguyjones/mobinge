import React from 'react';
import PanelLibrarian from '../../PanelLibrarian';
import Entry from '../Entry';
export default class EntrySet extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      panels: [<b key="placeHolder">Waiting</b>]
    }
    this.librarian = new PanelLibrarian(props.manifest);
  }

  componentDidMount()
  {
    this.librarian.fetchEntries()
        .then(entries => {
          let entryNumber = 0;
          this.setState({
            entries: entries.map(entry => {
              const key = 'entry-' + entryNumber++;
              return <Entry image={entry.thumbnailUrl} panel={entry.images[0].sequence}
              key={key}/>
            })
          });
        })
  }

  render() {
    return (<div key="entryIndex">
      {this.state.entries}
    </div>);
  }
}
