import React from 'react';
import PanelSet from '../src/panelset.js';
import renderer from 'react-test-renderer';

test('Test Construct', () => {
  const mover = {
  };

  var test = new PanelSet({
    manifest: false,
    startPanel: 1,
    width: 320,
    height: 480,
    mover: mover
  });

  expect(test.state.width).toBe(320);
  expect(test.state.height).toBe(480);
});
