const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()


const {userRouter, authRouter} = require("./router");

const configs = require('./config/config');
mongoose.set('strictQuery', false);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.json('WELCOME')
});


app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(configs.PORT, async () => {
    console.log(`Server listen ${configs.PORT}`);
    console.log(configs.MONGO_URL);
    await mongoose.connect(configs.MONGO_URL);
});


