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
})({"src/javascript/data.json":[function(require,module,exports) {
module.exports = [{
  "title": "Work",
  "timeframes": {
    "daily": {
      "current": 5,
      "previous": 7
    },
    "weekly": {
      "current": 32,
      "previous": 36
    },
    "monthly": {
      "current": 103,
      "previous": 128
    }
  }
}, {
  "title": "Play",
  "timeframes": {
    "daily": {
      "current": 1,
      "previous": 2
    },
    "weekly": {
      "current": 10,
      "previous": 8
    },
    "monthly": {
      "current": 23,
      "previous": 29
    }
  }
}, {
  "title": "Study",
  "timeframes": {
    "daily": {
      "current": 0,
      "previous": 1
    },
    "weekly": {
      "current": 4,
      "previous": 7
    },
    "monthly": {
      "current": 13,
      "previous": 19
    }
  }
}, {
  "title": "Exercise",
  "timeframes": {
    "daily": {
      "current": 1,
      "previous": 1
    },
    "weekly": {
      "current": 4,
      "previous": 5
    },
    "monthly": {
      "current": 11,
      "previous": 18
    }
  }
}, {
  "title": "Social",
  "timeframes": {
    "daily": {
      "current": 1,
      "previous": 3
    },
    "weekly": {
      "current": 5,
      "previous": 10
    },
    "monthly": {
      "current": 21,
      "previous": 23
    }
  }
}, {
  "title": "Self Care",
  "timeframes": {
    "daily": {
      "current": 0,
      "previous": 1
    },
    "weekly": {
      "current": 2,
      "previous": 2
    },
    "monthly": {
      "current": 7,
      "previous": 11
    }
  }
}];
},{}],"src/javascript/script.js":[function(require,module,exports) {
"use strict";

var _data = _interopRequireDefault(require("./data.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var myData = _data.default; //data received from json file
//console.log(myData);
//console.log(myData[0].timeframes.daily.current);

var LoadTimeframes = /*#__PURE__*/function () {
  function LoadTimeframes(dailyTime, currentTimeEl, previousTimeEl) {
    _classCallCheck(this, LoadTimeframes);

    this.dailyTime = dailyTime; //data from json

    this.currentTimeEl = currentTimeEl; //Element in which current time is gonna be displayed

    this.previousTimeEl = previousTimeEl; //Element in which previous time is gonna be displayed
  } //So what happens here is we assign 0 to x that we later use as index in dailyTime array
  //Then we take elements(currentTimeEl, previousTimeEl) which we use to display time user had spent on something
  //We increment x to increase index value
  //After first forEach is done, we're assigning 0 to x to reset current index so we can do another forEach for 'previous time' (previous time spent on some kind of activity)


  _createClass(LoadTimeframes, [{
    key: "loadDaily",
    value: function loadDaily() {
      var _this = this;

      var x = 0;
      this.currentTimeEl.forEach(function (element) {
        element.textContent = "".concat(_this.dailyTime[x].timeframes.daily.current, "hrs");
        x++;
      });
      x = 0;
      this.previousTimeEl.forEach(function (element) {
        element.textContent = "".concat(_this.dailyTime[x].timeframes.daily.previous, "hrs");
        x++;
      });
    }
  }, {
    key: "loadWeekly",
    value: function loadWeekly() {
      var _this2 = this;

      var x = 0;
      this.currentTimeEl.forEach(function (element) {
        element.textContent = "".concat(_this2.dailyTime[x].timeframes.weekly.current, "hrs");
        x++;
      });
      x = 0;
      this.previousTimeEl.forEach(function (element) {
        element.textContent = "".concat(_this2.dailyTime[x].timeframes.weekly.previous, "hrs");
        x++;
      });
    }
  }, {
    key: "loadMonthly",
    value: function loadMonthly() {
      var _this3 = this;

      var x = 0;
      this.currentTimeEl.forEach(function (element) {
        element.textContent = "".concat(_this3.dailyTime[x].timeframes.monthly.current, "hrs");
        x++;
      });
      x = 0;
      this.previousTimeEl.forEach(function (element) {
        element.textContent = "".concat(_this3.dailyTime[x].timeframes.monthly.previous, "hrs");
        x++;
      });
    }
  }]);

  return LoadTimeframes;
}(); //loading dailyTimeframes - myData is json current time, .spent-time returns nodeList of elements that are later turned into array with forEach method inside class
//'previous-spent-time' are elements that display time we spent in previous week


var dailyTimeframes = new LoadTimeframes(myData, document.querySelectorAll(".spent-time"), document.querySelectorAll(".previous-spent-time"));
dailyTimeframes.loadDaily(); //By default daily time is loaded
//Event delegation

document.querySelector(".card-time").addEventListener("click", function (event) {
  if (event.target.classList.contains("daily")) {
    dailyTimeframes.loadDaily();
  } else if (event.target.classList.contains("weekly")) {
    dailyTimeframes.loadWeekly();
  } else if (event.target.classList.contains("monthly")) {
    dailyTimeframes.loadMonthly();
  }

  event.stopPropagation();
});
},{"./data.json":"src/javascript/data.json"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33495" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/javascript/script.js"], null)
//# sourceMappingURL=/script.923e9c54.js.map