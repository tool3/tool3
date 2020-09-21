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

const bolder = word => chalk.default.bold(word);
const link = link => chalk.gray(link);
const repeat = (rep, times) => rep.repeat(times);
const randomGradient = string => {
  const randoms = info.colors.map(color => {
    return chalk.hex(color)(string);
  });

  if (!currentRandom && currentRandom !== 0) {
    currentRandom = Math.floor(Math.random() * randoms.length);
  }

  return randoms[currentRandom];
};
const web = (web) => {
  const url = web.split("/");
  const path = url[url.length - 1];
  const domain = url.slice(1, -1);

  return (
    repeat(" ", 12) +
    chalk.whiteBright("web") +
    repeat(" ", 7) +
    link(`https://${domain[1]}/`) +
    chalk.hex("#6ce2e2")(path) +
    repeat(" ", 13)
  );
};

const createEntry = (name, space) => {
  const item = info.social[name];
  const coloredUser = item.color ? chalk.hex(item.color)(item.user) : item.user
  return repeat(" ", 12) +
    chalk.whiteBright(name) +
    repeat(" ", space) +
    link(item.url) +
    coloredUser +
    repeat(" ", 11);
}

Object.keys(chars).forEach(key => {
  coloredChars[key] = randomGradient(chars[key]);
});

currentRandom = undefined;
const table = new Table({ chars: coloredChars });
const name = `${info.name}`;

const work = bolder(
  chalk.whiteBright(`${info.occupation} ${coloredChars.top.replace("═", "@")} ${chalk.cyan(info.work)}`)
);

table.push([{ content: `\n${chalk.bold(name.trim())}\n`, hAlign: "center" }]);
table.push([{ content: `${work}\n`, hAlign: "center" }]);


Object.keys(info.social).map(name => {
  if (name === "web") {
    table.push([{ content: web(info.social[name].url) }]);
    return;
  }
  const space = name.length > 6 ? 2 : (name.length <= 3 ? 7 : 4);
  const entry = createEntry(name, space);
  table.push([{ content: entry, vAlign: 'center' }]);
});

const npx = `${chalk.red("npx")} ${package.name}`;
table.push([{ content: `\n${npx}\n`, hAlign: 'center', vAlign: 'center' }]);

console.log(table.toString());
