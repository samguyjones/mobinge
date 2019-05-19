import React from 'react';
import Panel from '../src/components/Panel';
import renderer from 'react-test-renderer';

test('Test Render', () => {
  const style = {
    border: '1px solid black'
  };
  var panelRef;
  const component = renderer.create(
    <Panel image="test.gif" style={style} ref={(comp) => {panelRef = comp;}}></Panel>
  );
  let render = component.toJSON();
  expect(render).toMatchSnapshot();
  panelRef.load();
  render = component.toJSON();
  expect(render).toMatchSnapshot();
});
