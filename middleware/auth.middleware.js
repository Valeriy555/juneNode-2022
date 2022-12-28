const authValidator = require('../validators/auth.validator');
const ApiError = require("../error/custom.error");

module.exports = {

    isBodyValid: async (req, res, next) => {
        try {

            const validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }
            next()
        } catch (e) {
            next()
        }
    },

}