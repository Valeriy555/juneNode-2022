const express = require('express');

const userDb = require('./dataBase/users')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


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

app.get('/userDb/:id', (req, res) => { // вызываем юзеров динамично
    console.log(req.params);
    console.log(req.query);

    const {id} = req.params;

    res.json(userDb[id]);
});

app.post('/userDb',(req, res) => {

    const userInfo = req.body;


    userDb.push(userInfo)

    res.status(201).json('Created')
})

app.put('/userDb/:id', (req,res) => {
    const newUserInfo = req.body;
    const userId = req.params.id;

    userDb[userId]=newUserInfo;

    res.json('Updated')
})

app.listen(5000, () => {
    console.log('Server listen 5000');
});

