const {fileServices} = require("../services");

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const usersDb = await fileServices.reader();

            res.json(usersDb)
        } catch (e) {
            next(e)
        }
    },


    getUserById: async (req, res, next) => { // вызываем юзеров динамично
        try {

            res.json(req.user)
        } catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const userInfo = req.body;

            const usersDb = await fileServices.reader();

            const newUser = {
                name: userInfo.name,
                age: userInfo.age,
                id: usersDb[usersDb.length - 1].id + 1
            };

            usersDb.push(newUser);

            await fileServices.writer(usersDb);

            res.status(201).json(newUser)
        } catch (e) {
            next(e);
        }

    },

    updateUserById: async (req, res, next) => {
        try {
            const {user, usersDb, body} = req;

            const index = usersDb.findIndex((u) => u.id === user.id)

            usersDb[index] = {...usersDb[index], ...body};

            await fileServices.writer(usersDb);

            res.status(201).json(usersDb[index]);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const usersDb = await fileServices.reader();

            const index = usersDb.findIndex((u) => u.id === +userId); //ищем пользователя по индексу

            if (index === -1) {
                return res.status(404).json(`User with id ${userId} not found`)
            }
            usersDb.splice(index, 1)

            await fileServices.writer(usersDb);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}