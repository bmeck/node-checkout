/*
 * tar-stream.js: Checkout adapter for a tar stream.
 *
 * (C) 2012 Bradley Meck.
 * MIT LICENSE
 *
 */

var tar = require('tar');

//
// ### function download (source, callback)
// #### @source {Object} Source checkout options
// #### @callback {function} Continuation to respond to.
// Downloads the tar stream to the specified `source.destination`.
//
exports.download = function (source, callback) {
  var done = false;

  //
  // Respond to the callback once.
  //
  function finish() {
    if (!done) {
      done = true;
      callback.apply(this, arguments);
    }
  }

  source.stream.pipe(tar.Extract({ path: source.destination }))
    .on('error', finish)
    .on('end', finish);
};