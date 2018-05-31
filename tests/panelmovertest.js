import PanelMover from '../src/panelmover.js'

test('Get Draggable', () => {
  const mover = new PanelMover(320, {});
  const mockDrag = {
    name: 'TestDraggable'
  };
  mover.draggable(mockDrag);
  expect(mover.draggable()).toBe(mockDrag);
});

test('Grab', () => {
  const moveDone = {};
  const mover = new PanelMover(320, moveDone);
  mover.grab({}, {
    x: 12,
    y: 32
  });
  expect(mover.landfall).toBe(12);
});

test('Snap To', () => {
  const mover = new PanelMover(320, {});
  const mockDrag = {
    snapTo: jest.fn()
  };
  mover.draggable(mockDrag);
  expect(mover.draggable()).toBe(mockDrag);
  mover.snapTo(42);
  expect(mockDrag.snapTo.mock.calls.length).toBe(1);
  expect(mockDrag.snapTo.mock.calls[0][0]).toBe(42);
});

test('Sudo Snap To', () => {
  const mover = new PanelMover(320, {});
  const mockDrag = {
    snapTo: jest.fn(),
    clearMovement: jest.fn()
  };
  mover.draggable(mockDrag);
  expect(mover.draggable()).toBe(mockDrag);
  mover.sudoSnapTo(42);
  expect(mockDrag.snapTo.mock.calls.length).toBe(1);
  expect(mockDrag.snapTo.mock.calls[0][0]).toBe(42);
  expect(mockDrag.clearMovement.mock.calls.length).toBe(1);
});

test('Snap Panels', () => {
  const mover = new PanelMover(320, {});
  const mockDrag = {
    snapDistance: jest.fn()
  };
  mover.draggable(mockDrag);
  expect(mover.draggable()).toBe(mockDrag);
  mover.snapPanels(2);
  mover.snapPanels(-1);
  mover.snapPanels(4);
  const calls = mockDrag.snapDistance.mock.calls;
  expect(calls.length).toBe(3);
  expect(calls[0][0]).toBe(640);
  expect(calls[1][0]).toBe(-320);
  expect(calls[2][0]).toBe(1280);
});

test('To Direction', () => {
  const mover = new PanelMover(320, {});
  mover.grab({}, {
    x: 32
  });
  expect(mover.toDirection(12)).toBe(-1);
  expect(mover.toDirection(80)).toBe(1);
});

test('To Boundary', () => {
  const mover = new PanelMover(320, {});
  expect(mover.toBoundary(9)).toBe(-1);
  expect(mover.toBoundary(78)).toBe(0);
  expect(mover.toBoundary(311)).toBe(1);
});

test('Get Snap Destination', () => {
  const mover = new PanelMover(320, {});
  expect(mover.getSnapDestination(334, 14, -1)).toBe(320);
  expect(mover.getSnapDestination(334, 14, 1)).toBe(640);
  expect(mover.getSnapDestination(308, 308, 1)).toBe(320);
  expect(mover.getSnapDestination(308, 308, -1)).toBe(0);
  expect(mover.getSnapDestination(-334, -14, -1)).toBe(-640);
  expect(mover.getSnapDestination(-334, -14, 1)).toBe(-320);
  expect(mover.getSnapDestination(-308, -308, 1)).toBe(0);
  expect(mover.getSnapDestination(-308, -308, -1)).toBe(-320);
});

test('Complete Snap', () => {
  let mockDrag = {
    snapTo: jest.fn(),
    state: {
      x: 323
    }
  };
  const alert = jest.fn();
  const mover = new PanelMover(320, alert);
  mover.landfall = 320;
  mover.draggable(mockDrag);
  mover.snap(325);
  const snapTos = mockDrag.snapTo.mock.calls;
  const alerts = alert.mock.calls;
  expect(snapTos.length).toBe(1);
  expect(snapTos[0][0]).toBe(320);
  expect(alerts[0][0]).toBe(320);
  mover.landfall = 320;
  mockDrag.state.x = 350;
  mover.snap(350);
  expect(snapTos.length).toBe(2);
  expect(snapTos[1][0]).toBe(640);
  expect(alerts[1][0]).toBe(640);
  mover.landfall = -320;
  mockDrag.state.x = -350;
  mover.snap(-350);
  expect(snapTos.length).toBe(3);
  expect(snapTos[2][0]).toBe(-640);
  mover.landfall = -320;
  mockDrag.state.x = -325;
  mover.snap(-325);
  expect(snapTos.length).toBe(4);
  expect(snapTos[3][0]).toBe(-320);
  mover.landfall = 320;
  mockDrag.state.x = 300;
  mover.snap(300);
  expect(snapTos.length).toBe(5);
  expect(snapTos[4][0]).toBe(0);
  mover.landfall = -320;
  mockDrag.state.x = -300;
  mover.snap(-300);
  expect(snapTos.length).toBe(6);
  expect(snapTos[4][0]).toBe(0);
});
