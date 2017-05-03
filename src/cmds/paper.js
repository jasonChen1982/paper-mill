'use strict';

const papers = require('../actions/papers/index');

exports.command = 'paper';
exports.desc = '初始化一个空文章';
exports.builder = {};
exports.handler = function(argv) {
  papers();
};
