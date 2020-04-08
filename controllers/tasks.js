const Task = require("../models").Task;

module.exports = {
    home: async function (req, res) {
        const tasks = await Task.findAll();

        res.render("tasks/index", { tasks: tasks });
    },
    create: async function (req, res) {
        try {
            const tasks = await Task.create(req.body);
            res.redirect("/tasks");
        } catch (er) {
            console.log(er);
            res.json({ err });
        }
    },
    new: function (req, res) {
        res.render("tasks/new");
    },
};
