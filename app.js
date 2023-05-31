// MODULES
// const { sayHello } = require('./helper/sayHello.helper');
//
// sayHello();

// GLOBAL VARIABLES
// console.log('from app.js');
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());
//  cwd - current working directory

// PATH
// const path = require('path');
//
// console.log(path.join('folder', 'folder2', 'text.txt'));
// console.log(path.join(__dirname, 'folder', 'folder2', 'text.txt'));
// console.log(path.join(process.cwd(), 'folder', 'folder2', 'text.txt'));
// console.log(path.normalize('//folder/folder2// text.txt'));
// console.log(path.resolve('folder', 'folder2', 'text.txt'));

// OS
// const os = require('os');
//
// // console.log(os.cpus());
// console.log(os.cpus().length);
// console.log(os.arch());
// console.log(os.type());
// console.log(os.hostname());
// console.log(os.totalmem());
// console.log(os.uptime());
// console.log(os.version());
//
// const { exec } = require('child_process');
// console.log(exec);

// FS
const fs = require('fs');
const path = require('path');

const text2Path = path.join(__dirname, 'folder', 'folder2', 'text2.txt');

// fs.writeFile(path.join(__dirname, 'folder', 'folder2', 'text.json'), 'Hello from Okten', (err) => {
//     if (err) throw new Error(err.message);
// });

// fs.writeFile(text2Path, 'My name is Harry Potter', (err) => {
//     if (err) throw new Error(err.message);
// });

// fs.readFile(text2Path, {encoding: 'utf-8'}, (err, data) => {
//     if (err) throw new Error(err.message);
//     console.log(data);
// });

// fs.appendFile(text2Path, '\nMy name is Tom Readle', (err) => {
//     if (err) throw new Error(err.message);
// });

// fs.truncate(text2Path, (err) => {
//     if (err) throw new Error(err.message);
// });

// fs.unlink(text2Path, (err) => {
//     if (err) throw new Error(err.message);
// });

