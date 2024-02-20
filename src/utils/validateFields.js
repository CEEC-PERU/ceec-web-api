const { validationResult } = require("express-validator");

exports.validateFields = function (req) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return { errors: errors.array() };
        return null;
    } catch (error) {
        console.log(error);
        return { error: error };
    }
};
