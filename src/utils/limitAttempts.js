exports.handleFailedLoginAttempt = async function (user) {
    try {
        await user.update({
            failed_login_attempts: user.failed_login_attempts + 1,
            last_failed_login: new Date()
        });

        if (user.failed_login_attempts >= 5) {
            await user.update({ is_blocked: true });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.resetFailedLoginAttempts = async function (user) {
    try {
        await user.update({
            failed_login_attempts: 0,
            last_failed_login: null
        });
    } catch (error) {
        console.log(error);
    }
};
