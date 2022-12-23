const express = require('express');
const mongoose = require
require('dotenv').config()

const userRouter = require('./router/user.router')
const configs = require('./config/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/usersDb', userRouter)

app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(configs.PORT, async () => {
    await mongoose.connect('mongodb://localhost:27017/june2022');
    console.log(`Server listen ${configs.PORT}`);
});


