const {userServices} = require("../services");

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const usersDb = await userServices.findByParams();

            res.json(usersDb)
        } catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => { // вызываем юзеров динамично
        try {
            const user = await userServices.findByIdWithCars(req.user._id)

            res.json(user)
        } catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {

            const user = await userServices.create(req.body);

            res.status(201).json(user)
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {

        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            const user = await userServices.updateOne(userId, newUserInfo);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {

            await userServices.deleteOne(req.params.userId);

            res.status(204).send('Ok');
        } catch (e) {
            next(e);
        }
    }
}