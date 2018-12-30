#!/usr/bin/env node

const Table = require("cli-table3");
const gradient = require("gradient-string");
const chalk = require('chalk');

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
const name = "  𝚃𝚊𝚕 𝙷𝚊𝚢𝚞𝚝 ";
const work = bolder(chalk.white(`Fullstack web developer @ ${chalk.hex("#BD002C")("Zerto")}`));
const github = `          ${chalk.hex("#bcbcbc")("")}    ${link('https://github.com/')}${chalk.hex("#bcbcbc")('tool3')}          `;
const gitlab = `          ${chalk.hex('#FF6B34')('')}    ${link('https://gitlab.com/')}${chalk.hex('#FF6B34')('thayut')}          `;
const linkedIn = `          ${chalk.blue('')}    ${link('https://www.linkedin.com/in/')}${chalk.blue('talhayut')}        `;
const npm = `          ${chalk.red('ᴨᴩᴍ')}  ${link('https://www.npmjs.com/')}${chalk.red('~tool3')}          `;
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
