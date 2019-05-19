import React from 'react';
import Arrows from '../src/components/Arrows';
import renderer from 'react-test-renderer';

test('Test Render', () => {
  const style = {
    border: '1px solid black'
  };
  const component = renderer.create(
    <Arrows width="320px"></Arrows>
  );
  let render = component.toJSON();
  expect(render).toMatchSnapshot();
});
