var H5P = H5P || {};

/**
 * Constructor.
 * 
 * @param {object} params Options for this library.
 * @param {string} contentPath The path to our content folder.
 */
H5P.Table = function (params, contentPath) {
  this.text = params.text === undefined ? '<table><tr><th>New</td><td></td></tr><tr><td></td><td>table</td></tr></table>' : params.text;
};

/**
 * Wipe out the content of the wrapper and put our HTML in it.
 * 
 * @param {jQuery} $wrapper
 */
H5P.Table.prototype.attach = function ($wrapper) {
  $wrapper.html(this.text);
};