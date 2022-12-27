const {userServices, carServices} = require("../services");

module.exports = {

    getAllCars: async (req, res, next) => {
        try {
            const cars = await carServices.findByParams();

            res.json(cars)
        } catch (e) {
            next(e)
        }
    },

    getCarById: async (req, res, next) => { // вызываем юзеров динамично
        try {
            const {carId} = req.params;

            const car = await carServices.findOneByWithUser(carId);

            res.json(car)
        } catch (e) {
            next(e)
        }
    },

    createCar: async (req, res, next) => {
        try {

            const car = await carServices.create(req.body);

            res.status(201).json(car)
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {

        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            const user = await userServices.updateOne(userId, newUserInfo);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteCarById: async (req, res, next) => {
        try {

            await userServices.deleteOne(req.params.userId);

            res.status(204).send('Ok');
        } catch (e) {
            next(e);
        }
    }
}