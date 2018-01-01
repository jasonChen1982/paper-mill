const cwd = process.cwd();
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');

exports.updateCheck = function() {
  const pkg = require('../../package.json');
  const notifier = updateNotifier({pkg});

  if (notifier.update) {
    console.log(chalk.gray(' (current: ' + notifier.update.current + ')'));
  }
};

exports.getPkg = function() {
  const papersPath = path.resolve(cwd, 'package.json');
  let pkg = {};
  try {
    pkg = require(papersPath);
  } catch (err) {
    console.log(err);
  }
  return pkg;
};

exports.getPapers = function() {
  const papersPath = path.resolve(cwd, 'papers');
  let paperFiles = [];
  try {
    paperFiles = fs.readdirSync(papersPath, 'utf8');
  } catch (err) {
    console.log(err);
  }
  return paperFiles;
};
