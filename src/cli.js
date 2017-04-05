#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const fullname = require('fullname');
const inquirer = require('inquirer');
const moment = require('moment');
const ejs = require('ejs');
const util = require('./util');
const cwd = process.cwd();

util.updateCheck();

fullname().then(name => {
    const author = name ? name.split(' ')[0] : 'please enter';
    const date = moment().format('YYYY-MM-DD');
    inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: `输入paper的标题名字，${chalk.red('例如:papers使用指南')}`,
        validate: function(input) {
          return input.trim().length > 0;
        },
      },
      {
        name: 'date',
        type: 'input',
        message: `输入paper的创建日期，${chalk.red('例如:YYYY-MM-DD')}`,
        default: date,
        validate: function(input) {
          const reg = /\d{4,}-\d{2,}\-\d{2,}/;
          return reg.test(input);
        },
      },
      {
        name: 'author',
        type: 'input',
        message: `输入paper的作者名字，${chalk.red('例如:我叫一本正经')}`,
        default: author,
      },
    ]).then(answer => {
      answer.status = 'todo';
      const filepath = path.resolve(cwd, 'papers');
      const filefullpath = path.resolve(filepath, answer.date + '-' + answer.title + '.md');
      const tpl = fs.readFileSync(require.resolve('./template/_paper.md'), 'utf8');
      const paper = ejs.render(tpl, answer);
      try {
        fs.readdirSync(filepath);
      } catch (error) {
        fs.mkdirSync(filepath);
      }
      try {
        fs.readFileSync(filefullpath);
        inquirer.prompt([
          {
            name: 'override',
            type: 'confirm',
            message: chalk.red('发现papers里面已经有这个文件了，确定要覆盖？'),
            default: false,
          },
        ]).then(answer => {
          if (answer.override) {
            fs.writeFileSync(filefullpath, paper);
          }
        });
      } catch (error) {
        fs.writeFileSync(filefullpath, paper);
      }
    });
  });
