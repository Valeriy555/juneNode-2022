const {fileServices} = require("../services");
module.exports = {
    getAllUsers: async (req, res) => {
        console.log('UsersDb ENDPOINT');

        const usersDb = await fileServices.reader();

        res.json(usersDb)
    },


    getUserById: async (req, res) => { // вызываем юзеров динамично

        const {userId} = req.params

        const usersDb = await fileServices.reader();

        const user = usersDb.find((u) => u.id === +userId); //ищем пользователя по id

        if (!user) {
            return res.status(404).json(`User with id ${userId} not found`)
        }

        res.json(user)
    },

    postUser: async (req, res) => {

        const userInfo = req.body;

        if (userInfo.age < 0 || Number.isNaN(+userInfo.age)) {   // валидация age
            return res.status(400).json(`Wrong age`)
        }

        if (userInfo.name.length < 2 || typeof userInfo.name !== 'string') { // валидация name
            return res.status(400).json(`Wrong name`)
        }

        const usersDb = await fileServices.reader();

        const newUser = {
            name: userInfo.name,
            age: userInfo.age,
            id: usersDb[usersDb.length - 1].id + 1
        };

        usersDb.push(newUser);

        await fileServices.writer(usersDb);

        res.status(201).json(newUser)
    },

    updateUserById: async (req, res) => {
        const newUserInfo = req.body;
        const {userId} = req.params;

        const usersDb = await fileServices.reader();

        const index = usersDb.findIndex((u) => u.id === +userId); //ищем пользователя по индексу

        if (index === -1) {
            return res.status(404).json(`User with id ${userId} not found`)
        }
        usersDb[index] = {...usersDb[index], ...newUserInfo}

        await fileServices.writer(usersDb);

        res.status(201).json(usersDb[index])
    },

    deleteUserById: async (req, res) => {
        const {userId} = req.params;

        const usersDb = await fileServices.reader();

        const index = usersDb.findIndex((u) => u.id === +userId); //ищем пользователя по индексу

        if (index === -1) {
            return res.status(404).json(`User with id ${userId} not found`)
        }
        usersDb.splice(index, 1)

        await fileServices.writer(usersDb);

        res.sendStatus(204);
    }

}