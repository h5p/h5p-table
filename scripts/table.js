var H5P = H5P || {};

/**
 * Constructor.
 * 
 * @param {object} params Options for this library.
 * @param {string} contentPath The path to our content folder.
 */
H5P.Table = function (params, contentPath) {
  this.text = params.text === undefined ? '<table border="1" cellpadding="1" cellspacing="1" style="width: 100%;"><thead><tr><th scope="col">1-1</th><th scope="col">1-2</th></tr></thead><tbody><tr><td>2-1</td><td>2-2</td></tr><tr><td>3-1</td><td>3-2</td></tr></tbody></table>' : params.text;
};

/**
 * Wipe out the content of the wrapper and put our HTML in it.
 * 
 * @param {jQuery} $wrapper
 */
H5P.Table.prototype.attach = function ($wrapper) {
  $wrapper.html(this.text);
};