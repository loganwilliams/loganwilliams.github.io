/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/graphology-utils/is-graph.js":
/*!***************************************************!*\
  !*** ./node_modules/graphology-utils/is-graph.js ***!
  \***************************************************/
/***/ ((module) => {

/**
 * Graphology isGraph
 * ===================
 *
 * Very simple function aiming at ensuring the given variable is a
 * graphology instance.
 */

/**
 * Checking the value is a graphology instance.
 *
 * @param  {any}     value - Target value.
 * @return {boolean}
 */
module.exports = function isGraph(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.addUndirectedEdgeWithKey === 'function' &&
    typeof value.dropNode === 'function' &&
    typeof value.multi === 'boolean'
  );
};


/***/ }),

/***/ "./node_modules/graphology/dist/graphology.umd.min.js":
/*!************************************************************!*\
  !*** ./node_modules/graphology/dist/graphology.umd.min.js ***!
  \************************************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,r(t,e)}function n(t){return n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(t)}function r(t,e){return r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(t,e)}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function o(t,e,n){return o=i()?Reflect.construct:function(t,e,n){var i=[null];i.push.apply(i,e);var o=new(Function.bind.apply(t,i));return n&&r(o,n.prototype),o},o.apply(null,arguments)}function a(t){var e="function"==typeof Map?new Map:void 0;return a=function(t){if(null===t||(i=t,-1===Function.toString.call(i).indexOf("[native code]")))return t;var i;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,a)}function a(){return o(t,arguments,n(this).constructor)}return a.prototype=Object.create(t.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),r(a,t)},a(t)}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var c=function(){for(var t=arguments[0],e=1,n=arguments.length;e<n;e++)if(arguments[e])for(var r in arguments[e])t[r]=arguments[e][r];return t};function d(t,e,n,r){var i=t._nodes.get(e),o=null;return i?o="mixed"===r?i.out&&i.out[n]||i.undirected&&i.undirected[n]:"directed"===r?i.out&&i.out[n]:i.undirected&&i.undirected[n]:o}function s(e){return null!==e&&"object"===t(e)&&"function"==typeof e.addUndirectedEdgeWithKey&&"function"==typeof e.dropNode}function h(e){return"object"===t(e)&&null!==e&&e.constructor===Object}function f(t){var e;for(e in t)return!1;return!0}function p(t,e,n){Object.defineProperty(t,e,{enumerable:!1,configurable:!1,writable:!0,value:n})}function l(t,e,n){var r={enumerable:!0,configurable:!0};"function"==typeof n?r.get=n:(r.value=n,r.writable=!1),Object.defineProperty(t,e,r)}function g(t){return!!h(t)&&!(t.attributes&&!Array.isArray(t.attributes))}"function"==typeof Object.assign&&(c=Object.assign);var y,v={exports:{}},b="object"==typeof Reflect?Reflect:null,w=b&&"function"==typeof b.apply?b.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)};y=b&&"function"==typeof b.ownKeys?b.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var m=Number.isNaN||function(t){return t!=t};function _(){_.init.call(this)}v.exports=_,v.exports.once=function(t,e){return new Promise((function(n,r){function i(n){t.removeListener(e,o),r(n)}function o(){"function"==typeof t.removeListener&&t.removeListener("error",i),n([].slice.call(arguments))}U(t,e,o,{once:!0}),"error"!==e&&function(t,e,n){"function"==typeof t.on&&U(t,"error",e,n)}(t,i,{once:!0})}))},_.EventEmitter=_,_.prototype._events=void 0,_.prototype._eventsCount=0,_.prototype._maxListeners=void 0;var k=10;function G(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function x(t){return void 0===t._maxListeners?_.defaultMaxListeners:t._maxListeners}function E(t,e,n,r){var i,o,a,u;if(G(n),void 0===(o=t._events)?(o=t._events=Object.create(null),t._eventsCount=0):(void 0!==o.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),o=t._events),a=o[e]),void 0===a)a=o[e]=n,++t._eventsCount;else if("function"==typeof a?a=o[e]=r?[n,a]:[a,n]:r?a.unshift(n):a.push(n),(i=x(t))>0&&a.length>i&&!a.warned){a.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=t,c.type=e,c.count=a.length,u=c,console&&console.warn&&console.warn(u)}return t}function S(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function A(t,e,n){var r={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},i=S.bind(r);return i.listener=n,r.wrapFn=i,i}function L(t,e,n){var r=t._events;if(void 0===r)return[];var i=r[e];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}(i):N(i,i.length)}function D(t){var e=this._events;if(void 0!==e){var n=e[t];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function N(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t[r];return n}function U(t,e,n,r){if("function"==typeof t.on)r.once?t.once(e,n):t.on(e,n);else{if("function"!=typeof t.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t);t.addEventListener(e,(function i(o){r.once&&t.removeEventListener(e,i),n(o)}))}}function j(t){if("function"!=typeof t)throw new Error("obliterator/iterator: expecting a function!");this.next=t}Object.defineProperty(_,"defaultMaxListeners",{enumerable:!0,get:function(){return k},set:function(t){if("number"!=typeof t||t<0||m(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");k=t}}),_.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},_.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||m(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},_.prototype.getMaxListeners=function(){return x(this)},_.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var r="error"===t,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var o;if(e.length>0&&(o=e[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var u=i[t];if(void 0===u)return!1;if("function"==typeof u)w(u,this,e);else{var c=u.length,d=N(u,c);for(n=0;n<c;++n)w(d[n],this,e)}return!0},_.prototype.addListener=function(t,e){return E(this,t,e,!1)},_.prototype.on=_.prototype.addListener,_.prototype.prependListener=function(t,e){return E(this,t,e,!0)},_.prototype.once=function(t,e){return G(e),this.on(t,A(this,t,e)),this},_.prototype.prependOnceListener=function(t,e){return G(e),this.prependListener(t,A(this,t,e)),this},_.prototype.removeListener=function(t,e){var n,r,i,o,a;if(G(e),void 0===(r=this._events))return this;if(void 0===(n=r[t]))return this;if(n===e||n.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete r[t],r.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!=typeof n){for(i=-1,o=n.length-1;o>=0;o--)if(n[o]===e||n[o].listener===e){a=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(n,i),1===n.length&&(r[t]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",t,a||e)}return this},_.prototype.off=_.prototype.removeListener,_.prototype.removeAllListeners=function(t){var e,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[t]),this;if(0===arguments.length){var i,o=Object.keys(n);for(r=0;r<o.length;++r)"removeListener"!==(i=o[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=n[t]))this.removeListener(t,e);else if(void 0!==e)for(r=e.length-1;r>=0;r--)this.removeListener(t,e[r]);return this},_.prototype.listeners=function(t){return L(this,t,!0)},_.prototype.rawListeners=function(t){return L(this,t,!1)},_.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):D.call(t,e)},_.prototype.listenerCount=D,_.prototype.eventNames=function(){return this._eventsCount>0?y(this._events):[]},"undefined"!=typeof Symbol&&(j.prototype[Symbol.iterator]=function(){return this}),j.of=function(){var t=arguments,e=t.length,n=0;return new j((function(){return n>=e?{done:!0}:{done:!1,value:t[n++]}}))},j.empty=function(){return new j((function(){return{done:!0}}))},j.fromSequence=function(t){var e=0,n=t.length;return new j((function(){return e>=n?{done:!0}:{done:!1,value:t[e++]}}))},j.is=function(t){return t instanceof j||"object"==typeof t&&null!==t&&"function"==typeof t.next};var O=j,C={};C.ARRAY_BUFFER_SUPPORT="undefined"!=typeof ArrayBuffer,C.SYMBOL_SUPPORT="undefined"!=typeof Symbol;var z=O,M=C,P=M.ARRAY_BUFFER_SUPPORT,T=M.SYMBOL_SUPPORT;var R=function(t){var e=function(t){return"string"==typeof t||Array.isArray(t)||P&&ArrayBuffer.isView(t)?z.fromSequence(t):"object"!=typeof t||null===t?null:T&&"function"==typeof t[Symbol.iterator]?t[Symbol.iterator]():"function"==typeof t.next?t:null}(t);if(!e)throw new Error("obliterator: target is not iterable nor a valid iterator.");return e},W=R,K=function(t,e){for(var n,r=arguments.length>1?e:1/0,i=r!==1/0?new Array(r):[],o=0,a=W(t);;){if(o===r)return i;if((n=a.next()).done)return o!==e&&(i.length=o),i;i[o++]=n.value}},I=function(t){function n(e){var n;return(n=t.call(this)||this).name="GraphError",n.message=e,n}return e(n,t),n}(a(Error)),F=function(t){function n(e){var r;return(r=t.call(this,e)||this).name="InvalidArgumentsGraphError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(u(r),n.prototype.constructor),r}return e(n,t),n}(I),Y=function(t){function n(e){var r;return(r=t.call(this,e)||this).name="NotFoundGraphError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(u(r),n.prototype.constructor),r}return e(n,t),n}(I),B=function(t){function n(e){var r;return(r=t.call(this,e)||this).name="UsageGraphError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(u(r),n.prototype.constructor),r}return e(n,t),n}(I);function q(t,e){this.key=t,this.attributes=e,this.clear()}function J(t,e){this.key=t,this.attributes=e,this.clear()}function V(t,e){this.key=t,this.attributes=e,this.clear()}function H(t,e,n,r,i){this.key=e,this.attributes=i,this.undirected=t,this.source=n,this.target=r}function Q(t,e,n,r,i,o,a){var u,c,d="out",s="in";if(e&&(d=s="undirected"),t.multi){if(void 0===(c=(u=o[d])[i])&&(c=new Set,u[i]=c),c.add(n),r===i&&e)return;void 0===(u=a[s])[r]&&(u[r]=c)}else{if(o[d][i]=n,r===i&&e)return;a[s][r]=n}}function X(t,e,n){var r=t.multi,i=n.source,o=n.target,a=i.key,u=o.key,c=i[e?"undirected":"out"],d=e?"undirected":"in";if(u in c)if(r){var s=c[u];1===s.size?(delete c[u],delete o[d][a]):s.delete(n)}else delete c[u];r||delete o[d][a]}q.prototype.clear=function(){this.inDegree=0,this.outDegree=0,this.undirectedDegree=0,this.directedSelfLoops=0,this.undirectedSelfLoops=0,this.in={},this.out={},this.undirected={}},J.prototype.clear=function(){this.inDegree=0,this.outDegree=0,this.directedSelfLoops=0,this.in={},this.out={}},J.prototype.upgradeToMixed=function(){this.undirectedDegree=0,this.undirectedSelfLoops=0,this.undirected={}},V.prototype.clear=function(){this.undirectedDegree=0,this.undirectedSelfLoops=0,this.undirected={}},V.prototype.upgradeToMixed=function(){this.inDegree=0,this.outDegree=0,this.directedSelfLoops=0,this.in={},this.out={}};function Z(t,e,n,r,i,o,a){var u,c,d,s;if(r=""+r,0===n){if(!(u=t._nodes.get(r)))throw new Y("Graph.".concat(e,': could not find the "').concat(r,'" node in the graph.'));d=i,s=o}else if(3===n){if(i=""+i,!(c=t._edges.get(i)))throw new Y("Graph.".concat(e,': could not find the "').concat(i,'" edge in the graph.'));var h=c.source.key,f=c.target.key;if(r===h)u=c.target;else{if(r!==f)throw new Y("Graph.".concat(e,': the "').concat(r,'" node is not attached to the "').concat(i,'" edge (').concat(h,", ").concat(f,")."));u=c.source}d=o,s=a}else{if(!(c=t._edges.get(r)))throw new Y("Graph.".concat(e,': could not find the "').concat(r,'" edge in the graph.'));u=1===n?c.source:c.target,d=i,s=o}return[u,d,s]}var $=[{name:function(t){return"get".concat(t,"Attribute")},attacher:function(t,e,n){t.prototype[e]=function(t,r,i){var o=Z(this,e,n,t,r,i),a=o[0],u=o[1];return a.attributes[u]}}},{name:function(t){return"get".concat(t,"Attributes")},attacher:function(t,e,n){t.prototype[e]=function(t,r){return Z(this,e,n,t,r)[0].attributes}}},{name:function(t){return"has".concat(t,"Attribute")},attacher:function(t,e,n){t.prototype[e]=function(t,r,i){var o=Z(this,e,n,t,r,i),a=o[0],u=o[1];return a.attributes.hasOwnProperty(u)}}},{name:function(t){return"set".concat(t,"Attribute")},attacher:function(t,e,n){t.prototype[e]=function(t,r,i,o){var a=Z(this,e,n,t,r,i,o),u=a[0],c=a[1],d=a[2];return u.attributes[c]=d,this.emit("nodeAttributesUpdated",{key:u.key,type:"set",attributes:u.attributes,name:c}),this}}},{name:function(t){return"update".concat(t,"Attribute")},attacher:function(t,e,n){t.prototype[e]=function(t,r,i,o){var a=Z(this,e,n,t,r,i,o),u=a[0],c=a[1],d=a[2];if("function"!=typeof d)throw new F("Graph.".concat(e,": updater should be a function."));var s=u.attributes,h=d(s[c]);return s[c]=h,this.emit("nodeAttributesUpdated",{key:u.key,type:"set",attributes:u.attributes,name:c}),this}}},{name:function(t){return"remove".concat(t,"Attribute")},attacher:function(t,e,n){t.prototype[e]=function(t,r,i){var o=Z(this,e,n,t,r,i),a=o[0],u=o[1];return delete a.attributes[u],this.emit("nodeAttributesUpdated",{key:a.key,type:"remove",attributes:a.attributes,name:u}),this}}},{name:function(t){return"replace".concat(t,"Attributes")},attacher:function(t,e,n){t.prototype[e]=function(t,r,i){var o=Z(this,e,n,t,r,i),a=o[0],u=o[1];if(!h(u))throw new F("Graph.".concat(e,": provided attributes are not a plain object."));return a.attributes=u,this.emit("nodeAttributesUpdated",{key:a.key,type:"replace",attributes:a.attributes}),this}}},{name:function(t){return"merge".concat(t,"Attributes")},attacher:function(t,e,n){t.prototype[e]=function(t,r,i){var o=Z(this,e,n,t,r,i),a=o[0],u=o[1];if(!h(u))throw new F("Graph.".concat(e,": provided attributes are not a plain object."));return c(a.attributes,u),this.emit("nodeAttributesUpdated",{key:a.key,type:"merge",attributes:a.attributes,data:u}),this}}},{name:function(t){return"update".concat(t,"Attributes")},attacher:function(t,e,n){t.prototype[e]=function(t,r,i){var o=Z(this,e,n,t,r,i),a=o[0],u=o[1];if("function"!=typeof u)throw new F("Graph.".concat(e,": provided updater is not a function."));return a.attributes=u(a.attributes),this.emit("nodeAttributesUpdated",{key:a.key,type:"update",attributes:a.attributes}),this}}}];var tt=[{name:function(t){return"get".concat(t,"Attribute")},attacher:function(t,e,n){t.prototype[e]=function(t,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new B("Graph.".concat(e,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new B("Graph.".concat(e,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+t,a=""+r;if(r=arguments[2],!(i=d(this,o,a,n)))throw new Y("Graph.".concat(e,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(t=""+t,!(i=this._edges.get(t)))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" edge in the graph.'));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" ').concat(n," edge in the graph."));return i.attributes[r]}}},{name:function(t){return"get".concat(t,"Attributes")},attacher:function(t,e,n){t.prototype[e]=function(t){var r;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new B("Graph.".concat(e,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>1){if(this.multi)throw new B("Graph.".concat(e,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var i=""+t,o=""+arguments[1];if(!(r=d(this,i,o,n)))throw new Y("Graph.".concat(e,': could not find an edge for the given path ("').concat(i,'" - "').concat(o,'").'))}else if(t=""+t,!(r=this._edges.get(t)))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" edge in the graph.'));if("mixed"!==n&&r.undirected!==("undirected"===n))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" ').concat(n," edge in the graph."));return r.attributes}}},{name:function(t){return"has".concat(t,"Attribute")},attacher:function(t,e,n){t.prototype[e]=function(t,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new B("Graph.".concat(e,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new B("Graph.".concat(e,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+t,a=""+r;if(r=arguments[2],!(i=d(this,o,a,n)))throw new Y("Graph.".concat(e,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(t=""+t,!(i=this._edges.get(t)))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" edge in the graph.'));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" ').concat(n," edge in the graph."));return i.attributes.hasOwnProperty(r)}}},{name:function(t){return"set".concat(t,"Attribute")},attacher:function(t,e,n){t.prototype[e]=function(t,r,i){var o;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new B("Graph.".concat(e,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>3){if(this.multi)throw new B("Graph.".concat(e,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var a=""+t,u=""+r;if(r=arguments[2],i=arguments[3],!(o=d(this,a,u,n)))throw new Y("Graph.".concat(e,': could not find an edge for the given path ("').concat(a,'" - "').concat(u,'").'))}else if(t=""+t,!(o=this._edges.get(t)))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" edge in the graph.'));if("mixed"!==n&&o.undirected!==("undirected"===n))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" ').concat(n," edge in the graph."));return o.attributes[r]=i,this.emit("edgeAttributesUpdated",{key:o.key,type:"set",attributes:o.attributes,name:r}),this}}},{name:function(t){return"update".concat(t,"Attribute")},attacher:function(t,e,n){t.prototype[e]=function(t,r,i){var o;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new B("Graph.".concat(e,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>3){if(this.multi)throw new B("Graph.".concat(e,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var a=""+t,u=""+r;if(r=arguments[2],i=arguments[3],!(o=d(this,a,u,n)))throw new Y("Graph.".concat(e,': could not find an edge for the given path ("').concat(a,'" - "').concat(u,'").'))}else if(t=""+t,!(o=this._edges.get(t)))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" edge in the graph.'));if("function"!=typeof i)throw new F("Graph.".concat(e,": updater should be a function."));if("mixed"!==n&&o.undirected!==("undirected"===n))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" ').concat(n," edge in the graph."));return o.attributes[r]=i(o.attributes[r]),this.emit("edgeAttributesUpdated",{key:o.key,type:"set",attributes:o.attributes,name:r}),this}}},{name:function(t){return"remove".concat(t,"Attribute")},attacher:function(t,e,n){t.prototype[e]=function(t,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new B("Graph.".concat(e,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new B("Graph.".concat(e,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+t,a=""+r;if(r=arguments[2],!(i=d(this,o,a,n)))throw new Y("Graph.".concat(e,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(t=""+t,!(i=this._edges.get(t)))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" edge in the graph.'));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" ').concat(n," edge in the graph."));return delete i.attributes[r],this.emit("edgeAttributesUpdated",{key:i.key,type:"remove",attributes:i.attributes,name:r}),this}}},{name:function(t){return"replace".concat(t,"Attributes")},attacher:function(t,e,n){t.prototype[e]=function(t,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new B("Graph.".concat(e,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new B("Graph.".concat(e,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+t,a=""+r;if(r=arguments[2],!(i=d(this,o,a,n)))throw new Y("Graph.".concat(e,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(t=""+t,!(i=this._edges.get(t)))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" edge in the graph.'));if(!h(r))throw new F("Graph.".concat(e,": provided attributes are not a plain object."));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" ').concat(n," edge in the graph."));return i.attributes=r,this.emit("edgeAttributesUpdated",{key:i.key,type:"replace",attributes:i.attributes}),this}}},{name:function(t){return"merge".concat(t,"Attributes")},attacher:function(t,e,n){t.prototype[e]=function(t,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new B("Graph.".concat(e,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new B("Graph.".concat(e,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+t,a=""+r;if(r=arguments[2],!(i=d(this,o,a,n)))throw new Y("Graph.".concat(e,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(t=""+t,!(i=this._edges.get(t)))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" edge in the graph.'));if(!h(r))throw new F("Graph.".concat(e,": provided attributes are not a plain object."));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" ').concat(n," edge in the graph."));return c(i.attributes,r),this.emit("edgeAttributesUpdated",{key:i.key,type:"merge",attributes:i.attributes,data:r}),this}}},{name:function(t){return"update".concat(t,"Attributes")},attacher:function(t,e,n){t.prototype[e]=function(t,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new B("Graph.".concat(e,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new B("Graph.".concat(e,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+t,a=""+r;if(r=arguments[2],!(i=d(this,o,a,n)))throw new Y("Graph.".concat(e,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(t=""+t,!(i=this._edges.get(t)))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" edge in the graph.'));if("function"!=typeof r)throw new F("Graph.".concat(e,": provided updater is not a function."));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new Y("Graph.".concat(e,': could not find the "').concat(t,'" ').concat(n," edge in the graph."));return i.attributes=r(i.attributes),this.emit("edgeAttributesUpdated",{key:i.key,type:"update",attributes:i.attributes}),this}}}];var et=O,nt=R,rt=function(){var t=arguments,e=null,n=-1;return new et((function r(){if(null===e){if(++n>=t.length)return{done:!0};e=nt(t[n])}var i=e.next();return i.done?(e=null,r()):i}))},it=[{name:"edges",type:"mixed"},{name:"inEdges",type:"directed",direction:"in"},{name:"outEdges",type:"directed",direction:"out"},{name:"inboundEdges",type:"mixed",direction:"in"},{name:"outboundEdges",type:"mixed",direction:"out"},{name:"directedEdges",type:"directed"},{name:"undirectedEdges",type:"undirected"}];function ot(t,e){for(var n in e)t.push(e[n].key)}function at(t,e){for(var n in e)e[n].forEach((function(e){return t.push(e.key)}))}function ut(t,e,n){for(var r in t)if(r!==n){var i=t[r];e(i.key,i.attributes,i.source.key,i.target.key,i.source.attributes,i.target.attributes,i.undirected)}}function ct(t,e,n){for(var r in t)r!==n&&t[r].forEach((function(t){return e(t.key,t.attributes,t.source.key,t.target.key,t.source.attributes,t.target.attributes,t.undirected)}))}function dt(t,e,n){for(var r in t)if(r!==n){var i=t[r];if(e(i.key,i.attributes,i.source.key,i.target.key,i.source.attributes,i.target.attributes,i.undirected))return i.key}}function st(t,e,n){var r,i,o,a,u;for(var c in t)if(c!==n)for(r=t[c].values();!0!==(i=r.next()).done;)if(a=(o=i.value).source,u=o.target,e(o.key,o.attributes,a.key,u.key,a.attributes,u.attributes,o.undirected))return o.key}function ht(t,e){var n=Object.keys(t),r=n.length,i=null,o=0;return new O((function a(){var u;if(i){var c=i.next();if(c.done)return i=null,o++,a();u=c.value}else{if(o>=r)return{done:!0};var d=n[o];if(d===e)return o++,a();if((u=t[d])instanceof Set)return i=u.values(),a();o++}return{done:!1,value:{edge:u.key,attributes:u.attributes,source:u.source.key,target:u.target.key,sourceAttributes:u.source.attributes,targetAttributes:u.target.attributes,undirected:u.undirected}}}))}function ft(t,e,n){var r=e[n];r&&t.push(r.key)}function pt(t,e,n){var r=e[n];r&&r.forEach((function(e){return t.push(e.key)}))}function lt(t,e,n){var r=t[e];if(r){var i=r.source,o=r.target;n(r.key,r.attributes,i.key,o.key,i.attributes,o.attributes,r.undirected)}}function gt(t,e,n){var r=t[e];r&&r.forEach((function(t){return n(t.key,t.attributes,t.source.key,t.target.key,t.source.attributes,t.target.attributes,t.undirected)}))}function yt(t,e,n){var r=t[e];if(r){var i=r.source,o=r.target;return n(r.key,r.attributes,i.key,o.key,i.attributes,o.attributes,r.undirected)?r.key:void 0}}function vt(t,e,n){var r=t[e];if(r)for(var i,o,a=r.values();!0!==(i=a.next()).done;)if(n((o=i.value).key,o.attributes,o.source.key,o.target.key,o.source.attributes,o.target.attributes,o.undirected))return o.key}function bt(t,e){var n=t[e];if(n instanceof Set){var r=n.values();return new O((function(){var t=r.next();if(t.done)return t;var e=t.value;return{done:!1,value:{edge:e.key,attributes:e.attributes,source:e.source.key,target:e.target.key,sourceAttributes:e.source.attributes,targetAttributes:e.target.attributes,undirected:e.undirected}}}))}return O.of([n.key,n.attributes,n.source.key,n.target.key,n.source.attributes,n.target.attributes])}function wt(t,e){if(0===t.size)return[];if("mixed"===e||e===t.type)return"function"==typeof Array.from?Array.from(t._edges.keys()):K(t._edges.keys(),t._edges.size);for(var n,r,i="undirected"===e?t.undirectedSize:t.directedSize,o=new Array(i),a="undirected"===e,u=t._edges.values(),c=0;!0!==(n=u.next()).done;)(r=n.value).undirected===a&&(o[c++]=r.key);return o}function mt(t,e,n){if(0!==t.size)for(var r,i,o="mixed"!==e&&e!==t.type,a="undirected"===e,u=t._edges.values();!0!==(r=u.next()).done;)if(i=r.value,!o||i.undirected===a){var c=i,d=c.key,s=c.attributes,h=c.source,f=c.target;n(d,s,h.key,f.key,h.attributes,f.attributes,i.undirected)}}function _t(t,e,n){if(0!==t.size)for(var r,i,o="mixed"!==e&&e!==t.type,a="undirected"===e,u=t._edges.values();!0!==(r=u.next()).done;)if(i=r.value,!o||i.undirected===a){var c=i,d=c.key,s=c.attributes,h=c.source,f=c.target;if(n(d,s,h.key,f.key,h.attributes,f.attributes,i.undirected))return d}}function kt(t,e){if(0===t.size)return O.empty();var n="mixed"!==e&&e!==t.type,r="undirected"===e,i=t._edges.values();return new O((function(){for(var t,e;;){if((t=i.next()).done)return t;if(e=t.value,!n||e.undirected===r)break}return{value:{edge:e.key,attributes:e.attributes,source:e.source.key,target:e.target.key,sourceAttributes:e.source.attributes,targetAttributes:e.target.attributes,undirected:e.undirected},done:!1}}))}function Gt(t,e,n,r){var i=[],o=t?at:ot;return"undirected"!==e&&("out"!==n&&o(i,r.in),"in"!==n&&o(i,r.out),!n&&r.directedSelfLoops>0&&i.splice(i.lastIndexOf(r.key),1)),"directed"!==e&&o(i,r.undirected),i}function xt(t,e,n,r,i){var o=t?ct:ut;"undirected"!==e&&("out"!==n&&o(r.in,i),"in"!==n&&o(r.out,i,n?null:r.key)),"directed"!==e&&o(r.undirected,i)}function Et(t,e,n,r,i){var o,a=t?st:dt;if("undirected"!==e){if("out"!==n&&(o=a(r.in,i)))return o;if("in"!==n&&(o=a(r.out,i,n?null:r.key)))return o}if("directed"!==e&&(o=a(r.undirected,i)))return o}function St(t,e,n){var r=O.empty();return"undirected"!==t&&("out"!==e&&void 0!==n.in&&(r=rt(r,ht(n.in))),"in"!==e&&void 0!==n.out&&(r=rt(r,ht(n.out,e?null:n.key)))),"directed"!==t&&void 0!==n.undirected&&(r=rt(r,ht(n.undirected))),r}function At(t,e,n,r,i){var o=e?pt:ft,a=[];return"undirected"!==t&&(void 0!==r.in&&"out"!==n&&o(a,r.in,i),void 0!==r.out&&"in"!==n&&o(a,r.out,i),!n&&r.directedSelfLoops>0&&a.splice(a.lastIndexOf(r.key),1)),"directed"!==t&&void 0!==r.undirected&&o(a,r.undirected,i),a}function Lt(t,e,n,r,i,o){var a=e?gt:lt;"undirected"!==t&&(void 0!==r.in&&"out"!==n&&a(r.in,i,o),r.key!==i&&void 0!==r.out&&"in"!==n&&a(r.out,i,o)),"directed"!==t&&void 0!==r.undirected&&a(r.undirected,i,o)}function Dt(t,e,n,r,i,o){var a,u=e?vt:yt;if("undirected"!==t){if(void 0!==r.in&&"out"!==n&&(a=u(r.in,i,o)))return a;if(r.key!==i&&void 0!==r.out&&"in"!==n&&(a=u(r.out,i,o,n?null:r.key)))return a}if("directed"!==t&&void 0!==r.undirected&&(a=u(r.undirected,i,o)))return a}function Nt(t,e,n,r){var i=O.empty();return"undirected"!==t&&(void 0!==n.in&&"out"!==e&&r in n.in&&(i=rt(i,bt(n.in,r))),void 0!==n.out&&"in"!==e&&r in n.out&&(i=rt(i,bt(n.out,r)))),"directed"!==t&&void 0!==n.undirected&&r in n.undirected&&(i=rt(i,bt(n.undirected,r))),i}var Ut=[{name:"neighbors",type:"mixed"},{name:"inNeighbors",type:"directed",direction:"in"},{name:"outNeighbors",type:"directed",direction:"out"},{name:"inboundNeighbors",type:"mixed",direction:"in"},{name:"outboundNeighbors",type:"mixed",direction:"out"},{name:"directedNeighbors",type:"directed"},{name:"undirectedNeighbors",type:"undirected"}];function jt(t,e){if(void 0!==e)for(var n in e)t.add(n)}function Ot(t,e,n){for(var r in e){var i=e[r];i instanceof Set&&(i=i.values().next().value);var o=i.source,a=i.target,u=o===t?a:o;n(u.key,u.attributes)}}function Ct(t,e,n,r){for(var i in n){var o=n[i];o instanceof Set&&(o=o.values().next().value);var a=o.source,u=o.target,c=a===e?u:a;t.has(c.key)||(t.add(c.key),r(c.key,c.attributes))}}function zt(t,e,n){for(var r in e){var i=e[r];i instanceof Set&&(i=i.values().next().value);var o=i.source,a=i.target,u=o===t?a:o;if(n(u.key,u.attributes))return u.key}}function Mt(t,e,n,r){for(var i in n){var o=n[i];o instanceof Set&&(o=o.values().next().value);var a=o.source,u=o.target,c=a===e?u:a;if(!t.has(c.key))if(t.add(c.key),r(c.key,c.attributes))return c.key}}function Pt(t,e){var n=Object.keys(e),r=n.length,i=0;return new O((function(){if(i>=r)return{done:!0};var o=e[n[i++]];o instanceof Set&&(o=o.values().next().value);var a=o.source,u=o.target,c=a===t?u:a;return{done:!1,value:{neighbor:c.key,attributes:c.attributes}}}))}function Tt(t,e,n){var r=Object.keys(n),i=r.length,o=0;return new O((function a(){if(o>=i)return{done:!0};var u=n[r[o++]];u instanceof Set&&(u=u.values().next().value);var c=u.source,d=u.target,s=c===e?d:c;return t.has(s.key)?a():(t.add(s.key),{done:!1,value:{neighbor:s.key,attributes:s.attributes}})}))}function Rt(t,e){var n=e.name,r=e.type,i=e.direction;t.prototype[n]=function(t){if("mixed"!==r&&"mixed"!==this.type&&r!==this.type)return[];t=""+t;var e=this._nodes.get(t);if(void 0===e)throw new Y("Graph.".concat(n,': could not find the "').concat(t,'" node in the graph.'));return function(t,e,n){if("mixed"!==t){if("undirected"===t)return Object.keys(n.undirected);if("string"==typeof e)return Object.keys(n[e])}var r=new Set;return"undirected"!==t&&("out"!==e&&jt(r,n.in),"in"!==e&&jt(r,n.out)),"directed"!==t&&jt(r,n.undirected),K(r.values(),r.size)}("mixed"===r?this.type:r,i,e)}}function Wt(t,e){var n=e.name,r=e.type,i=e.direction,o="forEach"+n[0].toUpperCase()+n.slice(1,-1);t.prototype[o]=function(t,e){if("mixed"===r||"mixed"===this.type||r===this.type){t=""+t;var n=this._nodes.get(t);if(void 0===n)throw new Y("Graph.".concat(o,': could not find the "').concat(t,'" node in the graph.'));!function(t,e,n,r){if("mixed"!==t){if("undirected"===t)return Ot(n,n.undirected,r);if("string"==typeof e)return Ot(n,n[e],r)}var i=new Set;"undirected"!==t&&("out"!==e&&Ct(i,n,n.in,r),"in"!==e&&Ct(i,n,n.out,r)),"directed"!==t&&Ct(i,n,n.undirected,r)}("mixed"===r?this.type:r,i,n,e)}};var a="map"+n[0].toUpperCase()+n.slice(1);t.prototype[a]=function(t,e){var n=[];return this[o](t,(function(t,r){n.push(e(t,r))})),n};var u="filter"+n[0].toUpperCase()+n.slice(1);t.prototype[u]=function(t,e){var n=[];return this[o](t,(function(t,r){e(t,r)&&n.push(t)})),n};var c="reduce"+n[0].toUpperCase()+n.slice(1);t.prototype[c]=function(t,e,n){if(arguments.length<3)throw new F("Graph.".concat(c,": missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array."));var r=n;return this[o](t,(function(t,n){r=e(r,t,n)})),r}}function Kt(t,e){var n=e.name,r=e.type,i=e.direction,o=n[0].toUpperCase()+n.slice(1,-1),a="find"+o;t.prototype[a]=function(t,e){if("mixed"===r||"mixed"===this.type||r===this.type){t=""+t;var n=this._nodes.get(t);if(void 0===n)throw new Y("Graph.".concat(a,': could not find the "').concat(t,'" node in the graph.'));return function(t,e,n,r){if("mixed"!==t){if("undirected"===t)return zt(n,n.undirected,r);if("string"==typeof e)return zt(n,n[e],r)}var i,o=new Set;if("undirected"!==t){if("out"!==e&&(i=Mt(o,n,n.in,r)))return i;if("in"!==e&&(i=Mt(o,n,n.out,r)))return i}if("directed"!==t&&(i=Mt(o,n,n.undirected,r)))return i}("mixed"===r?this.type:r,i,n,e)}};var u="some"+o;t.prototype[u]=function(t,e){return!!this[a](t,e)};var c="every"+o;t.prototype[c]=function(t,e){return!this[a](t,(function(t,n){return!e(t,n)}))}}function It(t,e){var n=e.name,r=e.type,i=e.direction,o=n.slice(0,-1)+"Entries";t.prototype[o]=function(t){if("mixed"!==r&&"mixed"!==this.type&&r!==this.type)return O.empty();t=""+t;var e=this._nodes.get(t);if(void 0===e)throw new Y("Graph.".concat(o,': could not find the "').concat(t,'" node in the graph.'));return function(t,e,n){if("mixed"!==t){if("undirected"===t)return Pt(n,n.undirected);if("string"==typeof e)return Pt(n,n[e])}var r=O.empty(),i=new Set;return"undirected"!==t&&("out"!==e&&(r=rt(r,Tt(i,n,n.in))),"in"!==e&&(r=rt(r,Tt(i,n,n.out)))),"directed"!==t&&(r=rt(r,Tt(i,n,n.undirected))),r}("mixed"===r?this.type:r,i,e)}}function Ft(t,e,n,r,i){for(var o,a,u,c,d,s,h,f=r._nodes.values(),p=r.type;!0!==(o=f.next()).done;){var l=!1;if(a=o.value,"undirected"!==p)for(u in c=a.out)if(s=(d=c[u]).target,l=!0,h=i(a.key,s.key,a.attributes,s.attributes,d.key,d.attributes,d.undirected),t&&h)return d;if("directed"!==p)for(u in c=a.undirected)if(!(e&&a.key>u)&&((s=(d=c[u]).target).key!==u&&(s=d.source),l=!0,h=i(a.key,s.key,a.attributes,s.attributes,d.key,d.attributes,d.undirected),t&&h))return d;if(n&&!l&&(h=i(a.key,null,a.attributes,null,null,null,null),t&&h))return null}}function Yt(t,e,n,r,i){for(var o,a,u,c,d,s,h,f,p,l=r._nodes.values(),g=r.type;!0!==(o=l.next()).done;){var y=!1;if(a=o.value,"undirected"!==g)for(u in s=a.out)for(c=s[u].values();!0!==(d=c.next()).done;)if(f=(h=d.value).target,y=!0,p=i(a.key,f.key,a.attributes,f.attributes,h.key,h.attributes,h.undirected),t&&p)return h;if("directed"!==g)for(u in s=a.undirected)if(!(e&&a.key>u))for(c=s[u].values();!0!==(d=c.next()).done;)if((f=(h=d.value).target).key!==u&&(f=h.source),y=!0,p=i(a.key,f.key,a.attributes,f.attributes,h.key,h.attributes,h.undirected),t&&p)return h;if(n&&!y&&(p=i(a.key,null,a.attributes,null,null,null,null),t&&p))return null}}function Bt(t,e){var n={key:t};return f(e.attributes)||(n.attributes=c({},e.attributes)),n}function qt(t,e){var n={key:t,source:e.source.key,target:e.target.key};return f(e.attributes)||(n.attributes=c({},e.attributes)),e.undirected&&(n.undirected=!0),n}function Jt(t){return h(t)?"key"in t?!("attributes"in t)||h(t.attributes)&&null!==t.attributes?null:"invalid-attributes":"no-key":"not-object"}function Vt(t){return h(t)?"source"in t?"target"in t?!("attributes"in t)||h(t.attributes)&&null!==t.attributes?"undirected"in t&&"boolean"!=typeof t.undirected?"invalid-undirected":null:"invalid-attributes":"no-target":"no-source":"not-object"}var Ht,Qt=(Ht=255&Math.floor(256*Math.random()),function(){return Ht++}),Xt=new Set(["directed","undirected","mixed"]),Zt=new Set(["domain","_events","_eventsCount","_maxListeners"]),$t={allowSelfLoops:!0,multi:!1,type:"mixed"};function te(t,e,n){var r=new t.NodeDataClass(e,n);return t._nodes.set(e,r),t.emit("nodeAdded",{key:e,attributes:n}),r}function ee(t,e,n,r,i,o,a,u){if(!r&&"undirected"===t.type)throw new B("Graph.".concat(e,": you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead."));if(r&&"directed"===t.type)throw new B("Graph.".concat(e,": you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead."));if(u&&!h(u))throw new F("Graph.".concat(e,': invalid attributes. Expecting an object but got "').concat(u,'"'));if(o=""+o,a=""+a,u=u||{},!t.allowSelfLoops&&o===a)throw new B("Graph.".concat(e,': source & target are the same ("').concat(o,"\"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false."));var c=t._nodes.get(o),d=t._nodes.get(a);if(!c)throw new Y("Graph.".concat(e,': source node "').concat(o,'" not found.'));if(!d)throw new Y("Graph.".concat(e,': target node "').concat(a,'" not found.'));var s={key:null,undirected:r,source:o,target:a,attributes:u};if(n)i=t._edgeKeyGenerator();else if(i=""+i,t._edges.has(i))throw new B("Graph.".concat(e,': the "').concat(i,'" edge already exists in the graph.'));if(!t.multi&&(r?void 0!==c.undirected[a]:void 0!==c.out[a]))throw new B("Graph.".concat(e,': an edge linking "').concat(o,'" to "').concat(a,"\" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option."));var f=new H(r,i,c,d,u);return t._edges.set(i,f),o===a?r?(c.undirectedSelfLoops++,t._undirectedSelfLoopCount++):(c.directedSelfLoops++,t._directedSelfLoopCount++):r?(c.undirectedDegree++,d.undirectedDegree++):(c.outDegree++,d.inDegree++),Q(t,r,f,o,a,c,d),r?t._undirectedSize++:t._directedSize++,s.key=i,t.emit("edgeAdded",s),i}function ne(t,e,n,r,i,o,a,u,d){if(!r&&"undirected"===t.type)throw new B("Graph.".concat(e,": you cannot merge/update a directed edge to an undirected graph. Use the #.mergeEdge/#.updateEdge or #.addUndirectedEdge instead."));if(r&&"directed"===t.type)throw new B("Graph.".concat(e,": you cannot merge/update an undirected edge to a directed graph. Use the #.mergeEdge/#.updateEdge or #.addDirectedEdge instead."));if(u)if(d){if("function"!=typeof u)throw new F("Graph.".concat(e,': invalid updater function. Expecting a function but got "').concat(u,'"'))}else if(!h(u))throw new F("Graph.".concat(e,': invalid attributes. Expecting an object but got "').concat(u,'"'));var s;if(o=""+o,a=""+a,d&&(s=u,u=void 0),!t.allowSelfLoops&&o===a)throw new B("Graph.".concat(e,': source & target are the same ("').concat(o,"\"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false."));var f,p,l=t._nodes.get(o),g=t._nodes.get(a);if(!n&&(f=t._edges.get(i))){if(!(f.source.key===o&&f.target.key===a||r&&f.source.key===a&&f.target.key===o))throw new B("Graph.".concat(e,': inconsistency detected when attempting to merge the "').concat(i,'" edge with "').concat(o,'" source & "').concat(a,'" target vs. ("').concat(f.source.key,'", "').concat(f.target.key,'").'));p=f}if(p||t.multi||!l||(p=r?l.undirected[a]:l.out[a]),p){var y=[p.key,!1,!1,!1];if(d?!s:!u)return y;if(d){var v=p.attributes;p.attributes=s(v),t.emit("edgeAttributesUpdated",{type:"replace",key:p.key,attributes:p.attributes})}else c(p.attributes,u),t.emit("edgeAttributesUpdated",{type:"merge",key:p.key,attributes:p.attributes,data:u});return y}u=u||{},d&&s&&(u=s(u));var b={key:null,undirected:r,source:o,target:a,attributes:u};if(n)i=t._edgeKeyGenerator();else if(i=""+i,t._edges.has(i))throw new B("Graph.".concat(e,': the "').concat(i,'" edge already exists in the graph.'));var w=!1,m=!1;return l||(l=te(t,o,{}),w=!0,o===a&&(g=l,m=!0)),g||(g=te(t,a,{}),m=!0),f=new H(r,i,l,g,u),t._edges.set(i,f),o===a?r?(l.undirectedSelfLoops++,t._undirectedSelfLoopCount++):(l.directedSelfLoops++,t._directedSelfLoopCount++):r?(l.undirectedDegree++,g.undirectedDegree++):(l.outDegree++,g.inDegree++),Q(t,r,f,o,a,l,g),r?t._undirectedSize++:t._directedSize++,b.key=i,t.emit("edgeAdded",b),[i,!0,w,m]}var re=function(n){function r(t){var e;if(e=n.call(this)||this,"boolean"!=typeof(t=c({},$t,t)).multi)throw new F("Graph.constructor: invalid 'multi' option. Expecting a boolean but got \"".concat(t.multi,'".'));if(!Xt.has(t.type))throw new F('Graph.constructor: invalid \'type\' option. Should be one of "mixed", "directed" or "undirected" but got "'.concat(t.type,'".'));if("boolean"!=typeof t.allowSelfLoops)throw new F("Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got \"".concat(t.allowSelfLoops,'".'));var r="mixed"===t.type?q:"directed"===t.type?J:V;p(u(e),"NodeDataClass",r);var i=Qt(),o=0;return p(u(e),"_attributes",{}),p(u(e),"_nodes",new Map),p(u(e),"_edges",new Map),p(u(e),"_directedSize",0),p(u(e),"_undirectedSize",0),p(u(e),"_directedSelfLoopCount",0),p(u(e),"_undirectedSelfLoopCount",0),p(u(e),"_edgeKeyGenerator",(function(){var t;do{t="geid_"+i+"_"+o++}while(e._edges.has(t));return t})),p(u(e),"_options",t),Zt.forEach((function(t){return p(u(e),t,e[t])})),l(u(e),"order",(function(){return e._nodes.size})),l(u(e),"size",(function(){return e._edges.size})),l(u(e),"directedSize",(function(){return e._directedSize})),l(u(e),"undirectedSize",(function(){return e._undirectedSize})),l(u(e),"selfLoopCount",(function(){return e._directedSelfLoopCount+e._undirectedSelfLoopCount})),l(u(e),"directedSelfLoopCount",(function(){return e._directedSelfLoopCount})),l(u(e),"undirectedSelfLoopCount",(function(){return e._undirectedSelfLoopCount})),l(u(e),"multi",e._options.multi),l(u(e),"type",e._options.type),l(u(e),"allowSelfLoops",e._options.allowSelfLoops),l(u(e),"implementation",(function(){return"graphology"})),e}e(r,n);var i=r.prototype;return i._resetInstanceCounters=function(){this._directedSize=0,this._undirectedSize=0,this._directedSelfLoopCount=0,this._undirectedSelfLoopCount=0},i.hasNode=function(t){return this._nodes.has(""+t)},i.hasDirectedEdge=function(t,e){if("undirected"===this.type)return!1;if(1===arguments.length){var n=""+t,r=this._edges.get(n);return!!r&&!r.undirected}if(2===arguments.length){t=""+t,e=""+e;var i=this._nodes.get(t);if(!i)return!1;var o=i.out[e];return!!o&&(!this.multi||!!o.size)}throw new F("Graph.hasDirectedEdge: invalid arity (".concat(arguments.length,", instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target."))},i.hasUndirectedEdge=function(t,e){if("directed"===this.type)return!1;if(1===arguments.length){var n=""+t,r=this._edges.get(n);return!!r&&r.undirected}if(2===arguments.length){t=""+t,e=""+e;var i=this._nodes.get(t);if(!i)return!1;var o=i.undirected[e];return!!o&&(!this.multi||!!o.size)}throw new F("Graph.hasDirectedEdge: invalid arity (".concat(arguments.length,", instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target."))},i.hasEdge=function(t,e){if(1===arguments.length){var n=""+t;return this._edges.has(n)}if(2===arguments.length){t=""+t,e=""+e;var r=this._nodes.get(t);if(!r)return!1;var i=void 0!==r.out&&r.out[e];return i||(i=void 0!==r.undirected&&r.undirected[e]),!!i&&(!this.multi||!!i.size)}throw new F("Graph.hasEdge: invalid arity (".concat(arguments.length,", instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target."))},i.directedEdge=function(t,e){if("undirected"!==this.type){if(t=""+t,e=""+e,this.multi)throw new B("Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead.");var n=this._nodes.get(t);if(!n)throw new Y('Graph.directedEdge: could not find the "'.concat(t,'" source node in the graph.'));if(!this._nodes.has(e))throw new Y('Graph.directedEdge: could not find the "'.concat(e,'" target node in the graph.'));var r=n.out&&n.out[e]||void 0;return r?r.key:void 0}},i.undirectedEdge=function(t,e){if("directed"!==this.type){if(t=""+t,e=""+e,this.multi)throw new B("Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead.");var n=this._nodes.get(t);if(!n)throw new Y('Graph.undirectedEdge: could not find the "'.concat(t,'" source node in the graph.'));if(!this._nodes.has(e))throw new Y('Graph.undirectedEdge: could not find the "'.concat(e,'" target node in the graph.'));var r=n.undirected&&n.undirected[e]||void 0;return r?r.key:void 0}},i.edge=function(t,e){if(this.multi)throw new B("Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead.");t=""+t,e=""+e;var n=this._nodes.get(t);if(!n)throw new Y('Graph.edge: could not find the "'.concat(t,'" source node in the graph.'));if(!this._nodes.has(e))throw new Y('Graph.edge: could not find the "'.concat(e,'" target node in the graph.'));var r=n.out&&n.out[e]||n.undirected&&n.undirected[e]||void 0;if(r)return r.key},i.areDirectedNeighbors=function(t,e){t=""+t,e=""+e;var n=this._nodes.get(t);if(!n)throw new Y('Graph.areDirectedNeighbors: could not find the "'.concat(t,'" node in the graph.'));return"undirected"!==this.type&&(e in n.in||e in n.out)},i.areOutNeighbors=function(t,e){t=""+t,e=""+e;var n=this._nodes.get(t);if(!n)throw new Y('Graph.areOutNeighbors: could not find the "'.concat(t,'" node in the graph.'));return"undirected"!==this.type&&e in n.out},i.areInNeighbors=function(t,e){t=""+t,e=""+e;var n=this._nodes.get(t);if(!n)throw new Y('Graph.areInNeighbors: could not find the "'.concat(t,'" node in the graph.'));return"undirected"!==this.type&&e in n.in},i.areUndirectedNeighbors=function(t,e){t=""+t,e=""+e;var n=this._nodes.get(t);if(!n)throw new Y('Graph.areUndirectedNeighbors: could not find the "'.concat(t,'" node in the graph.'));return"directed"!==this.type&&e in n.undirected},i.areNeighbors=function(t,e){t=""+t,e=""+e;var n=this._nodes.get(t);if(!n)throw new Y('Graph.areNeighbors: could not find the "'.concat(t,'" node in the graph.'));return"undirected"!==this.type&&(e in n.in||e in n.out)||"directed"!==this.type&&e in n.undirected},i.areInboundNeighbors=function(t,e){t=""+t,e=""+e;var n=this._nodes.get(t);if(!n)throw new Y('Graph.areInboundNeighbors: could not find the "'.concat(t,'" node in the graph.'));return"undirected"!==this.type&&e in n.in||"directed"!==this.type&&e in n.undirected},i.areOutboundNeighbors=function(t,e){t=""+t,e=""+e;var n=this._nodes.get(t);if(!n)throw new Y('Graph.areOutboundNeighbors: could not find the "'.concat(t,'" node in the graph.'));return"undirected"!==this.type&&e in n.out||"directed"!==this.type&&e in n.undirected},i.inDegree=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.inDegree: could not find the "'.concat(t,'" node in the graph.'));return"undirected"===this.type?0:e.inDegree+e.directedSelfLoops},i.outDegree=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.outDegree: could not find the "'.concat(t,'" node in the graph.'));return"undirected"===this.type?0:e.outDegree+e.directedSelfLoops},i.directedDegree=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.directedDegree: could not find the "'.concat(t,'" node in the graph.'));if("undirected"===this.type)return 0;var n=e.directedSelfLoops;return e.inDegree+n+(e.outDegree+n)},i.undirectedDegree=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.undirectedDegree: could not find the "'.concat(t,'" node in the graph.'));if("directed"===this.type)return 0;var n=e.undirectedSelfLoops;return e.undirectedDegree+2*n},i.degree=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.degree: could not find the "'.concat(t,'" node in the graph.'));var n=0;return"directed"!==this.type&&(n+=e.undirectedDegree+2*e.undirectedSelfLoops),"undirected"!==this.type&&(n+=e.inDegree+e.outDegree+2*e.directedSelfLoops),n},i.inDegreeWithoutSelfLoops=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.inDegreeWithoutSelfLoops: could not find the "'.concat(t,'" node in the graph.'));return"undirected"===this.type?0:e.inDegree},i.outDegreeWithoutSelfLoops=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.outDegreeWithoutSelfLoops: could not find the "'.concat(t,'" node in the graph.'));return"undirected"===this.type?0:e.outDegree},i.directedDegreeWithoutSelfLoops=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.directedDegreeWithoutSelfLoops: could not find the "'.concat(t,'" node in the graph.'));return"undirected"===this.type?0:e.inDegree+e.outDegree},i.undirectedDegreeWithoutSelfLoops=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.undirectedDegreeWithoutSelfLoops: could not find the "'.concat(t,'" node in the graph.'));return"directed"===this.type?0:e.undirectedDegree},i.degreeWithoutSelfLoops=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.degreeWithoutSelfLoops: could not find the "'.concat(t,'" node in the graph.'));var n=0;return"directed"!==this.type&&(n+=e.undirectedDegree),"undirected"!==this.type&&(n+=e.inDegree+e.outDegree),n},i.source=function(t){t=""+t;var e=this._edges.get(t);if(!e)throw new Y('Graph.source: could not find the "'.concat(t,'" edge in the graph.'));return e.source.key},i.target=function(t){t=""+t;var e=this._edges.get(t);if(!e)throw new Y('Graph.target: could not find the "'.concat(t,'" edge in the graph.'));return e.target.key},i.extremities=function(t){t=""+t;var e=this._edges.get(t);if(!e)throw new Y('Graph.extremities: could not find the "'.concat(t,'" edge in the graph.'));return[e.source.key,e.target.key]},i.opposite=function(t,e){t=""+t,e=""+e;var n=this._edges.get(e);if(!n)throw new Y('Graph.opposite: could not find the "'.concat(e,'" edge in the graph.'));var r=n.source.key,i=n.target.key;if(t===r)return i;if(t===i)return r;throw new Y('Graph.opposite: the "'.concat(t,'" node is not attached to the "').concat(e,'" edge (').concat(r,", ").concat(i,")."))},i.hasExtremity=function(t,e){t=""+t,e=""+e;var n=this._edges.get(t);if(!n)throw new Y('Graph.hasExtremity: could not find the "'.concat(t,'" edge in the graph.'));return n.source.key===e||n.target.key===e},i.isUndirected=function(t){t=""+t;var e=this._edges.get(t);if(!e)throw new Y('Graph.isUndirected: could not find the "'.concat(t,'" edge in the graph.'));return e.undirected},i.isDirected=function(t){t=""+t;var e=this._edges.get(t);if(!e)throw new Y('Graph.isDirected: could not find the "'.concat(t,'" edge in the graph.'));return!e.undirected},i.isSelfLoop=function(t){t=""+t;var e=this._edges.get(t);if(!e)throw new Y('Graph.isSelfLoop: could not find the "'.concat(t,'" edge in the graph.'));return e.source===e.target},i.addNode=function(t,e){var n=function(t,e,n){if(n&&!h(n))throw new F('Graph.addNode: invalid attributes. Expecting an object but got "'.concat(n,'"'));if(e=""+e,n=n||{},t._nodes.has(e))throw new B('Graph.addNode: the "'.concat(e,'" node already exist in the graph.'));var r=new t.NodeDataClass(e,n);return t._nodes.set(e,r),t.emit("nodeAdded",{key:e,attributes:n}),r}(this,t,e);return n.key},i.mergeNode=function(t,e){if(e&&!h(e))throw new F('Graph.mergeNode: invalid attributes. Expecting an object but got "'.concat(e,'"'));t=""+t,e=e||{};var n=this._nodes.get(t);return n?(e&&(c(n.attributes,e),this.emit("nodeAttributesUpdated",{type:"merge",key:t,attributes:n.attributes,data:e})),[t,!1]):(n=new this.NodeDataClass(t,e),this._nodes.set(t,n),this.emit("nodeAdded",{key:t,attributes:e}),[t,!0])},i.updateNode=function(t,e){if(e&&"function"!=typeof e)throw new F('Graph.updateNode: invalid updater function. Expecting a function but got "'.concat(e,'"'));t=""+t;var n=this._nodes.get(t);if(n){if(e){var r=n.attributes;n.attributes=e(r),this.emit("nodeAttributesUpdated",{type:"replace",key:t,attributes:n.attributes})}return[t,!1]}var i=e?e({}):{};return n=new this.NodeDataClass(t,i),this._nodes.set(t,n),this.emit("nodeAdded",{key:t,attributes:i}),[t,!0]},i.dropNode=function(t){var e=this;t=""+t;var n=this._nodes.get(t);if(!n)throw new Y('Graph.dropNode: could not find the "'.concat(t,'" node in the graph.'));this.forEachEdge(t,(function(t){e.dropEdge(t)})),this._nodes.delete(t),this.emit("nodeDropped",{key:t,attributes:n.attributes})},i.dropEdge=function(t){var e;if(arguments.length>1){var n=""+arguments[0],r=""+arguments[1];if(!(e=d(this,n,r,this.type)))throw new Y('Graph.dropEdge: could not find the "'.concat(n,'" -> "').concat(r,'" edge in the graph.'))}else if(t=""+t,!(e=this._edges.get(t)))throw new Y('Graph.dropEdge: could not find the "'.concat(t,'" edge in the graph.'));this._edges.delete(e.key);var i=e,o=i.source,a=i.target,u=i.attributes,c=e.undirected;return o===a?c?(o.undirectedSelfLoops--,this._undirectedSelfLoopCount--):(o.directedSelfLoops--,this._directedSelfLoopCount--):c?(o.undirectedDegree--,a.undirectedDegree--):(o.outDegree--,a.inDegree--),X(this,c,e),c?this._undirectedSize--:this._directedSize--,this.emit("edgeDropped",{key:t,attributes:u,source:o.key,target:a.key,undirected:c}),this},i.clear=function(){this._edges.clear(),this._nodes.clear(),this._resetInstanceCounters(),this.emit("cleared")},i.clearEdges=function(){!function(t){for(var e,n=t._nodes.values();!0!==(e=n.next()).done;)e.value.clear()}(this),this._edges.clear(),this._resetInstanceCounters(),this.emit("edgesCleared")},i.getAttribute=function(t){return this._attributes[t]},i.getAttributes=function(){return this._attributes},i.hasAttribute=function(t){return this._attributes.hasOwnProperty(t)},i.setAttribute=function(t,e){return this._attributes[t]=e,this.emit("attributesUpdated",{type:"set",attributes:this._attributes,name:t}),this},i.updateAttribute=function(t,e){if("function"!=typeof e)throw new F("Graph.updateAttribute: updater should be a function.");var n=this._attributes[t];return this._attributes[t]=e(n),this.emit("attributesUpdated",{type:"set",attributes:this._attributes,name:t}),this},i.removeAttribute=function(t){return delete this._attributes[t],this.emit("attributesUpdated",{type:"remove",attributes:this._attributes,name:t}),this},i.replaceAttributes=function(t){if(!h(t))throw new F("Graph.replaceAttributes: provided attributes are not a plain object.");return this._attributes=t,this.emit("attributesUpdated",{type:"replace",attributes:this._attributes}),this},i.mergeAttributes=function(t){if(!h(t))throw new F("Graph.mergeAttributes: provided attributes are not a plain object.");return c(this._attributes,t),this.emit("attributesUpdated",{type:"merge",attributes:this._attributes,data:t}),this},i.updateAttributes=function(t){if("function"!=typeof t)throw new F("Graph.updateAttributes: provided updater is not a function.");return this._attributes=t(this._attributes),this.emit("attributesUpdated",{type:"update",attributes:this._attributes}),this},i.updateEachNodeAttributes=function(t,e){if("function"!=typeof t)throw new F("Graph.updateEachNodeAttributes: expecting an updater function.");if(e&&!g(e))throw new F("Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}");for(var n,r,i=this._nodes.values();!0!==(n=i.next()).done;)(r=n.value).attributes=t(r.key,r.attributes);this.emit("eachNodeAttributesUpdated",{hints:e||null})},i.updateEachEdgeAttributes=function(t,e){if("function"!=typeof t)throw new F("Graph.updateEachEdgeAttributes: expecting an updater function.");if(e&&!g(e))throw new F("Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}");for(var n,r,i,o,a=this._edges.values();!0!==(n=a.next()).done;)i=(r=n.value).source,o=r.target,r.attributes=t(r.key,r.attributes,i.key,o.key,i.attributes,o.attributes,r.undirected);this.emit("eachEdgeAttributesUpdated",{hints:e||null})},i.forEachAdjacencyEntry=function(t){if("function"!=typeof t)throw new F("Graph.forEachAdjacencyEntry: expecting a callback.");this.multi?Yt(!1,!1,!1,this,t):Ft(!1,!1,!1,this,t)},i.forEachAdjacencyEntryWithOrphans=function(t){if("function"!=typeof t)throw new F("Graph.forEachAdjacencyEntryWithOrphans: expecting a callback.");this.multi?Yt(!1,!1,!0,this,t):Ft(!1,!1,!0,this,t)},i.forEachAssymetricAdjacencyEntry=function(t){if("function"!=typeof t)throw new F("Graph.forEachAssymetricAdjacencyEntry: expecting a callback.");this.multi?Yt(!1,!0,!1,this,t):Ft(!1,!0,!1,this,t)},i.forEachAssymetricAdjacencyEntryWithOrphans=function(t){if("function"!=typeof t)throw new F("Graph.forEachAssymetricAdjacencyEntryWithOrphans: expecting a callback.");this.multi?Yt(!1,!0,!0,this,t):Ft(!1,!0,!0,this,t)},i.nodes=function(){return"function"==typeof Array.from?Array.from(this._nodes.keys()):K(this._nodes.keys(),this._nodes.size)},i.forEachNode=function(t){if("function"!=typeof t)throw new F("Graph.forEachNode: expecting a callback.");for(var e,n,r=this._nodes.values();!0!==(e=r.next()).done;)t((n=e.value).key,n.attributes)},i.findNode=function(t){if("function"!=typeof t)throw new F("Graph.findNode: expecting a callback.");for(var e,n,r=this._nodes.values();!0!==(e=r.next()).done;)if(t((n=e.value).key,n.attributes))return n.key},i.mapNodes=function(t){if("function"!=typeof t)throw new F("Graph.mapNode: expecting a callback.");for(var e,n,r=this._nodes.values(),i=new Array(this.order),o=0;!0!==(e=r.next()).done;)n=e.value,i[o++]=t(n.key,n.attributes);return i},i.someNode=function(t){if("function"!=typeof t)throw new F("Graph.someNode: expecting a callback.");for(var e,n,r=this._nodes.values();!0!==(e=r.next()).done;)if(t((n=e.value).key,n.attributes))return!0;return!1},i.everyNode=function(t){if("function"!=typeof t)throw new F("Graph.everyNode: expecting a callback.");for(var e,n,r=this._nodes.values();!0!==(e=r.next()).done;)if(!t((n=e.value).key,n.attributes))return!1;return!0},i.filterNodes=function(t){if("function"!=typeof t)throw new F("Graph.filterNodes: expecting a callback.");for(var e,n,r=this._nodes.values(),i=[];!0!==(e=r.next()).done;)t((n=e.value).key,n.attributes)&&i.push(n.key);return i},i.reduceNodes=function(t,e){if("function"!=typeof t)throw new F("Graph.reduceNodes: expecting a callback.");if(arguments.length<2)throw new F("Graph.reduceNodes: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.");for(var n,r,i=e,o=this._nodes.values();!0!==(n=o.next()).done;)i=t(i,(r=n.value).key,r.attributes);return i},i.nodeEntries=function(){var t=this._nodes.values();return new O((function(){var e=t.next();if(e.done)return e;var n=e.value;return{value:{node:n.key,attributes:n.attributes},done:!1}}))},i.exportNode=function(t){t=""+t;var e=this._nodes.get(t);if(!e)throw new Y('Graph.exportNode: could not find the "'.concat(t,'" node in the graph.'));return Bt(t,e)},i.exportEdge=function(t){t=""+t;var e=this._edges.get(t);if(!e)throw new Y('Graph.exportEdge: could not find the "'.concat(t,'" edge in the graph.'));return qt(t,e)},i.export=function(){var t=new Array(this._nodes.size),e=0;this._nodes.forEach((function(n,r){t[e++]=Bt(r,n)}));var n=new Array(this._edges.size);return e=0,this._edges.forEach((function(t,r){n[e++]=qt(r,t)})),{attributes:this.getAttributes(),nodes:t,edges:n,options:{type:this.type,multi:this.multi,allowSelfLoops:this.allowSelfLoops}}},i.importNode=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Jt(t);if(n){if("not-object"===n)throw new F('Graph.importNode: invalid serialized node. A serialized node should be a plain object with at least a "key" property.');if("no-key"===n)throw new F("Graph.importNode: no key provided.");if("invalid-attributes"===n)throw new F("Graph.importNode: invalid attributes. Attributes should be a plain object, null or omitted.")}var r=t.key,i=t.attributes,o=void 0===i?{}:i;return e?this.mergeNode(r,o):this.addNode(r,o),this},i.importEdge=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Vt(t);if(n){if("not-object"===n)throw new F('Graph.importEdge: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.');if("no-source"===n)throw new F("Graph.importEdge: missing souce.");if("no-target"===n)throw new F("Graph.importEdge: missing target.");if("invalid-attributes"===n)throw new F("Graph.importEdge: invalid attributes. Attributes should be a plain object, null or omitted.");if("invalid-undirected"===n)throw new F("Graph.importEdge: invalid undirected. Undirected should be boolean or omitted.")}var r=t.source,i=t.target,o=t.attributes,a=void 0===o?{}:o,u=t.undirected,c=void 0!==u&&u;return"key"in t?(e?c?this.mergeUndirectedEdgeWithKey:this.mergeDirectedEdgeWithKey:c?this.addUndirectedEdgeWithKey:this.addDirectedEdgeWithKey).call(this,t.key,r,i,a):(e?c?this.mergeUndirectedEdge:this.mergeDirectedEdge:c?this.addUndirectedEdge:this.addDirectedEdge).call(this,r,i,a),this},i.import=function(t){var e,n,r,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(s(t))return this.import(t.export(),i),this;if(!h(t))throw new F("Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance.");if(t.attributes){if(!h(t.attributes))throw new F("Graph.import: invalid attributes. Expecting a plain object.");i?this.mergeAttributes(t.attributes):this.replaceAttributes(t.attributes)}if(t.nodes){if(r=t.nodes,!Array.isArray(r))throw new F("Graph.import: invalid nodes. Expecting an array.");for(e=0,n=r.length;e<n;e++)this.importNode(r[e],i)}if(t.edges){if(r=t.edges,!Array.isArray(r))throw new F("Graph.import: invalid edges. Expecting an array.");for(e=0,n=r.length;e<n;e++)this.importEdge(r[e],i)}return this},i.nullCopy=function(t){var e=new r(c({},this._options,t));return e.replaceAttributes(c({},this.getAttributes())),e},i.emptyCopy=function(t){var e=this.nullCopy(t);return this._nodes.forEach((function(t,n){var r=c({},t.attributes);t=new e.NodeDataClass(n,r),e._nodes.set(n,t)})),e},i.copy=function(){for(var t,e,n=this.emptyCopy(),r=this._edges.values();!0!==(t=r.next()).done;)ee(n,"copy",!1,(e=t.value).undirected,e.key,e.source.key,e.target.key,c({},e.attributes));return n},i.upgradeToMixed=function(){return"mixed"===this.type||(this._nodes.forEach((function(t){return t.upgradeToMixed()})),this._options.type="mixed",l(this,"type",this._options.type),p(this,"NodeDataClass",q)),this},i.upgradeToMulti=function(){return this.multi||(this._options.multi=!0,l(this,"multi",!0),(t=this)._nodes.forEach((function(e,n){if(e.out)for(var r in e.out){var i=new Set;i.add(e.out[r]),e.out[r]=i,t._nodes.get(r).in[n]=i}if(e.undirected)for(var o in e.undirected)if(!(o>n)){var a=new Set;a.add(e.undirected[o]),e.undirected[o]=a,t._nodes.get(o).undirected[n]=a}}))),this;// removed by dead control flow
 var t; },i.toJSON=function(){return this.export()},i.toString=function(){return"[object Graph]"},i.inspect=function(){var e=this,n={};this._nodes.forEach((function(t,e){n[e]=t.attributes}));var r={},i={};this._edges.forEach((function(t,n){var o,a=t.undirected?"--":"->",u="",c=t.source.key,d=t.target.key;t.undirected&&c>d&&(o=c,c=d,d=o);var s="(".concat(c,")").concat(a,"(").concat(d,")");n.startsWith("geid_")?e.multi&&(void 0===i[s]?i[s]=0:i[s]++,u+="".concat(i[s],". ")):u+="[".concat(n,"]: "),r[u+=s]=t.attributes}));var o={};for(var a in this)this.hasOwnProperty(a)&&!Zt.has(a)&&"function"!=typeof this[a]&&"symbol"!==t(a)&&(o[a]=this[a]);return o.attributes=this._attributes,o.nodes=n,o.edges=r,p(o,"constructor",this.constructor),o},r}(v.exports.EventEmitter);"undefined"!=typeof Symbol&&(re.prototype[Symbol.for("nodejs.util.inspect.custom")]=re.prototype.inspect),[{name:function(t){return"".concat(t,"Edge")},generateKey:!0},{name:function(t){return"".concat(t,"DirectedEdge")},generateKey:!0,type:"directed"},{name:function(t){return"".concat(t,"UndirectedEdge")},generateKey:!0,type:"undirected"},{name:function(t){return"".concat(t,"EdgeWithKey")}},{name:function(t){return"".concat(t,"DirectedEdgeWithKey")},type:"directed"},{name:function(t){return"".concat(t,"UndirectedEdgeWithKey")},type:"undirected"}].forEach((function(t){["add","merge","update"].forEach((function(e){var n=t.name(e),r="add"===e?ee:ne;t.generateKey?re.prototype[n]=function(i,o,a){return r(this,n,!0,"undirected"===(t.type||this.type),null,i,o,a,"update"===e)}:re.prototype[n]=function(i,o,a,u){return r(this,n,!1,"undirected"===(t.type||this.type),i,o,a,u,"update"===e)}}))})),function(t){$.forEach((function(e){var n=e.name,r=e.attacher;r(t,n("Node"),0),r(t,n("Source"),1),r(t,n("Target"),2),r(t,n("Opposite"),3)}))}(re),function(t){tt.forEach((function(e){var n=e.name,r=e.attacher;r(t,n("Edge"),"mixed"),r(t,n("DirectedEdge"),"directed"),r(t,n("UndirectedEdge"),"undirected")}))}(re),function(t){it.forEach((function(e){!function(t,e){var n=e.name,r=e.type,i=e.direction;t.prototype[n]=function(t,e){if("mixed"!==r&&"mixed"!==this.type&&r!==this.type)return[];if(!arguments.length)return wt(this,r);if(1===arguments.length){t=""+t;var o=this._nodes.get(t);if(void 0===o)throw new Y("Graph.".concat(n,': could not find the "').concat(t,'" node in the graph.'));return Gt(this.multi,"mixed"===r?this.type:r,i,o)}if(2===arguments.length){t=""+t,e=""+e;var a=this._nodes.get(t);if(!a)throw new Y("Graph.".concat(n,':  could not find the "').concat(t,'" source node in the graph.'));if(!this._nodes.has(e))throw new Y("Graph.".concat(n,':  could not find the "').concat(e,'" target node in the graph.'));return At(r,this.multi,i,a,e)}throw new F("Graph.".concat(n,": too many arguments (expecting 0, 1 or 2 and got ").concat(arguments.length,")."))}}(t,e),function(t,e){var n=e.name,r=e.type,i=e.direction,o="forEach"+n[0].toUpperCase()+n.slice(1,-1);t.prototype[o]=function(t,e,n){if("mixed"===r||"mixed"===this.type||r===this.type){if(1===arguments.length)return mt(this,r,n=t);if(2===arguments.length){t=""+t,n=e;var a=this._nodes.get(t);if(void 0===a)throw new Y("Graph.".concat(o,': could not find the "').concat(t,'" node in the graph.'));return xt(this.multi,"mixed"===r?this.type:r,i,a,n)}if(3===arguments.length){t=""+t,e=""+e;var u=this._nodes.get(t);if(!u)throw new Y("Graph.".concat(o,':  could not find the "').concat(t,'" source node in the graph.'));if(!this._nodes.has(e))throw new Y("Graph.".concat(o,':  could not find the "').concat(e,'" target node in the graph.'));return Lt(r,this.multi,i,u,e,n)}throw new F("Graph.".concat(o,": too many arguments (expecting 1, 2 or 3 and got ").concat(arguments.length,")."))}};var a="map"+n[0].toUpperCase()+n.slice(1);t.prototype[a]=function(){var t,e=Array.prototype.slice.call(arguments),n=e.pop();if(0===e.length){var i=0;"directed"!==r&&(i+=this.undirectedSize),"undirected"!==r&&(i+=this.directedSize),t=new Array(i);var a=0;e.push((function(e,r,i,o,u,c,d){t[a++]=n(e,r,i,o,u,c,d)}))}else t=[],e.push((function(e,r,i,o,a,u,c){t.push(n(e,r,i,o,a,u,c))}));return this[o].apply(this,e),t};var u="filter"+n[0].toUpperCase()+n.slice(1);t.prototype[u]=function(){var t=Array.prototype.slice.call(arguments),e=t.pop(),n=[];return t.push((function(t,r,i,o,a,u,c){e(t,r,i,o,a,u,c)&&n.push(t)})),this[o].apply(this,t),n};var c="reduce"+n[0].toUpperCase()+n.slice(1);t.prototype[c]=function(){var t,e,n=Array.prototype.slice.call(arguments);if(n.length<2||n.length>4)throw new F("Graph.".concat(c,": invalid number of arguments (expecting 2, 3 or 4 and got ").concat(n.length,")."));if("function"==typeof n[n.length-1]&&"function"!=typeof n[n.length-2])throw new F("Graph.".concat(c,": missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array."));2===n.length?(t=n[0],e=n[1],n=[]):3===n.length?(t=n[1],e=n[2],n=[n[0]]):4===n.length&&(t=n[2],e=n[3],n=[n[0],n[1]]);var r=e;return n.push((function(e,n,i,o,a,u,c){r=t(r,e,n,i,o,a,u,c)})),this[o].apply(this,n),r}}(t,e),function(t,e){var n=e.name,r=e.type,i=e.direction,o="find"+n[0].toUpperCase()+n.slice(1,-1);t.prototype[o]=function(t,e,n){if("mixed"!==r&&"mixed"!==this.type&&r!==this.type)return!1;if(1===arguments.length)return _t(this,r,n=t);if(2===arguments.length){t=""+t,n=e;var a=this._nodes.get(t);if(void 0===a)throw new Y("Graph.".concat(o,': could not find the "').concat(t,'" node in the graph.'));return Et(this.multi,"mixed"===r?this.type:r,i,a,n)}if(3===arguments.length){t=""+t,e=""+e;var u=this._nodes.get(t);if(!u)throw new Y("Graph.".concat(o,':  could not find the "').concat(t,'" source node in the graph.'));if(!this._nodes.has(e))throw new Y("Graph.".concat(o,':  could not find the "').concat(e,'" target node in the graph.'));return Dt(r,this.multi,i,u,e,n)}throw new F("Graph.".concat(o,": too many arguments (expecting 1, 2 or 3 and got ").concat(arguments.length,")."))};var a="some"+n[0].toUpperCase()+n.slice(1,-1);t.prototype[a]=function(){var t=Array.prototype.slice.call(arguments),e=t.pop();return t.push((function(t,n,r,i,o,a,u){return e(t,n,r,i,o,a,u)})),!!this[o].apply(this,t)};var u="every"+n[0].toUpperCase()+n.slice(1,-1);t.prototype[u]=function(){var t=Array.prototype.slice.call(arguments),e=t.pop();return t.push((function(t,n,r,i,o,a,u){return!e(t,n,r,i,o,a,u)})),!this[o].apply(this,t)}}(t,e),function(t,e){var n=e.name,r=e.type,i=e.direction,o=n.slice(0,-1)+"Entries";t.prototype[o]=function(t,e){if("mixed"!==r&&"mixed"!==this.type&&r!==this.type)return O.empty();if(!arguments.length)return kt(this,r);if(1===arguments.length){t=""+t;var n=this._nodes.get(t);if(!n)throw new Y("Graph.".concat(o,': could not find the "').concat(t,'" node in the graph.'));return St(r,i,n)}if(2===arguments.length){t=""+t,e=""+e;var a=this._nodes.get(t);if(!a)throw new Y("Graph.".concat(o,':  could not find the "').concat(t,'" source node in the graph.'));if(!this._nodes.has(e))throw new Y("Graph.".concat(o,':  could not find the "').concat(e,'" target node in the graph.'));return Nt(r,i,a,e)}throw new F("Graph.".concat(o,": too many arguments (expecting 0, 1 or 2 and got ").concat(arguments.length,")."))}}(t,e)}))}(re),function(t){Ut.forEach((function(e){Rt(t,e),Wt(t,e),Kt(t,e),It(t,e)}))}(re);var ie=function(t){function n(e){var n=c({type:"directed"},e);if("multi"in n&&!1!==n.multi)throw new F("DirectedGraph.from: inconsistent indication that the graph should be multi in given options!");if("directed"!==n.type)throw new F('DirectedGraph.from: inconsistent "'+n.type+'" type in given options!');return t.call(this,n)||this}return e(n,t),n}(re),oe=function(t){function n(e){var n=c({type:"undirected"},e);if("multi"in n&&!1!==n.multi)throw new F("UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!");if("undirected"!==n.type)throw new F('UndirectedGraph.from: inconsistent "'+n.type+'" type in given options!');return t.call(this,n)||this}return e(n,t),n}(re),ae=function(t){function n(e){var n=c({multi:!0},e);if("multi"in n&&!0!==n.multi)throw new F("MultiGraph.from: inconsistent indication that the graph should be simple in given options!");return t.call(this,n)||this}return e(n,t),n}(re),ue=function(t){function n(e){var n=c({type:"directed",multi:!0},e);if("multi"in n&&!0!==n.multi)throw new F("MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!");if("directed"!==n.type)throw new F('MultiDirectedGraph.from: inconsistent "'+n.type+'" type in given options!');return t.call(this,n)||this}return e(n,t),n}(re),ce=function(t){function n(e){var n=c({type:"undirected",multi:!0},e);if("multi"in n&&!0!==n.multi)throw new F("MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!");if("undirected"!==n.type)throw new F('MultiUndirectedGraph.from: inconsistent "'+n.type+'" type in given options!');return t.call(this,n)||this}return e(n,t),n}(re);function de(t){t.from=function(e,n){var r=c({},e.options,n),i=new t(r);return i.import(e),i}}return de(re),de(ie),de(oe),de(ae),de(ue),de(ce),re.Graph=re,re.DirectedGraph=ie,re.UndirectedGraph=oe,re.MultiGraph=ae,re.MultiDirectedGraph=ue,re.MultiUndirectedGraph=ce,re.InvalidArgumentsGraphError=F,re.NotFoundGraphError=Y,re.UsageGraphError=B,re}));
//# sourceMappingURL=graphology.umd.min.js.map


/***/ }),

/***/ "./node_modules/sigma/dist/colors-beb06eb2.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/sigma/dist/colors-beb06eb2.esm.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ HTML_COLORS),
/* harmony export */   _: () => (/* binding */ _slicedToArray),
/* harmony export */   a: () => (/* binding */ _arrayLikeToArray),
/* harmony export */   b: () => (/* binding */ _unsupportedIterableToArray),
/* harmony export */   c: () => (/* binding */ colorToIndex),
/* harmony export */   d: () => (/* binding */ colorToArray),
/* harmony export */   e: () => (/* binding */ extractPixel),
/* harmony export */   f: () => (/* binding */ floatColor),
/* harmony export */   g: () => (/* binding */ getPixelColor),
/* harmony export */   i: () => (/* binding */ indexToColor),
/* harmony export */   p: () => (/* binding */ parseColor),
/* harmony export */   r: () => (/* binding */ rgbaToFloat)
/* harmony export */ });
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

var HTML_COLORS = {
  black: "#000000",
  silver: "#C0C0C0",
  gray: "#808080",
  grey: "#808080",
  white: "#FFFFFF",
  maroon: "#800000",
  red: "#FF0000",
  purple: "#800080",
  fuchsia: "#FF00FF",
  green: "#008000",
  lime: "#00FF00",
  olive: "#808000",
  yellow: "#FFFF00",
  navy: "#000080",
  blue: "#0000FF",
  teal: "#008080",
  aqua: "#00FFFF",
  darkblue: "#00008B",
  mediumblue: "#0000CD",
  darkgreen: "#006400",
  darkcyan: "#008B8B",
  deepskyblue: "#00BFFF",
  darkturquoise: "#00CED1",
  mediumspringgreen: "#00FA9A",
  springgreen: "#00FF7F",
  cyan: "#00FFFF",
  midnightblue: "#191970",
  dodgerblue: "#1E90FF",
  lightseagreen: "#20B2AA",
  forestgreen: "#228B22",
  seagreen: "#2E8B57",
  darkslategray: "#2F4F4F",
  darkslategrey: "#2F4F4F",
  limegreen: "#32CD32",
  mediumseagreen: "#3CB371",
  turquoise: "#40E0D0",
  royalblue: "#4169E1",
  steelblue: "#4682B4",
  darkslateblue: "#483D8B",
  mediumturquoise: "#48D1CC",
  indigo: "#4B0082",
  darkolivegreen: "#556B2F",
  cadetblue: "#5F9EA0",
  cornflowerblue: "#6495ED",
  rebeccapurple: "#663399",
  mediumaquamarine: "#66CDAA",
  dimgray: "#696969",
  dimgrey: "#696969",
  slateblue: "#6A5ACD",
  olivedrab: "#6B8E23",
  slategray: "#708090",
  slategrey: "#708090",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  mediumslateblue: "#7B68EE",
  lawngreen: "#7CFC00",
  chartreuse: "#7FFF00",
  aquamarine: "#7FFFD4",
  skyblue: "#87CEEB",
  lightskyblue: "#87CEFA",
  blueviolet: "#8A2BE2",
  darkred: "#8B0000",
  darkmagenta: "#8B008B",
  saddlebrown: "#8B4513",
  darkseagreen: "#8FBC8F",
  lightgreen: "#90EE90",
  mediumpurple: "#9370DB",
  darkviolet: "#9400D3",
  palegreen: "#98FB98",
  darkorchid: "#9932CC",
  yellowgreen: "#9ACD32",
  sienna: "#A0522D",
  brown: "#A52A2A",
  darkgray: "#A9A9A9",
  darkgrey: "#A9A9A9",
  lightblue: "#ADD8E6",
  greenyellow: "#ADFF2F",
  paleturquoise: "#AFEEEE",
  lightsteelblue: "#B0C4DE",
  powderblue: "#B0E0E6",
  firebrick: "#B22222",
  darkgoldenrod: "#B8860B",
  mediumorchid: "#BA55D3",
  rosybrown: "#BC8F8F",
  darkkhaki: "#BDB76B",
  mediumvioletred: "#C71585",
  indianred: "#CD5C5C",
  peru: "#CD853F",
  chocolate: "#D2691E",
  tan: "#D2B48C",
  lightgray: "#D3D3D3",
  lightgrey: "#D3D3D3",
  thistle: "#D8BFD8",
  orchid: "#DA70D6",
  goldenrod: "#DAA520",
  palevioletred: "#DB7093",
  crimson: "#DC143C",
  gainsboro: "#DCDCDC",
  plum: "#DDA0DD",
  burlywood: "#DEB887",
  lightcyan: "#E0FFFF",
  lavender: "#E6E6FA",
  darksalmon: "#E9967A",
  violet: "#EE82EE",
  palegoldenrod: "#EEE8AA",
  lightcoral: "#F08080",
  khaki: "#F0E68C",
  aliceblue: "#F0F8FF",
  honeydew: "#F0FFF0",
  azure: "#F0FFFF",
  sandybrown: "#F4A460",
  wheat: "#F5DEB3",
  beige: "#F5F5DC",
  whitesmoke: "#F5F5F5",
  mintcream: "#F5FFFA",
  ghostwhite: "#F8F8FF",
  salmon: "#FA8072",
  antiquewhite: "#FAEBD7",
  linen: "#FAF0E6",
  lightgoldenrodyellow: "#FAFAD2",
  oldlace: "#FDF5E6",
  magenta: "#FF00FF",
  deeppink: "#FF1493",
  orangered: "#FF4500",
  tomato: "#FF6347",
  hotpink: "#FF69B4",
  coral: "#FF7F50",
  darkorange: "#FF8C00",
  lightsalmon: "#FFA07A",
  orange: "#FFA500",
  lightpink: "#FFB6C1",
  pink: "#FFC0CB",
  gold: "#FFD700",
  peachpuff: "#FFDAB9",
  navajowhite: "#FFDEAD",
  moccasin: "#FFE4B5",
  bisque: "#FFE4C4",
  mistyrose: "#FFE4E1",
  blanchedalmond: "#FFEBCD",
  papayawhip: "#FFEFD5",
  lavenderblush: "#FFF0F5",
  seashell: "#FFF5EE",
  cornsilk: "#FFF8DC",
  lemonchiffon: "#FFFACD",
  floralwhite: "#FFFAF0",
  snow: "#FFFAFA",
  lightyellow: "#FFFFE0",
  ivory: "#FFFFF0"
};

/**
 * Function extracting the color at the given pixel.
 */
function extractPixel(gl, x, y, array) {
  var data = array || new Uint8Array(4);
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);
  return data;
}

/**
 * Memoized function returning a float-encoded color from various string
 * formats describing colors.
 */
var INT8 = new Int8Array(4);
var INT32 = new Int32Array(INT8.buffer, 0, 1);
var FLOAT32 = new Float32Array(INT8.buffer, 0, 1);
var RGBA_TEST_REGEX = /^\s*rgba?\s*\(/;
var RGBA_EXTRACT_REGEX = /^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;
function parseColor(val) {
  var r = 0; // byte
  var g = 0; // byte
  var b = 0; // byte
  var a = 1; // float

  // Handling hexadecimal notation
  if (val[0] === "#") {
    if (val.length === 4) {
      r = parseInt(val.charAt(1) + val.charAt(1), 16);
      g = parseInt(val.charAt(2) + val.charAt(2), 16);
      b = parseInt(val.charAt(3) + val.charAt(3), 16);
    } else {
      r = parseInt(val.charAt(1) + val.charAt(2), 16);
      g = parseInt(val.charAt(3) + val.charAt(4), 16);
      b = parseInt(val.charAt(5) + val.charAt(6), 16);
    }
    if (val.length === 9) {
      a = parseInt(val.charAt(7) + val.charAt(8), 16) / 255;
    }
  }

  // Handling rgb notation
  else if (RGBA_TEST_REGEX.test(val)) {
    var match = val.match(RGBA_EXTRACT_REGEX);
    if (match) {
      r = +match[1];
      g = +match[2];
      b = +match[3];
      if (match[4]) a = +match[4];
    }
  }
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
var FLOAT_COLOR_CACHE = {};
for (var htmlColor in HTML_COLORS) {
  FLOAT_COLOR_CACHE[htmlColor] = floatColor(HTML_COLORS[htmlColor]);
  // Replicating cache for hex values for free
  FLOAT_COLOR_CACHE[HTML_COLORS[htmlColor]] = FLOAT_COLOR_CACHE[htmlColor];
}
function rgbaToFloat(r, g, b, a, masking) {
  INT32[0] = a << 24 | b << 16 | g << 8 | r;
  if (masking) INT32[0] = INT32[0] & 0xfeffffff;
  return FLOAT32[0];
}
function floatColor(val) {
  // The html color names are case-insensitive
  val = val.toLowerCase();

  // If the color is already computed, we yield it
  if (typeof FLOAT_COLOR_CACHE[val] !== "undefined") return FLOAT_COLOR_CACHE[val];
  var parsed = parseColor(val);
  var r = parsed.r,
    g = parsed.g,
    b = parsed.b;
  var a = parsed.a;
  a = a * 255 | 0;
  var color = rgbaToFloat(r, g, b, a, true);
  FLOAT_COLOR_CACHE[val] = color;
  return color;
}
function colorToArray(val, masking) {
  FLOAT32[0] = floatColor(val);
  var intValue = INT32[0];
  if (masking) {
    intValue = intValue | 0x01000000;
  }
  var r = intValue & 0xff;
  var g = intValue >> 8 & 0xff;
  var b = intValue >> 16 & 0xff;
  var a = intValue >> 24 & 0xff;
  return [r, g, b, a];
}
var FLOAT_INDEX_CACHE = {};
function indexToColor(index) {
  // If the index is already computed, we yield it
  if (typeof FLOAT_INDEX_CACHE[index] !== "undefined") return FLOAT_INDEX_CACHE[index];

  // To address issue #1397, one strategy is to keep encoding 4 bytes colors,
  // but with alpha hard-set to 1.0 (or 255):
  var r = (index & 0x00ff0000) >>> 16;
  var g = (index & 0x0000ff00) >>> 8;
  var b = index & 0x000000ff;
  var a = 0x000000ff;

  // The original 4 bytes color encoding was the following:
  // const r = (index & 0xff000000) >>> 24;
  // const g = (index & 0x00ff0000) >>> 16;
  // const b = (index & 0x0000ff00) >>> 8;
  // const a = index & 0x000000ff;

  var color = rgbaToFloat(r, g, b, a, true);
  FLOAT_INDEX_CACHE[index] = color;
  return color;
}
function colorToIndex(r, g, b, _a) {
  // As for the function indexToColor, because of #1397 and the "alpha is always
  // 1.0" strategy, we need to fix this function as well:
  return b + (g << 8) + (r << 16);

  // The original 4 bytes color decoding is the following:
  // return a + (b << 8) + (g << 16) + (r << 24);
}
function getPixelColor(gl, frameBuffer, x, y, pixelRatio, downSizingRatio) {
  var bufferX = Math.floor(x / downSizingRatio * pixelRatio);
  var bufferY = Math.floor(gl.drawingBufferHeight / downSizingRatio - y / downSizingRatio * pixelRatio);
  var pixel = new Uint8Array(4);
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.readPixels(bufferX, bufferY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
  var _pixel = _slicedToArray(pixel, 4),
    r = _pixel[0],
    g = _pixel[1],
    b = _pixel[2],
    a = _pixel[3];
  return [r, g, b, a];
}




/***/ }),

/***/ "./node_modules/sigma/dist/data-11df7124.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/sigma/dist/data-11df7124.esm.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ _typeof),
/* harmony export */   a: () => (/* binding */ assign),
/* harmony export */   b: () => (/* binding */ assignDeep),
/* harmony export */   e: () => (/* binding */ extend),
/* harmony export */   i: () => (/* binding */ isPlainObject)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/**
 * Extends the target array with the given values.
 */
function extend(array, values) {
  var l2 = values.size;
  if (l2 === 0) return;
  var l1 = array.length;
  array.length += l2;
  var i = 0;
  values.forEach(function (value) {
    array[l1 + i] = value;
    i++;
  });
}

/**
 * Checks whether the given value is a plain object.
 */
function isPlainObject(value) {
  return _typeof(value) === "object" && value !== null && value.constructor === Object;
}

/**
 * Helper to use `Object.assign` with more than two objects.
 */
function assign(target) {
  target = target || {};
  for (var i = 0, l = arguments.length <= 1 ? 0 : arguments.length - 1; i < l; i++) {
    var o = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
    if (!o) continue;
    Object.assign(target, o);
  }
  return target;
}

/**
 * Very simple recursive `Object.assign` like function.
 */
function assignDeep(target) {
  target = target || {};
  for (var i = 0, l = arguments.length <= 1 ? 0 : arguments.length - 1; i < l; i++) {
    var o = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
    if (!o) continue;
    for (var k in o) {
      if (isPlainObject(o[k])) {
        target[k] = assignDeep(target[k], o[k]);
      } else {
        target[k] = o[k];
      }
    }
  }
  return target;
}




/***/ }),

/***/ "./node_modules/sigma/dist/index-236c62ad.esm.js":
/*!*******************************************************!*\
  !*** ./node_modules/sigma/dist/index-236c62ad.esm.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AbstractNodeProgram),
/* harmony export */   D: () => (/* binding */ DEFAULT_EDGE_ARROW_HEAD_PROGRAM_OPTIONS),
/* harmony export */   E: () => (/* binding */ EdgeArrowProgram$1),
/* harmony export */   F: () => (/* binding */ FRAGMENT_SHADER_SOURCE),
/* harmony export */   N: () => (/* binding */ NodeCircleProgram),
/* harmony export */   P: () => (/* binding */ Program),
/* harmony export */   _: () => (/* binding */ _objectSpread2),
/* harmony export */   a: () => (/* binding */ _defineProperty),
/* harmony export */   b: () => (/* binding */ drawDiscNodeLabel),
/* harmony export */   c: () => (/* binding */ drawDiscNodeHover),
/* harmony export */   d: () => (/* binding */ drawStraightEdgeLabel),
/* harmony export */   e: () => (/* binding */ EdgeRectangleProgram),
/* harmony export */   f: () => (/* binding */ NodeProgram),
/* harmony export */   g: () => (/* binding */ EdgeProgram),
/* harmony export */   h: () => (/* binding */ createEdgeCompoundProgram),
/* harmony export */   i: () => (/* binding */ createEdgeArrowHeadProgram),
/* harmony export */   j: () => (/* binding */ createNodeCompoundProgram),
/* harmony export */   k: () => (/* binding */ AbstractEdgeProgram),
/* harmony export */   l: () => (/* binding */ AbstractProgram),
/* harmony export */   m: () => (/* binding */ EdgeArrowHeadProgram$1),
/* harmony export */   n: () => (/* binding */ EdgeClampedProgram$1),
/* harmony export */   o: () => (/* binding */ createEdgeClampedProgram),
/* harmony export */   p: () => (/* binding */ DEFAULT_EDGE_CLAMPED_PROGRAM_OPTIONS),
/* harmony export */   q: () => (/* binding */ createEdgeArrowProgram),
/* harmony export */   r: () => (/* binding */ getAttributeItemsCount),
/* harmony export */   s: () => (/* binding */ getAttributesItemsCount),
/* harmony export */   t: () => (/* binding */ loadVertexShader),
/* harmony export */   u: () => (/* binding */ loadFragmentShader),
/* harmony export */   v: () => (/* binding */ loadProgram),
/* harmony export */   w: () => (/* binding */ killProgram),
/* harmony export */   x: () => (/* binding */ numberToGLSLFloat)
/* harmony export */ });
/* harmony import */ var _inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inherits-d1a1e29b.esm.js */ "./node_modules/sigma/dist/inherits-d1a1e29b.esm.js");
/* harmony import */ var _colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colors-beb06eb2.esm.js */ "./node_modules/sigma/dist/colors-beb06eb2.esm.js");



function _defineProperty(e, r, t) {
  return (r = (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.d)(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.e)(t)););
  return t;
}

function _get() {
  return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}

function _superPropGet(t, o, e, r) {
  var p = _get((0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.e)(1 & r ? t.prototype : t), o, e);
  return 2 & r && "function" == typeof p ? function (t) {
    return p.apply(e, t);
  } : p;
}

function getAttributeItemsCount(attr) {
  return attr.normalized ? 1 : attr.size;
}
function getAttributesItemsCount(attrs) {
  var res = 0;
  attrs.forEach(function (attr) {
    return res += getAttributeItemsCount(attr);
  });
  return res;
}
function loadShader(type, gl, source) {
  var glType = type === "VERTEX" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;

  // Creating the shader
  var shader = gl.createShader(glType);
  if (shader === null) {
    throw new Error("loadShader: error while creating the shader");
  }

  // Loading source
  gl.shaderSource(shader, source);

  // Compiling the shader
  gl.compileShader(shader);

  // Retrieving compilation status
  var successfullyCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  // Throwing if something went awry
  if (!successfullyCompiled) {
    var infoLog = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error("loadShader: error while compiling the shader:\n".concat(infoLog, "\n").concat(source));
  }
  return shader;
}
function loadVertexShader(gl, source) {
  return loadShader("VERTEX", gl, source);
}
function loadFragmentShader(gl, source) {
  return loadShader("FRAGMENT", gl, source);
}

/**
 * Function used to load a program.
 */
function loadProgram(gl, shaders) {
  var program = gl.createProgram();
  if (program === null) {
    throw new Error("loadProgram: error while creating the program.");
  }
  var i, l;

  // Attaching the shaders
  for (i = 0, l = shaders.length; i < l; i++) gl.attachShader(program, shaders[i]);
  gl.linkProgram(program);

  // Checking status
  var successfullyLinked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!successfullyLinked) {
    gl.deleteProgram(program);
    throw new Error("loadProgram: error while linking the program.");
  }
  return program;
}
function killProgram(_ref) {
  var gl = _ref.gl,
    buffer = _ref.buffer,
    program = _ref.program,
    vertexShader = _ref.vertexShader,
    fragmentShader = _ref.fragmentShader;
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  gl.deleteProgram(program);
  gl.deleteBuffer(buffer);
}

/**
 * Function use to print a float for inserting in a GLSL program.
 */
function numberToGLSLFloat(n) {
  return n % 1 === 0 ? n.toFixed(1) : n.toString();
}

var PICKING_PREFIX = "#define PICKING_MODE\n";
var SIZE_FACTOR_PER_ATTRIBUTE_TYPE = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, WebGL2RenderingContext.BOOL, 1), WebGL2RenderingContext.BYTE, 1), WebGL2RenderingContext.UNSIGNED_BYTE, 1), WebGL2RenderingContext.SHORT, 2), WebGL2RenderingContext.UNSIGNED_SHORT, 2), WebGL2RenderingContext.INT, 4), WebGL2RenderingContext.UNSIGNED_INT, 4), WebGL2RenderingContext.FLOAT, 4);
var AbstractProgram = /*#__PURE__*/(0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(function AbstractProgram(_gl, _pickGl, _renderer) {
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, AbstractProgram);
});
var Program = /*#__PURE__*/function () {
  function Program(gl, pickingBuffer, renderer) {
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, Program);
    // GLenum
    _defineProperty(this, "array", new Float32Array());
    _defineProperty(this, "constantArray", new Float32Array());
    _defineProperty(this, "capacity", 0);
    _defineProperty(this, "verticesCount", 0);
    // Reading and caching program definition
    var def = this.getDefinition();
    this.VERTICES = def.VERTICES;
    this.VERTEX_SHADER_SOURCE = def.VERTEX_SHADER_SOURCE;
    this.FRAGMENT_SHADER_SOURCE = def.FRAGMENT_SHADER_SOURCE;
    this.UNIFORMS = def.UNIFORMS;
    this.ATTRIBUTES = def.ATTRIBUTES;
    this.METHOD = def.METHOD;
    this.CONSTANT_ATTRIBUTES = "CONSTANT_ATTRIBUTES" in def ? def.CONSTANT_ATTRIBUTES : [];
    this.CONSTANT_DATA = "CONSTANT_DATA" in def ? def.CONSTANT_DATA : [];
    this.isInstanced = "CONSTANT_ATTRIBUTES" in def;

    // Computing stride
    this.ATTRIBUTES_ITEMS_COUNT = getAttributesItemsCount(this.ATTRIBUTES);
    this.STRIDE = this.VERTICES * this.ATTRIBUTES_ITEMS_COUNT;

    // Members
    this.renderer = renderer;
    this.normalProgram = this.getProgramInfo("normal", gl, def.VERTEX_SHADER_SOURCE, def.FRAGMENT_SHADER_SOURCE, null);
    this.pickProgram = pickingBuffer ? this.getProgramInfo("pick", gl, PICKING_PREFIX + def.VERTEX_SHADER_SOURCE, PICKING_PREFIX + def.FRAGMENT_SHADER_SOURCE, pickingBuffer) : null;

    // For instanced programs:
    if (this.isInstanced) {
      var constantAttributesItemsCount = getAttributesItemsCount(this.CONSTANT_ATTRIBUTES);
      if (this.CONSTANT_DATA.length !== this.VERTICES) throw new Error("Program: error while getting constant data (expected ".concat(this.VERTICES, " items, received ").concat(this.CONSTANT_DATA.length, " instead)"));
      this.constantArray = new Float32Array(this.CONSTANT_DATA.length * constantAttributesItemsCount);
      for (var i = 0; i < this.CONSTANT_DATA.length; i++) {
        var vector = this.CONSTANT_DATA[i];
        if (vector.length !== constantAttributesItemsCount) throw new Error("Program: error while getting constant data (one vector has ".concat(vector.length, " items instead of ").concat(constantAttributesItemsCount, ")"));
        for (var j = 0; j < vector.length; j++) this.constantArray[i * constantAttributesItemsCount + j] = vector[j];
      }
      this.STRIDE = this.ATTRIBUTES_ITEMS_COUNT;
    }
  }
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(Program, [{
    key: "kill",
    value: function kill() {
      killProgram(this.normalProgram);
      if (this.pickProgram) {
        killProgram(this.pickProgram);
        this.pickProgram = null;
      }
    }
  }, {
    key: "getProgramInfo",
    value: function getProgramInfo(name, gl, vertexShaderSource, fragmentShaderSource, frameBuffer) {
      var def = this.getDefinition();

      // WebGL buffers
      var buffer = gl.createBuffer();
      if (buffer === null) throw new Error("Program: error while creating the WebGL buffer.");

      // Shaders and program
      var vertexShader = loadVertexShader(gl, vertexShaderSource);
      var fragmentShader = loadFragmentShader(gl, fragmentShaderSource);
      var program = loadProgram(gl, [vertexShader, fragmentShader]);

      // Initializing locations
      var uniformLocations = {};
      def.UNIFORMS.forEach(function (uniformName) {
        var location = gl.getUniformLocation(program, uniformName);
        if (location) uniformLocations[uniformName] = location;
      });
      var attributeLocations = {};
      def.ATTRIBUTES.forEach(function (attr) {
        attributeLocations[attr.name] = gl.getAttribLocation(program, attr.name);
      });

      // For instanced programs:
      var constantBuffer;
      if ("CONSTANT_ATTRIBUTES" in def) {
        def.CONSTANT_ATTRIBUTES.forEach(function (attr) {
          attributeLocations[attr.name] = gl.getAttribLocation(program, attr.name);
        });
        constantBuffer = gl.createBuffer();
        if (constantBuffer === null) throw new Error("Program: error while creating the WebGL constant buffer.");
      }
      return {
        name: name,
        program: program,
        gl: gl,
        frameBuffer: frameBuffer,
        buffer: buffer,
        constantBuffer: constantBuffer || {},
        uniformLocations: uniformLocations,
        attributeLocations: attributeLocations,
        isPicking: name === "pick",
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      };
    }
  }, {
    key: "bindProgram",
    value: function bindProgram(program) {
      var _this = this;
      var offset = 0;
      var gl = program.gl,
        buffer = program.buffer;
      if (!this.isInstanced) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        offset = 0;
        this.ATTRIBUTES.forEach(function (attr) {
          return offset += _this.bindAttribute(attr, program, offset);
        });
        gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.DYNAMIC_DRAW);
      } else {
        // Handle constant data (things that remain unchanged for all items):
        gl.bindBuffer(gl.ARRAY_BUFFER, program.constantBuffer);
        offset = 0;
        this.CONSTANT_ATTRIBUTES.forEach(function (attr) {
          return offset += _this.bindAttribute(attr, program, offset, false);
        });
        gl.bufferData(gl.ARRAY_BUFFER, this.constantArray, gl.STATIC_DRAW);

        // Handle "instance specific" data (things that vary for each item):
        gl.bindBuffer(gl.ARRAY_BUFFER, program.buffer);
        offset = 0;
        this.ATTRIBUTES.forEach(function (attr) {
          return offset += _this.bindAttribute(attr, program, offset, true);
        });
        gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.DYNAMIC_DRAW);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
  }, {
    key: "unbindProgram",
    value: function unbindProgram(program) {
      var _this2 = this;
      if (!this.isInstanced) {
        this.ATTRIBUTES.forEach(function (attr) {
          return _this2.unbindAttribute(attr, program);
        });
      } else {
        this.CONSTANT_ATTRIBUTES.forEach(function (attr) {
          return _this2.unbindAttribute(attr, program, false);
        });
        this.ATTRIBUTES.forEach(function (attr) {
          return _this2.unbindAttribute(attr, program, true);
        });
      }
    }
  }, {
    key: "bindAttribute",
    value: function bindAttribute(attr, program, offset, setDivisor) {
      var sizeFactor = SIZE_FACTOR_PER_ATTRIBUTE_TYPE[attr.type];
      if (typeof sizeFactor !== "number") throw new Error("Program.bind: yet unsupported attribute type \"".concat(attr.type, "\""));
      var location = program.attributeLocations[attr.name];
      var gl = program.gl;
      if (location !== -1) {
        gl.enableVertexAttribArray(location);
        var stride = !this.isInstanced ? this.ATTRIBUTES_ITEMS_COUNT * Float32Array.BYTES_PER_ELEMENT : (setDivisor ? this.ATTRIBUTES_ITEMS_COUNT : getAttributesItemsCount(this.CONSTANT_ATTRIBUTES)) * Float32Array.BYTES_PER_ELEMENT;
        gl.vertexAttribPointer(location, attr.size, attr.type, attr.normalized || false, stride, offset);
        if (this.isInstanced && setDivisor) {
          if (gl instanceof WebGL2RenderingContext) {
            gl.vertexAttribDivisor(location, 1);
          } else {
            var ext = gl.getExtension("ANGLE_instanced_arrays");
            if (ext) ext.vertexAttribDivisorANGLE(location, 1);
          }
        }
      }
      return attr.size * sizeFactor;
    }
  }, {
    key: "unbindAttribute",
    value: function unbindAttribute(attr, program, unsetDivisor) {
      var location = program.attributeLocations[attr.name];
      var gl = program.gl;
      if (location !== -1) {
        gl.disableVertexAttribArray(location);
        if (this.isInstanced && unsetDivisor) {
          if (gl instanceof WebGL2RenderingContext) {
            gl.vertexAttribDivisor(location, 0);
          } else {
            var ext = gl.getExtension("ANGLE_instanced_arrays");
            if (ext) ext.vertexAttribDivisorANGLE(location, 0);
          }
        }
      }
    }
  }, {
    key: "reallocate",
    value: function reallocate(capacity) {
      // If desired capacity has not changed we do nothing
      // NOTE: it's possible here to implement more subtle reallocation schemes
      // when the number of rendered items increase or decrease
      if (capacity === this.capacity) return;
      this.capacity = capacity;
      this.verticesCount = this.VERTICES * capacity;
      this.array = new Float32Array(!this.isInstanced ? this.verticesCount * this.ATTRIBUTES_ITEMS_COUNT : this.capacity * this.ATTRIBUTES_ITEMS_COUNT);
    }
  }, {
    key: "hasNothingToRender",
    value: function hasNothingToRender() {
      return this.verticesCount === 0;
    }
  }, {
    key: "renderProgram",
    value: function renderProgram(params, programInfo) {
      var gl = programInfo.gl,
        program = programInfo.program;

      // With the current fix for #1397, the alpha blending is enabled for the
      // picking layer:
      gl.enable(gl.BLEND);

      // Original code:
      // if (!isPicking) gl.enable(gl.BLEND);
      // else gl.disable(gl.BLEND);

      gl.useProgram(program);
      this.setUniforms(params, programInfo);
      this.drawWebGL(this.METHOD, programInfo);
    }
  }, {
    key: "render",
    value: function render(params) {
      if (this.hasNothingToRender()) return;
      if (this.pickProgram) {
        this.pickProgram.gl.viewport(0, 0, params.width * params.pixelRatio / params.downSizingRatio, params.height * params.pixelRatio / params.downSizingRatio);
        this.bindProgram(this.pickProgram);
        this.renderProgram(_objectSpread2(_objectSpread2({}, params), {}, {
          pixelRatio: params.pixelRatio / params.downSizingRatio
        }), this.pickProgram);
        this.unbindProgram(this.pickProgram);
      }
      this.normalProgram.gl.viewport(0, 0, params.width * params.pixelRatio, params.height * params.pixelRatio);
      this.bindProgram(this.normalProgram);
      this.renderProgram(params, this.normalProgram);
      this.unbindProgram(this.normalProgram);
    }
  }, {
    key: "drawWebGL",
    value: function drawWebGL(method, _ref) {
      var gl = _ref.gl,
        frameBuffer = _ref.frameBuffer;
      gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
      if (!this.isInstanced) {
        gl.drawArrays(method, 0, this.verticesCount);
      } else {
        if (gl instanceof WebGL2RenderingContext) {
          gl.drawArraysInstanced(method, 0, this.VERTICES, this.capacity);
        } else {
          var ext = gl.getExtension("ANGLE_instanced_arrays");
          if (ext) ext.drawArraysInstancedANGLE(method, 0, this.VERTICES, this.capacity);
        }
      }
    }
  }]);
}();

var AbstractNodeProgram = /*#__PURE__*/function (_AbstractProgram) {
  function AbstractNodeProgram() {
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, AbstractNodeProgram);
    return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, AbstractNodeProgram, arguments);
  }
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__._)(AbstractNodeProgram, _AbstractProgram);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(AbstractNodeProgram);
}(AbstractProgram);
var NodeProgram = /*#__PURE__*/function (_ref) {
  function NodeProgram() {
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, NodeProgram);
    return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, NodeProgram, arguments);
  }
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__._)(NodeProgram, _ref);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(NodeProgram, [{
    key: "kill",
    value: function kill() {
      _superPropGet(NodeProgram, "kill", this, 3)([]);
    }
  }, {
    key: "process",
    value: function process(nodeIndex, offset, data) {
      var i = offset * this.STRIDE;
      // NOTE: dealing with hidden items automatically
      if (data.hidden) {
        for (var l = i + this.STRIDE; i < l; i++) {
          this.array[i] = 0;
        }
        return;
      }
      return this.processVisibleItem((0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_1__.i)(nodeIndex), i, data);
    }
  }]);
}(Program);
/**
 * Helper function combining two or more programs into a single compound one.
 * Note that this is more a quick & easy way to combine program than a really
 * performant option. More performant programs can be written entirely.
 *
 * @param  {array}    programClasses - Program classes to combine.
 * @param  {function} drawLabel - An optional node "draw label" function.
 * @param  {function} drawHover - An optional node "draw hover" function.
 * @return {function}
 */
function createNodeCompoundProgram(programClasses, drawLabel, drawHover) {
  return /*#__PURE__*/function () {
    function NodeCompoundProgram(gl, pickingBuffer, renderer) {
      (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, NodeCompoundProgram);
      _defineProperty(this, "drawLabel", drawLabel);
      _defineProperty(this, "drawHover", drawHover);
      this.programs = programClasses.map(function (Program) {
        return new Program(gl, pickingBuffer, renderer);
      });
    }
    return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(NodeCompoundProgram, [{
      key: "reallocate",
      value: function reallocate(capacity) {
        this.programs.forEach(function (program) {
          return program.reallocate(capacity);
        });
      }
    }, {
      key: "process",
      value: function process(nodeIndex, offset, data) {
        this.programs.forEach(function (program) {
          return program.process(nodeIndex, offset, data);
        });
      }
    }, {
      key: "render",
      value: function render(params) {
        this.programs.forEach(function (program) {
          return program.render(params);
        });
      }
    }, {
      key: "kill",
      value: function kill() {
        this.programs.forEach(function (program) {
          return program.kill();
        });
      }
    }]);
  }();
}

var AbstractEdgeProgram = /*#__PURE__*/function (_AbstractProgram) {
  function AbstractEdgeProgram() {
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, AbstractEdgeProgram);
    return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, AbstractEdgeProgram, arguments);
  }
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__._)(AbstractEdgeProgram, _AbstractProgram);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(AbstractEdgeProgram);
}(AbstractProgram);
var EdgeProgram = /*#__PURE__*/function (_ref) {
  function EdgeProgram() {
    var _this;
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, EdgeProgram);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, EdgeProgram, [].concat(args));
    _defineProperty(_this, "drawLabel", undefined);
    return _this;
  }
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__._)(EdgeProgram, _ref);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(EdgeProgram, [{
    key: "kill",
    value: function kill() {
      _superPropGet(EdgeProgram, "kill", this, 3)([]);
    }
  }, {
    key: "process",
    value: function process(edgeIndex, offset, sourceData, targetData, data) {
      var i = offset * this.STRIDE;
      // NOTE: dealing with hidden items automatically
      if (data.hidden || sourceData.hidden || targetData.hidden) {
        for (var l = i + this.STRIDE; i < l; i++) {
          this.array[i] = 0;
        }
        return;
      }
      return this.processVisibleItem((0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_1__.i)(edgeIndex), i, sourceData, targetData, data);
    }
  }]);
}(Program);
/**
 * Helper function combining two or more programs into a single compound one.
 * Note that this is more a quick & easy way to combine program than a really
 * performant option. More performant programs can be written entirely.
 *
 * @param  {array}    programClasses - Program classes to combine.
 * @param  {function} drawLabel - An optional edge "draw label" function.
 * @return {function}
 */
function createEdgeCompoundProgram(programClasses, drawLabel) {
  return /*#__PURE__*/function () {
    function EdgeCompoundProgram(gl, pickingBuffer, renderer) {
      (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, EdgeCompoundProgram);
      _defineProperty(this, "drawLabel", drawLabel);
      this.programs = programClasses.map(function (Program) {
        return new Program(gl, pickingBuffer, renderer);
      });
    }
    return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(EdgeCompoundProgram, [{
      key: "reallocate",
      value: function reallocate(capacity) {
        this.programs.forEach(function (program) {
          return program.reallocate(capacity);
        });
      }
    }, {
      key: "process",
      value: function process(edgeIndex, offset, sourceData, targetData, data) {
        this.programs.forEach(function (program) {
          return program.process(edgeIndex, offset, sourceData, targetData, data);
        });
      }
    }, {
      key: "render",
      value: function render(params) {
        this.programs.forEach(function (program) {
          return program.render(params);
        });
      }
    }, {
      key: "kill",
      value: function kill() {
        this.programs.forEach(function (program) {
          return program.kill();
        });
      }
    }]);
  }();
}

function drawStraightEdgeLabel(context, edgeData, sourceData, targetData, settings) {
  var size = settings.edgeLabelSize,
    font = settings.edgeLabelFont,
    weight = settings.edgeLabelWeight,
    color = settings.edgeLabelColor.attribute ? edgeData[settings.edgeLabelColor.attribute] || settings.edgeLabelColor.color || "#000" : settings.edgeLabelColor.color;
  var label = edgeData.label;
  if (!label) return;
  context.fillStyle = color;
  context.font = "".concat(weight, " ").concat(size, "px ").concat(font);

  // Computing positions without considering nodes sizes:
  var sSize = sourceData.size;
  var tSize = targetData.size;
  var sx = sourceData.x;
  var sy = sourceData.y;
  var tx = targetData.x;
  var ty = targetData.y;
  var cx = (sx + tx) / 2;
  var cy = (sy + ty) / 2;
  var dx = tx - sx;
  var dy = ty - sy;
  var d = Math.sqrt(dx * dx + dy * dy);
  if (d < sSize + tSize) return;

  // Adding nodes sizes:
  sx += dx * sSize / d;
  sy += dy * sSize / d;
  tx -= dx * tSize / d;
  ty -= dy * tSize / d;
  cx = (sx + tx) / 2;
  cy = (sy + ty) / 2;
  dx = tx - sx;
  dy = ty - sy;
  d = Math.sqrt(dx * dx + dy * dy);

  // Handling ellipsis
  var textLength = context.measureText(label).width;
  if (textLength > d) {
    var ellipsis = "…";
    label = label + ellipsis;
    textLength = context.measureText(label).width;
    while (textLength > d && label.length > 1) {
      label = label.slice(0, -2) + ellipsis;
      textLength = context.measureText(label).width;
    }
    if (label.length < 4) return;
  }
  var angle;
  if (dx > 0) {
    if (dy > 0) angle = Math.acos(dx / d);else angle = Math.asin(dy / d);
  } else {
    if (dy > 0) angle = Math.acos(dx / d) + Math.PI;else angle = Math.asin(dx / d) + Math.PI / 2;
  }
  context.save();
  context.translate(cx, cy);
  context.rotate(angle);
  context.fillText(label, -textLength / 2, edgeData.size / 2 + size);
  context.restore();
}

function drawDiscNodeLabel(context, data, settings) {
  if (!data.label) return;
  var size = settings.labelSize,
    font = settings.labelFont,
    weight = settings.labelWeight,
    color = settings.labelColor.attribute ? data[settings.labelColor.attribute] || settings.labelColor.color || "#000" : settings.labelColor.color;
  context.fillStyle = color;
  context.font = "".concat(weight, " ").concat(size, "px ").concat(font);
  context.fillText(data.label, data.x + data.size + 3, data.y + size / 3);
}

/**
 * Draw an hovered node.
 * - if there is no label => display a shadow on the node
 * - if the label box is bigger than node size => display a label box that contains the node with a shadow
 * - else node with shadow and the label box
 */
function drawDiscNodeHover(context, data, settings) {
  var size = settings.labelSize,
    font = settings.labelFont,
    weight = settings.labelWeight;
  context.font = "".concat(weight, " ").concat(size, "px ").concat(font);

  // Then we draw the label background
  context.fillStyle = "#FFF";
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowBlur = 8;
  context.shadowColor = "#000";
  var PADDING = 2;
  if (typeof data.label === "string") {
    var textWidth = context.measureText(data.label).width,
      boxWidth = Math.round(textWidth + 5),
      boxHeight = Math.round(size + 2 * PADDING),
      radius = Math.max(data.size, size / 2) + PADDING;
    var angleRadian = Math.asin(boxHeight / 2 / radius);
    var xDeltaCoord = Math.sqrt(Math.abs(Math.pow(radius, 2) - Math.pow(boxHeight / 2, 2)));
    context.beginPath();
    context.moveTo(data.x + xDeltaCoord, data.y + boxHeight / 2);
    context.lineTo(data.x + radius + boxWidth, data.y + boxHeight / 2);
    context.lineTo(data.x + radius + boxWidth, data.y - boxHeight / 2);
    context.lineTo(data.x + xDeltaCoord, data.y - boxHeight / 2);
    context.arc(data.x, data.y, radius, angleRadian, -angleRadian);
    context.closePath();
    context.fill();
  } else {
    context.beginPath();
    context.arc(data.x, data.y, data.size + PADDING, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowBlur = 0;

  // And finally we draw the label
  drawDiscNodeLabel(context, data, settings);
}

// language=GLSL
var SHADER_SOURCE$6 = /*glsl*/"\nprecision highp float;\n\nvarying vec4 v_color;\nvarying vec2 v_diffVector;\nvarying float v_radius;\n\nuniform float u_correctionRatio;\n\nconst vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n\nvoid main(void) {\n  float border = u_correctionRatio * 2.0;\n  float dist = length(v_diffVector) - v_radius + border;\n\n  // No antialiasing for picking mode:\n  #ifdef PICKING_MODE\n  if (dist > border)\n    gl_FragColor = transparent;\n  else\n    gl_FragColor = v_color;\n\n  #else\n  float t = 0.0;\n  if (dist > border)\n    t = 1.0;\n  else if (dist > 0.0)\n    t = dist / border;\n\n  gl_FragColor = mix(v_color, transparent, t);\n  #endif\n}\n";
var FRAGMENT_SHADER_SOURCE$2 = SHADER_SOURCE$6;

// language=GLSL
var SHADER_SOURCE$5 = /*glsl*/"\nattribute vec4 a_id;\nattribute vec4 a_color;\nattribute vec2 a_position;\nattribute float a_size;\nattribute float a_angle;\n\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\n\nvarying vec4 v_color;\nvarying vec2 v_diffVector;\nvarying float v_radius;\nvarying float v_border;\n\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;\n  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));\n  vec2 position = a_position + diffVector;\n  gl_Position = vec4(\n    (u_matrix * vec3(position, 1)).xy,\n    0,\n    1\n  );\n\n  v_diffVector = diffVector;\n  v_radius = size / 2.0;\n\n  #ifdef PICKING_MODE\n  // For picking mode, we use the ID as the color:\n  v_color = a_id;\n  #else\n  // For normal mode, we use the color:\n  v_color = a_color;\n  #endif\n\n  v_color.a *= bias;\n}\n";
var VERTEX_SHADER_SOURCE$3 = SHADER_SOURCE$5;

var _WebGLRenderingContex$3 = WebGLRenderingContext,
  UNSIGNED_BYTE$3 = _WebGLRenderingContex$3.UNSIGNED_BYTE,
  FLOAT$3 = _WebGLRenderingContex$3.FLOAT;
var UNIFORMS$3 = ["u_sizeRatio", "u_correctionRatio", "u_matrix"];
var NodeCircleProgram = /*#__PURE__*/function (_NodeProgram) {
  function NodeCircleProgram() {
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, NodeCircleProgram);
    return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, NodeCircleProgram, arguments);
  }
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__._)(NodeCircleProgram, _NodeProgram);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(NodeCircleProgram, [{
    key: "getDefinition",
    value: function getDefinition() {
      return {
        VERTICES: 3,
        VERTEX_SHADER_SOURCE: VERTEX_SHADER_SOURCE$3,
        FRAGMENT_SHADER_SOURCE: FRAGMENT_SHADER_SOURCE$2,
        METHOD: WebGLRenderingContext.TRIANGLES,
        UNIFORMS: UNIFORMS$3,
        ATTRIBUTES: [{
          name: "a_position",
          size: 2,
          type: FLOAT$3
        }, {
          name: "a_size",
          size: 1,
          type: FLOAT$3
        }, {
          name: "a_color",
          size: 4,
          type: UNSIGNED_BYTE$3,
          normalized: true
        }, {
          name: "a_id",
          size: 4,
          type: UNSIGNED_BYTE$3,
          normalized: true
        }],
        CONSTANT_ATTRIBUTES: [{
          name: "a_angle",
          size: 1,
          type: FLOAT$3
        }],
        CONSTANT_DATA: [[NodeCircleProgram.ANGLE_1], [NodeCircleProgram.ANGLE_2], [NodeCircleProgram.ANGLE_3]]
      };
    }
  }, {
    key: "processVisibleItem",
    value: function processVisibleItem(nodeIndex, startIndex, data) {
      var array = this.array;
      var color = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_1__.f)(data.color);
      array[startIndex++] = data.x;
      array[startIndex++] = data.y;
      array[startIndex++] = data.size;
      array[startIndex++] = color;
      array[startIndex++] = nodeIndex;
    }
  }, {
    key: "setUniforms",
    value: function setUniforms(params, _ref) {
      var gl = _ref.gl,
        uniformLocations = _ref.uniformLocations;
      var u_sizeRatio = uniformLocations.u_sizeRatio,
        u_correctionRatio = uniformLocations.u_correctionRatio,
        u_matrix = uniformLocations.u_matrix;
      gl.uniform1f(u_correctionRatio, params.correctionRatio);
      gl.uniform1f(u_sizeRatio, params.sizeRatio);
      gl.uniformMatrix3fv(u_matrix, false, params.matrix);
    }
  }]);
}(NodeProgram);
_defineProperty(NodeCircleProgram, "ANGLE_1", 0);
_defineProperty(NodeCircleProgram, "ANGLE_2", 2 * Math.PI / 3);
_defineProperty(NodeCircleProgram, "ANGLE_3", 4 * Math.PI / 3);

// language=GLSL
var SHADER_SOURCE$4 = /*glsl*/"\nprecision mediump float;\n\nvarying vec4 v_color;\n\nvoid main(void) {\n  gl_FragColor = v_color;\n}\n";
var FRAGMENT_SHADER_SOURCE$1 = SHADER_SOURCE$4;

// language=GLSL
var SHADER_SOURCE$3 = /*glsl*/"\nattribute vec2 a_position;\nattribute vec2 a_normal;\nattribute float a_radius;\nattribute vec3 a_barycentric;\n\n#ifdef PICKING_MODE\nattribute vec4 a_id;\n#else\nattribute vec4 a_color;\n#endif\n\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_minEdgeThickness;\nuniform float u_lengthToThicknessRatio;\nuniform float u_widenessToThicknessRatio;\n\nvarying vec4 v_color;\n\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n  float minThickness = u_minEdgeThickness;\n\n  float normalLength = length(a_normal);\n  vec2 unitNormal = a_normal / normalLength;\n\n  // These first computations are taken from edge.vert.glsl and\n  // edge.clamped.vert.glsl. Please read it to get better comments on what's\n  // happening:\n  float pixelsThickness = max(normalLength / u_sizeRatio, minThickness);\n  float webGLThickness = pixelsThickness * u_correctionRatio;\n  float webGLNodeRadius = a_radius * 2.0 * u_correctionRatio / u_sizeRatio;\n  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;\n  float webGLArrowHeadThickness = webGLThickness * u_widenessToThicknessRatio;\n\n  float da = a_barycentric.x;\n  float db = a_barycentric.y;\n  float dc = a_barycentric.z;\n\n  vec2 delta = vec2(\n      da * (webGLNodeRadius * unitNormal.y)\n    + db * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y + webGLArrowHeadThickness * unitNormal.x)\n    + dc * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y - webGLArrowHeadThickness * unitNormal.x),\n\n      da * (-webGLNodeRadius * unitNormal.x)\n    + db * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x + webGLArrowHeadThickness * unitNormal.y)\n    + dc * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x - webGLArrowHeadThickness * unitNormal.y)\n  );\n\n  vec2 position = (u_matrix * vec3(a_position + delta, 1)).xy;\n\n  gl_Position = vec4(position, 0, 1);\n\n  #ifdef PICKING_MODE\n  // For picking mode, we use the ID as the color:\n  v_color = a_id;\n  #else\n  // For normal mode, we use the color:\n  v_color = a_color;\n  #endif\n\n  v_color.a *= bias;\n}\n";
var VERTEX_SHADER_SOURCE$2 = SHADER_SOURCE$3;

var _WebGLRenderingContex$2 = WebGLRenderingContext,
  UNSIGNED_BYTE$2 = _WebGLRenderingContex$2.UNSIGNED_BYTE,
  FLOAT$2 = _WebGLRenderingContex$2.FLOAT;
var UNIFORMS$2 = ["u_matrix", "u_sizeRatio", "u_correctionRatio", "u_minEdgeThickness", "u_lengthToThicknessRatio", "u_widenessToThicknessRatio"];
var DEFAULT_EDGE_ARROW_HEAD_PROGRAM_OPTIONS = {
  extremity: "target",
  lengthToThicknessRatio: 2.5,
  widenessToThicknessRatio: 2
};
function createEdgeArrowHeadProgram(inputOptions) {
  var options = _objectSpread2(_objectSpread2({}, DEFAULT_EDGE_ARROW_HEAD_PROGRAM_OPTIONS), inputOptions || {});
  return /*#__PURE__*/function (_EdgeProgram) {
    function EdgeArrowHeadProgram() {
      (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, EdgeArrowHeadProgram);
      return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, EdgeArrowHeadProgram, arguments);
    }
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__._)(EdgeArrowHeadProgram, _EdgeProgram);
    return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(EdgeArrowHeadProgram, [{
      key: "getDefinition",
      value: function getDefinition() {
        return {
          VERTICES: 3,
          VERTEX_SHADER_SOURCE: VERTEX_SHADER_SOURCE$2,
          FRAGMENT_SHADER_SOURCE: FRAGMENT_SHADER_SOURCE$1,
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: UNIFORMS$2,
          ATTRIBUTES: [{
            name: "a_position",
            size: 2,
            type: FLOAT$2
          }, {
            name: "a_normal",
            size: 2,
            type: FLOAT$2
          }, {
            name: "a_radius",
            size: 1,
            type: FLOAT$2
          }, {
            name: "a_color",
            size: 4,
            type: UNSIGNED_BYTE$2,
            normalized: true
          }, {
            name: "a_id",
            size: 4,
            type: UNSIGNED_BYTE$2,
            normalized: true
          }],
          CONSTANT_ATTRIBUTES: [{
            name: "a_barycentric",
            size: 3,
            type: FLOAT$2
          }],
          CONSTANT_DATA: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        };
      }
    }, {
      key: "processVisibleItem",
      value: function processVisibleItem(edgeIndex, startIndex, sourceData, targetData, data) {
        if (options.extremity === "source") {
          var _ref = [targetData, sourceData];
          sourceData = _ref[0];
          targetData = _ref[1];
        }
        var thickness = data.size || 1;
        var radius = targetData.size || 1;
        var x1 = sourceData.x;
        var y1 = sourceData.y;
        var x2 = targetData.x;
        var y2 = targetData.y;
        var color = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_1__.f)(data.color);

        // Computing normals
        var dx = x2 - x1;
        var dy = y2 - y1;
        var len = dx * dx + dy * dy;
        var n1 = 0;
        var n2 = 0;
        if (len) {
          len = 1 / Math.sqrt(len);
          n1 = -dy * len * thickness;
          n2 = dx * len * thickness;
        }
        var array = this.array;
        array[startIndex++] = x2;
        array[startIndex++] = y2;
        array[startIndex++] = -n1;
        array[startIndex++] = -n2;
        array[startIndex++] = radius;
        array[startIndex++] = color;
        array[startIndex++] = edgeIndex;
      }
    }, {
      key: "setUniforms",
      value: function setUniforms(params, _ref2) {
        var gl = _ref2.gl,
          uniformLocations = _ref2.uniformLocations;
        var u_matrix = uniformLocations.u_matrix,
          u_sizeRatio = uniformLocations.u_sizeRatio,
          u_correctionRatio = uniformLocations.u_correctionRatio,
          u_minEdgeThickness = uniformLocations.u_minEdgeThickness,
          u_lengthToThicknessRatio = uniformLocations.u_lengthToThicknessRatio,
          u_widenessToThicknessRatio = uniformLocations.u_widenessToThicknessRatio;
        gl.uniformMatrix3fv(u_matrix, false, params.matrix);
        gl.uniform1f(u_sizeRatio, params.sizeRatio);
        gl.uniform1f(u_correctionRatio, params.correctionRatio);
        gl.uniform1f(u_minEdgeThickness, params.minEdgeThickness);
        gl.uniform1f(u_lengthToThicknessRatio, options.lengthToThicknessRatio);
        gl.uniform1f(u_widenessToThicknessRatio, options.widenessToThicknessRatio);
      }
    }]);
  }(EdgeProgram);
}
var EdgeArrowHeadProgram = createEdgeArrowHeadProgram();
var EdgeArrowHeadProgram$1 = EdgeArrowHeadProgram;

// language=GLSL
var SHADER_SOURCE$2 = /*glsl*/"\nprecision mediump float;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\nvarying float v_feather;\n\nconst vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n\nvoid main(void) {\n  // We only handle antialiasing for normal mode:\n  #ifdef PICKING_MODE\n  gl_FragColor = v_color;\n  #else\n  float dist = length(v_normal) * v_thickness;\n\n  float t = smoothstep(\n    v_thickness - v_feather,\n    v_thickness,\n    dist\n  );\n\n  gl_FragColor = mix(v_color, transparent, t);\n  #endif\n}\n";
var FRAGMENT_SHADER_SOURCE = SHADER_SOURCE$2;

// language=GLSL
var SHADER_SOURCE$1 = /*glsl*/"\nattribute vec4 a_id;\nattribute vec4 a_color;\nattribute vec2 a_normal;\nattribute float a_normalCoef;\nattribute vec2 a_positionStart;\nattribute vec2 a_positionEnd;\nattribute float a_positionCoef;\nattribute float a_radius;\nattribute float a_radiusCoef;\n\nuniform mat3 u_matrix;\nuniform float u_zoomRatio;\nuniform float u_sizeRatio;\nuniform float u_pixelRatio;\nuniform float u_correctionRatio;\nuniform float u_minEdgeThickness;\nuniform float u_lengthToThicknessRatio;\nuniform float u_feather;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\nvarying float v_feather;\n\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n  float minThickness = u_minEdgeThickness;\n\n  float radius = a_radius * a_radiusCoef;\n  vec2 normal = a_normal * a_normalCoef;\n  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;\n\n  float normalLength = length(normal);\n  vec2 unitNormal = normal / normalLength;\n\n  // These first computations are taken from edge.vert.glsl. Please read it to\n  // get better comments on what's happening:\n  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);\n  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;\n\n  // Here, we move the point to leave space for the arrow head:\n  float direction = sign(radius);\n  float webGLNodeRadius = direction * radius * 2.0 * u_correctionRatio / u_sizeRatio;\n  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;\n\n  vec2 compensationVector = vec2(-direction * unitNormal.y, direction * unitNormal.x) * (webGLNodeRadius + webGLArrowHeadLength);\n\n  // Here is the proper position of the vertex\n  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness + compensationVector, 1)).xy, 0, 1);\n\n  v_thickness = webGLThickness / u_zoomRatio;\n\n  v_normal = unitNormal;\n\n  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;\n\n  #ifdef PICKING_MODE\n  // For picking mode, we use the ID as the color:\n  v_color = a_id;\n  #else\n  // For normal mode, we use the color:\n  v_color = a_color;\n  #endif\n\n  v_color.a *= bias;\n}\n";
var VERTEX_SHADER_SOURCE$1 = SHADER_SOURCE$1;

var _WebGLRenderingContex$1 = WebGLRenderingContext,
  UNSIGNED_BYTE$1 = _WebGLRenderingContex$1.UNSIGNED_BYTE,
  FLOAT$1 = _WebGLRenderingContex$1.FLOAT;
var UNIFORMS$1 = ["u_matrix", "u_zoomRatio", "u_sizeRatio", "u_correctionRatio", "u_pixelRatio", "u_feather", "u_minEdgeThickness", "u_lengthToThicknessRatio"];
var DEFAULT_EDGE_CLAMPED_PROGRAM_OPTIONS = {
  lengthToThicknessRatio: DEFAULT_EDGE_ARROW_HEAD_PROGRAM_OPTIONS.lengthToThicknessRatio
};
function createEdgeClampedProgram(inputOptions) {
  var options = _objectSpread2(_objectSpread2({}, DEFAULT_EDGE_CLAMPED_PROGRAM_OPTIONS), inputOptions || {});
  return /*#__PURE__*/function (_EdgeProgram) {
    function EdgeClampedProgram() {
      (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, EdgeClampedProgram);
      return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, EdgeClampedProgram, arguments);
    }
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__._)(EdgeClampedProgram, _EdgeProgram);
    return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(EdgeClampedProgram, [{
      key: "getDefinition",
      value: function getDefinition() {
        return {
          VERTICES: 6,
          VERTEX_SHADER_SOURCE: VERTEX_SHADER_SOURCE$1,
          FRAGMENT_SHADER_SOURCE: FRAGMENT_SHADER_SOURCE,
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: UNIFORMS$1,
          ATTRIBUTES: [{
            name: "a_positionStart",
            size: 2,
            type: FLOAT$1
          }, {
            name: "a_positionEnd",
            size: 2,
            type: FLOAT$1
          }, {
            name: "a_normal",
            size: 2,
            type: FLOAT$1
          }, {
            name: "a_color",
            size: 4,
            type: UNSIGNED_BYTE$1,
            normalized: true
          }, {
            name: "a_id",
            size: 4,
            type: UNSIGNED_BYTE$1,
            normalized: true
          }, {
            name: "a_radius",
            size: 1,
            type: FLOAT$1
          }],
          CONSTANT_ATTRIBUTES: [
          // If 0, then position will be a_positionStart
          // If 1, then position will be a_positionEnd
          {
            name: "a_positionCoef",
            size: 1,
            type: FLOAT$1
          }, {
            name: "a_normalCoef",
            size: 1,
            type: FLOAT$1
          }, {
            name: "a_radiusCoef",
            size: 1,
            type: FLOAT$1
          }],
          CONSTANT_DATA: [[0, 1, 0], [0, -1, 0], [1, 1, 1], [1, 1, 1], [0, -1, 0], [1, -1, -1]]
        };
      }
    }, {
      key: "processVisibleItem",
      value: function processVisibleItem(edgeIndex, startIndex, sourceData, targetData, data) {
        var thickness = data.size || 1;
        var x1 = sourceData.x;
        var y1 = sourceData.y;
        var x2 = targetData.x;
        var y2 = targetData.y;
        var color = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_1__.f)(data.color);

        // Computing normals
        var dx = x2 - x1;
        var dy = y2 - y1;
        var radius = targetData.size || 1;
        var len = dx * dx + dy * dy;
        var n1 = 0;
        var n2 = 0;
        if (len) {
          len = 1 / Math.sqrt(len);
          n1 = -dy * len * thickness;
          n2 = dx * len * thickness;
        }
        var array = this.array;
        array[startIndex++] = x1;
        array[startIndex++] = y1;
        array[startIndex++] = x2;
        array[startIndex++] = y2;
        array[startIndex++] = n1;
        array[startIndex++] = n2;
        array[startIndex++] = color;
        array[startIndex++] = edgeIndex;
        array[startIndex++] = radius;
      }
    }, {
      key: "setUniforms",
      value: function setUniforms(params, _ref) {
        var gl = _ref.gl,
          uniformLocations = _ref.uniformLocations;
        var u_matrix = uniformLocations.u_matrix,
          u_zoomRatio = uniformLocations.u_zoomRatio,
          u_feather = uniformLocations.u_feather,
          u_pixelRatio = uniformLocations.u_pixelRatio,
          u_correctionRatio = uniformLocations.u_correctionRatio,
          u_sizeRatio = uniformLocations.u_sizeRatio,
          u_minEdgeThickness = uniformLocations.u_minEdgeThickness,
          u_lengthToThicknessRatio = uniformLocations.u_lengthToThicknessRatio;
        gl.uniformMatrix3fv(u_matrix, false, params.matrix);
        gl.uniform1f(u_zoomRatio, params.zoomRatio);
        gl.uniform1f(u_sizeRatio, params.sizeRatio);
        gl.uniform1f(u_correctionRatio, params.correctionRatio);
        gl.uniform1f(u_pixelRatio, params.pixelRatio);
        gl.uniform1f(u_feather, params.antiAliasingFeather);
        gl.uniform1f(u_minEdgeThickness, params.minEdgeThickness);
        gl.uniform1f(u_lengthToThicknessRatio, options.lengthToThicknessRatio);
      }
    }]);
  }(EdgeProgram);
}
var EdgeClampedProgram = createEdgeClampedProgram();
var EdgeClampedProgram$1 = EdgeClampedProgram;

function createEdgeArrowProgram(inputOptions) {
  return createEdgeCompoundProgram([createEdgeClampedProgram(inputOptions), createEdgeArrowHeadProgram(inputOptions)]);
}
var EdgeArrowProgram = createEdgeArrowProgram();
var EdgeArrowProgram$1 = EdgeArrowProgram;

// language=GLSL
var SHADER_SOURCE = /*glsl*/"\nattribute vec4 a_id;\nattribute vec4 a_color;\nattribute vec2 a_normal;\nattribute float a_normalCoef;\nattribute vec2 a_positionStart;\nattribute vec2 a_positionEnd;\nattribute float a_positionCoef;\n\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_zoomRatio;\nuniform float u_pixelRatio;\nuniform float u_correctionRatio;\nuniform float u_minEdgeThickness;\nuniform float u_feather;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\nvarying float v_feather;\n\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n  float minThickness = u_minEdgeThickness;\n\n  vec2 normal = a_normal * a_normalCoef;\n  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;\n\n  float normalLength = length(normal);\n  vec2 unitNormal = normal / normalLength;\n\n  // We require edges to be at least \"minThickness\" pixels thick *on screen*\n  // (so we need to compensate the size ratio):\n  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);\n\n  // Then, we need to retrieve the normalized thickness of the edge in the WebGL\n  // referential (in a ([0, 1], [0, 1]) space), using our \"magic\" correction\n  // ratio:\n  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;\n\n  // Here is the proper position of the vertex\n  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness, 1)).xy, 0, 1);\n\n  // For the fragment shader though, we need a thickness that takes the \"magic\"\n  // correction ratio into account (as in webGLThickness), but so that the\n  // antialiasing effect does not depend on the zoom level. So here's yet\n  // another thickness version:\n  v_thickness = webGLThickness / u_zoomRatio;\n\n  v_normal = unitNormal;\n\n  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;\n\n  #ifdef PICKING_MODE\n  // For picking mode, we use the ID as the color:\n  v_color = a_id;\n  #else\n  // For normal mode, we use the color:\n  v_color = a_color;\n  #endif\n\n  v_color.a *= bias;\n}\n";
var VERTEX_SHADER_SOURCE = SHADER_SOURCE;

var _WebGLRenderingContex = WebGLRenderingContext,
  UNSIGNED_BYTE = _WebGLRenderingContex.UNSIGNED_BYTE,
  FLOAT = _WebGLRenderingContex.FLOAT;
var UNIFORMS = ["u_matrix", "u_zoomRatio", "u_sizeRatio", "u_correctionRatio", "u_pixelRatio", "u_feather", "u_minEdgeThickness"];
var EdgeRectangleProgram = /*#__PURE__*/function (_EdgeProgram) {
  function EdgeRectangleProgram() {
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, EdgeRectangleProgram);
    return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, EdgeRectangleProgram, arguments);
  }
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__._)(EdgeRectangleProgram, _EdgeProgram);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(EdgeRectangleProgram, [{
    key: "getDefinition",
    value: function getDefinition() {
      return {
        VERTICES: 6,
        VERTEX_SHADER_SOURCE: VERTEX_SHADER_SOURCE,
        FRAGMENT_SHADER_SOURCE: FRAGMENT_SHADER_SOURCE,
        METHOD: WebGLRenderingContext.TRIANGLES,
        UNIFORMS: UNIFORMS,
        ATTRIBUTES: [{
          name: "a_positionStart",
          size: 2,
          type: FLOAT
        }, {
          name: "a_positionEnd",
          size: 2,
          type: FLOAT
        }, {
          name: "a_normal",
          size: 2,
          type: FLOAT
        }, {
          name: "a_color",
          size: 4,
          type: UNSIGNED_BYTE,
          normalized: true
        }, {
          name: "a_id",
          size: 4,
          type: UNSIGNED_BYTE,
          normalized: true
        }],
        CONSTANT_ATTRIBUTES: [
        // If 0, then position will be a_positionStart
        // If 2, then position will be a_positionEnd
        {
          name: "a_positionCoef",
          size: 1,
          type: FLOAT
        }, {
          name: "a_normalCoef",
          size: 1,
          type: FLOAT
        }],
        CONSTANT_DATA: [[0, 1], [0, -1], [1, 1], [1, 1], [0, -1], [1, -1]]
      };
    }
  }, {
    key: "processVisibleItem",
    value: function processVisibleItem(edgeIndex, startIndex, sourceData, targetData, data) {
      var thickness = data.size || 1;
      var x1 = sourceData.x;
      var y1 = sourceData.y;
      var x2 = targetData.x;
      var y2 = targetData.y;
      var color = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_1__.f)(data.color);

      // Computing normals
      var dx = x2 - x1;
      var dy = y2 - y1;
      var len = dx * dx + dy * dy;
      var n1 = 0;
      var n2 = 0;
      if (len) {
        len = 1 / Math.sqrt(len);
        n1 = -dy * len * thickness;
        n2 = dx * len * thickness;
      }
      var array = this.array;
      array[startIndex++] = x1;
      array[startIndex++] = y1;
      array[startIndex++] = x2;
      array[startIndex++] = y2;
      array[startIndex++] = n1;
      array[startIndex++] = n2;
      array[startIndex++] = color;
      array[startIndex++] = edgeIndex;
    }
  }, {
    key: "setUniforms",
    value: function setUniforms(params, _ref) {
      var gl = _ref.gl,
        uniformLocations = _ref.uniformLocations;
      var u_matrix = uniformLocations.u_matrix,
        u_zoomRatio = uniformLocations.u_zoomRatio,
        u_feather = uniformLocations.u_feather,
        u_pixelRatio = uniformLocations.u_pixelRatio,
        u_correctionRatio = uniformLocations.u_correctionRatio,
        u_sizeRatio = uniformLocations.u_sizeRatio,
        u_minEdgeThickness = uniformLocations.u_minEdgeThickness;
      gl.uniformMatrix3fv(u_matrix, false, params.matrix);
      gl.uniform1f(u_zoomRatio, params.zoomRatio);
      gl.uniform1f(u_sizeRatio, params.sizeRatio);
      gl.uniform1f(u_correctionRatio, params.correctionRatio);
      gl.uniform1f(u_pixelRatio, params.pixelRatio);
      gl.uniform1f(u_feather, params.antiAliasingFeather);
      gl.uniform1f(u_minEdgeThickness, params.minEdgeThickness);
    }
  }]);
}(EdgeProgram);




/***/ }),

/***/ "./node_modules/sigma/dist/inherits-d1a1e29b.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/sigma/dist/inherits-d1a1e29b.esm.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ _inherits),
/* harmony export */   a: () => (/* binding */ _createClass),
/* harmony export */   b: () => (/* binding */ _classCallCheck),
/* harmony export */   c: () => (/* binding */ _callSuper),
/* harmony export */   d: () => (/* binding */ _toPropertyKey),
/* harmony export */   e: () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}

function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}

function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}

function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}

function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}




/***/ }),

/***/ "./node_modules/sigma/dist/normalization-be445518.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/sigma/dist/normalization-be445518.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ANIMATE_DEFAULTS),
/* harmony export */   a: () => (/* binding */ getMatrixImpact),
/* harmony export */   b: () => (/* binding */ createElement),
/* harmony export */   c: () => (/* binding */ createNormalizationFunction),
/* harmony export */   d: () => (/* binding */ getPixelRatio),
/* harmony export */   e: () => (/* binding */ easings),
/* harmony export */   f: () => (/* binding */ multiplyVec2),
/* harmony export */   g: () => (/* binding */ graphExtent),
/* harmony export */   h: () => (/* binding */ animateNodes),
/* harmony export */   i: () => (/* binding */ identity),
/* harmony export */   j: () => (/* binding */ getCorrectionRatio),
/* harmony export */   k: () => (/* binding */ quadraticOut),
/* harmony export */   l: () => (/* binding */ linear),
/* harmony export */   m: () => (/* binding */ matrixFromCamera),
/* harmony export */   n: () => (/* binding */ quadraticInOut),
/* harmony export */   o: () => (/* binding */ cubicIn),
/* harmony export */   p: () => (/* binding */ cubicOut),
/* harmony export */   q: () => (/* binding */ quadraticIn),
/* harmony export */   r: () => (/* binding */ cubicInOut),
/* harmony export */   s: () => (/* binding */ scale),
/* harmony export */   t: () => (/* binding */ rotate),
/* harmony export */   u: () => (/* binding */ translate),
/* harmony export */   v: () => (/* binding */ validateGraph),
/* harmony export */   w: () => (/* binding */ multiply),
/* harmony export */   z: () => (/* binding */ zIndexOrdering)
/* harmony export */ });
/* harmony import */ var graphology_utils_is_graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphology-utils/is-graph */ "./node_modules/graphology-utils/is-graph.js");
/* harmony import */ var graphology_utils_is_graph__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphology_utils_is_graph__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colors-beb06eb2.esm.js */ "./node_modules/sigma/dist/colors-beb06eb2.esm.js");



var linear = function linear(k) {
  return k;
};
var quadraticIn = function quadraticIn(k) {
  return k * k;
};
var quadraticOut = function quadraticOut(k) {
  return k * (2 - k);
};
var quadraticInOut = function quadraticInOut(k) {
  if ((k *= 2) < 1) return 0.5 * k * k;
  return -0.5 * (--k * (k - 2) - 1);
};
var cubicIn = function cubicIn(k) {
  return k * k * k;
};
var cubicOut = function cubicOut(k) {
  return --k * k * k + 1;
};
var cubicInOut = function cubicInOut(k) {
  if ((k *= 2) < 1) return 0.5 * k * k * k;
  return 0.5 * ((k -= 2) * k * k + 2);
};
var easings = {
  linear: linear,
  quadraticIn: quadraticIn,
  quadraticOut: quadraticOut,
  quadraticInOut: quadraticInOut,
  cubicIn: cubicIn,
  cubicOut: cubicOut,
  cubicInOut: cubicInOut
};

/**
 * Defaults.
 */

var ANIMATE_DEFAULTS = {
  easing: "quadraticInOut",
  duration: 150
};

/**
 * Function used to animate the nodes.
 */
function animateNodes(graph, targets, opts, callback) {
  var options = Object.assign({}, ANIMATE_DEFAULTS, opts);
  var easing = typeof options.easing === "function" ? options.easing : easings[options.easing];
  var start = Date.now();
  var startPositions = {};
  for (var node in targets) {
    var attrs = targets[node];
    startPositions[node] = {};
    for (var _k in attrs) startPositions[node][_k] = graph.getNodeAttribute(node, _k);
  }
  var frame = null;
  var _step = function step() {
    frame = null;
    var p = (Date.now() - start) / options.duration;
    if (p >= 1) {
      // Animation is done
      for (var _node in targets) {
        var _attrs = targets[_node];

        // We use given values to avoid precision issues and for convenience
        for (var _k2 in _attrs) graph.setNodeAttribute(_node, _k2, _attrs[_k2]);
      }
      if (typeof callback === "function") callback();
      return;
    }
    p = easing(p);
    for (var _node2 in targets) {
      var _attrs2 = targets[_node2];
      var s = startPositions[_node2];
      for (var _k3 in _attrs2) graph.setNodeAttribute(_node2, _k3, _attrs2[_k3] * p + s[_k3] * (1 - p));
    }
    frame = requestAnimationFrame(_step);
  };
  _step();
  return function () {
    if (frame) cancelAnimationFrame(frame);
  };
}

function identity() {
  return Float32Array.of(1, 0, 0, 0, 1, 0, 0, 0, 1);
}

// TODO: optimize
function scale(m, x, y) {
  m[0] = x;
  m[4] = typeof y === "number" ? y : x;
  return m;
}
function rotate(m, r) {
  var s = Math.sin(r),
    c = Math.cos(r);
  m[0] = c;
  m[1] = s;
  m[3] = -s;
  m[4] = c;
  return m;
}
function translate(m, x, y) {
  m[6] = x;
  m[7] = y;
  return m;
}
function multiply(a, b) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2];
  var a10 = a[3],
    a11 = a[4],
    a12 = a[5];
  var a20 = a[6],
    a21 = a[7],
    a22 = a[8];
  var b00 = b[0],
    b01 = b[1],
    b02 = b[2];
  var b10 = b[3],
    b11 = b[4],
    b12 = b[5];
  var b20 = b[6],
    b21 = b[7],
    b22 = b[8];
  a[0] = b00 * a00 + b01 * a10 + b02 * a20;
  a[1] = b00 * a01 + b01 * a11 + b02 * a21;
  a[2] = b00 * a02 + b01 * a12 + b02 * a22;
  a[3] = b10 * a00 + b11 * a10 + b12 * a20;
  a[4] = b10 * a01 + b11 * a11 + b12 * a21;
  a[5] = b10 * a02 + b11 * a12 + b12 * a22;
  a[6] = b20 * a00 + b21 * a10 + b22 * a20;
  a[7] = b20 * a01 + b21 * a11 + b22 * a21;
  a[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return a;
}
function multiplyVec2(a, b) {
  var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var a00 = a[0];
  var a01 = a[1];
  var a10 = a[3];
  var a11 = a[4];
  var a20 = a[6];
  var a21 = a[7];
  var b0 = b.x;
  var b1 = b.y;
  return {
    x: b0 * a00 + b1 * a10 + a20 * z,
    y: b0 * a01 + b1 * a11 + a21 * z
  };
}

/**
 * In sigma, the graph is normalized into a [0, 1], [0, 1] square, before being given to the various renderers. This
 * helps to deal with quadtree in particular.
 * But at some point, we need to rescale it so that it takes the best place in the screen, i.e. we always want to see two
 * nodes "touching" opposite sides of the graph, with the camera being at its default state.
 *
 * This function determines this ratio.
 */
function getCorrectionRatio(viewportDimensions, graphDimensions) {
  var viewportRatio = viewportDimensions.height / viewportDimensions.width;
  var graphRatio = graphDimensions.height / graphDimensions.width;

  // If the stage and the graphs are in different directions (such as the graph being wider that tall while the stage
  // is taller than wide), we can stop here to have indeed nodes touching opposite sides:
  if (viewportRatio < 1 && graphRatio > 1 || viewportRatio > 1 && graphRatio < 1) {
    return 1;
  }

  // Else, we need to fit the graph inside the stage:
  // 1. If the graph is "squarer" (i.e. with a ratio closer to 1), we need to make the largest sides touch;
  // 2. If the stage is "squarer", we need to make the smallest sides touch.
  return Math.min(Math.max(graphRatio, 1 / graphRatio), Math.max(1 / viewportRatio, viewportRatio));
}

/**
 * Function returning a matrix from the current state of the camera.
 */
function matrixFromCamera(state, viewportDimensions, graphDimensions, padding, inverse) {
  // TODO: it's possible to optimize this drastically!
  var angle = state.angle,
    ratio = state.ratio,
    x = state.x,
    y = state.y;
  var width = viewportDimensions.width,
    height = viewportDimensions.height;
  var matrix = identity();
  var smallestDimension = Math.min(width, height) - 2 * padding;
  var correctionRatio = getCorrectionRatio(viewportDimensions, graphDimensions);
  if (!inverse) {
    multiply(matrix, scale(identity(), 2 * (smallestDimension / width) * correctionRatio, 2 * (smallestDimension / height) * correctionRatio));
    multiply(matrix, rotate(identity(), -angle));
    multiply(matrix, scale(identity(), 1 / ratio));
    multiply(matrix, translate(identity(), -x, -y));
  } else {
    multiply(matrix, translate(identity(), x, y));
    multiply(matrix, scale(identity(), ratio));
    multiply(matrix, rotate(identity(), angle));
    multiply(matrix, scale(identity(), width / smallestDimension / 2 / correctionRatio, height / smallestDimension / 2 / correctionRatio));
  }
  return matrix;
}

/**
 * All these transformations we apply on the matrix to get it rescale the graph
 * as we want make it very hard to get pixel-perfect distances in WebGL. This
 * function returns a factor that properly cancels the matrix effect on lengths.
 *
 * [jacomyal]
 * To be fully honest, I can't really explain happens here... I notice that the
 * following ratio works (i.e. it correctly compensates the matrix impact on all
 * camera states I could try):
 * > `R = size(V) / size(M * V) / W`
 * as long as `M * V` is in the direction of W (ie. parallel to (Ox)). It works
 * as well with H and a vector that transforms into something parallel to (Oy).
 *
 * Also, note that we use `angle` and not `-angle` (that would seem logical,
 * since we want to anticipate the rotation), because the image is vertically
 * swapped in WebGL.
 */
function getMatrixImpact(matrix, cameraState, viewportDimensions) {
  var _multiplyVec = multiplyVec2(matrix, {
      x: Math.cos(cameraState.angle),
      y: Math.sin(cameraState.angle)
    }, 0),
    x = _multiplyVec.x,
    y = _multiplyVec.y;
  return 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / viewportDimensions.width;
}

/**
 * Function returning the graph's node extent in x & y.
 */
function graphExtent(graph) {
  if (!graph.order) return {
    x: [0, 1],
    y: [0, 1]
  };
  var xMin = Infinity;
  var xMax = -Infinity;
  var yMin = Infinity;
  var yMax = -Infinity;
  graph.forEachNode(function (_, attr) {
    var x = attr.x,
      y = attr.y;
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  });
  return {
    x: [xMin, xMax],
    y: [yMin, yMax]
  };
}

/**
 * Check if the graph variable is a valid graph, and if sigma can render it.
 */
function validateGraph(graph) {
  // check if it's a valid graphology instance
  if (!graphology_utils_is_graph__WEBPACK_IMPORTED_MODULE_0___default()(graph)) throw new Error("Sigma: invalid graph instance.");

  // check if nodes have x/y attributes
  graph.forEachNode(function (key, attributes) {
    if (!Number.isFinite(attributes.x) || !Number.isFinite(attributes.y)) {
      throw new Error("Sigma: Coordinates of node ".concat(key, " are invalid. A node must have a numeric 'x' and 'y' attribute."));
    }
  });
}

/**
 * Function used to create DOM elements easily.
 */
function createElement(tag, style, attributes) {
  var element = document.createElement(tag);
  if (style) {
    for (var k in style) {
      element.style[k] = style[k];
    }
  }
  if (attributes) {
    for (var _k in attributes) {
      element.setAttribute(_k, attributes[_k]);
    }
  }
  return element;
}

/**
 * Function returning the browser's pixel ratio.
 */
function getPixelRatio() {
  if (typeof window.devicePixelRatio !== "undefined") return window.devicePixelRatio;
  return 1;
}

/**
 * Function ordering the given elements in reverse z-order so they drawn
 * the correct way.
 */
function zIndexOrdering(_extent, getter, elements) {
  // If k is > n, we'll use a standard sort
  return elements.sort(function (a, b) {
    var zA = getter(a) || 0,
      zB = getter(b) || 0;
    if (zA < zB) return -1;
    if (zA > zB) return 1;
    return 0;
  });

  // TODO: counting sort optimization
}

/**
 * Factory returning a function normalizing the given node's position & size.
 */

function createNormalizationFunction(extent) {
  var _extent$x = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_1__._)(extent.x, 2),
    minX = _extent$x[0],
    maxX = _extent$x[1],
    _extent$y = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_1__._)(extent.y, 2),
    minY = _extent$y[0],
    maxY = _extent$y[1];
  var ratio = Math.max(maxX - minX, maxY - minY),
    dX = (maxX + minX) / 2,
    dY = (maxY + minY) / 2;
  if (ratio === 0 || Math.abs(ratio) === Infinity || isNaN(ratio)) ratio = 1;
  if (isNaN(dX)) dX = 0;
  if (isNaN(dY)) dY = 0;
  var fn = function fn(data) {
    return {
      x: 0.5 + (data.x - dX) / ratio,
      y: 0.5 + (data.y - dY) / ratio
    };
  };

  // TODO: possibility to apply this in batch over array of indices
  fn.applyTo = function (data) {
    data.x = 0.5 + (data.x - dX) / ratio;
    data.y = 0.5 + (data.y - dY) / ratio;
  };
  fn.inverse = function (data) {
    return {
      x: dX + ratio * (data.x - 0.5),
      y: dY + ratio * (data.y - 0.5)
    };
  };
  fn.ratio = ratio;
  return fn;
}




/***/ }),

/***/ "./node_modules/sigma/dist/sigma.esm.js":
/*!**********************************************!*\
  !*** ./node_modules/sigma/dist/sigma.esm.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* binding */ Camera),
/* harmony export */   MouseCaptor: () => (/* binding */ MouseCaptor),
/* harmony export */   Sigma: () => (/* binding */ Sigma$1),
/* harmony export */   TouchCaptor: () => (/* binding */ TouchCaptor),
/* harmony export */   "default": () => (/* binding */ Sigma)
/* harmony export */ });
/* harmony import */ var _index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-236c62ad.esm.js */ "./node_modules/sigma/dist/index-236c62ad.esm.js");
/* harmony import */ var _inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inherits-d1a1e29b.esm.js */ "./node_modules/sigma/dist/inherits-d1a1e29b.esm.js");
/* harmony import */ var _types_dist_sigma_types_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/dist/sigma-types.esm.js */ "./node_modules/sigma/types/dist/sigma-types.esm.js");
/* harmony import */ var _normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./normalization-be445518.esm.js */ "./node_modules/sigma/dist/normalization-be445518.esm.js");
/* harmony import */ var _settings_dist_sigma_settings_esm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../settings/dist/sigma-settings.esm.js */ "./node_modules/sigma/settings/dist/sigma-settings.esm.js");
/* harmony import */ var _colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./colors-beb06eb2.esm.js */ "./node_modules/sigma/dist/colors-beb06eb2.esm.js");
/* harmony import */ var _data_11df7124_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data-11df7124.esm.js */ "./node_modules/sigma/dist/data-11df7124.esm.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var graphology_utils_is_graph__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! graphology-utils/is-graph */ "./node_modules/graphology-utils/is-graph.js");
/* harmony import */ var graphology_utils_is_graph__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(graphology_utils_is_graph__WEBPACK_IMPORTED_MODULE_8__);










/**
 * Defaults.
 */
var DEFAULT_ZOOMING_RATIO = 1.5;

/**
 * Event types.
 */
/**
 * Camera class
 */
var Camera = /*#__PURE__*/function (_TypedEventEmitter) {
  function Camera() {
    var _this;
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.b)(this, Camera);
    _this = (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.c)(this, Camera);

    // State
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "x", 0.5);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "y", 0.5);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "angle", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "ratio", 1);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "minRatio", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "maxRatio", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "enabledZooming", true);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "enabledPanning", true);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "enabledRotation", true);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "clean", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "nextFrame", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "previousState", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "enabled", true);
    _this.previousState = _this.getState();
    return _this;
  }

  /**
   * Static method used to create a Camera object with a given state.
   */
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__._)(Camera, _TypedEventEmitter);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.a)(Camera, [{
    key: "enable",
    value:
    /**
     * Method used to enable the camera.
     */
    function enable() {
      this.enabled = true;
      return this;
    }

    /**
     * Method used to disable the camera.
     */
  }, {
    key: "disable",
    value: function disable() {
      this.enabled = false;
      return this;
    }

    /**
     * Method used to retrieve the camera's current state.
     */
  }, {
    key: "getState",
    value: function getState() {
      return {
        x: this.x,
        y: this.y,
        angle: this.angle,
        ratio: this.ratio
      };
    }

    /**
     * Method used to check whether the camera has the given state.
     */
  }, {
    key: "hasState",
    value: function hasState(state) {
      return this.x === state.x && this.y === state.y && this.ratio === state.ratio && this.angle === state.angle;
    }

    /**
     * Method used to retrieve the camera's previous state.
     */
  }, {
    key: "getPreviousState",
    value: function getPreviousState() {
      var state = this.previousState;
      if (!state) return null;
      return {
        x: state.x,
        y: state.y,
        angle: state.angle,
        ratio: state.ratio
      };
    }

    /**
     * Method used to check minRatio and maxRatio values.
     */
  }, {
    key: "getBoundedRatio",
    value: function getBoundedRatio(ratio) {
      var r = ratio;
      if (typeof this.minRatio === "number") r = Math.max(r, this.minRatio);
      if (typeof this.maxRatio === "number") r = Math.min(r, this.maxRatio);
      return r;
    }

    /**
     * Method used to check various things to return a legit state candidate.
     */
  }, {
    key: "validateState",
    value: function validateState(state) {
      var validatedState = {};
      if (this.enabledPanning && typeof state.x === "number") validatedState.x = state.x;
      if (this.enabledPanning && typeof state.y === "number") validatedState.y = state.y;
      if (this.enabledZooming && typeof state.ratio === "number") validatedState.ratio = this.getBoundedRatio(state.ratio);
      if (this.enabledRotation && typeof state.angle === "number") validatedState.angle = state.angle;
      return this.clean ? this.clean((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, this.getState()), validatedState)) : validatedState;
    }

    /**
     * Method used to check whether the camera is currently being animated.
     */
  }, {
    key: "isAnimated",
    value: function isAnimated() {
      return !!this.nextFrame;
    }

    /**
     * Method used to set the camera's state.
     */
  }, {
    key: "setState",
    value: function setState(state) {
      if (!this.enabled) return this;

      // Keeping track of last state
      this.previousState = this.getState();
      var validState = this.validateState(state);
      if (typeof validState.x === "number") this.x = validState.x;
      if (typeof validState.y === "number") this.y = validState.y;
      if (typeof validState.ratio === "number") this.ratio = validState.ratio;
      if (typeof validState.angle === "number") this.angle = validState.angle;

      // Emitting
      if (!this.hasState(this.previousState)) this.emit("updated", this.getState());
      return this;
    }

    /**
     * Method used to update the camera's state using a function.
     */
  }, {
    key: "updateState",
    value: function updateState(updater) {
      this.setState(updater(this.getState()));
      return this;
    }

    /**
     * Method used to animate the camera.
     */
  }, {
    key: "animate",
    value: function animate(state) {
      var _this2 = this;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      if (!callback) return new Promise(function (resolve) {
        return _this2.animate(state, opts, resolve);
      });
      if (!this.enabled) return;
      var options = (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, _normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.A), opts);
      var validState = this.validateState(state);
      var easing = typeof options.easing === "function" ? options.easing : _normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.e[options.easing];

      // State
      var start = Date.now(),
        initialState = this.getState();

      // Function performing the animation
      var _fn = function fn() {
        var t = (Date.now() - start) / options.duration;

        // The animation is over:
        if (t >= 1) {
          _this2.nextFrame = null;
          _this2.setState(validState);
          if (_this2.animationCallback) {
            _this2.animationCallback.call(null);
            _this2.animationCallback = undefined;
          }
          return;
        }
        var coefficient = easing(t);
        var newState = {};
        if (typeof validState.x === "number") newState.x = initialState.x + (validState.x - initialState.x) * coefficient;
        if (typeof validState.y === "number") newState.y = initialState.y + (validState.y - initialState.y) * coefficient;
        if (_this2.enabledRotation && typeof validState.angle === "number") newState.angle = initialState.angle + (validState.angle - initialState.angle) * coefficient;
        if (typeof validState.ratio === "number") newState.ratio = initialState.ratio + (validState.ratio - initialState.ratio) * coefficient;
        _this2.setState(newState);
        _this2.nextFrame = requestAnimationFrame(_fn);
      };
      if (this.nextFrame) {
        cancelAnimationFrame(this.nextFrame);
        if (this.animationCallback) this.animationCallback.call(null);
        this.nextFrame = requestAnimationFrame(_fn);
      } else {
        _fn();
      }
      this.animationCallback = callback;
    }

    /**
     * Method used to zoom the camera.
     */
  }, {
    key: "animatedZoom",
    value: function animatedZoom(factorOrOptions) {
      if (!factorOrOptions) return this.animate({
        ratio: this.ratio / DEFAULT_ZOOMING_RATIO
      });
      if (typeof factorOrOptions === "number") return this.animate({
        ratio: this.ratio / factorOrOptions
      });
      return this.animate({
        ratio: this.ratio / (factorOrOptions.factor || DEFAULT_ZOOMING_RATIO)
      }, factorOrOptions);
    }

    /**
     * Method used to unzoom the camera.
     */
  }, {
    key: "animatedUnzoom",
    value: function animatedUnzoom(factorOrOptions) {
      if (!factorOrOptions) return this.animate({
        ratio: this.ratio * DEFAULT_ZOOMING_RATIO
      });
      if (typeof factorOrOptions === "number") return this.animate({
        ratio: this.ratio * factorOrOptions
      });
      return this.animate({
        ratio: this.ratio * (factorOrOptions.factor || DEFAULT_ZOOMING_RATIO)
      }, factorOrOptions);
    }

    /**
     * Method used to reset the camera.
     */
  }, {
    key: "animatedReset",
    value: function animatedReset(options) {
      return this.animate({
        x: 0.5,
        y: 0.5,
        ratio: 1,
        angle: 0
      }, options);
    }

    /**
     * Returns a new Camera instance, with the same state as the current camera.
     */
  }, {
    key: "copy",
    value: function copy() {
      return Camera.from(this.getState());
    }
  }], [{
    key: "from",
    value: function from(state) {
      var camera = new Camera();
      return camera.setState(state);
    }
  }]);
}(_types_dist_sigma_types_esm_js__WEBPACK_IMPORTED_MODULE_2__.TypedEventEmitter);

/**
 * Captor utils functions
 * ======================
 */

/**
 * Extract the local X and Y coordinates from a mouse event or touch object. If
 * a DOM element is given, it uses this element's offset to compute the position
 * (this allows using events that are not bound to the container itself and
 * still have a proper position).
 *
 * @param  {event}       e - A mouse event or touch object.
 * @param  {HTMLElement} dom - A DOM element to compute offset relatively to.
 * @return {number}      The local Y value of the mouse.
 */
function getPosition(e, dom) {
  var bbox = dom.getBoundingClientRect();
  return {
    x: e.clientX - bbox.left,
    y: e.clientY - bbox.top
  };
}

/**
 * Convert mouse coords to sigma coords.
 *
 * @param  {event}       e   - A mouse event or touch object.
 * @param  {HTMLElement} dom - A DOM element to compute offset relatively to.
 * @return {object}
 */
function getMouseCoords(e, dom) {
  var res = (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, getPosition(e, dom)), {}, {
    sigmaDefaultPrevented: false,
    preventSigmaDefault: function preventSigmaDefault() {
      res.sigmaDefaultPrevented = true;
    },
    original: e
  });
  return res;
}

/**
 * Takes a touch coords or a mouse coords, and always returns a clean mouse coords object.
 */
function cleanMouseCoords(e) {
  var res = "x" in e ? e : (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, e.touches[0] || e.previousTouches[0]), {}, {
    original: e.original,
    sigmaDefaultPrevented: e.sigmaDefaultPrevented,
    preventSigmaDefault: function preventSigmaDefault() {
      e.sigmaDefaultPrevented = true;
      res.sigmaDefaultPrevented = true;
    }
  });
  return res;
}

/**
 * Convert mouse wheel event coords to sigma coords.
 *
 * @param  {event}       e   - A wheel mouse event.
 * @param  {HTMLElement} dom - A DOM element to compute offset relatively to.
 * @return {object}
 */
function getWheelCoords(e, dom) {
  return (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, getMouseCoords(e, dom)), {}, {
    delta: getWheelDelta(e)
  });
}
var MAX_TOUCHES = 2;
function getTouchesArray(touches) {
  var arr = [];
  for (var i = 0, l = Math.min(touches.length, MAX_TOUCHES); i < l; i++) arr.push(touches[i]);
  return arr;
}

/**
 * Convert touch coords to sigma coords.
 *
 * @param  {event}       e               - A touch event.
 * @param  {Touch[]}     previousTouches - An array of the previously stored touches.
 * @param  {HTMLElement} dom             - A DOM element to compute offset relatively to.
 * @return {object}
 */
function getTouchCoords(e, previousTouches, dom) {
  var res = {
    touches: getTouchesArray(e.touches).map(function (touch) {
      return getPosition(touch, dom);
    }),
    previousTouches: previousTouches.map(function (touch) {
      return getPosition(touch, dom);
    }),
    sigmaDefaultPrevented: false,
    preventSigmaDefault: function preventSigmaDefault() {
      res.sigmaDefaultPrevented = true;
    },
    original: e
  };
  return res;
}

/**
 * Extract the wheel delta from a mouse event or touch object.
 *
 * @param  {event}  e - A mouse event or touch object.
 * @return {number}     The wheel delta of the mouse.
 */
function getWheelDelta(e) {
  // TODO: check those ratios again to ensure a clean Chrome/Firefox compat
  if (typeof e.deltaY !== "undefined") return e.deltaY * -3 / 360;
  if (typeof e.detail !== "undefined") return e.detail / -9;
  throw new Error("Captor: could not extract delta from event.");
}

/**
 * Abstract class representing a captor like the user's mouse or touch controls.
 */
var Captor = /*#__PURE__*/function (_TypedEventEmitter) {
  function Captor(container, renderer) {
    var _this;
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.b)(this, Captor);
    _this = (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.c)(this, Captor);
    // Properties
    _this.container = container;
    _this.renderer = renderer;
    return _this;
  }
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__._)(Captor, _TypedEventEmitter);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.a)(Captor);
}(_types_dist_sigma_types_esm_js__WEBPACK_IMPORTED_MODULE_2__.TypedEventEmitter);

var MOUSE_SETTINGS_KEYS = ["doubleClickTimeout", "doubleClickZoomingDuration", "doubleClickZoomingRatio", "dragTimeout", "draggedEventsTolerance", "inertiaDuration", "inertiaRatio", "zoomDuration", "zoomingRatio"];
var DEFAULT_MOUSE_SETTINGS = MOUSE_SETTINGS_KEYS.reduce(function (iter, key) {
  return (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, iter), {}, (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)({}, key, _settings_dist_sigma_settings_esm_js__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_SETTINGS[key]));
}, {});

/**
 * Event types.
 */
/**
 * Mouse captor class.
 *
 * @constructor
 */
var MouseCaptor = /*#__PURE__*/function (_Captor) {
  function MouseCaptor(container, renderer) {
    var _this;
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.b)(this, MouseCaptor);
    _this = (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.c)(this, MouseCaptor, [container, renderer]);

    // Binding methods
    // State
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "enabled", true);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "draggedEvents", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "downStartTime", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "lastMouseX", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "lastMouseY", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "isMouseDown", false);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "isMoving", false);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "movingTimeout", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "startCameraState", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "clicks", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "doubleClickTimeout", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "currentWheelDirection", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "settings", DEFAULT_MOUSE_SETTINGS);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleRightClick = _this.handleRightClick.bind(_this);
    _this.handleDown = _this.handleDown.bind(_this);
    _this.handleUp = _this.handleUp.bind(_this);
    _this.handleMove = _this.handleMove.bind(_this);
    _this.handleWheel = _this.handleWheel.bind(_this);
    _this.handleLeave = _this.handleLeave.bind(_this);
    _this.handleEnter = _this.handleEnter.bind(_this);

    // Binding events
    container.addEventListener("click", _this.handleClick, {
      capture: false
    });
    container.addEventListener("contextmenu", _this.handleRightClick, {
      capture: false
    });
    container.addEventListener("mousedown", _this.handleDown, {
      capture: false
    });
    container.addEventListener("wheel", _this.handleWheel, {
      capture: false
    });
    container.addEventListener("mouseleave", _this.handleLeave, {
      capture: false
    });
    container.addEventListener("mouseenter", _this.handleEnter, {
      capture: false
    });
    document.addEventListener("mousemove", _this.handleMove, {
      capture: false
    });
    document.addEventListener("mouseup", _this.handleUp, {
      capture: false
    });
    return _this;
  }
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__._)(MouseCaptor, _Captor);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.a)(MouseCaptor, [{
    key: "kill",
    value: function kill() {
      var container = this.container;
      container.removeEventListener("click", this.handleClick);
      container.removeEventListener("contextmenu", this.handleRightClick);
      container.removeEventListener("mousedown", this.handleDown);
      container.removeEventListener("wheel", this.handleWheel);
      container.removeEventListener("mouseleave", this.handleLeave);
      container.removeEventListener("mouseenter", this.handleEnter);
      document.removeEventListener("mousemove", this.handleMove);
      document.removeEventListener("mouseup", this.handleUp);
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      var _this2 = this;
      if (!this.enabled) return;
      this.clicks++;
      if (this.clicks === 2) {
        this.clicks = 0;
        if (typeof this.doubleClickTimeout === "number") {
          clearTimeout(this.doubleClickTimeout);
          this.doubleClickTimeout = null;
        }
        return this.handleDoubleClick(e);
      }
      setTimeout(function () {
        _this2.clicks = 0;
        _this2.doubleClickTimeout = null;
      }, this.settings.doubleClickTimeout);

      // NOTE: this is here to prevent click events on drag
      if (this.draggedEvents < this.settings.draggedEventsTolerance) this.emit("click", getMouseCoords(e, this.container));
    }
  }, {
    key: "handleRightClick",
    value: function handleRightClick(e) {
      if (!this.enabled) return;
      this.emit("rightClick", getMouseCoords(e, this.container));
    }
  }, {
    key: "handleDoubleClick",
    value: function handleDoubleClick(e) {
      if (!this.enabled) return;
      e.preventDefault();
      e.stopPropagation();
      var mouseCoords = getMouseCoords(e, this.container);
      this.emit("doubleClick", mouseCoords);
      if (mouseCoords.sigmaDefaultPrevented) return;

      // default behavior
      var camera = this.renderer.getCamera();
      var newRatio = camera.getBoundedRatio(camera.getState().ratio / this.settings.doubleClickZoomingRatio);
      camera.animate(this.renderer.getViewportZoomedState(getPosition(e, this.container), newRatio), {
        easing: "quadraticInOut",
        duration: this.settings.doubleClickZoomingDuration
      });
    }
  }, {
    key: "handleDown",
    value: function handleDown(e) {
      if (!this.enabled) return;

      // We only start dragging on left button
      if (e.button === 0) {
        this.startCameraState = this.renderer.getCamera().getState();
        var _getPosition = getPosition(e, this.container),
          x = _getPosition.x,
          y = _getPosition.y;
        this.lastMouseX = x;
        this.lastMouseY = y;
        this.draggedEvents = 0;
        this.downStartTime = Date.now();
        this.isMouseDown = true;
      }
      this.emit("mousedown", getMouseCoords(e, this.container));
    }
  }, {
    key: "handleUp",
    value: function handleUp(e) {
      var _this3 = this;
      if (!this.enabled || !this.isMouseDown) return;
      var camera = this.renderer.getCamera();
      this.isMouseDown = false;
      if (typeof this.movingTimeout === "number") {
        clearTimeout(this.movingTimeout);
        this.movingTimeout = null;
      }
      var _getPosition2 = getPosition(e, this.container),
        x = _getPosition2.x,
        y = _getPosition2.y;
      var cameraState = camera.getState(),
        previousCameraState = camera.getPreviousState() || {
          x: 0,
          y: 0
        };
      if (this.isMoving) {
        camera.animate({
          x: cameraState.x + this.settings.inertiaRatio * (cameraState.x - previousCameraState.x),
          y: cameraState.y + this.settings.inertiaRatio * (cameraState.y - previousCameraState.y)
        }, {
          duration: this.settings.inertiaDuration,
          easing: "quadraticOut"
        });
      } else if (this.lastMouseX !== x || this.lastMouseY !== y) {
        camera.setState({
          x: cameraState.x,
          y: cameraState.y
        });
      }
      this.isMoving = false;
      setTimeout(function () {
        var shouldRefresh = _this3.draggedEvents > 0;
        _this3.draggedEvents = 0;

        // NOTE: this refresh is here to make sure `hideEdgesOnMove` can work
        // when someone releases camera pan drag after having stopped moving.
        // See commit: https://github.com/jacomyal/sigma.js/commit/cfd9197f70319109db6b675dd7c82be493ca95a2
        // See also issue: https://github.com/jacomyal/sigma.js/issues/1290
        // It could be possible to render instead of scheduling a refresh but for
        // now it seems good enough.
        if (shouldRefresh && _this3.renderer.getSetting("hideEdgesOnMove")) _this3.renderer.refresh();
      }, 0);
      this.emit("mouseup", getMouseCoords(e, this.container));
    }
  }, {
    key: "handleMove",
    value: function handleMove(e) {
      var _this4 = this;
      if (!this.enabled) return;
      var mouseCoords = getMouseCoords(e, this.container);

      // Always trigger a "mousemovebody" event, so that it is possible to develop
      // a drag-and-drop effect that works even when the mouse is out of the
      // container:
      this.emit("mousemovebody", mouseCoords);

      // Only trigger the "mousemove" event when the mouse is actually hovering
      // the container, to avoid weirdly hovering nodes and/or edges when the
      // mouse is not hover the container:
      if (e.target === this.container || e.composedPath()[0] === this.container) {
        this.emit("mousemove", mouseCoords);
      }
      if (mouseCoords.sigmaDefaultPrevented) return;

      // Handle the case when "isMouseDown" all the time, to allow dragging the
      // stage while the mouse is not hover the container:
      if (this.isMouseDown) {
        this.isMoving = true;
        this.draggedEvents++;
        if (typeof this.movingTimeout === "number") {
          clearTimeout(this.movingTimeout);
        }
        this.movingTimeout = window.setTimeout(function () {
          _this4.movingTimeout = null;
          _this4.isMoving = false;
        }, this.settings.dragTimeout);
        var camera = this.renderer.getCamera();
        var _getPosition3 = getPosition(e, this.container),
          eX = _getPosition3.x,
          eY = _getPosition3.y;
        var lastMouse = this.renderer.viewportToFramedGraph({
          x: this.lastMouseX,
          y: this.lastMouseY
        });
        var mouse = this.renderer.viewportToFramedGraph({
          x: eX,
          y: eY
        });
        var offsetX = lastMouse.x - mouse.x,
          offsetY = lastMouse.y - mouse.y;
        var cameraState = camera.getState();
        var x = cameraState.x + offsetX,
          y = cameraState.y + offsetY;
        camera.setState({
          x: x,
          y: y
        });
        this.lastMouseX = eX;
        this.lastMouseY = eY;
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }, {
    key: "handleLeave",
    value: function handleLeave(e) {
      this.emit("mouseleave", getMouseCoords(e, this.container));
    }
  }, {
    key: "handleEnter",
    value: function handleEnter(e) {
      this.emit("mouseenter", getMouseCoords(e, this.container));
    }
  }, {
    key: "handleWheel",
    value: function handleWheel(e) {
      var _this5 = this;
      var camera = this.renderer.getCamera();
      if (!this.enabled || !camera.enabledZooming) return;
      var delta = getWheelDelta(e);
      if (!delta) return;
      var wheelCoords = getWheelCoords(e, this.container);
      this.emit("wheel", wheelCoords);
      if (wheelCoords.sigmaDefaultPrevented) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Default behavior
      var currentRatio = camera.getState().ratio;
      var ratioDiff = delta > 0 ? 1 / this.settings.zoomingRatio : this.settings.zoomingRatio;
      var newRatio = camera.getBoundedRatio(currentRatio * ratioDiff);
      var wheelDirection = delta > 0 ? 1 : -1;
      var now = Date.now();

      // Exit early without preventing default behavior when ratio doesn't change:
      if (currentRatio === newRatio) return;
      e.preventDefault();
      e.stopPropagation();

      // Cancel events that are too close each other and in the same direction:
      if (this.currentWheelDirection === wheelDirection && this.lastWheelTriggerTime && now - this.lastWheelTriggerTime < this.settings.zoomDuration / 5) {
        return;
      }
      camera.animate(this.renderer.getViewportZoomedState(getPosition(e, this.container), newRatio), {
        easing: "quadraticOut",
        duration: this.settings.zoomDuration
      }, function () {
        _this5.currentWheelDirection = 0;
      });
      this.currentWheelDirection = wheelDirection;
      this.lastWheelTriggerTime = now;
    }
  }, {
    key: "setSettings",
    value: function setSettings(settings) {
      this.settings = settings;
    }
  }]);
}(Captor);

var TOUCH_SETTINGS_KEYS = ["dragTimeout", "inertiaDuration", "inertiaRatio", "doubleClickTimeout", "doubleClickZoomingRatio", "doubleClickZoomingDuration", "tapMoveTolerance"];
var DEFAULT_TOUCH_SETTINGS = TOUCH_SETTINGS_KEYS.reduce(function (iter, key) {
  return (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, iter), {}, (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)({}, key, _settings_dist_sigma_settings_esm_js__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_SETTINGS[key]));
}, {});

/**
 * Event types.
 */
/**
 * Touch captor class.
 *
 * @constructor
 */
var TouchCaptor = /*#__PURE__*/function (_Captor) {
  function TouchCaptor(container, renderer) {
    var _this;
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.b)(this, TouchCaptor);
    _this = (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.c)(this, TouchCaptor, [container, renderer]);

    // Binding methods:
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "enabled", true);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "isMoving", false);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "hasMoved", false);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "touchMode", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "startTouchesPositions", []);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "lastTouches", []);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "lastTap", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "settings", DEFAULT_TOUCH_SETTINGS);
    _this.handleStart = _this.handleStart.bind(_this);
    _this.handleLeave = _this.handleLeave.bind(_this);
    _this.handleMove = _this.handleMove.bind(_this);

    // Binding events
    container.addEventListener("touchstart", _this.handleStart, {
      capture: false
    });
    container.addEventListener("touchcancel", _this.handleLeave, {
      capture: false
    });
    document.addEventListener("touchend", _this.handleLeave, {
      capture: false,
      passive: false
    });
    document.addEventListener("touchmove", _this.handleMove, {
      capture: false,
      passive: false
    });
    return _this;
  }
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__._)(TouchCaptor, _Captor);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.a)(TouchCaptor, [{
    key: "kill",
    value: function kill() {
      var container = this.container;
      container.removeEventListener("touchstart", this.handleStart);
      container.removeEventListener("touchcancel", this.handleLeave);
      document.removeEventListener("touchend", this.handleLeave);
      document.removeEventListener("touchmove", this.handleMove);
    }
  }, {
    key: "getDimensions",
    value: function getDimensions() {
      return {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight
      };
    }
  }, {
    key: "handleStart",
    value: function handleStart(e) {
      var _this2 = this;
      if (!this.enabled) return;
      e.preventDefault();
      var touches = getTouchesArray(e.touches);
      this.touchMode = touches.length;
      this.startCameraState = this.renderer.getCamera().getState();
      this.startTouchesPositions = touches.map(function (touch) {
        return getPosition(touch, _this2.container);
      });

      // When there are two touches down, let's record distance and angle as well:
      if (this.touchMode === 2) {
        var _this$startTouchesPos = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_5__._)(this.startTouchesPositions, 2),
          _this$startTouchesPos2 = _this$startTouchesPos[0],
          x0 = _this$startTouchesPos2.x,
          y0 = _this$startTouchesPos2.y,
          _this$startTouchesPos3 = _this$startTouchesPos[1],
          x1 = _this$startTouchesPos3.x,
          y1 = _this$startTouchesPos3.y;
        this.startTouchesAngle = Math.atan2(y1 - y0, x1 - x0);
        this.startTouchesDistance = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
      }
      this.emit("touchdown", getTouchCoords(e, this.lastTouches, this.container));
      this.lastTouches = touches;
      this.lastTouchesPositions = this.startTouchesPositions;
    }
  }, {
    key: "handleLeave",
    value: function handleLeave(e) {
      if (!this.enabled || !this.startTouchesPositions.length) return;
      if (e.cancelable) e.preventDefault();
      if (this.movingTimeout) {
        this.isMoving = false;
        clearTimeout(this.movingTimeout);
      }
      switch (this.touchMode) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        case 2:
          if (e.touches.length === 1) {
            this.handleStart(e);
            e.preventDefault();
            break;
          }
        /* falls through */
        case 1:
          if (this.isMoving) {
            var camera = this.renderer.getCamera();
            var cameraState = camera.getState(),
              previousCameraState = camera.getPreviousState() || {
                x: 0,
                y: 0
              };
            camera.animate({
              x: cameraState.x + this.settings.inertiaRatio * (cameraState.x - previousCameraState.x),
              y: cameraState.y + this.settings.inertiaRatio * (cameraState.y - previousCameraState.y)
            }, {
              duration: this.settings.inertiaDuration,
              easing: "quadraticOut"
            });
          }
          this.hasMoved = false;
          this.isMoving = false;
          this.touchMode = 0;
          break;
      }
      this.emit("touchup", getTouchCoords(e, this.lastTouches, this.container));

      // When the last touch ends and there hasn't been too much movement, trigger a "tap" or "doubletap" event:
      if (!e.touches.length) {
        var position = getPosition(this.lastTouches[0], this.container);
        var downPosition = this.startTouchesPositions[0];
        var dSquare = Math.pow(position.x - downPosition.x, 2) + Math.pow(position.y - downPosition.y, 2);
        if (!e.touches.length && dSquare < Math.pow(this.settings.tapMoveTolerance, 2)) {
          // Only trigger "doubletap" when the last tap is recent enough:
          if (this.lastTap && Date.now() - this.lastTap.time < this.settings.doubleClickTimeout) {
            var touchCoords = getTouchCoords(e, this.lastTouches, this.container);
            this.emit("doubletap", touchCoords);
            this.lastTap = null;
            if (!touchCoords.sigmaDefaultPrevented) {
              var _camera = this.renderer.getCamera();
              var newRatio = _camera.getBoundedRatio(_camera.getState().ratio / this.settings.doubleClickZoomingRatio);
              _camera.animate(this.renderer.getViewportZoomedState(position, newRatio), {
                easing: "quadraticInOut",
                duration: this.settings.doubleClickZoomingDuration
              });
            }
          }
          // Else, trigger a normal "tap" event:
          else {
            var _touchCoords = getTouchCoords(e, this.lastTouches, this.container);
            this.emit("tap", _touchCoords);
            this.lastTap = {
              time: Date.now(),
              position: _touchCoords.touches[0] || _touchCoords.previousTouches[0]
            };
          }
        }
      }
      this.lastTouches = getTouchesArray(e.touches);
      this.startTouchesPositions = [];
    }
  }, {
    key: "handleMove",
    value: function handleMove(e) {
      var _this3 = this;
      if (!this.enabled || !this.startTouchesPositions.length) return;
      e.preventDefault();
      var touches = getTouchesArray(e.touches);
      var touchesPositions = touches.map(function (touch) {
        return getPosition(touch, _this3.container);
      });
      var lastTouches = this.lastTouches;
      this.lastTouches = touches;
      this.lastTouchesPositions = touchesPositions;
      var touchCoords = getTouchCoords(e, lastTouches, this.container);
      this.emit("touchmove", touchCoords);
      if (touchCoords.sigmaDefaultPrevented) return;

      // If a move was initiated at some point, and we get back to start point,
      // we should still consider that we did move (which also happens after a
      // multiple touch when only one touch remains in which case handleStart
      // is recalled within handleLeave).
      // Now, some mobile browsers report zero-distance moves so we also check that
      // one of the touches did actually move from the origin position.
      this.hasMoved || (this.hasMoved = touchesPositions.some(function (position, idx) {
        var startPosition = _this3.startTouchesPositions[idx];
        return startPosition && (position.x !== startPosition.x || position.y !== startPosition.y);
      }));

      // If there was no move, do not trigger touch moves behavior
      if (!this.hasMoved) {
        return;
      }
      this.isMoving = true;
      if (this.movingTimeout) clearTimeout(this.movingTimeout);
      this.movingTimeout = window.setTimeout(function () {
        _this3.isMoving = false;
      }, this.settings.dragTimeout);
      var camera = this.renderer.getCamera();
      var startCameraState = this.startCameraState;
      var padding = this.renderer.getSetting("stagePadding");
      switch (this.touchMode) {
        case 1:
          {
            var _this$renderer$viewpo = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0]),
              xStart = _this$renderer$viewpo.x,
              yStart = _this$renderer$viewpo.y;
            var _this$renderer$viewpo2 = this.renderer.viewportToFramedGraph(touchesPositions[0]),
              x = _this$renderer$viewpo2.x,
              y = _this$renderer$viewpo2.y;
            camera.setState({
              x: startCameraState.x + xStart - x,
              y: startCameraState.y + yStart - y
            });
            break;
          }
        case 2:
          {
            /**
             * Here is the thinking here:
             *
             * 1. We can find the new angle and ratio, by comparing the vector from "touch one" to "touch two" at the start
             *    of the d'n'd and now
             *
             * 2. We can use `Camera#viewportToGraph` inside formula to retrieve the new camera position, using the graph
             *    position of a touch at the beginning of the d'n'd (using `startCamera.viewportToGraph`) and the viewport
             *    position of this same touch now
             */
            var newCameraState = {
              x: 0.5,
              y: 0.5,
              angle: 0,
              ratio: 1
            };
            var _touchesPositions$ = touchesPositions[0],
              x0 = _touchesPositions$.x,
              y0 = _touchesPositions$.y;
            var _touchesPositions$2 = touchesPositions[1],
              x1 = _touchesPositions$2.x,
              y1 = _touchesPositions$2.y;
            var angleDiff = Math.atan2(y1 - y0, x1 - x0) - this.startTouchesAngle;
            var ratioDiff = Math.hypot(y1 - y0, x1 - x0) / this.startTouchesDistance;

            // 1.
            var newRatio = camera.getBoundedRatio(startCameraState.ratio / ratioDiff);
            newCameraState.ratio = newRatio;
            newCameraState.angle = startCameraState.angle + angleDiff;

            // 2.
            var dimensions = this.getDimensions();
            var touchGraphPosition = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0], {
              cameraState: startCameraState
            });
            var smallestDimension = Math.min(dimensions.width, dimensions.height) - 2 * padding;
            var dx = smallestDimension / dimensions.width;
            var dy = smallestDimension / dimensions.height;
            var ratio = newRatio / smallestDimension;

            // Align with center of the graph:
            var _x = x0 - smallestDimension / 2 / dx;
            var _y = y0 - smallestDimension / 2 / dy;

            // Rotate:
            var _ref = [_x * Math.cos(-newCameraState.angle) - _y * Math.sin(-newCameraState.angle), _y * Math.cos(-newCameraState.angle) + _x * Math.sin(-newCameraState.angle)];
            _x = _ref[0];
            _y = _ref[1];
            newCameraState.x = touchGraphPosition.x - _x * ratio;
            newCameraState.y = touchGraphPosition.y + _y * ratio;
            camera.setState(newCameraState);
            break;
          }
      }
    }
  }, {
    key: "setSettings",
    value: function setSettings(settings) {
      this.settings = settings;
    }
  }]);
}(Captor);

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_5__.a)(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_5__.b)(r) || _nonIterableSpread();
}

function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}

/**
 * Sigma.js Labels Heuristics
 * ===========================
 *
 * Miscellaneous heuristics related to label display.
 * @module
 */
/**
 * Class representing a single candidate for the label grid selection.
 *
 * It also describes a deterministic way to compare two candidates to assess
 * which one is better.
 */
var LabelCandidate = /*#__PURE__*/function () {
  function LabelCandidate(key, size) {
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.b)(this, LabelCandidate);
    this.key = key;
    this.size = size;
  }
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.a)(LabelCandidate, null, [{
    key: "compare",
    value: function compare(first, second) {
      // First we compare by size
      if (first.size > second.size) return -1;
      if (first.size < second.size) return 1;

      // Then since no two nodes can have the same key, we use it to
      // deterministically tie-break by key
      if (first.key > second.key) return 1;

      // NOTE: this comparator cannot return 0
      return -1;
    }
  }]);
}();
/**
 * Class representing a 2D spatial grid divided into constant-size cells.
 */
var LabelGrid = /*#__PURE__*/function () {
  function LabelGrid() {
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.b)(this, LabelGrid);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "width", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "height", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "cellSize", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "columns", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "rows", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "cells", {});
  }
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.a)(LabelGrid, [{
    key: "resizeAndClear",
    value: function resizeAndClear(dimensions, cellSize) {
      this.width = dimensions.width;
      this.height = dimensions.height;
      this.cellSize = cellSize;
      this.columns = Math.ceil(dimensions.width / cellSize);
      this.rows = Math.ceil(dimensions.height / cellSize);
      this.cells = {};
    }
  }, {
    key: "getIndex",
    value: function getIndex(pos) {
      var xIndex = Math.floor(pos.x / this.cellSize);
      var yIndex = Math.floor(pos.y / this.cellSize);
      return yIndex * this.columns + xIndex;
    }
  }, {
    key: "add",
    value: function add(key, size, pos) {
      var candidate = new LabelCandidate(key, size);
      var index = this.getIndex(pos);
      var cell = this.cells[index];
      if (!cell) {
        cell = [];
        this.cells[index] = cell;
      }
      cell.push(candidate);
    }
  }, {
    key: "organize",
    value: function organize() {
      for (var k in this.cells) {
        var cell = this.cells[k];
        cell.sort(LabelCandidate.compare);
      }
    }
  }, {
    key: "getLabelsToDisplay",
    value: function getLabelsToDisplay(ratio, density) {
      // TODO: work on visible nodes to optimize? ^ -> threshold outside so that memoization works?
      // TODO: adjust threshold lower, but increase cells a bit?
      // TODO: hunt for geom issue in disguise
      // TODO: memoize while ratio does not move. method to force recompute
      var cellArea = this.cellSize * this.cellSize;
      var scaledCellArea = cellArea / ratio / ratio;
      var scaledDensity = scaledCellArea * density / cellArea;
      var labelsToDisplayPerCell = Math.ceil(scaledDensity);
      var labels = [];
      for (var k in this.cells) {
        var cell = this.cells[k];
        for (var i = 0; i < Math.min(labelsToDisplayPerCell, cell.length); i++) {
          labels.push(cell[i].key);
        }
      }
      return labels;
    }
  }]);
}();

/**
 * Label heuristic selecting edge labels to display, based on displayed node
 * labels
 *
 * @param  {object} params                 - Parameters:
 * @param  {Set}      displayedNodeLabels  - Currently displayed node labels.
 * @param  {Set}      highlightedNodes     - Highlighted nodes.
 * @param  {Graph}    graph                - The rendered graph.
 * @param  {string}   hoveredNode          - Hovered node (optional)
 * @return {Array}                         - The selected labels.
 */
function edgeLabelsToDisplayFromNodes(params) {
  var graph = params.graph,
    hoveredNode = params.hoveredNode,
    highlightedNodes = params.highlightedNodes,
    displayedNodeLabels = params.displayedNodeLabels;
  var worthyEdges = [];

  // TODO: the code below can be optimized using #.forEach and batching the code per adj

  // We should display an edge's label if:
  //   - Any of its extremities is highlighted or hovered
  //   - Both of its extremities has its label shown
  graph.forEachEdge(function (edge, _, source, target) {
    if (source === hoveredNode || target === hoveredNode || highlightedNodes.has(source) || highlightedNodes.has(target) || displayedNodeLabels.has(source) && displayedNodeLabels.has(target)) {
      worthyEdges.push(edge);
    }
  });
  return worthyEdges;
}

/**
 * Constants.
 */
var X_LABEL_MARGIN = 150;
var Y_LABEL_MARGIN = 50;
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Important functions.
 */
function applyNodeDefaults(settings, key, data) {
  if (!hasOwnProperty.call(data, "x") || !hasOwnProperty.call(data, "y")) throw new Error("Sigma: could not find a valid position (x, y) for node \"".concat(key, "\". All your nodes must have a number \"x\" and \"y\". Maybe your forgot to apply a layout or your \"nodeReducer\" is not returning the correct data?"));
  if (!data.color) data.color = settings.defaultNodeColor;
  if (!data.label && data.label !== "") data.label = null;
  if (data.label !== undefined && data.label !== null) data.label = "" + data.label;else data.label = null;
  if (!data.size) data.size = 2;
  if (!hasOwnProperty.call(data, "hidden")) data.hidden = false;
  if (!hasOwnProperty.call(data, "highlighted")) data.highlighted = false;
  if (!hasOwnProperty.call(data, "forceLabel")) data.forceLabel = false;
  if (!data.type || data.type === "") data.type = settings.defaultNodeType;
  if (!data.zIndex) data.zIndex = 0;
  return data;
}
function applyEdgeDefaults(settings, _key, data) {
  if (!data.color) data.color = settings.defaultEdgeColor;
  if (!data.label) data.label = "";
  if (!data.size) data.size = 0.5;
  if (!hasOwnProperty.call(data, "hidden")) data.hidden = false;
  if (!hasOwnProperty.call(data, "forceLabel")) data.forceLabel = false;
  if (!data.type || data.type === "") data.type = settings.defaultEdgeType;
  if (!data.zIndex) data.zIndex = 0;
  return data;
}

/**
 * Main class.
 *
 * @constructor
 * @param {Graph}       graph     - Graph to render.
 * @param {HTMLElement} container - DOM container in which to render.
 * @param {object}      settings  - Optional settings.
 */
var Sigma$1 = /*#__PURE__*/function (_TypedEventEmitter) {
  function Sigma(graph, container) {
    var _this;
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.b)(this, Sigma);
    _this = (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.c)(this, Sigma);

    // Resolving settings
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "elements", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "canvasContexts", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "webGLContexts", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "pickingLayers", new Set());
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "textures", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "frameBuffers", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "activeListeners", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "labelGrid", new LabelGrid());
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "nodeDataCache", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "edgeDataCache", {});
    // Indices to keep track of the index of the item inside programs
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "nodeProgramIndex", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "edgeProgramIndex", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "nodesWithForcedLabels", new Set());
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "edgesWithForcedLabels", new Set());
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "nodeExtent", {
      x: [0, 1],
      y: [0, 1]
    });
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "nodeZExtent", [Infinity, -Infinity]);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "edgeZExtent", [Infinity, -Infinity]);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "matrix", (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.i)());
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "invMatrix", (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.i)());
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "correctionRatio", 1);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "customBBox", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "normalizationFunction", (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.c)({
      x: [0, 1],
      y: [0, 1]
    }));
    // Cache:
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "graphToViewportRatio", 1);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "itemIDsIndex", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "nodeIndices", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "edgeIndices", {});
    // Starting dimensions and pixel ratio
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "width", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "height", 0);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "pixelRatio", (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.d)());
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "pickingDownSizingRatio", 2 * _this.pixelRatio);
    // Graph State
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "displayedNodeLabels", new Set());
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "displayedEdgeLabels", new Set());
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "highlightedNodes", new Set());
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "hoveredNode", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "hoveredEdge", null);
    // Internal states
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "renderFrame", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "renderHighlightedNodesFrame", null);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "needToProcess", false);
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "checkEdgesEventsFrame", null);
    // Programs
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "nodePrograms", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "nodeHoverPrograms", {});
    (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(_this, "edgePrograms", {});
    _this.settings = (0,_settings_dist_sigma_settings_esm_js__WEBPACK_IMPORTED_MODULE_4__.resolveSettings)(settings);

    // Validating
    (0,_settings_dist_sigma_settings_esm_js__WEBPACK_IMPORTED_MODULE_4__.validateSettings)(_this.settings);
    (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.v)(graph);
    if (!(container instanceof HTMLElement)) throw new Error("Sigma: container should be an html element.");

    // Properties
    _this.graph = graph;
    _this.container = container;

    // Initializing contexts
    _this.createWebGLContext("edges", {
      picking: settings.enableEdgeEvents
    });
    _this.createCanvasContext("edgeLabels");
    _this.createWebGLContext("nodes", {
      picking: true
    });
    _this.createCanvasContext("labels");
    _this.createCanvasContext("hovers");
    _this.createWebGLContext("hoverNodes");
    _this.createCanvasContext("mouse", {
      style: {
        touchAction: "none",
        userSelect: "none"
      }
    });

    // Initial resize
    _this.resize();

    // Loading programs
    for (var type in _this.settings.nodeProgramClasses) {
      _this.registerNodeProgram(type, _this.settings.nodeProgramClasses[type], _this.settings.nodeHoverProgramClasses[type]);
    }
    for (var _type in _this.settings.edgeProgramClasses) {
      _this.registerEdgeProgram(_type, _this.settings.edgeProgramClasses[_type]);
    }

    // Initializing the camera
    _this.camera = new Camera();

    // Binding camera events
    _this.bindCameraHandlers();

    // Initializing captors
    _this.mouseCaptor = new MouseCaptor(_this.elements.mouse, _this);
    _this.mouseCaptor.setSettings(_this.settings);
    _this.touchCaptor = new TouchCaptor(_this.elements.mouse, _this);
    _this.touchCaptor.setSettings(_this.settings);

    // Binding event handlers
    _this.bindEventHandlers();

    // Binding graph handlers
    _this.bindGraphHandlers();

    // Trigger eventual settings-related things
    _this.handleSettingsUpdate();

    // Processing data for the first time & render
    _this.refresh();
    return _this;
  }

  /**---------------------------------------------------------------------------
   * Internal methods.
   **---------------------------------------------------------------------------
   */

  /**
   * Internal function used to register a node program
   *
   * @param  {string}           key              - The program's key, matching the related nodes "type" values.
   * @param  {NodeProgramType}  NodeProgramClass - A nodes program class.
   * @param  {NodeProgramType?} NodeHoverProgram - A nodes program class to render hovered nodes (optional).
   * @return {Sigma}
   */
  (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__._)(Sigma, _TypedEventEmitter);
  return (0,_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.a)(Sigma, [{
    key: "registerNodeProgram",
    value: function registerNodeProgram(key, NodeProgramClass, NodeHoverProgram) {
      if (this.nodePrograms[key]) this.nodePrograms[key].kill();
      if (this.nodeHoverPrograms[key]) this.nodeHoverPrograms[key].kill();
      this.nodePrograms[key] = new NodeProgramClass(this.webGLContexts.nodes, this.frameBuffers.nodes, this);
      this.nodeHoverPrograms[key] = new (NodeHoverProgram || NodeProgramClass)(this.webGLContexts.hoverNodes, null, this);
      return this;
    }

    /**
     * Internal function used to register an edge program
     *
     * @param  {string}          key              - The program's key, matching the related edges "type" values.
     * @param  {EdgeProgramType} EdgeProgramClass - An edges program class.
     * @return {Sigma}
     */
  }, {
    key: "registerEdgeProgram",
    value: function registerEdgeProgram(key, EdgeProgramClass) {
      if (this.edgePrograms[key]) this.edgePrograms[key].kill();
      this.edgePrograms[key] = new EdgeProgramClass(this.webGLContexts.edges, this.frameBuffers.edges, this);
      return this;
    }

    /**
     * Internal function used to unregister a node program
     *
     * @param  {string} key - The program's key, matching the related nodes "type" values.
     * @return {Sigma}
     */
  }, {
    key: "unregisterNodeProgram",
    value: function unregisterNodeProgram(key) {
      if (this.nodePrograms[key]) {
        var _this$nodePrograms = this.nodePrograms,
          program = _this$nodePrograms[key],
          programs = _objectWithoutProperties(_this$nodePrograms, [key].map(_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.d));
        program.kill();
        this.nodePrograms = programs;
      }
      if (this.nodeHoverPrograms[key]) {
        var _this$nodeHoverProgra = this.nodeHoverPrograms,
          _program = _this$nodeHoverProgra[key],
          _programs = _objectWithoutProperties(_this$nodeHoverProgra, [key].map(_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.d));
        _program.kill();
        this.nodePrograms = _programs;
      }
      return this;
    }

    /**
     * Internal function used to unregister an edge program
     *
     * @param  {string} key - The program's key, matching the related edges "type" values.
     * @return {Sigma}
     */
  }, {
    key: "unregisterEdgeProgram",
    value: function unregisterEdgeProgram(key) {
      if (this.edgePrograms[key]) {
        var _this$edgePrograms = this.edgePrograms,
          program = _this$edgePrograms[key],
          programs = _objectWithoutProperties(_this$edgePrograms, [key].map(_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_1__.d));
        program.kill();
        this.edgePrograms = programs;
      }
      return this;
    }

    /**
     * Method (re)binding WebGL texture (for picking).
     *
     * @return {Sigma}
     */
  }, {
    key: "resetWebGLTexture",
    value: function resetWebGLTexture(id) {
      var gl = this.webGLContexts[id];
      var frameBuffer = this.frameBuffers[id];
      var currentTexture = this.textures[id];
      if (currentTexture) gl.deleteTexture(currentTexture);
      var pickingTexture = gl.createTexture();
      gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
      gl.bindTexture(gl.TEXTURE_2D, pickingTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, pickingTexture, 0);
      this.textures[id] = pickingTexture;
      return this;
    }

    /**
     * Method binding camera handlers.
     *
     * @return {Sigma}
     */
  }, {
    key: "bindCameraHandlers",
    value: function bindCameraHandlers() {
      var _this2 = this;
      this.activeListeners.camera = function () {
        _this2.scheduleRender();
      };
      this.camera.on("updated", this.activeListeners.camera);
      return this;
    }

    /**
     * Method unbinding camera handlers.
     *
     * @return {Sigma}
     */
  }, {
    key: "unbindCameraHandlers",
    value: function unbindCameraHandlers() {
      this.camera.removeListener("updated", this.activeListeners.camera);
      return this;
    }

    /**
     * Method that returns the closest node to a given position.
     */
  }, {
    key: "getNodeAtPosition",
    value: function getNodeAtPosition(position) {
      var x = position.x,
        y = position.y;
      var color = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_5__.g)(this.webGLContexts.nodes, this.frameBuffers.nodes, x, y, this.pixelRatio, this.pickingDownSizingRatio);
      var index = _colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_5__.c.apply(void 0, _toConsumableArray(color));
      var itemAt = this.itemIDsIndex[index];
      return itemAt && itemAt.type === "node" ? itemAt.id : null;
    }

    /**
     * Method binding event handlers.
     *
     * @return {Sigma}
     */
  }, {
    key: "bindEventHandlers",
    value: function bindEventHandlers() {
      var _this3 = this;
      // Handling window resize
      this.activeListeners.handleResize = function () {
        // need to call a refresh to rebuild the labelgrid
        _this3.scheduleRefresh();
      };
      window.addEventListener("resize", this.activeListeners.handleResize);

      // Handling mouse move
      this.activeListeners.handleMove = function (e) {
        var event = cleanMouseCoords(e);
        var baseEvent = {
          event: event,
          preventSigmaDefault: function preventSigmaDefault() {
            event.preventSigmaDefault();
          }
        };
        var nodeToHover = _this3.getNodeAtPosition(event);
        if (nodeToHover && _this3.hoveredNode !== nodeToHover && !_this3.nodeDataCache[nodeToHover].hidden) {
          // Handling passing from one node to the other directly
          if (_this3.hoveredNode) _this3.emit("leaveNode", (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent), {}, {
            node: _this3.hoveredNode
          }));
          _this3.hoveredNode = nodeToHover;
          _this3.emit("enterNode", (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent), {}, {
            node: nodeToHover
          }));
          _this3.scheduleHighlightedNodesRender();
          return;
        }

        // Checking if the hovered node is still hovered
        if (_this3.hoveredNode) {
          if (_this3.getNodeAtPosition(event) !== _this3.hoveredNode) {
            var node = _this3.hoveredNode;
            _this3.hoveredNode = null;
            _this3.emit("leaveNode", (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent), {}, {
              node: node
            }));
            _this3.scheduleHighlightedNodesRender();
            return;
          }
        }
        if (_this3.settings.enableEdgeEvents) {
          var edgeToHover = _this3.hoveredNode ? null : _this3.getEdgeAtPoint(baseEvent.event.x, baseEvent.event.y);
          if (edgeToHover !== _this3.hoveredEdge) {
            if (_this3.hoveredEdge) _this3.emit("leaveEdge", (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent), {}, {
              edge: _this3.hoveredEdge
            }));
            if (edgeToHover) _this3.emit("enterEdge", (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent), {}, {
              edge: edgeToHover
            }));
            _this3.hoveredEdge = edgeToHover;
          }
        }
      };

      // Handling mouse move over body (only to dispatch the proper event):
      this.activeListeners.handleMoveBody = function (e) {
        var event = cleanMouseCoords(e);
        _this3.emit("moveBody", {
          event: event,
          preventSigmaDefault: function preventSigmaDefault() {
            event.preventSigmaDefault();
          }
        });
      };

      // Handling mouse leave stage:
      this.activeListeners.handleLeave = function (e) {
        var event = cleanMouseCoords(e);
        var baseEvent = {
          event: event,
          preventSigmaDefault: function preventSigmaDefault() {
            event.preventSigmaDefault();
          }
        };
        if (_this3.hoveredNode) {
          _this3.emit("leaveNode", (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent), {}, {
            node: _this3.hoveredNode
          }));
          _this3.scheduleHighlightedNodesRender();
        }
        if (_this3.settings.enableEdgeEvents && _this3.hoveredEdge) {
          _this3.emit("leaveEdge", (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent), {}, {
            edge: _this3.hoveredEdge
          }));
          _this3.scheduleHighlightedNodesRender();
        }
        _this3.emit("leaveStage", (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent));
      };

      // Handling mouse enter stage:
      this.activeListeners.handleEnter = function (e) {
        var event = cleanMouseCoords(e);
        var baseEvent = {
          event: event,
          preventSigmaDefault: function preventSigmaDefault() {
            event.preventSigmaDefault();
          }
        };
        _this3.emit("enterStage", (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent));
      };

      // Handling click
      var createInteractionListener = function createInteractionListener(eventType) {
        return function (e) {
          var event = cleanMouseCoords(e);
          var baseEvent = {
            event: event,
            preventSigmaDefault: function preventSigmaDefault() {
              event.preventSigmaDefault();
            }
          };
          var nodeAtPosition = _this3.getNodeAtPosition(event);
          if (nodeAtPosition) return _this3.emit("".concat(eventType, "Node"), (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent), {}, {
            node: nodeAtPosition
          }));
          if (_this3.settings.enableEdgeEvents) {
            var edge = _this3.getEdgeAtPoint(event.x, event.y);
            if (edge) return _this3.emit("".concat(eventType, "Edge"), (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, baseEvent), {}, {
              edge: edge
            }));
          }
          return _this3.emit("".concat(eventType, "Stage"), baseEvent);
        };
      };
      this.activeListeners.handleClick = createInteractionListener("click");
      this.activeListeners.handleRightClick = createInteractionListener("rightClick");
      this.activeListeners.handleDoubleClick = createInteractionListener("doubleClick");
      this.activeListeners.handleWheel = createInteractionListener("wheel");
      this.activeListeners.handleDown = createInteractionListener("down");
      this.activeListeners.handleUp = createInteractionListener("up");
      this.mouseCaptor.on("mousemove", this.activeListeners.handleMove);
      this.mouseCaptor.on("mousemovebody", this.activeListeners.handleMoveBody);
      this.mouseCaptor.on("click", this.activeListeners.handleClick);
      this.mouseCaptor.on("rightClick", this.activeListeners.handleRightClick);
      this.mouseCaptor.on("doubleClick", this.activeListeners.handleDoubleClick);
      this.mouseCaptor.on("wheel", this.activeListeners.handleWheel);
      this.mouseCaptor.on("mousedown", this.activeListeners.handleDown);
      this.mouseCaptor.on("mouseup", this.activeListeners.handleUp);
      this.mouseCaptor.on("mouseleave", this.activeListeners.handleLeave);
      this.mouseCaptor.on("mouseenter", this.activeListeners.handleEnter);
      this.touchCaptor.on("touchdown", this.activeListeners.handleDown);
      this.touchCaptor.on("touchdown", this.activeListeners.handleMove);
      this.touchCaptor.on("touchup", this.activeListeners.handleUp);
      this.touchCaptor.on("touchmove", this.activeListeners.handleMove);
      this.touchCaptor.on("tap", this.activeListeners.handleClick);
      this.touchCaptor.on("doubletap", this.activeListeners.handleDoubleClick);
      this.touchCaptor.on("touchmove", this.activeListeners.handleMoveBody);
      return this;
    }

    /**
     * Method binding graph handlers
     *
     * @return {Sigma}
     */
  }, {
    key: "bindGraphHandlers",
    value: function bindGraphHandlers() {
      var _this4 = this;
      var graph = this.graph;
      var LAYOUT_IMPACTING_FIELDS = new Set(["x", "y", "zIndex", "type"]);
      this.activeListeners.eachNodeAttributesUpdatedGraphUpdate = function (e) {
        var _e$hints;
        var updatedFields = (_e$hints = e.hints) === null || _e$hints === void 0 ? void 0 : _e$hints.attributes;
        // we process all nodes
        _this4.graph.forEachNode(function (node) {
          return _this4.updateNode(node);
        });

        // if coord, type or zIndex have changed, we need to schedule a render
        // (zIndex for the programIndex)
        var layoutChanged = !updatedFields || updatedFields.some(function (f) {
          return LAYOUT_IMPACTING_FIELDS.has(f);
        });
        _this4.refresh({
          partialGraph: {
            nodes: graph.nodes()
          },
          skipIndexation: !layoutChanged,
          schedule: true
        });
      };
      this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate = function (e) {
        var _e$hints2;
        var updatedFields = (_e$hints2 = e.hints) === null || _e$hints2 === void 0 ? void 0 : _e$hints2.attributes;
        // we process all edges
        _this4.graph.forEachEdge(function (edge) {
          return _this4.updateEdge(edge);
        });
        var layoutChanged = updatedFields && ["zIndex", "type"].some(function (f) {
          return updatedFields === null || updatedFields === void 0 ? void 0 : updatedFields.includes(f);
        });
        _this4.refresh({
          partialGraph: {
            edges: graph.edges()
          },
          skipIndexation: !layoutChanged,
          schedule: true
        });
      };

      // On add node, we add the node in indices and then call for a render
      this.activeListeners.addNodeGraphUpdate = function (payload) {
        var node = payload.key;
        // we process the node
        _this4.addNode(node);
        // schedule a render for the node
        _this4.refresh({
          partialGraph: {
            nodes: [node]
          },
          skipIndexation: false,
          schedule: true
        });
      };

      // On update node, we update indices and then call for a render
      this.activeListeners.updateNodeGraphUpdate = function (payload) {
        var node = payload.key;
        // schedule a render for the node
        _this4.refresh({
          partialGraph: {
            nodes: [node]
          },
          skipIndexation: false,
          schedule: true
        });
      };

      // On drop node, we remove the node from indices and then call for a refresh
      this.activeListeners.dropNodeGraphUpdate = function (payload) {
        var node = payload.key;
        // we process the node
        _this4.removeNode(node);
        // schedule a render for everything
        _this4.refresh({
          schedule: true
        });
      };

      // On add edge, we remove the edge from indices and then call for a refresh
      this.activeListeners.addEdgeGraphUpdate = function (payload) {
        var edge = payload.key;
        // we process the edge
        _this4.addEdge(edge);
        // schedule a render for the edge
        _this4.refresh({
          partialGraph: {
            edges: [edge]
          },
          schedule: true
        });
      };

      // On update edge, we update indices and then call for a refresh
      this.activeListeners.updateEdgeGraphUpdate = function (payload) {
        var edge = payload.key;
        // schedule a repaint for the edge
        _this4.refresh({
          partialGraph: {
            edges: [edge]
          },
          skipIndexation: false,
          schedule: true
        });
      };

      // On drop edge, we remove the edge from indices and then call for a refresh
      this.activeListeners.dropEdgeGraphUpdate = function (payload) {
        var edge = payload.key;
        // we process the edge
        _this4.removeEdge(edge);
        // schedule a render for all edges
        _this4.refresh({
          schedule: true
        });
      };

      // On clear edges, we clear the edge indices and then call for a refresh
      this.activeListeners.clearEdgesGraphUpdate = function () {
        // we clear the edge data structures
        _this4.clearEdgeState();
        _this4.clearEdgeIndices();
        // schedule a render for all edges
        _this4.refresh({
          schedule: true
        });
      };

      // On graph clear, we clear indices and then call for a refresh
      this.activeListeners.clearGraphUpdate = function () {
        // clear graph state
        _this4.clearEdgeState();
        _this4.clearNodeState();

        // clear graph indices
        _this4.clearEdgeIndices();
        _this4.clearNodeIndices();

        // schedule a render for all
        _this4.refresh({
          schedule: true
        });
      };
      graph.on("nodeAdded", this.activeListeners.addNodeGraphUpdate);
      graph.on("nodeDropped", this.activeListeners.dropNodeGraphUpdate);
      graph.on("nodeAttributesUpdated", this.activeListeners.updateNodeGraphUpdate);
      graph.on("eachNodeAttributesUpdated", this.activeListeners.eachNodeAttributesUpdatedGraphUpdate);
      graph.on("edgeAdded", this.activeListeners.addEdgeGraphUpdate);
      graph.on("edgeDropped", this.activeListeners.dropEdgeGraphUpdate);
      graph.on("edgeAttributesUpdated", this.activeListeners.updateEdgeGraphUpdate);
      graph.on("eachEdgeAttributesUpdated", this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate);
      graph.on("edgesCleared", this.activeListeners.clearEdgesGraphUpdate);
      graph.on("cleared", this.activeListeners.clearGraphUpdate);
      return this;
    }

    /**
     * Method used to unbind handlers from the graph.
     *
     * @return {undefined}
     */
  }, {
    key: "unbindGraphHandlers",
    value: function unbindGraphHandlers() {
      var graph = this.graph;
      graph.removeListener("nodeAdded", this.activeListeners.addNodeGraphUpdate);
      graph.removeListener("nodeDropped", this.activeListeners.dropNodeGraphUpdate);
      graph.removeListener("nodeAttributesUpdated", this.activeListeners.updateNodeGraphUpdate);
      graph.removeListener("eachNodeAttributesUpdated", this.activeListeners.eachNodeAttributesUpdatedGraphUpdate);
      graph.removeListener("edgeAdded", this.activeListeners.addEdgeGraphUpdate);
      graph.removeListener("edgeDropped", this.activeListeners.dropEdgeGraphUpdate);
      graph.removeListener("edgeAttributesUpdated", this.activeListeners.updateEdgeGraphUpdate);
      graph.removeListener("eachEdgeAttributesUpdated", this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate);
      graph.removeListener("edgesCleared", this.activeListeners.clearEdgesGraphUpdate);
      graph.removeListener("cleared", this.activeListeners.clearGraphUpdate);
    }

    /**
     * Method looking for an edge colliding with a given point at (x, y). Returns
     * the key of the edge if any, or null else.
     */
  }, {
    key: "getEdgeAtPoint",
    value: function getEdgeAtPoint(x, y) {
      var color = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_5__.g)(this.webGLContexts.edges, this.frameBuffers.edges, x, y, this.pixelRatio, this.pickingDownSizingRatio);
      var index = _colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_5__.c.apply(void 0, _toConsumableArray(color));
      var itemAt = this.itemIDsIndex[index];
      return itemAt && itemAt.type === "edge" ? itemAt.id : null;
    }

    /**
     * Method used to process the whole graph's data.
     *  - extent
     *  - normalizationFunction
     *  - compute node's coordinate
     *  - labelgrid
     *  - program data allocation
     * @return {Sigma}
     */
  }, {
    key: "process",
    value: function process() {
      var _this5 = this;
      this.emit("beforeProcess");
      var graph = this.graph;
      var settings = this.settings;
      var dimensions = this.getDimensions();

      //
      // NODES
      //
      this.nodeExtent = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.g)(this.graph);
      if (!this.settings.autoRescale) {
        var width = dimensions.width,
          height = dimensions.height;
        var _this$nodeExtent = this.nodeExtent,
          x = _this$nodeExtent.x,
          y = _this$nodeExtent.y;
        this.nodeExtent = {
          x: [(x[0] + x[1]) / 2 - width / 2, (x[0] + x[1]) / 2 + width / 2],
          y: [(y[0] + y[1]) / 2 - height / 2, (y[0] + y[1]) / 2 + height / 2]
        };
      }
      this.normalizationFunction = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.c)(this.customBBox || this.nodeExtent);

      // NOTE: it is important to compute this matrix after computing the node's extent
      // because #.getGraphDimensions relies on it
      var nullCamera = new Camera();
      var nullCameraMatrix = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.m)(nullCamera.getState(), dimensions, this.getGraphDimensions(), this.getStagePadding());
      // Resetting the label grid
      // TODO: it's probably better to do this explicitly or on resizes for layout and anims
      this.labelGrid.resizeAndClear(dimensions, settings.labelGridCellSize);
      var nodesPerPrograms = {};
      var nodeIndices = {};
      var edgeIndices = {};
      var itemIDsIndex = {};
      var incrID = 1;
      var nodes = graph.nodes();

      // Do some indexation on the whole graph
      for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        var data = this.nodeDataCache[node];

        // Get initial coordinates
        var attrs = graph.getNodeAttributes(node);
        data.x = attrs.x;
        data.y = attrs.y;
        this.normalizationFunction.applyTo(data);

        // labelgrid
        if (typeof data.label === "string" && !data.hidden) this.labelGrid.add(node, data.size, this.framedGraphToViewport(data, {
          matrix: nullCameraMatrix
        }));

        // update count per program
        nodesPerPrograms[data.type] = (nodesPerPrograms[data.type] || 0) + 1;
      }
      this.labelGrid.organize();

      // Allocate memory to programs
      for (var type in this.nodePrograms) {
        if (!hasOwnProperty.call(this.nodePrograms, type)) {
          throw new Error("Sigma: could not find a suitable program for node type \"".concat(type, "\"!"));
        }
        this.nodePrograms[type].reallocate(nodesPerPrograms[type] || 0);
        // We reset that count here, so that we can reuse it while calling the Program#process methods:
        nodesPerPrograms[type] = 0;
      }

      // Order nodes by zIndex before to add them to program
      if (this.settings.zIndex && this.nodeZExtent[0] !== this.nodeZExtent[1]) nodes = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.z)(this.nodeZExtent, function (node) {
        return _this5.nodeDataCache[node].zIndex;
      }, nodes);

      // Add data to programs
      for (var _i = 0, _l = nodes.length; _i < _l; _i++) {
        var _node = nodes[_i];
        nodeIndices[_node] = incrID;
        itemIDsIndex[nodeIndices[_node]] = {
          type: "node",
          id: _node
        };
        incrID++;
        var _data = this.nodeDataCache[_node];
        this.addNodeToProgram(_node, nodeIndices[_node], nodesPerPrograms[_data.type]++);
      }

      //
      // EDGES
      //

      var edgesPerPrograms = {};
      var edges = graph.edges();

      // Allocate memory to programs
      for (var _i2 = 0, _l2 = edges.length; _i2 < _l2; _i2++) {
        var edge = edges[_i2];
        var _data2 = this.edgeDataCache[edge];
        edgesPerPrograms[_data2.type] = (edgesPerPrograms[_data2.type] || 0) + 1;
      }

      // Order edges by zIndex before to add them to program
      if (this.settings.zIndex && this.edgeZExtent[0] !== this.edgeZExtent[1]) edges = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.z)(this.edgeZExtent, function (edge) {
        return _this5.edgeDataCache[edge].zIndex;
      }, edges);
      for (var _type2 in this.edgePrograms) {
        if (!hasOwnProperty.call(this.edgePrograms, _type2)) {
          throw new Error("Sigma: could not find a suitable program for edge type \"".concat(_type2, "\"!"));
        }
        this.edgePrograms[_type2].reallocate(edgesPerPrograms[_type2] || 0);
        // We reset that count here, so that we can reuse it while calling the Program#process methods:
        edgesPerPrograms[_type2] = 0;
      }

      // Add data to programs
      for (var _i3 = 0, _l3 = edges.length; _i3 < _l3; _i3++) {
        var _edge = edges[_i3];
        edgeIndices[_edge] = incrID;
        itemIDsIndex[edgeIndices[_edge]] = {
          type: "edge",
          id: _edge
        };
        incrID++;
        var _data3 = this.edgeDataCache[_edge];
        this.addEdgeToProgram(_edge, edgeIndices[_edge], edgesPerPrograms[_data3.type]++);
      }
      this.itemIDsIndex = itemIDsIndex;
      this.nodeIndices = nodeIndices;
      this.edgeIndices = edgeIndices;
      this.emit("afterProcess");
      return this;
    }

    /**
     * Method that backports potential settings updates where it's needed.
     * @private
     */
  }, {
    key: "handleSettingsUpdate",
    value: function handleSettingsUpdate(oldSettings) {
      var _this6 = this;
      var settings = this.settings;
      this.camera.minRatio = settings.minCameraRatio;
      this.camera.maxRatio = settings.maxCameraRatio;
      this.camera.enabledZooming = settings.enableCameraZooming;
      this.camera.enabledPanning = settings.enableCameraPanning;
      this.camera.enabledRotation = settings.enableCameraRotation;
      if (settings.cameraPanBoundaries) {
        this.camera.clean = function (state) {
          return _this6.cleanCameraState(state, settings.cameraPanBoundaries && (0,_data_11df7124_esm_js__WEBPACK_IMPORTED_MODULE_6__._)(settings.cameraPanBoundaries) === "object" ? settings.cameraPanBoundaries : {});
        };
      } else {
        this.camera.clean = null;
      }
      this.camera.setState(this.camera.validateState(this.camera.getState()));
      if (oldSettings) {
        // Check edge programs:
        if (oldSettings.edgeProgramClasses !== settings.edgeProgramClasses) {
          for (var type in settings.edgeProgramClasses) {
            if (settings.edgeProgramClasses[type] !== oldSettings.edgeProgramClasses[type]) {
              this.registerEdgeProgram(type, settings.edgeProgramClasses[type]);
            }
          }
          for (var _type3 in oldSettings.edgeProgramClasses) {
            if (!settings.edgeProgramClasses[_type3]) this.unregisterEdgeProgram(_type3);
          }
        }

        // Check node programs:
        if (oldSettings.nodeProgramClasses !== settings.nodeProgramClasses || oldSettings.nodeHoverProgramClasses !== settings.nodeHoverProgramClasses) {
          for (var _type4 in settings.nodeProgramClasses) {
            if (settings.nodeProgramClasses[_type4] !== oldSettings.nodeProgramClasses[_type4] || settings.nodeHoverProgramClasses[_type4] !== oldSettings.nodeHoverProgramClasses[_type4]) {
              this.registerNodeProgram(_type4, settings.nodeProgramClasses[_type4], settings.nodeHoverProgramClasses[_type4]);
            }
          }
          for (var _type5 in oldSettings.nodeProgramClasses) {
            if (!settings.nodeProgramClasses[_type5]) this.unregisterNodeProgram(_type5);
          }
        }
      }

      // Update captors settings:
      this.mouseCaptor.setSettings(this.settings);
      this.touchCaptor.setSettings(this.settings);
      return this;
    }
  }, {
    key: "cleanCameraState",
    value: function cleanCameraState(state) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$tolerance = _ref.tolerance,
        tolerance = _ref$tolerance === void 0 ? 0 : _ref$tolerance,
        boundaries = _ref.boundaries;
      var newState = (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, state);

      // Extract necessary properties
      var _ref2 = boundaries || this.nodeExtent,
        _ref2$x = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_5__._)(_ref2.x, 2),
        xMinGraph = _ref2$x[0],
        xMaxGraph = _ref2$x[1],
        _ref2$y = (0,_colors_beb06eb2_esm_js__WEBPACK_IMPORTED_MODULE_5__._)(_ref2.y, 2),
        yMinGraph = _ref2$y[0],
        yMaxGraph = _ref2$y[1];

      // Transform the four corners of the graph rectangle using the provided camera state
      var corners = [this.graphToViewport({
        x: xMinGraph,
        y: yMinGraph
      }, {
        cameraState: state
      }), this.graphToViewport({
        x: xMaxGraph,
        y: yMinGraph
      }, {
        cameraState: state
      }), this.graphToViewport({
        x: xMinGraph,
        y: yMaxGraph
      }, {
        cameraState: state
      }), this.graphToViewport({
        x: xMaxGraph,
        y: yMaxGraph
      }, {
        cameraState: state
      })];

      // Look for new extents, based on these four corners
      var xMin = Infinity,
        xMax = -Infinity,
        yMin = Infinity,
        yMax = -Infinity;
      corners.forEach(function (_ref3) {
        var x = _ref3.x,
          y = _ref3.y;
        xMin = Math.min(xMin, x);
        xMax = Math.max(xMax, x);
        yMin = Math.min(yMin, y);
        yMax = Math.max(yMax, y);
      });

      // For each dimension, constraint the smaller element (camera or graph) to fit in the larger one:
      var graphWidth = xMax - xMin;
      var graphHeight = yMax - yMin;
      var _this$getDimensions = this.getDimensions(),
        width = _this$getDimensions.width,
        height = _this$getDimensions.height;
      var dx = 0;
      var dy = 0;
      if (graphWidth >= width) {
        if (xMax < width - tolerance) dx = xMax - (width - tolerance);else if (xMin > tolerance) dx = xMin - tolerance;
      } else {
        if (xMax > width + tolerance) dx = xMax - (width + tolerance);else if (xMin < -tolerance) dx = xMin + tolerance;
      }
      if (graphHeight >= height) {
        if (yMax < height - tolerance) dy = yMax - (height - tolerance);else if (yMin > tolerance) dy = yMin - tolerance;
      } else {
        if (yMax > height + tolerance) dy = yMax - (height + tolerance);else if (yMin < -tolerance) dy = yMin + tolerance;
      }
      if (dx || dy) {
        // Transform [dx, dy] from viewport to graph (using two different point to transform that vector):
        var origin = this.viewportToFramedGraph({
          x: 0,
          y: 0
        }, {
          cameraState: state
        });
        var delta = this.viewportToFramedGraph({
          x: dx,
          y: dy
        }, {
          cameraState: state
        });
        dx = delta.x - origin.x;
        dy = delta.y - origin.y;
        newState.x += dx;
        newState.y += dy;
      }
      return newState;
    }

    /**
     * Method used to render labels.
     *
     * @return {Sigma}
     */
  }, {
    key: "renderLabels",
    value: function renderLabels() {
      if (!this.settings.renderLabels) return this;
      var cameraState = this.camera.getState();

      // Selecting labels to draw
      var labelsToDisplay = this.labelGrid.getLabelsToDisplay(cameraState.ratio, this.settings.labelDensity);
      (0,_data_11df7124_esm_js__WEBPACK_IMPORTED_MODULE_6__.e)(labelsToDisplay, this.nodesWithForcedLabels);
      this.displayedNodeLabels = new Set();

      // Drawing labels
      var context = this.canvasContexts.labels;
      for (var i = 0, l = labelsToDisplay.length; i < l; i++) {
        var node = labelsToDisplay[i];
        var data = this.nodeDataCache[node];

        // If the node was already drawn (like if it is eligible AND has
        // `forceLabel`), we don't want to draw it again
        // NOTE: we can do better probably
        if (this.displayedNodeLabels.has(node)) continue;

        // If the node is hidden, we don't need to display its label obviously
        if (data.hidden) continue;
        var _this$framedGraphToVi = this.framedGraphToViewport(data),
          x = _this$framedGraphToVi.x,
          y = _this$framedGraphToVi.y;

        // NOTE: we can cache the labels we need to render until the camera's ratio changes
        var size = this.scaleSize(data.size);

        // Is node big enough?
        if (!data.forceLabel && size < this.settings.labelRenderedSizeThreshold) continue;

        // Is node actually on screen (with some margin)
        // NOTE: we used to rely on the quadtree for this, but the coordinates
        // conversion make it unreliable and at that point we already converted
        // to viewport coordinates and since the label grid already culls the
        // number of potential labels to display this looks like a good
        // performance compromise.
        // NOTE: labelGrid.getLabelsToDisplay could probably optimize by not
        // considering cells obviously outside of the range of the current
        // view rectangle.
        if (x < -X_LABEL_MARGIN || x > this.width + X_LABEL_MARGIN || y < -Y_LABEL_MARGIN || y > this.height + Y_LABEL_MARGIN) continue;

        // Because displayed edge labels depend directly on actually rendered node
        // labels, we need to only add to this.displayedNodeLabels nodes whose label
        // is rendered.
        // This makes this.displayedNodeLabels depend on viewport, which might become
        // an issue once we start memoizing getLabelsToDisplay.
        this.displayedNodeLabels.add(node);
        var defaultDrawNodeLabel = this.settings.defaultDrawNodeLabel;
        var nodeProgram = this.nodePrograms[data.type];
        var drawLabel = (nodeProgram === null || nodeProgram === void 0 ? void 0 : nodeProgram.drawLabel) || defaultDrawNodeLabel;
        drawLabel(context, (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({
          key: node
        }, data), {}, {
          size: size,
          x: x,
          y: y
        }), this.settings);
      }
      return this;
    }

    /**
     * Method used to render edge labels, based on which node labels were
     * rendered.
     *
     * @return {Sigma}
     */
  }, {
    key: "renderEdgeLabels",
    value: function renderEdgeLabels() {
      if (!this.settings.renderEdgeLabels) return this;
      var context = this.canvasContexts.edgeLabels;

      // Clearing
      context.clearRect(0, 0, this.width, this.height);
      var edgeLabelsToDisplay = edgeLabelsToDisplayFromNodes({
        graph: this.graph,
        hoveredNode: this.hoveredNode,
        displayedNodeLabels: this.displayedNodeLabels,
        highlightedNodes: this.highlightedNodes
      });
      (0,_data_11df7124_esm_js__WEBPACK_IMPORTED_MODULE_6__.e)(edgeLabelsToDisplay, this.edgesWithForcedLabels);
      var displayedLabels = new Set();
      for (var i = 0, l = edgeLabelsToDisplay.length; i < l; i++) {
        var edge = edgeLabelsToDisplay[i],
          extremities = this.graph.extremities(edge),
          sourceData = this.nodeDataCache[extremities[0]],
          targetData = this.nodeDataCache[extremities[1]],
          edgeData = this.edgeDataCache[edge];

        // If the edge was already drawn (like if it is eligible AND has
        // `forceLabel`), we don't want to draw it again
        if (displayedLabels.has(edge)) continue;

        // If the edge is hidden we don't need to display its label
        // NOTE: the test on sourceData & targetData is probably paranoid at this point?
        if (edgeData.hidden || sourceData.hidden || targetData.hidden) {
          continue;
        }
        var defaultDrawEdgeLabel = this.settings.defaultDrawEdgeLabel;
        var edgeProgram = this.edgePrograms[edgeData.type];
        var drawLabel = (edgeProgram === null || edgeProgram === void 0 ? void 0 : edgeProgram.drawLabel) || defaultDrawEdgeLabel;
        drawLabel(context, (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({
          key: edge
        }, edgeData), {}, {
          size: this.scaleSize(edgeData.size)
        }), (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({
          key: extremities[0]
        }, sourceData), this.framedGraphToViewport(sourceData)), {}, {
          size: this.scaleSize(sourceData.size)
        }), (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({
          key: extremities[1]
        }, targetData), this.framedGraphToViewport(targetData)), {}, {
          size: this.scaleSize(targetData.size)
        }), this.settings);
        displayedLabels.add(edge);
      }
      this.displayedEdgeLabels = displayedLabels;
      return this;
    }

    /**
     * Method used to render the highlighted nodes.
     *
     * @return {Sigma}
     */
  }, {
    key: "renderHighlightedNodes",
    value: function renderHighlightedNodes() {
      var _this7 = this;
      var context = this.canvasContexts.hovers;

      // Clearing
      context.clearRect(0, 0, this.width, this.height);

      // Rendering
      var render = function render(node) {
        var data = _this7.nodeDataCache[node];
        var _this7$framedGraphToV = _this7.framedGraphToViewport(data),
          x = _this7$framedGraphToV.x,
          y = _this7$framedGraphToV.y;
        var size = _this7.scaleSize(data.size);
        var defaultDrawNodeHover = _this7.settings.defaultDrawNodeHover;
        var nodeProgram = _this7.nodePrograms[data.type];
        var drawHover = (nodeProgram === null || nodeProgram === void 0 ? void 0 : nodeProgram.drawHover) || defaultDrawNodeHover;
        drawHover(context, (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({
          key: node
        }, data), {}, {
          size: size,
          x: x,
          y: y
        }), _this7.settings);
      };
      var nodesToRender = [];
      if (this.hoveredNode && !this.nodeDataCache[this.hoveredNode].hidden) {
        nodesToRender.push(this.hoveredNode);
      }
      this.highlightedNodes.forEach(function (node) {
        // The hovered node has already been highlighted
        if (node !== _this7.hoveredNode) nodesToRender.push(node);
      });

      // Draw labels:
      nodesToRender.forEach(function (node) {
        return render(node);
      });

      // Draw WebGL nodes on top of the labels:
      var nodesPerPrograms = {};

      // 1. Count nodes per type:
      nodesToRender.forEach(function (node) {
        var type = _this7.nodeDataCache[node].type;
        nodesPerPrograms[type] = (nodesPerPrograms[type] || 0) + 1;
      });
      // 2. Allocate for each type for the proper number of nodes
      for (var type in this.nodeHoverPrograms) {
        this.nodeHoverPrograms[type].reallocate(nodesPerPrograms[type] || 0);
        // Also reset count, to use when rendering:
        nodesPerPrograms[type] = 0;
      }
      // 3. Process all nodes to render:
      nodesToRender.forEach(function (node) {
        var data = _this7.nodeDataCache[node];
        _this7.nodeHoverPrograms[data.type].process(0, nodesPerPrograms[data.type]++, data);
      });
      // 4. Clear hovered nodes layer:
      this.webGLContexts.hoverNodes.clear(this.webGLContexts.hoverNodes.COLOR_BUFFER_BIT);
      // 5. Render:
      var renderParams = this.getRenderParams();
      for (var _type6 in this.nodeHoverPrograms) {
        var program = this.nodeHoverPrograms[_type6];
        program.render(renderParams);
      }
    }

    /**
     * Method used to schedule a hover render.
     *
     */
  }, {
    key: "scheduleHighlightedNodesRender",
    value: function scheduleHighlightedNodesRender() {
      var _this8 = this;
      if (this.renderHighlightedNodesFrame || this.renderFrame) return;
      this.renderHighlightedNodesFrame = requestAnimationFrame(function () {
        // Resetting state
        _this8.renderHighlightedNodesFrame = null;

        // Rendering
        _this8.renderHighlightedNodes();
        _this8.renderEdgeLabels();
      });
    }

    /**
     * Method used to render.
     *
     * @return {Sigma}
     */
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;
      this.emit("beforeRender");
      var exitRender = function exitRender() {
        _this9.emit("afterRender");
        return _this9;
      };

      // If a render was scheduled, we cancel it
      if (this.renderFrame) {
        cancelAnimationFrame(this.renderFrame);
        this.renderFrame = null;
      }

      // First we need to resize
      this.resize();

      // Do we need to reprocess data?
      if (this.needToProcess) this.process();
      this.needToProcess = false;

      // Clearing the canvases
      this.clear();

      // Prepare the textures
      this.pickingLayers.forEach(function (layer) {
        return _this9.resetWebGLTexture(layer);
      });

      // If we have no nodes we can stop right there
      if (!this.graph.order) return exitRender();

      // TODO: improve this heuristic or move to the captor itself?
      // TODO: deal with the touch captor here as well
      var mouseCaptor = this.mouseCaptor;
      var moving = this.camera.isAnimated() || mouseCaptor.isMoving || mouseCaptor.draggedEvents || mouseCaptor.currentWheelDirection;

      // Then we need to extract a matrix from the camera
      var cameraState = this.camera.getState();
      var viewportDimensions = this.getDimensions();
      var graphDimensions = this.getGraphDimensions();
      var padding = this.getStagePadding();
      this.matrix = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.m)(cameraState, viewportDimensions, graphDimensions, padding);
      this.invMatrix = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.m)(cameraState, viewportDimensions, graphDimensions, padding, true);
      this.correctionRatio = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.a)(this.matrix, cameraState, viewportDimensions);
      this.graphToViewportRatio = this.getGraphToViewportRatio();

      // [jacomyal]
      // This comment is related to the one above the `getMatrixImpact` definition:
      // - `this.correctionRatio` is somehow not completely explained
      // - `this.graphToViewportRatio` is the ratio of a distance in the viewport divided by the same distance in the
      //   graph
      // - `this.normalizationFunction.ratio` is basically `Math.max(graphDX, graphDY)`
      // And now, I observe that if I multiply these three ratios, I have something constant, which value remains 2, even
      // when I change the graph, the viewport or the camera. It might be useful later, so I prefer to let this comment:
      // console.log(this.graphToViewportRatio * this.correctionRatio * this.normalizationFunction.ratio * 2);

      var params = this.getRenderParams();

      // Drawing nodes
      for (var type in this.nodePrograms) {
        var program = this.nodePrograms[type];
        program.render(params);
      }

      // Drawing edges
      if (!this.settings.hideEdgesOnMove || !moving) {
        for (var _type7 in this.edgePrograms) {
          var _program2 = this.edgePrograms[_type7];
          _program2.render(params);
        }
      }

      // Do not display labels on move per setting
      if (this.settings.hideLabelsOnMove && moving) return exitRender();
      this.renderLabels();
      this.renderEdgeLabels();
      this.renderHighlightedNodes();
      return exitRender();
    }

    /**
     * Add a node in the internal data structures.
     * @private
     * @param key The node's graphology ID
     */
  }, {
    key: "addNode",
    value: function addNode(key) {
      // Node display data resolution:
      //  1. First we get the node's attributes
      //  2. We optionally reduce them using the function provided by the user
      //     Note that this function must return a total object and won't be merged
      //  3. We apply our defaults, while running some vital checks
      //  4. We apply the normalization function
      // We shallow copy node data to avoid dangerous behaviors from reducers
      var attr = Object.assign({}, this.graph.getNodeAttributes(key));
      if (this.settings.nodeReducer) attr = this.settings.nodeReducer(key, attr);
      var data = applyNodeDefaults(this.settings, key, attr);
      this.nodeDataCache[key] = data;

      // Label:
      // We delete and add if needed because this function is also used from
      // update
      this.nodesWithForcedLabels["delete"](key);
      if (data.forceLabel && !data.hidden) this.nodesWithForcedLabels.add(key);

      // Highlighted:
      // We remove and re add if needed because this function is also used from
      // update
      this.highlightedNodes["delete"](key);
      if (data.highlighted && !data.hidden) this.highlightedNodes.add(key);

      // zIndex
      if (this.settings.zIndex) {
        if (data.zIndex < this.nodeZExtent[0]) this.nodeZExtent[0] = data.zIndex;
        if (data.zIndex > this.nodeZExtent[1]) this.nodeZExtent[1] = data.zIndex;
      }
    }

    /**
     * Update a node the internal data structures.
     * @private
     * @param key The node's graphology ID
     */
  }, {
    key: "updateNode",
    value: function updateNode(key) {
      this.addNode(key);

      // Re-apply normalization on the node
      var data = this.nodeDataCache[key];
      this.normalizationFunction.applyTo(data);
    }

    /**
     * Remove a node from the internal data structures.
     * @private
     * @param key The node's graphology ID
     */
  }, {
    key: "removeNode",
    value: function removeNode(key) {
      // Remove from node cache
      delete this.nodeDataCache[key];
      // Remove from node program index
      delete this.nodeProgramIndex[key];
      // Remove from higlighted nodes
      this.highlightedNodes["delete"](key);
      // Remove from hovered
      if (this.hoveredNode === key) this.hoveredNode = null;
      // Remove from forced label
      this.nodesWithForcedLabels["delete"](key);
    }

    /**
     * Add an edge into the internal data structures.
     * @private
     * @param key The edge's graphology ID
     */
  }, {
    key: "addEdge",
    value: function addEdge(key) {
      // Edge display data resolution:
      //  1. First we get the edge's attributes
      //  2. We optionally reduce them using the function provided by the user
      //  3. Note that this function must return a total object and won't be merged
      //  4. We apply our defaults, while running some vital checks
      // We shallow copy edge data to avoid dangerous behaviors from reducers
      var attr = Object.assign({}, this.graph.getEdgeAttributes(key));
      if (this.settings.edgeReducer) attr = this.settings.edgeReducer(key, attr);
      var data = applyEdgeDefaults(this.settings, key, attr);
      this.edgeDataCache[key] = data;

      // Forced label
      // we filter and re push if needed because this function is also used from
      // update
      this.edgesWithForcedLabels["delete"](key);
      if (data.forceLabel && !data.hidden) this.edgesWithForcedLabels.add(key);

      // Check zIndex
      if (this.settings.zIndex) {
        if (data.zIndex < this.edgeZExtent[0]) this.edgeZExtent[0] = data.zIndex;
        if (data.zIndex > this.edgeZExtent[1]) this.edgeZExtent[1] = data.zIndex;
      }
    }

    /**
     * Update an edge in the internal data structures.
     * @private
     * @param key The edge's graphology ID
     */
  }, {
    key: "updateEdge",
    value: function updateEdge(key) {
      this.addEdge(key);
    }

    /**
     * Remove an edge from the internal data structures.
     * @private
     * @param key The edge's graphology ID
     */
  }, {
    key: "removeEdge",
    value: function removeEdge(key) {
      // Remove from edge cache
      delete this.edgeDataCache[key];
      // Remove from programId index
      delete this.edgeProgramIndex[key];
      // Remove from hovered
      if (this.hoveredEdge === key) this.hoveredEdge = null;
      // Remove from forced label
      this.edgesWithForcedLabels["delete"](key);
    }

    /**
     * Clear all indices related to nodes.
     * @private
     */
  }, {
    key: "clearNodeIndices",
    value: function clearNodeIndices() {
      // LabelGrid & nodeExtent are only manage/populated in the process function
      this.labelGrid = new LabelGrid();
      this.nodeExtent = {
        x: [0, 1],
        y: [0, 1]
      };
      this.nodeDataCache = {};
      this.edgeProgramIndex = {};
      this.nodesWithForcedLabels = new Set();
      this.nodeZExtent = [Infinity, -Infinity];
      this.highlightedNodes = new Set();
    }

    /**
     * Clear all indices related to edges.
     * @private
     */
  }, {
    key: "clearEdgeIndices",
    value: function clearEdgeIndices() {
      this.edgeDataCache = {};
      this.edgeProgramIndex = {};
      this.edgesWithForcedLabels = new Set();
      this.edgeZExtent = [Infinity, -Infinity];
    }

    /**
     * Clear all indices.
     * @private
     */
  }, {
    key: "clearIndices",
    value: function clearIndices() {
      this.clearEdgeIndices();
      this.clearNodeIndices();
    }

    /**
     * Clear all graph state related to nodes.
     * @private
     */
  }, {
    key: "clearNodeState",
    value: function clearNodeState() {
      this.displayedNodeLabels = new Set();
      this.highlightedNodes = new Set();
      this.hoveredNode = null;
    }

    /**
     * Clear all graph state related to edges.
     * @private
     */
  }, {
    key: "clearEdgeState",
    value: function clearEdgeState() {
      this.displayedEdgeLabels = new Set();
      this.highlightedNodes = new Set();
      this.hoveredEdge = null;
    }

    /**
     * Clear all graph state.
     * @private
     */
  }, {
    key: "clearState",
    value: function clearState() {
      this.clearEdgeState();
      this.clearNodeState();
    }

    /**
     * Add the node data to its program.
     * @private
     * @param node The node's graphology ID
     * @param fingerprint A fingerprint used to identity the node with picking
     * @param position The index where to place the node in the program
     */
  }, {
    key: "addNodeToProgram",
    value: function addNodeToProgram(node, fingerprint, position) {
      var data = this.nodeDataCache[node];
      var nodeProgram = this.nodePrograms[data.type];
      if (!nodeProgram) throw new Error("Sigma: could not find a suitable program for node type \"".concat(data.type, "\"!"));
      nodeProgram.process(fingerprint, position, data);
      // Saving program index
      this.nodeProgramIndex[node] = position;
    }

    /**
     * Add the edge data to its program.
     * @private
     * @param edge The edge's graphology ID
     * @param fingerprint A fingerprint used to identity the edge with picking
     * @param position The index where to place the edge in the program
     */
  }, {
    key: "addEdgeToProgram",
    value: function addEdgeToProgram(edge, fingerprint, position) {
      var data = this.edgeDataCache[edge];
      var edgeProgram = this.edgePrograms[data.type];
      if (!edgeProgram) throw new Error("Sigma: could not find a suitable program for edge type \"".concat(data.type, "\"!"));
      var extremities = this.graph.extremities(edge),
        sourceData = this.nodeDataCache[extremities[0]],
        targetData = this.nodeDataCache[extremities[1]];
      edgeProgram.process(fingerprint, position, sourceData, targetData, data);
      // Saving program index
      this.edgeProgramIndex[edge] = position;
    }

    /**---------------------------------------------------------------------------
     * Public API.
     **---------------------------------------------------------------------------
     */

    /**
     * Function used to get the render params.
     *
     * @return {RenderParams}
     */
  }, {
    key: "getRenderParams",
    value: function getRenderParams() {
      return {
        matrix: this.matrix,
        invMatrix: this.invMatrix,
        width: this.width,
        height: this.height,
        pixelRatio: this.pixelRatio,
        zoomRatio: this.camera.ratio,
        cameraAngle: this.camera.angle,
        sizeRatio: 1 / this.scaleSize(),
        correctionRatio: this.correctionRatio,
        downSizingRatio: this.pickingDownSizingRatio,
        minEdgeThickness: this.settings.minEdgeThickness,
        antiAliasingFeather: this.settings.antiAliasingFeather
      };
    }

    /**
     * Function used to retrieve the actual stage padding value.
     *
     * @return {number}
     */
  }, {
    key: "getStagePadding",
    value: function getStagePadding() {
      var _this$settings = this.settings,
        stagePadding = _this$settings.stagePadding,
        autoRescale = _this$settings.autoRescale;
      return autoRescale ? stagePadding || 0 : 0;
    }

    /**
     * Function used to create a layer element.
     *
     * @param {string} id - Context's id.
     * @param {string} tag - The HTML tag to use.
     * @param options
     * @return {Sigma}
     */
  }, {
    key: "createLayer",
    value: function createLayer(id, tag) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (this.elements[id]) throw new Error("Sigma: a layer named \"".concat(id, "\" already exists"));
      var element = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.b)(tag, {
        position: "absolute"
      }, {
        "class": "sigma-".concat(id)
      });
      if (options.style) Object.assign(element.style, options.style);
      this.elements[id] = element;
      if ("beforeLayer" in options && options.beforeLayer) {
        this.elements[options.beforeLayer].before(element);
      } else if ("afterLayer" in options && options.afterLayer) {
        this.elements[options.afterLayer].after(element);
      } else {
        this.container.appendChild(element);
      }
      return element;
    }

    /**
     * Function used to create a canvas element.
     *
     * @param {string} id - Context's id.
     * @param options
     * @return {Sigma}
     */
  }, {
    key: "createCanvas",
    value: function createCanvas(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.createLayer(id, "canvas", options);
    }

    /**
     * Function used to create a canvas context and add the relevant DOM elements.
     *
     * @param  {string} id - Context's id.
     * @param  options
     * @return {Sigma}
     */
  }, {
    key: "createCanvasContext",
    value: function createCanvasContext(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var canvas = this.createCanvas(id, options);
      var contextOptions = {
        preserveDrawingBuffer: false,
        antialias: false
      };
      this.canvasContexts[id] = canvas.getContext("2d", contextOptions);
      return this;
    }

    /**
     * Function used to create a WebGL context and add the relevant DOM
     * elements.
     *
     * @param  {string}  id      - Context's id.
     * @param  {object?} options - #getContext params to override (optional)
     * @return {WebGLRenderingContext}
     */
  }, {
    key: "createWebGLContext",
    value: function createWebGLContext(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var canvas = (options === null || options === void 0 ? void 0 : options.canvas) || this.createCanvas(id, options);
      if (options.hidden) canvas.remove();
      var contextOptions = (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({
        preserveDrawingBuffer: false,
        antialias: false
      }, options);
      var context;

      // First we try webgl2 for an easy performance boost
      context = canvas.getContext("webgl2", contextOptions);

      // Else we fall back to webgl
      if (!context) context = canvas.getContext("webgl", contextOptions);

      // Edge, I am looking right at you...
      if (!context) context = canvas.getContext("experimental-webgl", contextOptions);
      var gl = context;
      this.webGLContexts[id] = gl;

      // Blending:
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      // Prepare frame buffer for picking layers:
      if (options.picking) {
        this.pickingLayers.add(id);
        var newFrameBuffer = gl.createFramebuffer();
        if (!newFrameBuffer) throw new Error("Sigma: cannot create a new frame buffer for layer ".concat(id));
        this.frameBuffers[id] = newFrameBuffer;
      }
      return gl;
    }

    /**
     * Function used to properly kill a layer.
     *
     * @param  {string} id - Layer id.
     * @return {Sigma}
     */
  }, {
    key: "killLayer",
    value: function killLayer(id) {
      var element = this.elements[id];
      if (!element) throw new Error("Sigma: cannot kill layer ".concat(id, ", which does not exist"));
      if (this.webGLContexts[id]) {
        var _gl$getExtension;
        var gl = this.webGLContexts[id];
        (_gl$getExtension = gl.getExtension("WEBGL_lose_context")) === null || _gl$getExtension === void 0 || _gl$getExtension.loseContext();
        delete this.webGLContexts[id];
      } else if (this.canvasContexts[id]) {
        delete this.canvasContexts[id];
      }

      // Delete layer element
      element.remove();
      delete this.elements[id];
      return this;
    }

    /**
     * Method returning the renderer's camera.
     *
     * @return {Camera}
     */
  }, {
    key: "getCamera",
    value: function getCamera() {
      return this.camera;
    }

    /**
     * Method setting the renderer's camera.
     *
     * @param  {Camera} camera - New camera.
     * @return {Sigma}
     */
  }, {
    key: "setCamera",
    value: function setCamera(camera) {
      this.unbindCameraHandlers();
      this.camera = camera;
      this.bindCameraHandlers();
    }

    /**
     * Method returning the container DOM element.
     *
     * @return {HTMLElement}
     */
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }

    /**
     * Method returning the renderer's graph.
     *
     * @return {Graph}
     */
  }, {
    key: "getGraph",
    value: function getGraph() {
      return this.graph;
    }

    /**
     * Method used to set the renderer's graph.
     *
     * @return {Graph}
     */
  }, {
    key: "setGraph",
    value: function setGraph(graph) {
      if (graph === this.graph) return;

      // Check hoveredNode and hoveredEdge
      if (this.hoveredNode && !graph.hasNode(this.hoveredNode)) this.hoveredNode = null;
      if (this.hoveredEdge && !graph.hasEdge(this.hoveredEdge)) this.hoveredEdge = null;

      // Unbinding handlers on the current graph
      this.unbindGraphHandlers();
      if (this.checkEdgesEventsFrame !== null) {
        cancelAnimationFrame(this.checkEdgesEventsFrame);
        this.checkEdgesEventsFrame = null;
      }

      // Installing new graph
      this.graph = graph;

      // Binding new handlers
      this.bindGraphHandlers();

      // Re-rendering now to avoid discrepancies from now to next frame
      this.refresh();
    }

    /**
     * Method returning the mouse captor.
     *
     * @return {MouseCaptor}
     */
  }, {
    key: "getMouseCaptor",
    value: function getMouseCaptor() {
      return this.mouseCaptor;
    }

    /**
     * Method returning the touch captor.
     *
     * @return {TouchCaptor}
     */
  }, {
    key: "getTouchCaptor",
    value: function getTouchCaptor() {
      return this.touchCaptor;
    }

    /**
     * Method returning the current renderer's dimensions.
     *
     * @return {Dimensions}
     */
  }, {
    key: "getDimensions",
    value: function getDimensions() {
      return {
        width: this.width,
        height: this.height
      };
    }

    /**
     * Method returning the current graph's dimensions.
     *
     * @return {Dimensions}
     */
  }, {
    key: "getGraphDimensions",
    value: function getGraphDimensions() {
      var extent = this.customBBox || this.nodeExtent;
      return {
        width: extent.x[1] - extent.x[0] || 1,
        height: extent.y[1] - extent.y[0] || 1
      };
    }

    /**
     * Method used to get all the sigma node attributes.
     * It's useful for example to get the position of a node
     * and to get values that are set by the nodeReducer
     *
     * @param  {string} key - The node's key.
     * @return {NodeDisplayData | undefined} A copy of the desired node's attribute or undefined if not found
     */
  }, {
    key: "getNodeDisplayData",
    value: function getNodeDisplayData(key) {
      var node = this.nodeDataCache[key];
      return node ? Object.assign({}, node) : undefined;
    }

    /**
     * Method used to get all the sigma edge attributes.
     * It's useful for example to get values that are set by the edgeReducer.
     *
     * @param  {string} key - The edge's key.
     * @return {EdgeDisplayData | undefined} A copy of the desired edge's attribute or undefined if not found
     */
  }, {
    key: "getEdgeDisplayData",
    value: function getEdgeDisplayData(key) {
      var edge = this.edgeDataCache[key];
      return edge ? Object.assign({}, edge) : undefined;
    }

    /**
     * Method used to get the set of currently displayed node labels.
     *
     * @return {Set<string>} A set of node keys whose label is displayed.
     */
  }, {
    key: "getNodeDisplayedLabels",
    value: function getNodeDisplayedLabels() {
      return new Set(this.displayedNodeLabels);
    }

    /**
     * Method used to get the set of currently displayed edge labels.
     *
     * @return {Set<string>} A set of edge keys whose label is displayed.
     */
  }, {
    key: "getEdgeDisplayedLabels",
    value: function getEdgeDisplayedLabels() {
      return new Set(this.displayedEdgeLabels);
    }

    /**
     * Method returning a copy of the settings collection.
     *
     * @return {Settings} A copy of the settings collection.
     */
  }, {
    key: "getSettings",
    value: function getSettings() {
      return (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, this.settings);
    }

    /**
     * Method returning the current value for a given setting key.
     *
     * @param  {string} key - The setting key to get.
     * @return {any} The value attached to this setting key or undefined if not found
     */
  }, {
    key: "getSetting",
    value: function getSetting(key) {
      return this.settings[key];
    }

    /**
     * Method setting the value of a given setting key. Note that this will schedule
     * a new render next frame.
     *
     * @param  {string} key - The setting key to set.
     * @param  {any}    value - The value to set.
     * @return {Sigma}
     */
  }, {
    key: "setSetting",
    value: function setSetting(key, value) {
      var oldValues = (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, this.settings);
      this.settings[key] = value;
      (0,_settings_dist_sigma_settings_esm_js__WEBPACK_IMPORTED_MODULE_4__.validateSettings)(this.settings);
      this.handleSettingsUpdate(oldValues);
      this.scheduleRefresh();
      return this;
    }

    /**
     * Method updating the value of a given setting key using the provided function.
     * Note that this will schedule a new render next frame.
     *
     * @param  {string}   key     - The setting key to set.
     * @param  {function} updater - The update function.
     * @return {Sigma}
     */
  }, {
    key: "updateSetting",
    value: function updateSetting(key, updater) {
      this.setSetting(key, updater(this.settings[key]));
      return this;
    }

    /**
     * Method setting multiple settings at once.
     *
     * @param  {Partial<Settings>} settings - The settings to set.
     * @return {Sigma}
     */
  }, {
    key: "setSettings",
    value: function setSettings(settings) {
      var oldValues = (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, this.settings);
      this.settings = (0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, this.settings), settings);
      (0,_settings_dist_sigma_settings_esm_js__WEBPACK_IMPORTED_MODULE_4__.validateSettings)(this.settings);
      this.handleSettingsUpdate(oldValues);
      this.scheduleRefresh();
      return this;
    }

    /**
     * Method used to resize the renderer.
     *
     * @param  {boolean} force - If true, then resize is processed even if size is unchanged (optional).
     * @return {Sigma}
     */
  }, {
    key: "resize",
    value: function resize(force) {
      var previousWidth = this.width,
        previousHeight = this.height;
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.pixelRatio = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.d)();
      if (this.width === 0) {
        if (this.settings.allowInvalidContainer) this.width = 1;else throw new Error("Sigma: Container has no width. You can set the allowInvalidContainer setting to true to stop seeing this error.");
      }
      if (this.height === 0) {
        if (this.settings.allowInvalidContainer) this.height = 1;else throw new Error("Sigma: Container has no height. You can set the allowInvalidContainer setting to true to stop seeing this error.");
      }

      // If nothing has changed, we can stop right here
      if (!force && previousWidth === this.width && previousHeight === this.height) return this;

      // Sizing dom elements
      for (var id in this.elements) {
        var element = this.elements[id];
        element.style.width = this.width + "px";
        element.style.height = this.height + "px";
      }

      // Sizing canvas contexts
      for (var _id in this.canvasContexts) {
        this.elements[_id].setAttribute("width", this.width * this.pixelRatio + "px");
        this.elements[_id].setAttribute("height", this.height * this.pixelRatio + "px");
        if (this.pixelRatio !== 1) this.canvasContexts[_id].scale(this.pixelRatio, this.pixelRatio);
      }

      // Sizing WebGL contexts
      for (var _id2 in this.webGLContexts) {
        this.elements[_id2].setAttribute("width", this.width * this.pixelRatio + "px");
        this.elements[_id2].setAttribute("height", this.height * this.pixelRatio + "px");
        var gl = this.webGLContexts[_id2];
        gl.viewport(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio);

        // Clear picking texture if needed
        if (this.pickingLayers.has(_id2)) {
          var currentTexture = this.textures[_id2];
          if (currentTexture) gl.deleteTexture(currentTexture);
        }
      }
      this.emit("resize");
      return this;
    }

    /**
     * Method used to clear all the canvases.
     *
     * @return {Sigma}
     */
  }, {
    key: "clear",
    value: function clear() {
      this.emit("beforeClear");
      this.webGLContexts.nodes.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
      this.webGLContexts.nodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
      this.webGLContexts.edges.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
      this.webGLContexts.edges.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
      this.webGLContexts.hoverNodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
      this.canvasContexts.labels.clearRect(0, 0, this.width, this.height);
      this.canvasContexts.hovers.clearRect(0, 0, this.width, this.height);
      this.canvasContexts.edgeLabels.clearRect(0, 0, this.width, this.height);
      this.emit("afterClear");
      return this;
    }

    /**
     * Method used to refresh, i.e. force the renderer to reprocess graph
     * data and render, but keep the state.
     * - if a partialGraph is provided, we only reprocess those nodes & edges.
     * - if schedule is TRUE, we schedule a render instead of sync render
     * - if skipIndexation is TRUE, then labelGrid & program indexation are skipped (can be used if you haven't modify x, y, zIndex & size)
     *
     * @return {Sigma}
     */
  }, {
    key: "refresh",
    value: function refresh(opts) {
      var _this10 = this;
      var skipIndexation = (opts === null || opts === void 0 ? void 0 : opts.skipIndexation) !== undefined ? opts === null || opts === void 0 ? void 0 : opts.skipIndexation : false;
      var schedule = (opts === null || opts === void 0 ? void 0 : opts.schedule) !== undefined ? opts.schedule : false;
      var fullRefresh = !opts || !opts.partialGraph;
      if (fullRefresh) {
        // Re-index graph data
        this.clearEdgeIndices();
        this.clearNodeIndices();
        this.graph.forEachNode(function (node) {
          return _this10.addNode(node);
        });
        this.graph.forEachEdge(function (edge) {
          return _this10.addEdge(edge);
        });
      } else {
        var _opts$partialGraph, _opts$partialGraph2;
        var nodes = ((_opts$partialGraph = opts.partialGraph) === null || _opts$partialGraph === void 0 ? void 0 : _opts$partialGraph.nodes) || [];
        for (var i = 0, l = (nodes === null || nodes === void 0 ? void 0 : nodes.length) || 0; i < l; i++) {
          var node = nodes[i];
          // Recompute node's data (ie. apply reducer)
          this.updateNode(node);
          // Add node to the program if layout is unchanged.
          // otherwise it will be done in the process function
          if (skipIndexation) {
            var programIndex = this.nodeProgramIndex[node];
            if (programIndex === undefined) throw new Error("Sigma: node \"".concat(node, "\" can't be repaint"));
            this.addNodeToProgram(node, this.nodeIndices[node], programIndex);
          }
        }
        var edges = (opts === null || opts === void 0 || (_opts$partialGraph2 = opts.partialGraph) === null || _opts$partialGraph2 === void 0 ? void 0 : _opts$partialGraph2.edges) || [];
        for (var _i4 = 0, _l4 = edges.length; _i4 < _l4; _i4++) {
          var edge = edges[_i4];
          // Recompute edge's data (ie. apply reducer)
          this.updateEdge(edge);
          // Add edge to the program
          // otherwise it will be done in the process function
          if (skipIndexation) {
            var _programIndex = this.edgeProgramIndex[edge];
            if (_programIndex === undefined) throw new Error("Sigma: edge \"".concat(edge, "\" can't be repaint"));
            this.addEdgeToProgram(edge, this.edgeIndices[edge], _programIndex);
          }
        }
      }

      // Do we need to call the process function ?
      if (fullRefresh || !skipIndexation) this.needToProcess = true;
      if (schedule) this.scheduleRender();else this.render();
      return this;
    }

    /**
     * Method used to schedule a render at the next available frame.
     * This method can be safely called on a same frame because it basically
     * debounces refresh to the next frame.
     *
     * @return {Sigma}
     */
  }, {
    key: "scheduleRender",
    value: function scheduleRender() {
      var _this11 = this;
      if (!this.renderFrame) {
        this.renderFrame = requestAnimationFrame(function () {
          _this11.render();
        });
      }
      return this;
    }

    /**
     * Method used to schedule a refresh (i.e. fully reprocess graph data and render)
     * at the next available frame.
     * This method can be safely called on a same frame because it basically
     * debounces refresh to the next frame.
     *
     * @return {Sigma}
     */
  }, {
    key: "scheduleRefresh",
    value: function scheduleRefresh(opts) {
      return this.refresh((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)((0,_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__._)({}, opts), {}, {
        schedule: true
      }));
    }

    /**
     * Method used to (un)zoom, while preserving the position of a viewport point.
     * Used for instance to zoom "on the mouse cursor".
     *
     * @param viewportTarget
     * @param newRatio
     * @return {CameraState}
     */
  }, {
    key: "getViewportZoomedState",
    value: function getViewportZoomedState(viewportTarget, newRatio) {
      var _this$camera$getState = this.camera.getState(),
        ratio = _this$camera$getState.ratio,
        angle = _this$camera$getState.angle,
        x = _this$camera$getState.x,
        y = _this$camera$getState.y;
      var _this$settings2 = this.settings,
        minCameraRatio = _this$settings2.minCameraRatio,
        maxCameraRatio = _this$settings2.maxCameraRatio;
      if (typeof maxCameraRatio === "number") newRatio = Math.min(newRatio, maxCameraRatio);
      if (typeof minCameraRatio === "number") newRatio = Math.max(newRatio, minCameraRatio);
      var ratioDiff = newRatio / ratio;
      var center = {
        x: this.width / 2,
        y: this.height / 2
      };
      var graphMousePosition = this.viewportToFramedGraph(viewportTarget);
      var graphCenterPosition = this.viewportToFramedGraph(center);
      return {
        angle: angle,
        x: (graphMousePosition.x - graphCenterPosition.x) * (1 - ratioDiff) + x,
        y: (graphMousePosition.y - graphCenterPosition.y) * (1 - ratioDiff) + y,
        ratio: newRatio
      };
    }

    /**
     * Method returning the abstract rectangle containing the graph according
     * to the camera's state.
     *
     * @return {object} - The view's rectangle.
     */
  }, {
    key: "viewRectangle",
    value: function viewRectangle() {
      var p1 = this.viewportToFramedGraph({
          x: 0,
          y: 0
        }),
        p2 = this.viewportToFramedGraph({
          x: this.width,
          y: 0
        }),
        h = this.viewportToFramedGraph({
          x: 0,
          y: this.height
        });
      return {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        height: p2.y - h.y
      };
    }

    /**
     * Method returning the coordinates of a point from the framed graph system to the viewport system. It allows
     * overriding anything that is used to get the translation matrix, or even the matrix itself.
     *
     * Be careful if overriding dimensions, padding or cameraState, as the computation of the matrix is not the lightest
     * of computations.
     */
  }, {
    key: "framedGraphToViewport",
    value: function framedGraphToViewport(coordinates) {
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var recomputeMatrix = !!override.cameraState || !!override.viewportDimensions || !!override.graphDimensions;
      var matrix = override.matrix ? override.matrix : recomputeMatrix ? (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.m)(override.cameraState || this.camera.getState(), override.viewportDimensions || this.getDimensions(), override.graphDimensions || this.getGraphDimensions(), override.padding || this.getStagePadding()) : this.matrix;
      var viewportPos = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.f)(matrix, coordinates);
      return {
        x: (1 + viewportPos.x) * this.width / 2,
        y: (1 - viewportPos.y) * this.height / 2
      };
    }

    /**
     * Method returning the coordinates of a point from the viewport system to the framed graph system. It allows
     * overriding anything that is used to get the translation matrix, or even the matrix itself.
     *
     * Be careful if overriding dimensions, padding or cameraState, as the computation of the matrix is not the lightest
     * of computations.
     */
  }, {
    key: "viewportToFramedGraph",
    value: function viewportToFramedGraph(coordinates) {
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var recomputeMatrix = !!override.cameraState || !!override.viewportDimensions || !override.graphDimensions;
      var invMatrix = override.matrix ? override.matrix : recomputeMatrix ? (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.m)(override.cameraState || this.camera.getState(), override.viewportDimensions || this.getDimensions(), override.graphDimensions || this.getGraphDimensions(), override.padding || this.getStagePadding(), true) : this.invMatrix;
      var res = (0,_normalization_be445518_esm_js__WEBPACK_IMPORTED_MODULE_3__.f)(invMatrix, {
        x: coordinates.x / this.width * 2 - 1,
        y: 1 - coordinates.y / this.height * 2
      });
      if (isNaN(res.x)) res.x = 0;
      if (isNaN(res.y)) res.y = 0;
      return res;
    }

    /**
     * Method used to translate a point's coordinates from the viewport system (pixel distance from the top-left of the
     * stage) to the graph system (the reference system of data as they are in the given graph instance).
     *
     * This method accepts an optional camera which can be useful if you need to translate coordinates
     * based on a different view than the one being currently being displayed on screen.
     *
     * @param {Coordinates}                  viewportPoint
     * @param {CoordinateConversionOverride} override
     */
  }, {
    key: "viewportToGraph",
    value: function viewportToGraph(viewportPoint) {
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.normalizationFunction.inverse(this.viewportToFramedGraph(viewportPoint, override));
    }

    /**
     * Method used to translate a point's coordinates from the graph system (the reference system of data as they are in
     * the given graph instance) to the viewport system (pixel distance from the top-left of the stage).
     *
     * This method accepts an optional camera which can be useful if you need to translate coordinates
     * based on a different view than the one being currently being displayed on screen.
     *
     * @param {Coordinates}                  graphPoint
     * @param {CoordinateConversionOverride} override
     */
  }, {
    key: "graphToViewport",
    value: function graphToViewport(graphPoint) {
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.framedGraphToViewport(this.normalizationFunction(graphPoint), override);
    }

    /**
     * Method returning the distance multiplier between the graph system and the
     * viewport system.
     */
  }, {
    key: "getGraphToViewportRatio",
    value: function getGraphToViewportRatio() {
      var graphP1 = {
        x: 0,
        y: 0
      };
      var graphP2 = {
        x: 1,
        y: 1
      };
      var graphD = Math.sqrt(Math.pow(graphP1.x - graphP2.x, 2) + Math.pow(graphP1.y - graphP2.y, 2));
      var viewportP1 = this.graphToViewport(graphP1);
      var viewportP2 = this.graphToViewport(graphP2);
      var viewportD = Math.sqrt(Math.pow(viewportP1.x - viewportP2.x, 2) + Math.pow(viewportP1.y - viewportP2.y, 2));
      return viewportD / graphD;
    }

    /**
     * Method returning the graph's bounding box.
     *
     * @return {{ x: Extent, y: Extent }}
     */
  }, {
    key: "getBBox",
    value: function getBBox() {
      return this.nodeExtent;
    }

    /**
     * Method returning the graph's custom bounding box, if any.
     *
     * @return {{ x: Extent, y: Extent } | null}
     */
  }, {
    key: "getCustomBBox",
    value: function getCustomBBox() {
      return this.customBBox;
    }

    /**
     * Method used to override the graph's bounding box with a custom one. Give `null` as the argument to stop overriding.
     *
     * @return {Sigma}
     */
  }, {
    key: "setCustomBBox",
    value: function setCustomBBox(customBBox) {
      this.customBBox = customBBox;
      this.scheduleRender();
      return this;
    }

    /**
     * Method used to shut the container & release event listeners.
     *
     * @return {undefined}
     */
  }, {
    key: "kill",
    value: function kill() {
      // Emitting "kill" events so that plugins and such can cleanup
      this.emit("kill");

      // Releasing events
      this.removeAllListeners();

      // Releasing camera handlers
      this.unbindCameraHandlers();

      // Releasing DOM events & captors
      window.removeEventListener("resize", this.activeListeners.handleResize);
      this.mouseCaptor.kill();
      this.touchCaptor.kill();

      // Releasing graph handlers
      this.unbindGraphHandlers();

      // Releasing cache & state
      this.clearIndices();
      this.clearState();
      this.nodeDataCache = {};
      this.edgeDataCache = {};
      this.highlightedNodes.clear();

      // Clearing frames
      if (this.renderFrame) {
        cancelAnimationFrame(this.renderFrame);
        this.renderFrame = null;
      }
      if (this.renderHighlightedNodesFrame) {
        cancelAnimationFrame(this.renderHighlightedNodesFrame);
        this.renderHighlightedNodesFrame = null;
      }

      // Destroying canvases
      var container = this.container;
      while (container.firstChild) container.removeChild(container.firstChild);

      // Kill programs:
      for (var type in this.nodePrograms) {
        this.nodePrograms[type].kill();
      }
      for (var _type8 in this.nodeHoverPrograms) {
        this.nodeHoverPrograms[_type8].kill();
      }
      for (var _type9 in this.edgePrograms) {
        this.edgePrograms[_type9].kill();
      }
      this.nodePrograms = {};
      this.nodeHoverPrograms = {};
      this.edgePrograms = {};

      // Kill all canvas/WebGL contexts
      for (var id in this.elements) {
        this.killLayer(id);
      }

      // Destroying remaining collections
      this.canvasContexts = {};
      this.webGLContexts = {};
      this.elements = {};
    }

    /**
     * Method used to scale the given size according to the camera's ratio, i.e.
     * zooming state.
     *
     * @param  {number?} size -        The size to scale (node size, edge thickness etc.).
     * @param  {number?} cameraRatio - A camera ratio (defaults to the actual camera ratio).
     * @return {number}              - The scaled size.
     */
  }, {
    key: "scaleSize",
    value: function scaleSize() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var cameraRatio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.camera.ratio;
      return size / this.settings.zoomToSizeRatioFunction(cameraRatio) * (this.getSetting("itemSizesReference") === "positions" ? cameraRatio * this.graphToViewportRatio : 1);
    }

    /**
     * Method that returns the collection of all used canvases.
     * At the moment, the instantiated canvases are the following, and in the
     * following order in the DOM:
     * - `edges`
     * - `nodes`
     * - `edgeLabels`
     * - `labels`
     * - `hovers`
     * - `hoverNodes`
     * - `mouse`
     *
     * @return {PlainObject<HTMLCanvasElement>} - The collection of canvases.
     */
  }, {
    key: "getCanvases",
    value: function getCanvases() {
      var res = {};
      for (var layer in this.elements) if (this.elements[layer] instanceof HTMLCanvasElement) res[layer] = this.elements[layer];
      return res;
    }
  }]);
}(_types_dist_sigma_types_esm_js__WEBPACK_IMPORTED_MODULE_2__.TypedEventEmitter);

/**
 * Sigma.js Library Endpoint
 * =========================
 *
 * The library endpoint.
 * @module
 */
var Sigma = Sigma$1;




/***/ }),

/***/ "./node_modules/sigma/settings/dist/sigma-settings.esm.js":
/*!****************************************************************!*\
  !*** ./node_modules/sigma/settings/dist/sigma-settings.esm.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_EDGE_PROGRAM_CLASSES: () => (/* binding */ DEFAULT_EDGE_PROGRAM_CLASSES),
/* harmony export */   DEFAULT_NODE_PROGRAM_CLASSES: () => (/* binding */ DEFAULT_NODE_PROGRAM_CLASSES),
/* harmony export */   DEFAULT_SETTINGS: () => (/* binding */ DEFAULT_SETTINGS),
/* harmony export */   resolveSettings: () => (/* binding */ resolveSettings),
/* harmony export */   validateSettings: () => (/* binding */ validateSettings)
/* harmony export */ });
/* harmony import */ var _dist_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/index-236c62ad.esm.js */ "./node_modules/sigma/dist/index-236c62ad.esm.js");
/* harmony import */ var _dist_data_11df7124_esm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dist/data-11df7124.esm.js */ "./node_modules/sigma/dist/data-11df7124.esm.js");





/**
 * Sigma.js Settings
 * =================================
 *
 * The list of settings and some handy functions.
 * @module
 */

/**
 * Sigma.js settings
 * =================================
 */

var DEFAULT_SETTINGS = {
  // Performance
  hideEdgesOnMove: false,
  hideLabelsOnMove: false,
  renderLabels: true,
  renderEdgeLabels: false,
  enableEdgeEvents: false,
  // Component rendering
  defaultNodeColor: "#999",
  defaultNodeType: "circle",
  defaultEdgeColor: "#ccc",
  defaultEdgeType: "line",
  labelFont: "Arial",
  labelSize: 14,
  labelWeight: "normal",
  labelColor: {
    color: "#000"
  },
  edgeLabelFont: "Arial",
  edgeLabelSize: 14,
  edgeLabelWeight: "normal",
  edgeLabelColor: {
    attribute: "color"
  },
  stagePadding: 30,
  defaultDrawEdgeLabel: _dist_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.d,
  defaultDrawNodeLabel: _dist_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.b,
  defaultDrawNodeHover: _dist_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.c,
  minEdgeThickness: 1.7,
  antiAliasingFeather: 1,
  // Mouse and touch settings
  dragTimeout: 100,
  draggedEventsTolerance: 3,
  inertiaDuration: 200,
  inertiaRatio: 3,
  zoomDuration: 250,
  zoomingRatio: 1.7,
  doubleClickTimeout: 300,
  doubleClickZoomingRatio: 2.2,
  doubleClickZoomingDuration: 200,
  tapMoveTolerance: 10,
  // Size and scaling
  zoomToSizeRatioFunction: Math.sqrt,
  itemSizesReference: "screen",
  autoRescale: true,
  autoCenter: true,
  // Labels
  labelDensity: 1,
  labelGridCellSize: 100,
  labelRenderedSizeThreshold: 6,
  // Reducers
  nodeReducer: null,
  edgeReducer: null,
  // Features
  zIndex: false,
  minCameraRatio: null,
  maxCameraRatio: null,
  enableCameraZooming: true,
  enableCameraPanning: true,
  enableCameraRotation: true,
  cameraPanBoundaries: null,
  // Lifecycle
  allowInvalidContainer: false,
  // Program classes
  nodeProgramClasses: {},
  nodeHoverProgramClasses: {},
  edgeProgramClasses: {}
};
var DEFAULT_NODE_PROGRAM_CLASSES = {
  circle: _dist_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.N
};
var DEFAULT_EDGE_PROGRAM_CLASSES = {
  arrow: _dist_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.E,
  line: _dist_index_236c62ad_esm_js__WEBPACK_IMPORTED_MODULE_0__.e
};
function validateSettings(settings) {
  if (typeof settings.labelDensity !== "number" || settings.labelDensity < 0) {
    throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");
  }
  var minCameraRatio = settings.minCameraRatio,
    maxCameraRatio = settings.maxCameraRatio;
  if (typeof minCameraRatio === "number" && typeof maxCameraRatio === "number" && maxCameraRatio < minCameraRatio) {
    throw new Error("Settings: invalid camera ratio boundaries. Expecting `maxCameraRatio` to be greater than `minCameraRatio`.");
  }
}
function resolveSettings(settings) {
  var resolvedSettings = (0,_dist_data_11df7124_esm_js__WEBPACK_IMPORTED_MODULE_1__.a)({}, DEFAULT_SETTINGS, settings);
  resolvedSettings.nodeProgramClasses = (0,_dist_data_11df7124_esm_js__WEBPACK_IMPORTED_MODULE_1__.a)({}, DEFAULT_NODE_PROGRAM_CLASSES, resolvedSettings.nodeProgramClasses);
  resolvedSettings.edgeProgramClasses = (0,_dist_data_11df7124_esm_js__WEBPACK_IMPORTED_MODULE_1__.a)({}, DEFAULT_EDGE_PROGRAM_CLASSES, resolvedSettings.edgeProgramClasses);
  return resolvedSettings;
}




/***/ }),

/***/ "./node_modules/sigma/types/dist/sigma-types.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/sigma/types/dist/sigma-types.esm.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypedEventEmitter: () => (/* binding */ TypedEventEmitter)
/* harmony export */ });
/* harmony import */ var _dist_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/inherits-d1a1e29b.esm.js */ "./node_modules/sigma/dist/inherits-d1a1e29b.esm.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Util type to represent maps of typed elements, but implemented with
 * JavaScript objects.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

/**
 * Returns a type similar to T, but with the K set of properties of the type
 * T *required*, and the rest optional.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

/**
 * Returns a type similar to Partial<T>, but with at least one key set.
 */

/**
 * Custom event emitter types.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

var TypedEventEmitter = /*#__PURE__*/function (_ref) {
  function TypedEventEmitter() {
    var _this;
    (0,_dist_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)(this, TypedEventEmitter);
    _this = (0,_dist_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, TypedEventEmitter);
    _this.rawEmitter = _this;
    return _this;
  }
  (0,_dist_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__._)(TypedEventEmitter, _ref);
  return (0,_dist_inherits_d1a1e29b_esm_js__WEBPACK_IMPORTED_MODULE_0__.a)(TypedEventEmitter);
}(events__WEBPACK_IMPORTED_MODULE_1__.EventEmitter);

/**
 * Event types.
 */

/**
 * Export various other types:
 */




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sigma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sigma */ "./node_modules/sigma/dist/sigma.esm.js");
/* harmony import */ var graphology__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphology */ "./node_modules/graphology/dist/graphology.umd.min.js");
/* harmony import */ var graphology__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphology__WEBPACK_IMPORTED_MODULE_1__);
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * This example shows how to load CSV files and build a Sigma graph from them.
 * It loads nodes and edges from separate CSV files and displays them with
 * basic map features: Zoom in and out buttons, reset zoom button, and a slider
 * to increase or decrease the quantity of labels displayed on screen.
 */




// Parse CSV data into array of objects
function parseCSV(csvText) {
  var lines = csvText.trim().split('\n');
  var headers = parseCSVLine(lines[0]);
  var data = [];
  var _loop = function _loop() {
    var values = parseCSVLine(lines[i]);
    var row = {};
    headers.forEach(function (header, index) {
      row[header.trim()] = values[index] ? values[index].trim() : '';
    });
    data.push(row);
  };
  for (var i = 1; i < lines.length; i++) {
    _loop();
  }
  return data;
}

// Parse a single CSV line, handling quoted fields properly
function parseCSVLine(line) {
  var result = [];
  var current = '';
  var inQuotes = false;
  for (var i = 0; i < line.length; i++) {
    var _char = line[i];
    if (_char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote - add one quote to current field
        current += '"';
        i++; // Skip the next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (_char === ',' && !inQuotes) {
      // End of field
      result.push(current);
      current = '';
    } else {
      // Regular character
      current += _char;
    }
  }

  // Add the last field
  result.push(current);
  return result;
}

// Load CSV files and build graph
function loadCSVGraph() {
  return _loadCSVGraph.apply(this, arguments);
} // Show loading spinner immediately
function _loadCSVGraph() {
  _loadCSVGraph = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var _renderSidebar, showLoading, hideLoading, darkenColor, updateNodeVisibility, resizeEdgeCanvas, drawNodeEdges, colorsRes, colors, nodesRes, nodesCSV, edgesRes, edgesCSV, nodesData, edgesData, graph, countryToContinent, countriesWithStates, countryCounts, stateCounts, visibleStates, countries, visibleCountries, continentGroups, sortedContinents, currentSort, expandedContinents, expandedCountries, container, zoomInBtn, zoomOutBtn, zoomResetBtn, renderer, camera, edgeCanvas, sigmaCanvases, currentHoveredNode, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          // Function to render the sidebar
          _renderSidebar = function renderSidebar() {
            var countriesList = document.getElementById("countries-list");
            countriesList.innerHTML = '';

            // Calculate total nodes per continent for sorting
            var continentNodeCounts = {};
            sortedContinents.forEach(function (continent) {
              var totalNodes = continentGroups[continent].reduce(function (sum, c) {
                return sum + countryCounts[c];
              }, 0);
              continentNodeCounts[continent] = totalNodes;
            });

            // Sort continents based on current sort mode
            var continentsToRender = _toConsumableArray(sortedContinents);
            if (currentSort === 'nodes') {
              continentsToRender.sort(function (a, b) {
                return continentNodeCounts[b] - continentNodeCounts[a];
              });
            }

            // Sort countries within each continent based on current sort mode
            var sortedContinentGroups = {};
            sortedContinents.forEach(function (continent) {
              var countriesInContinent = _toConsumableArray(continentGroups[continent]);
              if (currentSort === 'alphabetical') {
                countriesInContinent.sort();
              } else if (currentSort === 'nodes') {
                countriesInContinent.sort(function (a, b) {
                  return countryCounts[b] - countryCounts[a];
                });
              }
              sortedContinentGroups[continent] = countriesInContinent;
            });

            // Render each continent group
            continentsToRender.forEach(function (continent) {
              var continentCountries = sortedContinentGroups[continent];
              var totalNodes = continentCountries.reduce(function (sum, c) {
                return sum + countryCounts[c];
              }, 0);
              var isExpanded = expandedContinents.has(continent);
              var allChecked = continentCountries.every(function (c) {
                if (countriesWithStates.has(c) && visibleStates[c]) {
                  return Array.from(visibleStates[c]).length === Object.keys(stateCounts[c] || {}).length;
                }
                return visibleCountries.has(c);
              });

              // Continent header with integrated checkbox and toggle
              var continentHeader = document.createElement("div");
              continentHeader.className = "continent-header";
              var continentCheckbox = document.createElement("input");
              continentCheckbox.type = "checkbox";
              continentCheckbox.className = "continent-checkbox";
              continentCheckbox.id = "continent-".concat(continent);
              continentCheckbox.checked = allChecked;
              var expandIcon = document.createElement("span");
              expandIcon.className = "expand-icon";
              expandIcon.textContent = isExpanded ? "▼" : "▶";
              var continentName = document.createElement("span");
              continentName.className = "continent-name";
              continentName.textContent = continent;
              var continentCount = document.createElement("span");
              continentCount.className = "continent-count";
              continentCount.textContent = "".concat(totalNodes.toLocaleString());
              continentHeader.appendChild(continentCheckbox);
              continentHeader.appendChild(expandIcon);
              continentHeader.appendChild(continentName);
              continentHeader.appendChild(continentCount);
              countriesList.appendChild(continentHeader);

              // Toggle entire continent checkbox
              var toggleContinentCheckbox = function toggleContinentCheckbox(e) {
                e.stopPropagation();
                if (continentCheckbox.checked) {
                  continentCountries.forEach(function (c) {
                    if (countriesWithStates.has(c) && stateCounts[c]) {
                      Object.keys(stateCounts[c]).forEach(function (s) {
                        return visibleStates[c].add(s);
                      });
                    } else {
                      visibleCountries.add(c);
                    }
                  });
                } else {
                  continentCountries.forEach(function (c) {
                    if (countriesWithStates.has(c) && stateCounts[c]) {
                      Object.keys(stateCounts[c]).forEach(function (s) {
                        return visibleStates[c]["delete"](s);
                      });
                    } else {
                      visibleCountries["delete"](c);
                    }
                  });
                }
                updateNodeVisibility();
                _renderSidebar();
              };
              continentCheckbox.addEventListener("change", toggleContinentCheckbox);

              // Toggle expansion/collapse on header click (but not checkbox)
              continentHeader.addEventListener("click", function (e) {
                if (e.target !== continentCheckbox) {
                  if (expandedContinents.has(continent)) {
                    expandedContinents["delete"](continent);
                  } else {
                    expandedContinents.add(continent);
                  }
                  _renderSidebar();
                }
              });

              // Render countries only if expanded
              if (isExpanded) {
                var countriesContainer = document.createElement("div");
                countriesContainer.className = "countries-container";
                continentCountries.forEach(function (country) {
                  var countryColor = colors[country] || '#666';
                  var nodeCount = countryCounts[country];
                  var hasStates = countriesWithStates.has(country) && stateCounts[country];
                  var isCountryExpanded = expandedCountries.has(country);
                  var item = document.createElement("div");
                  item.className = "country-item";
                  var checkbox = document.createElement("input");
                  checkbox.type = "checkbox";
                  checkbox.className = "country-checkbox";
                  // For countries with states, check if all states are visible
                  if (hasStates) {
                    var allStates = Object.keys(stateCounts[country]);
                    checkbox.checked = allStates.every(function (s) {
                      return visibleStates[country].has(s);
                    });
                  } else {
                    checkbox.checked = visibleCountries.has(country);
                  }
                  checkbox.id = "country-".concat(country);
                  var colorBox = document.createElement("div");
                  colorBox.className = "country-color";
                  colorBox.style.backgroundColor = countryColor;

                  // Add expand icon for countries with states
                  if (hasStates) {
                    var _expandIcon = document.createElement("span");
                    _expandIcon.className = "expand-icon";
                    _expandIcon.textContent = isCountryExpanded ? "▼" : "▶";
                    _expandIcon.style.marginRight = "0.3em";
                    item.appendChild(checkbox);
                    item.appendChild(colorBox);
                    item.appendChild(_expandIcon);
                  } else {
                    item.appendChild(checkbox);
                    item.appendChild(colorBox);
                  }
                  var label = document.createElement("span");
                  label.className = "country-name";
                  label.textContent = country;
                  var count = document.createElement("span");
                  count.className = "country-count";
                  count.textContent = nodeCount.toLocaleString();
                  item.appendChild(label);
                  item.appendChild(count);
                  countriesContainer.appendChild(item);

                  // Add event listener to toggle country visibility
                  var toggleCountry = function toggleCountry(e) {
                    e.stopPropagation();
                    if (hasStates) {
                      // For countries with states, toggle all states
                      var _allStates = Object.keys(stateCounts[country]);
                      if (checkbox.checked) {
                        _allStates.forEach(function (state) {
                          return visibleStates[country].add(state);
                        });
                      } else {
                        _allStates.forEach(function (state) {
                          return visibleStates[country]["delete"](state);
                        });
                      }
                    } else {
                      // For other countries, toggle country visibility
                      if (checkbox.checked) {
                        visibleCountries.add(country);
                      } else {
                        visibleCountries["delete"](country);
                      }
                    }
                    updateNodeVisibility();
                    // Update continent checkbox state
                    _renderSidebar();
                  };
                  checkbox.addEventListener("change", toggleCountry);

                  // Handle expansion for countries with states
                  item.addEventListener("click", function (e) {
                    if (e.target !== checkbox) {
                      if (hasStates) {
                        // Toggle expansion
                        if (expandedCountries.has(country)) {
                          expandedCountries["delete"](country);
                        } else {
                          expandedCountries.add(country);
                        }
                        _renderSidebar();
                      } else {
                        checkbox.checked = !checkbox.checked;
                        toggleCountry(e);
                      }
                    }
                  });

                  // Render states if country has states and is expanded
                  if (hasStates && isCountryExpanded) {
                    var statesContainer = document.createElement("div");
                    statesContainer.className = "countries-container";
                    statesContainer.style.marginLeft = "1em";

                    // Sort states
                    var sortedStates = Object.keys(stateCounts[country]);
                    if (currentSort === 'alphabetical') {
                      sortedStates.sort();
                    } else if (currentSort === 'nodes') {
                      sortedStates.sort(function (a, b) {
                        return stateCounts[country][b] - stateCounts[country][a];
                      });
                    }
                    sortedStates.forEach(function (state) {
                      var stateCount = stateCounts[country][state];
                      var stateItem = document.createElement("div");
                      stateItem.className = "country-item";
                      stateItem.style.paddingLeft = "0.5em";
                      var stateCheckbox = document.createElement("input");
                      stateCheckbox.type = "checkbox";
                      stateCheckbox.className = "country-checkbox";
                      stateCheckbox.checked = visibleStates[country].has(state);
                      stateCheckbox.id = "state-".concat(country, "-").concat(state);
                      var stateColorBox = document.createElement("div");
                      stateColorBox.className = "country-color";
                      stateColorBox.style.backgroundColor = countryColor;
                      var stateLabel = document.createElement("span");
                      stateLabel.className = "country-name";
                      stateLabel.textContent = state;
                      var stateCountSpan = document.createElement("span");
                      stateCountSpan.className = "country-count";
                      stateCountSpan.textContent = stateCount.toLocaleString();
                      stateItem.appendChild(stateCheckbox);
                      stateItem.appendChild(stateColorBox);
                      stateItem.appendChild(stateLabel);
                      stateItem.appendChild(stateCountSpan);
                      statesContainer.appendChild(stateItem);

                      // Add event listener to toggle state visibility
                      var toggleState = function toggleState(e) {
                        e.stopPropagation();
                        if (stateCheckbox.checked) {
                          visibleStates[country].add(state);
                        } else {
                          visibleStates[country]["delete"](state);
                        }
                        updateNodeVisibility();
                        _renderSidebar();
                      };
                      stateCheckbox.addEventListener("change", toggleState);
                      stateItem.addEventListener("click", function (e) {
                        if (e.target !== stateCheckbox) {
                          stateCheckbox.checked = !stateCheckbox.checked;
                          toggleState(e);
                        }
                      });
                    });
                    countriesContainer.appendChild(statesContainer);
                  }
                });
                countriesList.appendChild(countriesContainer);
              }
            });
          }; // Initial render
          // Functions to show/hide loading (using the global loadingOverlay reference)
          showLoading = function showLoading() {
            if (loadingOverlay) {
              loadingOverlay.classList.add("visible");
            }
          };
          hideLoading = function hideLoading() {
            if (loadingOverlay) {
              loadingOverlay.classList.remove("visible");
            }
          }; // Hide loading after initial render (longer delay to ensure everything is ready)
          // Helper function to darken a hex color by a factor (0-1)
          darkenColor = function darkenColor(hex, factor) {
            // Remove # if present
            hex = hex.replace('#', '');

            // Parse hex color
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);

            // Darken by multiplying by factor
            r = Math.round(r * factor);
            g = Math.round(g * factor);
            b = Math.round(b * factor);

            // Convert back to hex
            var toHex = function toHex(val) {
              return val.toString(16).padStart(2, '0');
            };
            return "#".concat(toHex(r)).concat(toHex(g)).concat(toHex(b));
          }; // Function to update node visibility based on selected countries and states
          updateNodeVisibility = function updateNodeVisibility() {
            showLoading();
            setLoadingText("Updating graph");

            // Use double requestAnimationFrame + setTimeout to ensure the spinner is painted
            // before heavy processing starts
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                setTimeout(function () {
                  graph.forEachNode(function (node, attributes) {
                    var isVisible;

                    // For nodes in countries with states, check state visibility
                    if (countriesWithStates.has(attributes.country) && visibleStates[attributes.country]) {
                      isVisible = visibleStates[attributes.country].has(attributes.state);
                    } else {
                      isVisible = visibleCountries.has(attributes.country);
                    }

                    // Instead of hiding, adjust brightness
                    if (isVisible) {
                      // Restore original color (full brightness)
                      graph.setNodeAttribute(node, "color", attributes.originalColor);
                      graph.setNodeAttribute(node, "hidden", false);
                      graph.setNodeAttribute(node, "isVisible", true);
                    } else {
                      // Darken to 25% brightness
                      var fadedColor = darkenColor(attributes.originalColor, 0.18);
                      graph.setNodeAttribute(node, "color", fadedColor);
                      graph.setNodeAttribute(node, "hidden", false);
                      graph.setNodeAttribute(node, "isVisible", false);
                    }
                  });
                  renderer.refresh();

                  // Hide loading after refresh is complete
                  hideLoading();
                }, 10);
              });
            });
          }; // Create a custom canvas for drawing edges manually (on top of Sigma)
          // Function to resize and position the edge canvas with retina support
          resizeEdgeCanvas = function resizeEdgeCanvas() {
            var _renderer$getDimensio = renderer.getDimensions(),
              width = _renderer$getDimensio.width,
              height = _renderer$getDimensio.height;
            var pixelRatio = window.devicePixelRatio || 1;

            // Set canvas internal resolution (scaled for retina)
            edgeCanvas.width = width * pixelRatio;
            edgeCanvas.height = height * pixelRatio;

            // Set canvas CSS size (actual display size)
            edgeCanvas.style.width = "".concat(width, "px");
            edgeCanvas.style.height = "".concat(height, "px");

            // Scale context to match pixel ratio
            var ctx = edgeCanvas.getContext('2d');
            ctx.scale(pixelRatio, pixelRatio);
          };
          // Function to draw edges and nodes for a specific node
          drawNodeEdges = function drawNodeEdges(node) {
            var ctx = edgeCanvas.getContext('2d');
            var _renderer$getDimensio2 = renderer.getDimensions(),
              width = _renderer$getDimensio2.width,
              height = _renderer$getDimensio2.height;
            ctx.clearRect(0, 0, width, height);
            if (!node) return;
            var nodeEdges = graph.edges(node);
            var connectedNodes = new Set();

            // Get camera state for proper sizing
            var cameraState = renderer.getCamera().getState();

            // First pass: draw all edges
            nodeEdges.forEach(function (edgeId) {
              var extremities = graph.extremities(edgeId);
              var source = extremities[0];
              var target = extremities[1];
              var edgeData = graph.getEdgeAttributes(edgeId);

              // Track connected nodes
              connectedNodes.add(source);
              connectedNodes.add(target);
              var otherNode = source === node ? target : source;
              var otherNodeAttrs = graph.getNodeAttributes(otherNode);

              // Get viewport positions from graph coordinates
              var sourceAttrs = graph.getNodeAttributes(source);
              var targetAttrs = graph.getNodeAttributes(target);
              var sourceViewport = renderer.graphToViewport({
                x: sourceAttrs.x,
                y: sourceAttrs.y
              });
              var targetViewport = renderer.graphToViewport({
                x: targetAttrs.x,
                y: targetAttrs.y
              });

              // Draw the edge
              ctx.beginPath();
              ctx.moveTo(sourceViewport.x, sourceViewport.y);
              ctx.lineTo(targetViewport.x, targetViewport.y);
              ctx.strokeStyle = colors[otherNodeAttrs.country] || '#ccc';
              ctx.lineWidth = Math.pow(edgeData.size, 0.4) || 1;
              ctx.globalAlpha = 0.7;
              ctx.stroke();
            });

            // second pass: draw all connected nodes on top of labels
            // Draw other nodes first, then the hovered node last to ensure it's on top
            var drawNode = function drawNode(nodeId) {
              var nodeAttrs = graph.getNodeAttributes(nodeId);
              var nodeViewport = renderer.graphToViewport({
                x: nodeAttrs.x,
                y: nodeAttrs.y
              });
              var nodeDisplay = renderer.getNodeDisplayData(nodeId);
              var baseSize = (nodeDisplay === null || nodeDisplay === void 0 ? void 0 : nodeDisplay.size) || nodeAttrs.size;
              var renderedSize = baseSize / Math.sqrt(cameraState.ratio);
              var renderedColor = (nodeDisplay === null || nodeDisplay === void 0 ? void 0 : nodeDisplay.color) || nodeAttrs.color;
              ctx.beginPath();
              ctx.arc(nodeViewport.x, nodeViewport.y, renderedSize, 0, Math.PI * 2);
              ctx.fillStyle = renderedColor;
              ctx.globalAlpha = 1.0;
              ctx.fill();
              ctx.strokeStyle = '#fff';
              ctx.lineWidth = 1;
              ctx.globalAlpha = 1.0;
              ctx.stroke();
            };

            // Draw non-hovered nodes first
            connectedNodes.forEach(function (nodeId) {
              if (nodeId !== node) drawNode(nodeId);
            });

            // Third pass: draw label for the hovered node (behind the node)
            var hoveredNodeAttrs = graph.getNodeAttributes(node);

            // Get viewport position from graph coordinates
            var hoveredNodeViewport = renderer.graphToViewport({
              x: hoveredNodeAttrs.x,
              y: hoveredNodeAttrs.y
            });

            // Get rendered size accounting for camera zoom
            var hoveredNodeDisplay = renderer.getNodeDisplayData(node);
            var nodeSize = ((hoveredNodeDisplay === null || hoveredNodeDisplay === void 0 ? void 0 : hoveredNodeDisplay.size) || hoveredNodeAttrs.size) / Math.sqrt(cameraState.ratio);
            if (hoveredNodeAttrs.label) {
              // Set font style similar to Sigma's default
              var fontSize = 14;
              ctx.font = "".concat(fontSize, "px sans-serif");
              // ctx.font = `bold ${fontSize}px 'Times New Roman', Times, serif`;
              ctx.textAlign = 'left';
              ctx.textBaseline = 'middle';

              // Measure label
              var labelWidth = ctx.measureText(hoveredNodeAttrs.label).width;
              var padding = 4;
              var rectHeight = fontSize + padding * 2;
              var textX = hoveredNodeViewport.x + nodeSize + padding;
              var textY = hoveredNodeViewport.y;

              // Calculate circle radius: max of label rect height/2 or node radius
              var circleRadius = Math.max(rectHeight / 2, nodeSize);
              ctx.globalAlpha = 1.0;
              ctx.fillStyle = '#fff';

              // Draw the white circle around the node
              ctx.beginPath();
              ctx.arc(hoveredNodeViewport.x, hoveredNodeViewport.y, circleRadius, 0, Math.PI * 2);
              ctx.fill();

              // Draw the rectangular label background extending from node center to the right
              ctx.beginPath();
              ctx.rect(hoveredNodeViewport.x, hoveredNodeViewport.y - circleRadius, circleRadius + labelWidth + padding * 2, circleRadius * 2);
              ctx.fill();

              // Draw label text
              ctx.globalAlpha = 1.0;
              ctx.fillStyle = '#000';
              ctx.fillText(hoveredNodeAttrs.label, textX, textY);
            }

            // Draw hovered node last so it's on top
            drawNode(node);
          }; // Set label threshold to be really big to hide labels by default
          console.log("Loading colors...");
          _context.n = 1;
          return fetch("./colors3.json");
        case 1:
          colorsRes = _context.v;
          if (colorsRes.ok) {
            _context.n = 2;
            break;
          }
          throw new Error("HTTP error loading colors! status: ".concat(colorsRes.status));
        case 2:
          _context.n = 3;
          return colorsRes.json();
        case 3:
          colors = _context.v;
          console.log("Loading nodes CSV...");
          _context.n = 4;
          return fetch("https://data-lake-house.fra1.cdn.digitaloceanspaces.com/ebird-network/new_nodes2.csv");
        case 4:
          nodesRes = _context.v;
          if (nodesRes.ok) {
            _context.n = 5;
            break;
          }
          throw new Error("HTTP error loading nodes! status: ".concat(nodesRes.status));
        case 5:
          _context.n = 6;
          return nodesRes.text();
        case 6:
          nodesCSV = _context.v;
          console.log("Loading edges CSV...");
          _context.n = 7;
          return fetch("https://data-lake-house.fra1.cdn.digitaloceanspaces.com/ebird-network/ebird_forceatlas_linlog_edges.csv");
        case 7:
          edgesRes = _context.v;
          if (edgesRes.ok) {
            _context.n = 8;
            break;
          }
          throw new Error("HTTP error loading edges! status: ".concat(edgesRes.status));
        case 8:
          _context.n = 9;
          return edgesRes.text();
        case 9:
          edgesCSV = _context.v;
          // Parse CSV data
          nodesData = parseCSV(nodesCSV);
          edgesData = parseCSV(edgesCSV);
          console.log("Parsed ".concat(nodesData.length, " nodes and ").concat(edgesData.length, " edges"));

          // Update loading text and give browser time to paint
          setLoadingText("Creating graph (this may take a while)");
          _context.n = 10;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 100);
          });
        case 10:
          // Create new graph
          graph = new (graphology__WEBPACK_IMPORTED_MODULE_1___default())(); // Add nodes
          console.log("Adding nodes to graph...");
          nodesData.forEach(function (node) {
            var countryColor = colors[node.Country] || '#666'; // Default gray if country not found
            graph.addNode(node.Id, {
              x: parseFloat(node.X) || 0,
              y: parseFloat(node.Y) || 0,
              size: (parseFloat(node.Size) || 1) / 10,
              label: node.Country + ': ' + node.State,
              color: countryColor,
              originalColor: countryColor,
              // Store original color for opacity changes
              country: node.Country,
              state: node.State,
              isVisible: true // All nodes start visible
            });
          });

          // Add edges
          console.log("Adding edges to graph...");
          edgesData.forEach(function (edge) {
            // Only add edge if both source and target nodes exist
            if (graph.hasNode(edge.Source) && graph.hasNode(edge.Target)) {
              graph.addEdge(edge.Source, edge.Target, {
                size: parseFloat(edge.Weight) || 1,
                // use the color of the destination node country
                color: colors[graph.getNodeAttribute(edge.Target, 'country')] || '#ccc',
                hidden: true
              });
            }
          });
          console.log("Graph created:", graph);
          console.log("Final graph has ".concat(graph.order, " nodes and ").concat(graph.size, " edges"));

          // Map countries to continents
          countryToContinent = {
            // North America
            "United States": "North America",
            "Canada": "North America",
            "Mexico": "North America",
            "Greenland": "North America",
            "Saint Pierre and Miquelon": "North America",
            // Central America & Caribbean
            "Costa Rica": "Central America & Caribbean",
            "Panama": "Central America & Caribbean",
            "Belize": "Central America & Caribbean",
            "Guatemala": "Central America & Caribbean",
            "Honduras": "Central America & Caribbean",
            "Nicaragua": "Central America & Caribbean",
            "El Salvador": "Central America & Caribbean",
            "Puerto Rico": "Central America & Caribbean",
            "Cuba": "Central America & Caribbean",
            "Bahamas": "Central America & Caribbean",
            "Jamaica": "Central America & Caribbean",
            "Trinidad and Tobago": "Central America & Caribbean",
            "Dominican Republic": "Central America & Caribbean",
            "Haiti": "Central America & Caribbean",
            "Grenada": "Central America & Caribbean",
            "Barbados": "Central America & Caribbean",
            "Saint Vincent and the Grenadines": "Central America & Caribbean",
            "Saint Kitts and Nevis": "Central America & Caribbean",
            "Saint Lucia": "Central America & Caribbean",
            "Dominica": "Central America & Caribbean",
            "Antigua and Barbuda": "Central America & Caribbean",
            "Saint Martin (French part)": "Central America & Caribbean",
            "Sint Maarten": "Central America & Caribbean",
            "Curaçao": "Central America & Caribbean",
            "Aruba": "Central America & Caribbean",
            "Caribbean Netherlands": "Central America & Caribbean",
            "Cayman Islands": "Central America & Caribbean",
            "Turks and Caicos Islands": "Central America & Caribbean",
            "Virgin Islands (U.S.)": "Central America & Caribbean",
            "Virgin Islands (British)": "Central America & Caribbean",
            "Anguilla": "Central America & Caribbean",
            "Montserrat": "Central America & Caribbean",
            "Guadeloupe": "Central America & Caribbean",
            "Martinique": "Central America & Caribbean",
            "Bermuda": "Central America & Caribbean",
            // South America
            "Colombia": "South America",
            "Brazil": "South America",
            "Chile": "South America",
            "Argentina": "South America",
            "Peru": "South America",
            "Ecuador": "South America",
            "Venezuela": "South America",
            "Uruguay": "South America",
            "Bolivia": "South America",
            "Paraguay": "South America",
            "Guyana": "South America",
            "Suriname": "South America",
            "French Guiana": "South America",
            "Falkland Islands (Malvinas)": "South America",
            "South Georgia and South Sandwich Islands": "South America",
            // Europe
            "Spain": "Europe",
            "United Kingdom": "Europe",
            "Portugal": "Europe",
            "Germany": "Europe",
            "France": "Europe",
            "Poland": "Europe",
            "Czech Republic": "Europe",
            "Italy": "Europe",
            "Bulgaria": "Europe",
            "Greece": "Europe",
            "Sweden": "Europe",
            "Norway": "Europe",
            "Switzerland": "Europe",
            "Iceland": "Europe",
            "Finland": "Europe",
            "Austria": "Europe",
            "Ireland": "Europe",
            "Serbia": "Europe",
            "Belgium": "Europe",
            "Denmark": "Europe",
            "Hungary": "Europe",
            "Belarus": "Europe",
            "Croatia": "Europe",
            "Ukraine": "Europe",
            "Romania": "Europe",
            "Slovakia": "Europe",
            "Slovenia": "Europe",
            "Lithuania": "Europe",
            "Estonia": "Europe",
            "Latvia": "Europe",
            "Isle of Man": "Europe",
            "Moldova": "Europe",
            "Albania": "Europe",
            "Faroe Islands": "Europe",
            "Malta": "Europe",
            "North Macedonia": "Europe",
            "Montenegro": "Europe",
            "Luxembourg": "Europe",
            "Jersey": "Europe",
            "Bosnia and Herzegovina": "Europe",
            "Gibraltar": "Europe",
            "Andorra": "Europe",
            "Guernsey": "Europe",
            "Kosovo": "Europe",
            "Svalbard": "Europe",
            "Russia": "Europe",
            "Netherlands": "Europe",
            // Asia
            "India": "Asia",
            "Taiwan": "Asia",
            "China": "Asia",
            "Thailand": "Asia",
            "Malaysia": "Asia",
            "Philippines": "Asia",
            "Iran": "Asia",
            "Singapore": "Asia",
            "Japan": "Asia",
            "South Korea": "Asia",
            "Sri Lanka": "Asia",
            "Nepal": "Asia",
            "Cambodia": "Asia",
            "Indonesia": "Asia",
            "Hong Kong": "Asia",
            "Bangladesh": "Asia",
            "Mongolia": "Asia",
            "Bhutan": "Asia",
            "United Arab Emirates": "Asia",
            "Saudi Arabia": "Asia",
            "Vietnam": "Asia",
            "Georgia": "Asia",
            "Kazakhstan": "Asia",
            "Oman": "Asia",
            "Myanmar": "Asia",
            "Pakistan": "Asia",
            "Kyrgyzstan": "Asia",
            "Kuwait": "Asia",
            "Armenia": "Asia",
            "Qatar": "Asia",
            "Cyprus": "Europe",
            "Palau": "Asia",
            "Laos": "Asia",
            "Azerbaijan": "Asia",
            "Tajikistan": "Asia",
            "Jordan": "Asia",
            "Timor-Leste": "Asia",
            "Uzbekistan": "Asia",
            "Lebanon": "Asia",
            "Macau": "Asia",
            "Maldives": "Asia",
            "Iraq": "Asia",
            "Syria": "Asia",
            "Bahrain": "Asia",
            "Yemen": "Asia",
            "Brunei": "Asia",
            "Afghanistan": "Asia",
            // Africa
            "South Africa": "Africa",
            "Kenya": "Africa",
            "Uganda": "Africa",
            "Tanzania": "Africa",
            "Rwanda": "Africa",
            "Zambia": "Africa",
            "Morocco": "Africa",
            "Zimbabwe": "Africa",
            "Namibia": "Africa",
            "Egypt": "Africa",
            "Madagascar": "Africa",
            "Botswana": "Africa",
            "Gambia": "Africa",
            "Ghana": "Africa",
            "Senegal": "Africa",
            "Ethiopia": "Africa",
            "Mozambique": "Africa",
            "Nigeria": "Africa",
            "Malawi": "Africa",
            "Algeria": "Africa",
            "Tunisia": "Africa",
            "Cape Verde": "Africa",
            "São Tomé and Príncipe": "Africa",
            "Angola": "Africa",
            "Cameroon": "Africa",
            "Seychelles": "Africa",
            "DR Congo": "Africa",
            "Guinea-Bissau": "Africa",
            "Liberia": "Africa",
            "Chad": "Africa",
            "Gabon": "Africa",
            "Guinea": "Africa",
            "Equatorial Guinea": "Africa",
            "Eswatini": "Africa",
            "Mauritius": "Africa",
            "Réunion": "Africa",
            "Congo": "Africa",
            "Burundi": "Africa",
            "Mali": "Africa",
            "Mauritania": "Africa",
            "Mayotte": "Africa",
            "Benin": "Africa",
            "Somalia": "Africa",
            "Togo": "Africa",
            "Djibouti": "Africa",
            "Burkina Faso": "Africa",
            "Sudan": "Africa",
            "South Sudan": "Africa",
            "Libya": "Africa",
            "Sierra Leone": "Africa",
            "Côte d'Ivoire": "Africa",
            "Saint Helena, Ascension, and Tristan da Cunha": "Africa",
            // Oceania
            "Australia": "Oceania",
            "New Zealand": "Oceania",
            "Papua New Guinea": "Oceania",
            "Vanuatu": "Oceania",
            "Samoa": "Oceania",
            "Fiji": "Oceania",
            "French Polynesia": "Oceania",
            "New Caledonia": "Oceania",
            "Solomon Islands": "Oceania",
            "Guam": "Oceania",
            "Norfolk Island": "Oceania",
            "Cook Islands": "Oceania",
            "Wallis and Futuna": "Oceania",
            "Pitcairn Islands": "Oceania",
            "Tuvalu": "Oceania",
            "Tonga": "Oceania",
            "Micronesia": "Oceania",
            "Northern Mariana Islands": "Oceania",
            "Christmas Island": "Oceania",
            // Middle East (can be grouped with Asia or separate)
            "Türkiye": "Asia",
            "Israel": "Asia",
            "Palestinian Territory": "Asia",
            // Other/Special
            "Antarctica": "Other",
            "High Seas": "Other",
            "British Indian Ocean Territory": "Asia",
            "United States Minor Outlying Islands": "Oceania"
          }; // Countries that have state/province subcategories
          countriesWithStates = new Set(["United States", "Canada", "India"]); // Count nodes per country and per state (for countries with states)
          countryCounts = {};
          stateCounts = {}; // Maps country -> state -> count
          visibleStates = {}; // Maps country -> Set of visible states
          graph.forEachNode(function (node, attributes) {
            var country = attributes.country;
            if (country) {
              countryCounts[country] = (countryCounts[country] || 0) + 1;

              // Track states for countries that have them
              if (countriesWithStates.has(country)) {
                var state = attributes.state;
                if (state) {
                  if (!stateCounts[country]) {
                    stateCounts[country] = {};
                  }
                  stateCounts[country][state] = (stateCounts[country][state] || 0) + 1;
                }
              }
            }
          });
          countries = Object.keys(countryCounts); // Initialize visible states for countries with states (all visible by default)
          countriesWithStates.forEach(function (country) {
            if (stateCounts[country]) {
              visibleStates[country] = new Set(Object.keys(stateCounts[country]));
            }
          });

          // Track which countries are visible (for countries without state subcategories)
          visibleCountries = new Set(countries.filter(function (c) {
            return !countriesWithStates.has(c);
          })); // Group countries by continent
          continentGroups = {};
          countries.forEach(function (country) {
            var continent = countryToContinent[country] || "Other";
            if (!continentGroups[continent]) {
              continentGroups[continent] = [];
            }
            continentGroups[continent].push(country);
          });

          // Sort continents
          sortedContinents = Object.keys(continentGroups).sort(); // Current sort mode: 'alphabetical' or 'nodes'
          currentSort = 'alphabetical'; // Track which continents are expanded (start with all collapsed)
          expandedContinents = new Set(); // Track which countries are expanded (for US states)
          expandedCountries = new Set();
          _renderSidebar();

          // Add select all / deselect all buttons
          document.getElementById("select-all").addEventListener("click", function () {
            countries.forEach(function (country) {
              if (countriesWithStates.has(country) && stateCounts[country]) {
                // Select all states for countries with states
                Object.keys(stateCounts[country]).forEach(function (state) {
                  visibleStates[country].add(state);
                });
              } else {
                visibleCountries.add(country);
              }
            });
            updateNodeVisibility();
            _renderSidebar();
          });
          document.getElementById("deselect-all").addEventListener("click", function () {
            countries.forEach(function (country) {
              if (countriesWithStates.has(country) && stateCounts[country]) {
                // Deselect all states for countries with states
                Object.keys(stateCounts[country]).forEach(function (state) {
                  visibleStates[country]["delete"](state);
                });
              } else {
                visibleCountries["delete"](country);
              }
            });
            updateNodeVisibility();
            _renderSidebar();
          });

          // Add sorting controls
          document.getElementById("sort-alpha").addEventListener("click", function () {
            currentSort = 'alphabetical';
            document.getElementById("sort-alpha").classList.add("active");
            document.getElementById("sort-nodes").classList.remove("active");
            _renderSidebar();
          });
          document.getElementById("sort-nodes").addEventListener("click", function () {
            currentSort = 'nodes';
            document.getElementById("sort-nodes").classList.add("active");
            document.getElementById("sort-alpha").classList.remove("active");
            _renderSidebar();
          });

          // Retrieve some useful DOM elements:
          container = document.getElementById("sigma-container");
          zoomInBtn = document.getElementById("zoom-in");
          zoomOutBtn = document.getElementById("zoom-out");
          zoomResetBtn = document.getElementById("zoom-reset"); // const labelsThresholdRange = document.getElementById("labels-threshold");
          // Update loading text and give browser time to paint
          setLoadingText("Reticulating splines");
          _context.n = 11;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 100);
          });
        case 11:
          // Instanciate sigma with edges disabled for performance
          renderer = new sigma__WEBPACK_IMPORTED_MODULE_0__["default"](graph, container, {
            renderEdges: false,
            // Completely disable automatic edge rendering
            defaultDrawNodeHover: function defaultDrawNodeHover() {} // Disable default hover rendering
          });
          camera = renderer.getCamera();
          setTimeout(hideLoading, 800);
          edgeCanvas = document.createElement('canvas');
          edgeCanvas.style.position = 'absolute';
          edgeCanvas.style.top = '0';
          edgeCanvas.style.left = '0';
          edgeCanvas.style.pointerEvents = 'none'; // Allow mouse events to pass through
          edgeCanvas.style.zIndex = '1'; // Ensure it's on top
          container.appendChild(edgeCanvas);

          // Get Sigma's canvas elements to manipulate their opacity
          sigmaCanvases = Array.from(container.querySelectorAll('canvas')).filter(function (c) {
            return c !== edgeCanvas;
          }); // Add smooth transition for opacity changes
          sigmaCanvases.forEach(function (canvas) {
            canvas.style.transition = 'opacity 0.2s ease';
          });
          resizeEdgeCanvas();
          renderer.setSetting("labelRenderedSizeThreshold", 1000);

          // Disable hover labels completely
          renderer.setSetting("enableNodeHoverLabels", false);
          renderer.setSetting("enableHovering", false);

          // Bind zoom manipulation buttons
          zoomInBtn.addEventListener("click", function () {
            camera.animatedZoom({
              duration: 600
            });
          });
          zoomOutBtn.addEventListener("click", function () {
            camera.animatedUnzoom({
              duration: 600
            });
          });
          zoomResetBtn.addEventListener("click", function () {
            camera.animatedReset({
              duration: 600
            });
          });

          // Track the currently hovered node
          currentHoveredNode = null; // Add hover functionality to show edges only when a node is hovered
          renderer.on("enterNode", function (_ref) {
            var node = _ref.node;
            // Only allow hover on visible nodes
            var nodeAttrs = graph.getNodeAttributes(node);
            if (nodeAttrs.isVisible === false) {
              return;
            }
            currentHoveredNode = node;

            // Dim the Sigma canvases by 50%
            sigmaCanvases.forEach(function (canvas) {
              canvas.style.opacity = '0.5';
            });

            // Draw edges and nodes on top
            drawNodeEdges(node);
          });
          renderer.on("leaveNode", function () {
            currentHoveredNode = null;

            // Restore Sigma canvases to full opacity
            sigmaCanvases.forEach(function (canvas) {
              canvas.style.opacity = '1.0';
            });

            // Clear the edge canvas
            var ctx = edgeCanvas.getContext('2d');
            var _renderer$getDimensio3 = renderer.getDimensions(),
              width = _renderer$getDimensio3.width,
              height = _renderer$getDimensio3.height;
            ctx.clearRect(0, 0, width, height);
          });

          // Redraw edges when camera moves (zoom/pan) if a node is hovered
          renderer.on("afterRender", function () {
            if (currentHoveredNode) {
              drawNodeEdges(currentHoveredNode);
            }
          });

          // Resize edge canvas when window resizes
          window.addEventListener("resize", function () {
            // Use a small delay to ensure Sigma has updated its dimensions
            setTimeout(function () {
              resizeEdgeCanvas();
              if (currentHoveredNode) {
                drawNodeEdges(currentHoveredNode);
              }
            }, 10);
          });

          // Also listen to Sigma's resize events for more reliable resizing
          renderer.on("resize", function () {
            resizeEdgeCanvas();
            if (currentHoveredNode) {
              drawNodeEdges(currentHoveredNode);
            }
          });
          _context.n = 13;
          break;
        case 12:
          _context.p = 12;
          _t = _context.v;
          console.error("Error loading or parsing CSV files:", _t);
          alert("Error: ".concat(_t.message));
        case 13:
          return _context.a(2);
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _loadCSVGraph.apply(this, arguments);
}
var loadingOverlay = document.getElementById("loading-overlay");
var loadingText = document.querySelector(".loading-text");
function setLoadingText(text) {
  if (loadingText) {
    loadingText.textContent = text;
  }
}
if (loadingOverlay) {
  loadingOverlay.classList.add("visible");
  setLoadingText("Loading data (this may take a while)");
}

// Start loading the CSV files
loadCSVGraph();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map