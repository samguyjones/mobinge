import React from 'react';
import PanelMover from '../src/panelmover.js';
import renderer from 'react-test-renderer';

test('Get Draggable', () => {
  const mover = {
  };
  var test = new PanelMover(null, 2, 320);

  const mockDrag = {
    name: 'TestDraggable'
  };
  test.draggable(mockDrag);
  expect(test.draggable()).toBe(mockDrag);
});


test('Snap To', () => {
  const mover = {
  };
  var test = new PanelMover(null, 2, 320);
  const mockDrag = {
    snapTo: jest.fn()
  };
  test.draggable(mockDrag);
  expect(test.draggable()).toBe(mockDrag);
  test.snapTo(42);
  expect(mockDrag.snapTo.mock.calls.length).toBe(1);
  expect(mockDrag.snapTo.mock.calls[0][0]).toBe(42);
});

test('Sudo Snap To', () => {
  const mover = {
  };
  var test = new PanelMover(null, 2, 320);
  const mockDrag = {
    snapTo: jest.fn(),
    clearMovement: jest.fn()
  };
  test.draggable(mockDrag);
  expect(test.draggable()).toBe(mockDrag);
  test.sudoSnapTo(42);
  expect(mockDrag.snapTo.mock.calls.length).toBe(1);
  expect(mockDrag.snapTo.mock.calls[0][0]).toBe(42);
  expect(mockDrag.clearMovement.mock.calls.length).toBe(1);
});

test('Snap Panels', () => {
  const mover = {
  };
  var test = new PanelMover(null, 2, 320, mover);
  const mockDrag = {
    snapTo: jest.fn(),
    clearMovement: jest.fn()
  };
  let panelRefs = [];
  for (let i=0; i <= 14; i++) {
    panelRefs.push({
      load: jest.fn()
    });
  }
  test.panelRefs = panelRefs;
  test.draggable(mockDrag);
  expect(test.draggable()).toBe(mockDrag);
  test.snapPanels(2);
  test.snapPanels(-1);
  test.snapPanels(4);
  const calls = mockDrag.snapTo.mock.calls;
  expect(calls.length).toBe(3);
  expect(calls[0][0]).toBe(-1280);
  expect(calls[1][0]).toBe(-960);
  expect(calls[2][0]).toBe(-2240);
});

test('LoadPanels', () => {
  const mover = {
  };
  var test = new PanelMover(null, 2, 320);
  const mockDrag = {
    snapDistance: jest.fn()
  };
  test.draggable(mockDrag);
  expect(test.draggable()).toBe(mockDrag);
  let panelRefs = [];
  for (let i=0; i <= 14; i++) {
    panelRefs.push({
      load: jest.fn()
    });
  }
  test.panelRefs = panelRefs;
  test.loadPanels();
  for (let i=0; i <= 10; i++) {
    expect(panelRefs[i].load.mock.calls.length).toBe(1);
  }
});


test('LoadFromPanel', () => {
  const mover = {
  };
  var test = new PanelMover(null, 14, 320);

  let panelRefs = [];
  for (let i=0; i <= 14; i++) {
    panelRefs.push({
      load: jest.fn()
    });
  }
  test.panelRefs = panelRefs;
  test.loadFromPanel(2);
  for (let i=0; i <= 10; i++) {
    expect(panelRefs[i].load.mock.calls.length).toBe(1);
  }
});

test('GoToPanel', () => {
  var test = new PanelMover(null, 14, 320);
  test.sudoSnapTo = jest.fn();
  const mockDrag = {
    snapTo: jest.fn(),
    clearMovement: jest.fn()
  };
  test.draggable(mockDrag);
  test.loadFromPanel = jest.fn();
  for (let i=0; i <= 4; i++) {
    test.addPanel(null);
  }
  test.goToPanel(4);
  expect(test.sudoSnapTo.mock.calls[0][0]).toBe(-1280);
  expect(test.loadFromPanel.mock.calls[0][0]).toBe(4);
});

test('EndFunction', () => {
  const mover = {
  };
  var test = new PanelMover(null, 14, 320);

  let panelRefs = [];
  for (let i=0; i <= 13; i++) {
    test.addPanel(null);
  }
  test.goToPanel = jest.fn();
  const start = test.endFunction(true, 4);
  const end = test.endFunction(false, 4);
  const mock = test.goToPanel.mock.calls;
  start();
  expect(mock.length).toBe(1);
  expect(mock[0][0]).toBe(0);
  end();
  expect(mock.length).toBe(2);
  expect(mock[1][0]).toBe(10);
});

test('MoveFunction', () => {
  const mover = {
  };
  var test = new PanelMover(null, 5, 320);

  let panelRefs = [];
  for (let i=0; i <= 13; i++) {
    test.addPanel(null);
  }
  test.goToPanel = jest.fn();
  const mock = test.goToPanel.mock.calls;
  test.moveFunction(1, 4)();
  expect(mock.length).toBe(1);
  expect(mock[0][0]).toBe(9);
  test.moveFunction(-1, 4)();
  expect(mock.length).toBe(2);
  expect(mock[1][0]).toBe(1);
});
