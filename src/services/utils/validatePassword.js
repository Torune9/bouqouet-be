const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const encryptPassword = (password) => bcrypt.hashSync(password, salt);

const decryptPassword = async (password, hash) => await bcrypt.compare(password, hash);

module.exports = { encryptPassword, decryptPassword };
