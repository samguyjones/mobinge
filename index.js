var Mobinge =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _panelset = __webpack_require__(3);

var _panelset2 = _interopRequireDefault(_panelset);

var _reactResponsive = __webpack_require__(9);

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mobinge = function (_React$Component) {
  _inherits(Mobinge, _React$Component);

  function Mobinge(props) {
    _classCallCheck(this, Mobinge);

    var ratio = .75;
    var width = parseInt(props.width);
    var startPanel = parseInt(props.startPanel);

    var _this = _possibleConstructorReturn(this, (Mobinge.__proto__ || Object.getPrototypeOf(Mobinge)).call(this, props));

    _this.state = {
      width: width,
      height: width / ratio,
      startPanel: startPanel - 1,
      manifest: props.manifest
    };
    return _this;
  }

  _createClass(Mobinge, [{
    key: 'getOffset',
    value: function getOffset() {
      return this.state.offset * this.state.width;
    }
  }, {
    key: 'getQueryParam',
    value: function getQueryParam(count) {
      var padding = 20;
      var queryParam = {
        key: 'query-' + count
      };
      if (count > 1) {
        queryParam.minWidth = this.props.width * count + padding;
      }
      if (count < this.props.maxPanel) {
        queryParam.maxWidth = this.props.width * (count + 1) + padding - 1;
      }
      return queryParam;
    }
  }, {
    key: 'getStyle',
    value: function getStyle(count) {
      return {
        'overflow': 'hidden',
        'width': this.state.width * count + 'px'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var queries = [];
      for (var count = this.props.maxPanel; count; count--) {
        queries.push(_react2.default.createElement(
          _reactResponsive2.default,
          this.getQueryParam(count),
          _react2.default.createElement(
            'div',
            { key: 'strip-' + count, style: this.getStyle(count) },
            _react2.default.createElement(_panelset2.default, { width: this.state.width, height: this.state.height,
              arrowWidth: count >= this.props.arrowThreshold ? count : false, startPanel: this.state.startPanel,
              manifest: this.state.manifest })
          )
        ));
      }
      return _react2.default.createElement(
        'div',
        { key: 'strip' },
        queries
      );
    }
  }]);

  return Mobinge;
}(_react2.default.Component);

exports.default = Mobinge;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _panellibrarian = __webpack_require__(4);

var _panellibrarian2 = _interopRequireDefault(_panellibrarian);

var _reactDraggable = __webpack_require__(1);

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _panelmover = __webpack_require__(6);

var _panelmover2 = _interopRequireDefault(_panelmover);

var _snapdraggable = __webpack_require__(7);

var _snapdraggable2 = _interopRequireDefault(_snapdraggable);

var _arrows = __webpack_require__(8);

var _arrows2 = _interopRequireDefault(_arrows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PanelSet = function (_React$Component) {
  _inherits(PanelSet, _React$Component);

  function PanelSet(props) {
    _classCallCheck(this, PanelSet);

    var _this = _possibleConstructorReturn(this, (PanelSet.__proto__ || Object.getPrototypeOf(PanelSet)).call(this, props));

    _this.librarian = new _panellibrarian2.default(props.manifest);
    _this.state = {
      panels: [_react2.default.createElement(
        'b',
        { key: 'placeHolder' },
        'Waiting'
      )],
      width: props.width,
      height: props.height,
      startPanel: props.startPanel
    };
    _this.mover = new _panelmover2.default(_this.state.width);
    return _this;
  }

  _createClass(PanelSet, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var panelStyle = {
        width: this.state.width + 'px',
        height: this.state.height + 'px'
      };
      var PANEL_MARGIN = 8;
      this.librarian.fetchPanels(this.state.width + 'px').then(function (panelUrls) {
        var cushion = 0;
        _this2.setState({
          panels: panelUrls.map(function (panel) {
            var key = 'panel-' + panel.sequence;
            var lazy = 'lazy-' + panel.sequence;
            return _react2.default.createElement('img', { key: key, style: panelStyle, src: panel.url,
              onDragStart: function onDragStart(e) {
                e.preventDefault();
              } });
          })
        });
      });
    }
  }, {
    key: 'moveFunction',
    value: function moveFunction(goDirection) {
      var _this3 = this;

      var distance = this.props.arrowWidth * this.state.width;
      return function () {
        _this3.mover.snapDistance(distance * goDirection);
      };
    }
  }, {
    key: 'getArrows',
    value: function getArrows() {
      if (!this.props.arrowWidth) {
        return null;
      }
      return _react2.default.createElement(_arrows2.default, { width: this.props.arrowWidth * this.state.width,
        onNext: this.moveFunction(1), onBack: this.moveFunction(-1) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var panelSetStyle = {
        height: this.state.height,
        width: this.state.panels.length * this.state.width + 'px',
        position: 'relative',
        left: '0px'
      };
      var boundStats = {
        left: -(this.state.width * (this.state.panels.length - 1)),
        top: 0,
        bottom: 0,
        right: 0
      };
      var start = function start(e, data) {
        _this4.mover.grab(e, data);
      };
      var stop = function stop(e, data) {
        _this4.mover.release(e, data);
      };
      var startX = this.state.width * this.state.startPanel;
      return _react2.default.createElement(
        'div',
        { key: 'panelWrapper' },
        _react2.default.createElement(
          _snapdraggable2.default,
          { axis: 'x', bounds: boundStats, mover: this.mover, onStart: start,
            onStop: stop, startX: startX },
          _react2.default.createElement(
            'div',
            { key: 'panelset', style: panelSetStyle },
            this.state.panels
          )
        ),
        this.getArrows()
      );
    }
  }]);

  return PanelSet;
}(_react2.default.Component);

exports.default = PanelSet;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PANLIB_DEFAULT_START = 1;
var PANLIB_DEFAULT_END = null;
var PANLIB_DEFAULT_RESOLUTION = "300px";
var PANLIB_DEFAULT_MANIFEST = "./manifest.json";

var PanelLibrarian = function () {
  function PanelLibrarian(manifest, start, end) {
    _classCallCheck(this, PanelLibrarian);

    this.startAt(start === undefined ? PANLIB_DEFAULT_START : start).manifest(manifest === undefined ? PANLIB_DEFAULT_MANIFEST : manifest).endAt(end === undefined ? PANLIB_DEFAULT_END : end).panels = null;
  }

  _createClass(PanelLibrarian, [{
    key: "startAt",
    value: function startAt(start) {
      if (start === undefined) {
        return this.start;
      }
      this.start = start;
      return this;
    }
  }, {
    key: "endAt",
    value: function endAt(end) {
      if (end === undefined) {
        return this.end;
      }
      this.end = end;
      return this;
    }
  }, {
    key: "manifest",
    value: function manifest(_manifest) {
      if (_manifest === undefined) {
        return this.manifest;
      }
      this.manifest = _manifest;
      this.getPanelData = fetch(_manifest);
      return this;
    }
  }, {
    key: "pickPanels",
    value: function pickPanels(resolution) {
      var _this = this;

      return this.panelData.images.filter(function (panel) {
        return panel.sequence >= _this.start && (_this.end === null || panel.sequence <= _this.end);
      }).map(function (panel) {
        return {
          sequence: panel.sequence,
          url: _this.panelData.path + panel.file[resolution]
        };
      });
    }
  }, {
    key: "fetchPanels",
    value: function fetchPanels(resolution) {
      var _this2 = this;

      resolution = resolution == undefined ? PANLIB_DEFAULT_RESOLUTION : resolution;
      if (this.panels !== null) {
        return new Promise(function () {
          return _this2.pickPanels(resolution);
        });
      }
      if (!this.getPanelData) {
        throw {
          'message': 'No manifest is set.'
        };
      }
      return this.getPanelData.then(function (response) {
        return response.json();
      }).then(function (panelData) {
        _this2.panelData = panelData;
        return _this2.pickPanels(resolution);
      });
    }
  }]);

  return PanelLibrarian;
}();

exports.default = PanelLibrarian;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PanelMover = function () {
  function PanelMover(width) {
    _classCallCheck(this, PanelMover);

    this.landfall = false;
    this.boundary = 30;
    this.dragComponent = null;
    this.chunkWidth = width;
  }

  _createClass(PanelMover, [{
    key: "draggable",
    value: function draggable(myDraggable) {
      if (myDraggable) {
        this.dragComponent = myDraggable;
        return this;
      }
      return dragComponent;
    }
  }, {
    key: "grab",
    value: function grab(e, data) {
      if (this.landfall === false) {
        this.landfall = data.x;
      }
    }
  }, {
    key: "release",
    value: function release(e, data) {
      this.snap(data.x);
      this.landfall = false;
    }
  }, {
    key: "snap",
    value: function snap(mouseX) {
      var dragX = this.dragComponent.state.x;
      if (isNaN(dragX)) console.log('state', this.dragComponent.state);
      var chunkOffset = dragX % this.chunkWidth;
      var direction = this.toBoundary(Math.abs(chunkOffset)) || this.toDirection(mouseX);
      this.dragComponent.snapTo(this.getSnapDestination(dragX, chunkOffset, direction));
    }
  }, {
    key: "snapDistance",
    value: function snapDistance(distance) {
      if (distance % this.chunkWidth) {
        throw "Distance isn't divisible by the item width ${this.chunkWidth}.";
      }
      this.dragComponent.snapDistance(distance);
    }
  }, {
    key: "toDirection",
    value: function toDirection(lastPosition) {
      return lastPosition < this.landfall ? 1 : -1;
    }
  }, {
    key: "toBoundary",
    value: function toBoundary(offset) {
      if (offset > this.chunkWidth - this.boundary) {
        return 1;
      }
      if (offset < this.boundary) {
        return -1;
      }
      return 0;
    }
  }, {
    key: "getSnapDestination",
    value: function getSnapDestination(xPosition, offset, direction) {
      if (direction == -1) {
        return xPosition - offset;
      }
      return xPosition - (this.chunkWidth + offset);
    }
    //
    // xFromEvent(e) {
    //   let event = e;
    //   if (e.nativeEvent !== undefined) {
    //     event = event.nativeEvent;
    //   }
    //   if ((e.touches !== undefined) && (e.touches.length)) {
    //     event = event.touches[0];
    //   }
    //   if ((e.changedTouches !== undefined) && (e.changedTouches.length)) {
    //     e = e.changedTouches[0];
    //   }
    //   if (e.screenX) {
    //     return e.screenX;
    //   }
    //   return undefined;
    // }

  }]);

  return PanelMover;
}();

exports.default = PanelMover;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _reactDraggable = __webpack_require__(1);

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SnapDraggable = function (_Draggable) {
  _inherits(SnapDraggable, _Draggable);

  function SnapDraggable(props) {
    _classCallCheck(this, SnapDraggable);

    var _this = _possibleConstructorReturn(this, (SnapDraggable.__proto__ || Object.getPrototypeOf(SnapDraggable)).call(this, props));

    _this.state.x = -props.startX;
    _this.timeout = false;
    props.mover.draggable(_this);
    return _this;
  }

  _createClass(SnapDraggable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(SnapDraggable.prototype.__proto__ || Object.getPrototypeOf(SnapDraggable.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'snapDistance',
    value: function snapDistance(distance) {
      this.snapTo(this.getLimit(this.state.x - distance));
    }
  }, {
    key: 'snapTo',
    value: function snapTo() {
      var newX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.x;

      var _this2 = this;

      var newY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.y;
      var ongoing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (isNaN(newX)) {
        throw 'Destination not a number.';
      }
      var moveInterval = 10;
      if (this.state.x == newX && this.state.y == newY) {
        this.timeout = false;
        return;
      }
      var newPosition = {
        x: this.getTickDestination(this.state.x, newX),
        y: this.getTickDestination(this.state.y, newY)
      };
      this.setState(newPosition);
      if (ongoing || !this.timeout) {
        this.timeout = setTimeout(function () {
          return _this2.snapTo(newX, newY, true);
        }, moveInterval);
      }
    }
  }, {
    key: 'getLimit',
    value: function getLimit(newX) {
      newX = Math.min(newX, this.props.bounds.right);
      newX = Math.max(newX, this.props.bounds.left);
      return newX;
    }

    // The distance to move between two numbers in a tick.

  }, {
    key: 'getTickDestination',
    value: function getTickDestination(current, goal) {
      var lastSnap = 8;
      var distance = Math.abs(current - goal);
      var steps = 12;
      if (distance < lastSnap) {
        return goal;
      }
      return goal > current ? current + distance / steps : current - distance / steps;
    }
  }]);

  return SnapDraggable;
}(_reactDraggable2.default);

exports.default = SnapDraggable;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arrows = function (_React$Component) {
  _inherits(Arrows, _React$Component);

  function Arrows() {
    _classCallCheck(this, Arrows);

    return _possibleConstructorReturn(this, (Arrows.__proto__ || Object.getPrototypeOf(Arrows)).apply(this, arguments));
  }

  _createClass(Arrows, [{
    key: 'render',
    value: function render() {
      var barStyle = {
        width: this.props.width,
        position: 'relative'
      };
      var leftStyle = {
        left: '0px'
      };
      var rightStyle = {
        right: '0px',
        position: 'absolute'
      };
      return _react2.default.createElement(
        'div',
        { key: 'arrows', style: barStyle },
        _react2.default.createElement(
          'span',
          { style: leftStyle },
          _react2.default.createElement(
            'a',
            { onClick: this.props.onBack },
            _react2.default.createElement('img', { src: 'images/back-arrow.png' })
          )
        ),
        _react2.default.createElement(
          'span',
          { style: rightStyle },
          _react2.default.createElement(
            'a',
            { onClick: this.props.onNext },
            _react2.default.createElement('img', { src: 'images/next-arrow.png' })
          )
        )
      );
    }
  }]);

  return Arrows;
}(_react2.default.Component);

exports.default = Arrows;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ })
/******/ ]);