const User = require("../models").User;

module.exports = {
    new: function(req, res) {
        res.render("sessions/new");
    },
    create: async function(req, res) {
        try {
            const user = await User.login(req.body.email, req.body.password);

            if (user) {
                req.session.userId = user.id;
                res.json({ user });
            } else {
                res.json({ error: "Email y/o Contraseña incorrecta" });
            }
        } catch (err) {
            console.log(err);
            res.json({ err });
        }
    }
};
