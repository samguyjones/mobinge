import React from 'react';
import SnapDraggable from '../src/snapdraggable.js';
import renderer from 'react-test-renderer';

describe('Tests With Rendered Component', () => {
  const mover = {
    draggable: jest.fn()
  };
  const boundStats = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 200
  };
  var snapRef;
  const snapDraggable = renderer.create(
    <SnapDraggable axis="x" bounds={boundStats} mover={mover}
    startX="0" ref={(comp) => {snapRef = comp;}}>
      <div>
        Lorem ipsum dolor emmet.
      </div>
    </SnapDraggable>
  );

  test('Get Limit', () => {
    expect(snapRef.getLimit(-5)).toBe(0);
    expect(snapRef.getLimit(525)).toBe(200);
    expect(snapRef.getLimit(37)).toBe(37);
  });

  test('Get Tick Destination', () => {
    expect(snapRef.getTickDestination(0, 200)).toBe(25);
    expect(snapRef.getTickDestination(0,7)).toBe(7);
    expect(snapRef.getTickDestination(200,0)).toBe(175);
  });

  test('Render', () => {
    let render = snapDraggable.toJSON();
    expect(render).toMatchSnapshot();
  });
});
