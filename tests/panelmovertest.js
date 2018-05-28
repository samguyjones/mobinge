import PanelMover from '../src/panelmover.js'

test('Test Render', () => {
  const moveDone = jest.fn();
  const mover = new PanelMover(320, moveDone);
});
