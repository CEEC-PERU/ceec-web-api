const { validateFields } = require("../../utils/validateFields.js");
const { authService } = require("../../services/auth/auth-service.js");

exports.authUser = async function(req, res) {
    try {
        const { email, password } = req.body;
        const result = await authService({ email, password });

        if (result.code === 401)
            return res.status(401).json({ msg: result.msg, possibleAttemps: result.possibleAttemps });

        const errorFields = validateFields(req);

        if (errorFields)
            return res.status(400).json(errorFields);

        return res.status(200).json({ token: result.token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server internal error' });
    }
};
