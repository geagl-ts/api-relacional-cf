const User = require("../models").User;

module.exports = async function (req, res, next) {
    if (!req.session.userId) return next();

    const user = await User.findByPk(req.session.userId);

    if (user) {
        req.user = user;
        next();
    }
};
