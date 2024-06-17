#!/usr/bin/env node

const Table = require('cli-table3');
const info = require('./info');
const gradient = require('gradient-string');

const chars = {
  top: '═',
  'top-mid': '╤',
  'top-left': '╔',
  'top-right': '╗',
  bottom: '═',
  'bottom-mid': '╧',
  'bottom-left': '╚',
  'bottom-right': '╝',
  left: '║',
  'left-mid': '║',
  'mid-mid': '║',
  mid: ' ',
  right: '║',
  'right-mid': '║',
  'left-mid': '║',
  'mid-mid': '║',
  'right-mid': '║'
};

const colors = {
  green: '\x1b[38;5;185m',
  yellow: '\x1b[38;5;215m',
  red: '\x1b[38;5;204m',
  gray: '\x1b[2m',
  marine: '\x1b[38;5;39m',
  white: '\x1b[37m',
  cyan: '\x1b[96m',
  pink: '\x1b[38;5;219m',
  magenta: '\x1b[95m',
  blue: '\x1b[38;2;19;110;248m',
  teal: '\x1b[38;5;86m',
  bold: '\x1b[0;1m',
  reset: '\x1b[0m',
  linkedIn: '\x1b[38;5;75m'
};

let coloredChars = {};
let random;

const color = (text, color) => colors[color] + text + colors.reset;
const link = (link) => color(link, 'gray');
const repeat = (rep, times) => rep.repeat(times);
const randomColors = Object.keys(colors).filter((key) => key !== 'reset' && key !== 'gray');

const randomColor = (string) => {
  if (!random) random = Math.floor(Math.random() * randomColors.length);
  return color(string, randomColors[random]);
};

const createEntry = (name, space) => {
  const item = info.social[name];
  const coloredUser = item.color ? color(item.user, item.color) : item.user;
  return repeat(' ', 8) + color(name, 'bold') + repeat(' ', space) + link(item.url) + coloredUser + repeat(' ', 11);
};

Object.keys(chars).forEach((key) => {
  coloredChars[key] = randomColor(chars[key]);
});

currentRandom = undefined;
const table = new Table({ chars: coloredChars });
const name = `${info.name}`;

const work = color(
  color(`${info.occupation}`, 'bold'),
  'bold'
);

table.push([{ content: "", }]);
table.push([{ content: `${color(name.trim(), 'bold')}`, hAlign: 'center' }]);
table.push([{ content: `${work}`, hAlign: 'center' }]);

const content = Object.keys(info.social).map((name) => {
  const space = name.length > 6 ? 2 : name.length <= 3 ? 7 : 4;
  return createEntry(name, space);
});
table.push([{ content: content.join('\n'), vAlign: 'center' }]);

const randomGradients = Object.keys(gradient);
const randomGradient = randomGradients[Math.floor(Math.random() * randomGradients.length)]; 

const qr = gradient[randomGradient](`
█▀▀▀▀▀█  ▀▀█▄ █ ▄ █▀▀▀▀▀█
█ ███ █ ▄▀██ ▄█▄█ █ ███ █
█ ▀▀▀ █ ▀▄█ ▀█▄ █ █ ▀▀▀ █
▀▀▀▀▀▀▀ ▀▄▀ █ █▄▀ ▀▀▀▀▀▀▀
▀█ ▄▄█▀▀▄▀█ ▀▀▀█   ▄██▄▄ 
▀▀ ▄  ▀█▀▀▄█▀ ▀█▄▄▄█▀█ ▀█
█▄▀██▀▀▄█▀█ ▄▄ ▄▀▄▀█   ▄▀
█ █▀  ▀▀ ▀▀ ▄▀▀█▄▀██▀█▄▀█
▀ ▀ ▀ ▀ █▄  ▀█▀▀█▀▀▀█ ▀  
█▀▀▀▀▀█ █  ▄▀ ▄▄█ ▀ █   █
█ ███ █  █ ▀███████▀▀ ▀▄▄
█ ▀▀▀ █ ▄▄▀▄▄ ▀▄▄  ▄▄▀▀ █
▀▀▀▀▀▀▀ ▀▀▀▀  ▀ ▀▀▀  ▀  ▀
  `);
table.push([{ content: qr, hAlign: 'center', hAilgn: 'center' }]);

console.log(table.toString());
