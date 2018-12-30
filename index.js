#!/usr/bin/env node

const Table = require("cli-table3");
const gradient = require("gradient-string");
const chalk = require('chalk');
const info = require('./info');

const chars = {
  top: "═",
  "top-mid": "╤",
  "top-left": "╔",
  "top-right": "╗",
  bottom: "═",
  "bottom-mid": "╧",
  "bottom-left": "╚",
  "bottom-right": "╝",
  left: "║",
  "left-mid": "║",
  "mid-mid": " ",
  mid: " ",
  right: "║",
  "right-mid": "║",
  mid: "",
  "left-mid": "",
  "mid-mid": "",
  "right-mid": ""
};

let coloredChars = {};

Object.keys(chars).forEach(key => {
    coloredChars[key] = gradient.pastel(chars[key]);
});

const bolder = word => chalk.default.bold(word);
const link = link => chalk.gray(link)
const table = new Table({ chars: coloredChars });




const name = `  ${info.name} `;
const work = bolder(chalk.white(`${info.occupation} @ ${chalk.hex("#BD002C")(info.work)}`));
const github = `          ${chalk.hex("#bcbcbc")("")}    ${link('https://github.com/')}${chalk.hex("#bcbcbc")(info.github)}          `;
const gitlab = `          ${chalk.hex('#FF6B34')('')}    ${link('https://gitlab.com/')}${chalk.hex('#FF6B34')(info.gitlab)}          `;
const linkedIn = `          ${chalk.blue('')}    ${link('https://linkedin.com/in/')}${chalk.blue(info.linkedIn)}        `;
const npm = `          ${chalk.red('ᴨᴩᴍ')}  ${link('https://npmjs.com/~')}${chalk.red(info.npm)}          `;
const web = `          ${chalk.hex('#C2986E')('')}    ${link('https://thayut.gitlab.io/')}${chalk.hex('#C2986E')('whoami')}          `;
const card = `${chalk.red('npx')} talhayut`;

table.push([" "]);
table.push([{ content: gradient.vice(name), hAlign: "center" }]);
table.push([" "]);
table.push([{ content: work, hAlign: 'center'}]);
table.push([" "]);
table.push([{ content: npm }]);
table.push([{ content: github }]);
table.push([{ content: gitlab }]);
table.push([{ content: linkedIn }]);
table.push([{ content: web }]);

table.push([" "]);
table.push([{ content: card, hAlign: 'center'}]);
table.push([" "]);

console.log(table.toString());
