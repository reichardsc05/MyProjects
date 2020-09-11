// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/character.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Character = /*#__PURE__*/function () {
  function Character(_game, _name) {
    _classCallCheck(this, Character);

    this.gameWidth = _game.gameWidth;
    this.gameHeight = _game.gameHeight;
    this.width = 20;
    this.height = 20;
    this.name = _name;
    this.maxSpeedX = 3;
    this.maxSpeedY = 3;
    this.speedX = 0;
    this.speedY = 0;
    this.position = {
      x: _game.gameWidth / 2 - this.width / 2,
      y: _game.gameHeight - this.height - 10
    };
  }

  _createClass(Character, [{
    key: "moveLeft",
    value: function moveLeft() {
      this.speedX = -this.maxSpeedX;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.speedX = this.maxSpeedX;
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      this.speedY = -this.maxSpeedY;
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.speedY = this.maxSpeedY;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.speedX = 0;
      this.speedY = 0;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "#0ff";
      ctx.beginPath();
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(this.position.x - this.width / 2, this.position.y + this.height / 2);
      ctx.lineTo(this.position.x + this.width / 2, this.position.y + this.height / 2);
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speedX;
      this.position.y += this.speedY;
      if (this.position.x - this.width / 2 < 0) this.position.x = this.width / 2;
      if (this.position.y < 0) this.position.y = 0;
      if (this.position.x + this.width / 2 > this.gameWidth) this.position.x = this.gameWidth - this.width / 2;
      if (this.position.y > this.gameHeight - this.height / 2) this.position.y = this.gameHeight - this.height / 2;
    }
  }]);

  return Character;
}();

exports.default = Character;
},{}],"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputHandler = function InputHandler(character, game) {
  _classCallCheck(this, InputHandler);

  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37:
        character.moveLeft();
        break;

      case 38:
        character.moveUp();
        break;

      case 39:
        character.moveRight();
        break;

      case 40:
        character.moveDown();
        break;

      case 27:
        game.togglePause();
        break;

      case 32:
        game.start();
        break;
    }
  });
  document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
      case 37:
        if (character.speed < 0) character.stop();
        break;

      case 38:
        if (character.speed < 0) character.stop();
        break;

      case 39:
        if (character.speed > 0) character.stop();
        break;

      case 40:
        if (character.speed < 0) character.stop();
        break;
    }
  });
};

exports.default = InputHandler;
},{}],"src/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Text = /*#__PURE__*/function () {
  function Text(_x, _y, _text) {
    _classCallCheck(this, Text);

    this.x = _x;
    this.y = _y;
    this.text = _text;
  }

  _createClass(Text, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(this.text, this.x, this.y);
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Text;
}();

exports.default = Text;
},{}],"src/button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _text2 = _interopRequireDefault(require("./text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Button = /*#__PURE__*/function () {
  function Button(_x, _y, _width, _height, _text, _backgroundColor, _borderColor, _borderSize) {
    _classCallCheck(this, Button);

    this.width = _width;
    this.height = _height;
    this.x = _x;
    this.y = _y;
    this.text = new _text2.default(this.width / 2, this.height / 2, _text);
    this.backgroundColor = _backgroundColor;
    this.borderColor = _borderColor;
    this.borderSize = _borderSize;
  }

  _createClass(Button, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.borderColor;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(this.x + this.borderSize, this.y + this.borderSize, this.width - 2 * this.borderSize, this.height - 2 * this.borderSize);
      this.text.draw(ctx);
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Button;
}();

exports.default = Button;
},{"./text":"src/text.js"}],"src/infoWIndow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _button = _interopRequireDefault(require("./button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InfoWindow = /*#__PURE__*/function () {
  function InfoWindow(_game) {
    _classCallCheck(this, InfoWindow);

    this.width = _game.gameWidth;
    this.height = 100;
    this.timeText = new Text(this.width / 2, this.height / 2, "test");
  }

  _createClass(InfoWindow, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.fillRect(3, 3, this.width - 6, this.height - 6);
      this.testButton = new _button.default(0, 0, 100, 100, "Menu", "white", "black", 3);
      this.testButton.draw(ctx);
      this.timeText.draw(ctx);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {}
  }]);

  return InfoWindow;
}();

exports.default = InfoWindow;
},{"./button":"src/button.js"}],"src/levels.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLevel = buildLevel;
exports.level2 = exports.level1 = void 0;

function buildLevel(game, level) {
  var tiles = [];
  level.forEach(function (row, rowIndex) {
    row.forEach(function (tile, tileIndex) {
      if (tile === 1) {
        var position = {
          x: 80 * tileIndex,
          y: 75 + 24 * rowIndex
        }; //tiles.push(new Tile(game, position));
      }
    });
  });
  return tiles;
}

var level1 = [// [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
// [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
[0, 0, 0, 0, 0, 0, 0, 1, 0, 0]];
exports.level1 = level1;
var level2 = [[0, 1, 1, 0, 0, 0, 0, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
exports.level2 = level2;
},{}],"src/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _character = _interopRequireDefault(require("/src/character"));

var _input = _interopRequireDefault(require("/src/input"));

var _infoWIndow = _interopRequireDefault(require("/src/infoWIndow"));

var _button = _interopRequireDefault(require("/src/button"));

var _levels = require("/src/levels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

var Game = /*#__PURE__*/function () {
  function Game(gameWidth, gameHeight, bricksPerRow) {
    _classCallCheck(this, Game);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.character = new _character.default(this);
    this.infoWindow = new _infoWIndow.default(this);
    this.gameObjects = [];
    this.gameDateTime = new Date(0, 0, 0, 0, 0, 0, 0);
    this.lives = 3;
    this.levels = [_levels.level1, _levels.level2];
    this.currentLevel = 0;
    new _input.default(this.character, this);
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;
      this.gameObjects = [this.infoWindow];
      this.gamestate = GAMESTATE.RUNNING;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
      if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;

      _toConsumableArray(this.gameObjects).forEach(function (object) {
        return object.update(deltaTime);
      });
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      _toConsumableArray(this.gameObjects).forEach(function (object) {
        return object.draw(ctx);
      });

      if (this.gamestate === GAMESTATE.PAUSED) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
      }

      if (this.gamestate === GAMESTATE.MENU) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Press SPACEBAR To Start", this.gameWidth / 2, this.gameHeight / 2);
      }

      if (this.gamestate === GAMESTATE.GAMEOVER) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
      }
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.gamestate == GAMESTATE.PAUSED) {
        this.gamestate = GAMESTATE.RUNNING;
      } else {
        this.gamestate = GAMESTATE.PAUSED;
      }
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"/src/character":"src/character.js","/src/input":"src/input.js","/src/infoWIndow":"src/infoWIndow.js","/src/button":"src/button.js","/src/levels":"src/levels.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _game = _interopRequireDefault(require("/src/game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var game = new _game.default(GAME_WIDTH, GAME_HEIGHT);
var lastTime = 0;

function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
},{"/src/game":"src/game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55230" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map