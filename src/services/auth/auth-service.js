const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env.js");
const User = require("../../models/userModel.js");
const { handleFailedLoginAttempt, resetFailedLoginAttempts } = require("../../utils/limitAttempts.js");

exports.authService = async function({ email, password }) {
    try {
        const userFound = await User.findOne({ where: { email } });
        if (!userFound)
            return { code: 401, msg: "Usuario ó Contraseña inválida" };

        if (userFound.is_blocked) {
            return { code: 401, msg: 'Cuenta bloqueada' };
        }

        const matchPassword = await User.comparePassword(
            password,
            userFound.password
        );

        if (!matchPassword) {
            await handleFailedLoginAttempt(userFound);
            let attemptsRestant = 5 - userFound.failed_login_attempts;
            return { code: 401, msg: "Usuario ó Contraseña inválida", possibleAttemps: attemptsRestant };
        }

        await resetFailedLoginAttempts(userFound);

        const token = jwt.sign(
            {
                id: userFound.user_id,
                role: userFound.role_id,
                email: userFound.email,
                client_id: userFound.client_id,
                loginTime: new Date()
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return { token };

    } catch (error) {
        console.log(error);
    }
};
