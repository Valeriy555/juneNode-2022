const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()


const {userRouter, carRouter} = require("./router");
const authRouter = require('./router/auth.router')
const configs = require('./configs/configs');
mongoose.set('strictQuery', false);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/usersDb', userRouter)
app.use('/cars', carRouter)
app.use('/auth', authRouter)


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


