const User = require("../models").User;

module.exports = {
    new: function (req, res) {
        res.render("registrations/new");
    },
    create: async function (req, res) {
        try {
            let data = {
                email: req.body.email,
                password: req.body.password,
            };

            const user = await User.create(data);

            res.json({ user });
        } catch (err) {
            res.json({ err });
        }
    },
};
