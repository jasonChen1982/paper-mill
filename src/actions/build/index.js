
const cwd = process.cwd();
const fs = require('fs');
const path = require('path');

const papersPath = path.resolve(cwd, 'papers');
const paperFiles = fs.readdirSync(papersPath, 'utf8');
const util = require('./lib/util');

module.exports = function(options) {
  util.putPapers(paperFiles, options);
};
