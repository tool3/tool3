#!/usr/bin/env node

const Table = require("cli-table3");
const gradient = require("gradient-string");
const chalk = require("chalk");
const info = require("./info");
const package = require("./package");

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
let currentRandom = undefined;

const randomGradient = string => {
  const randoms = info.colors.map(color => {
    return chalk.hex(color)(string);
  });

  if (!currentRandom && currentRandom !== 0) {
    currentRandom = Math.floor(Math.random() * randoms.length);
  }

  return randoms[currentRandom];
};

Object.keys(chars).forEach(key => {
  coloredChars[key] = randomGradient(chars[key]);
});

const bolder = word => chalk.default.bold(word);
const link = link => chalk.gray(link);
const repeat = (rep, times) => {
  return rep.repeat(times);
};

const table = new Table({ chars: coloredChars });

currentRandom = undefined;

const name = `  ${info.name} `;
const work = bolder(chalk.white(`${info.occupation} @ ${chalk.hex("#BD002C")(info.work)}`));

const github =
  repeat(" ", 10) +
  chalk.hex("#bcbcbc")("") +
  repeat(" ", 4) +
  link("https://github.com/") +
  chalk.hex("#bcbcbc")(info.github) +
  repeat(" ", 11);

const gitlab =
  repeat(" ", 10) +
  chalk.hex("#FF6B34")("") +
  repeat(" ", 4) +
  link("https://gitlab.com/") +
  chalk.hex("#FF6B34")(info.gitlab) +
  repeat(" ", 11);

const linkedIn =
  repeat(" ", 10) +
  chalk.hex("#0C65B3")("") +
  repeat(" ", 4) +
  link("https://linkedin.com/in/") +
  chalk.hex("#0C65B3")(info.linkedIn) +
  repeat(" ", 9);

const npm =
  repeat(" ", 10) +
  chalk.hex("#D90036")("ᴨᴩᴍ") +
  repeat(" ", 2) +
  link("https://npmjs.com/~") +
  chalk.hex("#D90036")(info.npm) +
  repeat(" ", 11);

const web =
  repeat(" ", 10) +
  chalk.hex("#C2986E")("") +
  repeat(" ", 4) +
  link(info.web) +
  chalk.hex("#C2986E")("whoami") +
  repeat(" ", 11);

const card = `${chalk.red("npx")} ${package.name}`;

table.push([" "]);
table.push([{ content: gradient.vice(name), hAlign: "center" }]);
table.push([" "]);
table.push([{ content: work, hAlign: "center" }]);
table.push([" "]);
table.push([{ content: npm }]);
table.push([{ content: github }]);
table.push([{ content: gitlab }]);
table.push([{ content: linkedIn }]);
table.push([{ content: web }]);
table.push([" "]);
table.push([{ content: card, hAlign: "center" }]);
table.push([" "]);

console.log(table.toString());
