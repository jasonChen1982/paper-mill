
// const chalk = require('chalk');
const cwd = process.cwd();
const fs = require('fs');
const path = require('path');
const util = require('../../../lib/util');

const tplPath = require.resolve('../template/_README.md');
const targetPath = path.resolve(cwd + '/README.md');
const md = fs.readFileSync(tplPath, 'utf8').split('\n');


function groupingByYear(samples, {y, d, p}) {
    const dateReg = /(\d{4})-\d{1,2}-\d{1,2}/;
    const result = [];
    const preCache = {};
    samples.forEach(function(it, id) {
        const keys = it.match(dateReg);
        if (keys && keys.length > 1) {
            const times = keys[0].replace(/-/g, '') - 0;
            const time = keys[1] - 0;
            if (time !== preCache.time) {
                if (preCache.time) {
                    ship();
                }
                preCache.time = time;
                preCache.papers = [];
            }
            preCache.papers.push(warpPaper(it, times, p));
        }
    });
    ship();
    sortFn(result, y);

    function ship() {
        sortFn(preCache.papers, d);
        result.push(Object.assign({}, preCache));
    }
    return result;
}


function warpPaper(paper, time, p) {
    const result = {};
    let mark = ' ';
    result.finished = checkStatus(paper);
    result.paper = paper;
    result.title = paper.replace(/(\d{4})-\d{1,2}-\d{1,2}-|\.md/g, '');
    result.time = time;
    result.url = encodeURI(p + '/blob/master/papers/' + paper);
    mark = result.finished ? 'x' : ' ';
    result.item = `- [${mark}] [${result.title}](${result.url})`;
    return result;
}

function checkStatus(paper) {
    const paperFile = fs.readFileSync(path.resolve(cwd, 'papers', paper), 'utf8');
    const reg = /\nstatus:\s?(\w+)\s?\n?/;
    const regFinished = /finish(ed)?/;
    let result = false;
    if (reg.test(paperFile)) {
        result = regFinished.test(paperFile.match(reg)[1]) ? true : false;
    }
    return result;
}

function putMD(papers, {f}) {
    const result = md.concat([]);
    let preYear = 0;
    for (let j = 0; j < papers.length; j++) {
        const paper = papers[j];
        if (paper.year !== preYear) {
            preYear = paper.time;
            result.push('### Papers of ' + preYear);
            result.push('');
        }
        paper.papers.forEach(function(it) {
            if (it.finished && f) result.push(it.item);
        });
        result.push('');
    }

    fs.writeFileSync(targetPath, result.join('\n'));
}

function sortFn(arr, order) {
    arr.sort((a, b)=>{
        if (a.time < b.time) {
            return order;
        }
        if (a.time > b.time) {
            return -order;
        }
        return 0;
    });
}

exports.getPrefix = function() {
  const pkg = util.getPkg();
  return pkg.homepage.replace(/#\w+/, '') || '';
};
exports.putPapers = function(samples, options) {
  putMD(groupingByYear(samples, options), options);
};
