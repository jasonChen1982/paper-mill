'use strict';

const build = require('../actions/build/index');
const util = require('../actions/build/lib/util');

exports.command = 'build';
exports.desc = '发布文章到readme';
exports.builder = yargs => {
  return yargs
  .option('ogy', {
    alias: 'y',
    describe: '文章按年份的排序方式，1为顺序，-1为倒序',
    default: 1,
  })
  .option('ogd', {
    alias: 'd',
    describe: '文章按日期的排序方式，1为顺序，-1为倒序',
    default: 1,
  })
  .option('prefix', {
    alias: 'p',
    describe: '文章生成的地址前戳',
    default: util.getPrefix(),
  })
  .option('filter', {
    alias: 'f',
    describe: '过滤掉未完成的文章',
    default: true,
  });
};
exports.handler = function(argv) {
  build(argv);
};
