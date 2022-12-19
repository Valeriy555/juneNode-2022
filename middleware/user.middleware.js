const {fileServices} = require("../services");
const ApiError = require("../error/custom.error");
module.exports = {

    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const usersDb = await fileServices.reader();

            const user = usersDb.find((u) => u.id === +userId); //ищем пользователя по id

            if (!user) {
                throw new ApiError(`User with id ${userId} not found`, 404);
            }

            req.users = usersDb;
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValid: async (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (age < 0 || Number.isNaN(+age)) {   // валидация age
                return res.status(400).json(`Wrong age`)
            }

            if (name.length < 2 || typeof name !== 'string') { // валидация name
                return res.status(400).json(`Wrong name`)
            }

            next();
        } catch (e) {
            next(e);
        }
    },

}