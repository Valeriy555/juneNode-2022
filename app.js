const express = require('express');
const {fileServices} = require("./services");

const userRouter = require('./router/user.router')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/usersDb', userRouter)


app.listen(5000, () => {
    console.log('Server listen 5000');
});


