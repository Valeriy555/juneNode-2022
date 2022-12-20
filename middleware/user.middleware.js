const {fileServices} = require("../services");
const ApiError = require("../error/custom.error");
module.exports = {

    checkIsUserExist: async (req, res, next) => {  // проверяем существует ли пользователь
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

    isBodyValidCreate: async (req, res, next) => {  // проверяем на валидность данные пользователя
        try {
            const {name, age} = req.body;

            if (!age||age < 0 || Number.isNaN(+age)) {   // валидация age

                throw new ApiError(`Wrong age`, 400);
            }

            if (!name||name.length < 2 || typeof name !== 'string') { // валидация name

                throw new ApiError(`Wrong name`, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValidUpdate: async (req, res, next) => {  // проверяем на валидность данные пользователя
        try {
            const {name, age} = req.body;

            if (age && (age < 0 || Number.isNaN(+age))) {   // валидация age

                throw new ApiError(`Wrong age`, 400);
            }

            if (name &&( name.length < 2 || typeof name !== 'string')) { // валидация name

                throw new ApiError(`Wrong name`, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isIdValid: async (req, res, next) => {  // проверяем на валидность ID пользователя
        try {
            const {userId} = req.params;

            if (userId < 0 || Number.isNaN(+userId)) {   // валидация ID
                throw new ApiError(`Not valid ID`, 400);
            }


            next();
        } catch (e) {
            next(e);
        }
    },

}