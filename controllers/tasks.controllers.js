const Task = require("../models").Task;

module.exports = {
    home: async function (req, res) {
        const tasks = await Task.findAll();

        res.render("tasks/index", { tasks: tasks });
    },
    show: async function (req, res) {
        const task = await Task.findByPk(req.params.id);
        res.render("tasks/show", { task });
    },
    create: async function (req, res) {
        try {
            await Task.create(req.body);
            res.redirect("/tasks");
        } catch (er) {
            console.log(er);
            res.json({ err });
        }
    },
    update: async function (req, res) {
        try {
            console.log(req.params.id);
            await Task.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.redirect(`/tasks/${req.params.id}`);
        } catch (err) {
            res.json({ err });
        }
    },
    new: function (req, res) {
        res.render("tasks/new");
    },
    edit: async function (req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            res.render("tasks/edit", { task });
        } catch (err) {
            res.json({ err });
        }
    },
    destroy: async function (req, res) {
        try {
            await Task.destroy({
                where: {
                    id: req.params.id,
                },
            });

            res.redirect("/tasks");
        } catch (err) {
            res.json({ err });
        }
    },
};
