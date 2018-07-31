import React from 'react';
import PanelLibrarian from '../src/panellibrarian.js';

describe('Tests Using Mock Manifest', () => {
  let librarian = new PanelLibrarian(false);
  // Example Manifst for Tests.
  const manifest = {
    'project': 'test',
    'path': '/test/',
    'entries': [
      {
          'images': [
            {
              'file': {
                '320px': 'test1-320.png',
                '640px': 'test1-640.png'
              },
              sequence: 1
            },
            {
              'file': {
                '320px': 'test2-320.png',
                '640px': 'test2-640.png'
              },
              sequence: 2
            }
          ],
          "date": "2018-01-07",
          "thumbnail": "./snapshot0001.png"
      },
      {
          'images': [
            {
              'file': {
                '320px': 'test3-320.png',
                '640px': 'test3-640.png'
              },
              sequence: 3
            },
            {
              'file': {
                '320px': 'test4-320.png',
                '640px': 'test4-640.png'
              },
              sequence: 4
            }
          ],
          "date": "2018-01-07",
          "thumbnail": "./snapshot0001.png"
    },
  ]
  };
  // Mockup of manifest fetch
  librarian.getPanelData = Promise.resolve({
    'json': () => { return manifest; }
  });

  test('Fetch 320px all', () => {
    librarian
      .startAt(1)
      .endAt(null)
      .fetchPanels('320px')
      .then((panels) => {
        expect(panels.length).toBe(4);
        expect(panels[0].url).toBe('/test/test1-320.png');
        expect(panels[1].url).toBe('/test/test2-320.png');
        expect(panels[2].url).toBe('/test/test3-320.png');
      })
      .catch((error) => {
        fail(error);
      });
  });

  test('Fetch 640px all', () => {
    librarian
      .startAt(1)
      .endAt(null)
      .fetchPanels('640px')
      .then((panels) => {
        expect(panels.length).toBe(4);
        expect(panels[0].url).toBe('/test/test1-640.png');
        expect(panels[1].url).toBe('/test/test2-640.png');
        expect(panels[2].url).toBe('/test/test3-640.png');
      })
      .catch((error) => {
        fail(error);
      });
  });

  test('Fetch 320px starting 2', () => {
    librarian
      .startAt(2)
      .endAt(null)
      .fetchPanels('320px')
      .then((panels) => {
        expect(panels.length).toBe(3);
        expect(panels[0].url).toBe('/test/test2-320.png');
        expect(panels[1].url).toBe('/test/test3-320.png');
      })
      .catch((error) => {
        fail(error);
      });
  });


  test('Fetch 320px ending 2', () => {
    librarian
      .startAt(1)
      .endAt(2)
      .fetchPanels('320px')
      .then((panels) => {
        expect(panels.length).toBe(2);
        expect(panels[0].url).toBe('/test/test1-320.png');
        expect(panels[1].url).toBe('/test/test2-320.png');
      })
      .catch((error) => {
        fail(error);
      });
  });

  test('Get current panel', () => {
    librarian.fetchPanels('320px')
      .then(() => {
        expect(librarian.getCurrentEntry()).toBe(3);
      })
      .catch((error) => {
        fail(error);
      });
  });
});
