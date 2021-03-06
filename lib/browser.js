
/**
 * Module dependencies.
 */

var global = (function() { return this; })();

/**
 * WebSocket constructor.
 */

var WebSocket = global.WebSocket || global.MozWebSocket;

WebSocket.prototype.on = function (event, callback) {
  this.addEventListener(event, callback);
};

WebSocket.prototype.off = function (event, callback) {
  this.removeEventListener(event, callback);
};

WebSocket.prototype.once = function (event, callback) {
  var self = this;
  this.addEventListener(event, function handler() {
    callback.apply(callback, arguments);
    self.removeEventListener(event, handler);
  });
};

/**
 * Module exports.
 */

module.exports = WebSocket ? ws : null;

/**
 * WebSocket constructor.
 *
 * The third `opts` options object gets ignored in web browsers, since it's
 * non-standard, and throws a TypeError if passed to the constructor.
 * See: https://github.com/einaros/ws/issues/227
 *
 * @param {String} uri
 * @param {Array} protocols (optional)
 * @param {Object) opts (optional)
 * @api public
 */

function ws(uri, protocols, opts) {
  var instance;
  if (protocols) {
    instance = new WebSocket(uri, protocols);
  } else {
    instance = new WebSocket(uri);
  }
  return instance;
}

if (WebSocket) ws.prototype = WebSocket.prototype;
