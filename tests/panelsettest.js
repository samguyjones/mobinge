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

test('LoadPanels', () => {
  const mover = {
  };
  var test = new PanelSet({
    manifest: false,
    startPanel: 1,
    width: 320,
    height: 480,
    mover: mover
  });

  test.currentPanel = 2;
  test.state.panels={
    length: 14
  };
  let panelRef = [];
  for (let i=0; i <= 10; i++) {
    panelRef.push({
      load: jest.fn()
    });
  }
  test.panelRef = panelRef;
  test.loadPanels();
  for (let i=0; i <= 10; i++) {
    expect(panelRef[i].load.mock.calls.length).toBe(1);
  }
});


test('LoadFromPanel', () => {
  const mover = {
  };
  var test = new PanelSet({
    manifest: false,
    startPanel: 1,
    width: 320,
    height: 480,
    mover: mover
  });

  test.state.panels={
    length: 14
  };
  let panelRef = [];
  for (let i=0; i <= 10; i++) {
    panelRef.push({
      load: jest.fn()
    });
  }
  test.panelRef = panelRef;
  test.loadFromPanel(2);
  for (let i=0; i <= 10; i++) {
    expect(panelRef[i].load.mock.calls.length).toBe(1);
  }
});

test('GoToPanel', () => {
  const mover = {
    sudoSnapTo: jest.fn()
  };
  var test = new PanelSet({
    manifest: false,
    startPanel: 1,
    width: 320,
    height: 480,
    mover: mover
  });
  test.loadFromPanel = jest.fn();
  test.state.panels = {
    length: 14
  };
  test.goToPanel(4);
  expect(mover.sudoSnapTo.mock.calls[0][0]).toBe(-1280);
  expect(test.loadFromPanel.mock.calls[0][0]).toBe(4);
});

test('EndFunction', () => {
  var test = new PanelSet({
    manifest: false,
    startPanel: 1,
    width: 320,
    height: 480,
    mover: {},
    arrowWidth: 4
  });
  test.state.panels = {
    length: 14
  };
  test.goToPanel = jest.fn();
  const start = test.endFunction(true);
  const end = test.endFunction(false);
  const mock = test.goToPanel.mock.calls;
  start();
  expect(mock.length).toBe(1);
  expect(mock[0][0]).toBe(0);
  end();
  expect(mock.length).toBe(2);
  expect(mock[1][0]).toBe(10);
});

test('MoveFunction', () => {
  var test = new PanelSet({
    manifest: false,
    startPanel: 5,
    width: 320,
    height: 480,
    mover: {},
    arrowWidth: 4
  });
  test.state.panels = {
    length: 14
  };
  test.goToPanel = jest.fn();
  const mock = test.goToPanel.mock.calls;
  test.moveFunction(1)();
  expect(mock.length).toBe(1);
  expect(mock[0][0]).toBe(9);
  test.moveFunction(-1)();
  expect(mock.length).toBe(2);
  expect(mock[1][0]).toBe(1);
});
