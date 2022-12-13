const express = require('express');

const userDb = require('./dataBase/users')

const app = express();


app.get('/users', (req, res) => {
    console.log('USERS ENDPOINT');

    res.json({user: 'Valera'})
});

app.get('/posts', (req, res) => {
    console.log('POSTS ENDPOINT');

    res.status(402).json('ITS OK');
});

app.get('/', (req, res) => {
    res.json('WELCOME');
});

// app.get('/file',(req, res) =>{        // редко используется
//     console.log('FILE ENDPOINT');
//
//     res.sendFile('./file.txt');
// });

app.get('/userDb', (req, res) => {
    console.log('UsersDb ENDPOINT');

    res.json(userDb)
});

app.get('/userDb/0', (req, res) => { // вызываем первого юзера
    res.json(userDb[0]);
});

app.get('/userDb/1', (req, res) => { // вызываем второго юзера
    res.json(userDb[1]);
});


app.listen(5000, () => {
    console.log('Server listen 5000');
});

