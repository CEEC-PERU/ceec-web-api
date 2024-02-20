const bcrypt = require('bcrypt');

exports.encryptPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log(hash);
        return hash;
    } catch (error) {
        console.log(error);
    }
};
