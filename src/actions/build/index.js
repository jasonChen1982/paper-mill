const build = require('./lib/util');
const util = require('../../lib/util');

module.exports = function(options) {
  const paperFiles = util.getPapers();
  build.putPapers(paperFiles, options);
};
