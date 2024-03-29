const User = require("../dataBase/User");
const oauthService = require("../service/oauth.service");
const emailService = require("../service/email.service");
const {FORGOT_PASS} = require("../config/email-action.enum");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            await emailService.sendEmail('valeragol0506@gmail.com', FORGOT_PASS);

            res.json(req.user);
        } catch (e) {
            next(e)
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            await User.findByIdAndUpdate(userId, newUserInfo);

            res.json('Updated')
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await oauthService.hashPassword(req.body.password);

            await User.create({ ...req.body, password: hashPassword });

            res.status(201).json('Ok')
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            await User.deleteOne({ _id: req.params.userId });

            res.status(204).send('Ok')
        } catch (e) {
            next(e);
        }
    }
}