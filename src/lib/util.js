
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('../../package.json');

exports.updateCheck = function() {
  const notifier = updateNotifier({pkg});

  if (notifier.update) {
    console.log(chalk.gray(' (current: ' + notifier.update.current + ')'));
  }
};
