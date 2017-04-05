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
