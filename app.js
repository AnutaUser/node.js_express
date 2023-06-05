//  EVENTS
// const event = require('node:events');
//
// const eventEmitter = new event();
//
// eventEmitter.on('click', () => {
//     console.log('click');
// });
//
// eventEmitter.emit('click');
// eventEmitter.emit('click');
// eventEmitter.emit('click');
//
// console.log(eventEmitter.eventNames());
// eventEmitter.once('clickAndDie', (data) => {
//     console.log(data);
//     console.log('clickAndDie');
// });
// console.log(eventEmitter.eventNames());
//
// eventEmitter.emit('clickAndDie', {data: 'hello world'});
//
// console.log(eventEmitter.eventNames());

// STREAM
// const fs = require('node:fs');
// const path = require('node:path');
//
// const readStream = fs.createReadStream('text1.txt', {highWaterMark: 128 * 1024});
// const writeStream = fs.createWriteStream('text2.txt');
//
// // readStream.on('data', (chunk) => {
// //     writeStream.write(chunk);
// // });
//
// readStream
//     .on('error', (err) => {
//         console.log(err);
//         readStream.destroy();
//         writeStream.end('ERROR on reading file🤔')
//     })
//     .pipe(writeStream);

// 4 kind of streams: read, write, duplex, transform.
// const zlib = require('node:zlib'); // duplex

// EXPRESS
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 3003;

const users = [
    {
        name: 'Olia',
        age: 25,
        status: true
    },
    {
        name: 'Petro',
        age: 10,
        status: false
    },
    {
        name: 'Ira',
        age: 16,
        status: false
    },
    {
        name: 'Ivan',
        age: 32,
        status: true
    }
];
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    res.status(200).json(users[id]);
});

app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const userForUpdate = req.body;
    users[id] = userForUpdate;
    res.status(200).json(userForUpdate);
});

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    users.splice(id, 1);
    res.sendStatus(204);
})

app.listen(PORT, () => {
    console.log(`Started on PORT: ${PORT}`);
});
