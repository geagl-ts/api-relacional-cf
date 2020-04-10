const Category = require("../models").Category;
const Task = require("../models").Task;

module.exports = {
    // Render Create
    renderCreate: function (req, res) {
        res.render("categories/new");
    },
    //Render Edit
    renderEdit: async function (req, res) {
        try {
            const category = await Category.findOne({
                where: { id: req.params.id },
            });

            res.render("categories/edit", { category });
        } catch (err) {
            JSON.parse(JSON.stringify(err));
            res.json(err);
        }
    },
    //CRUD
    // create
    create: async function (req, res) {
        try {
            await Category.create(req.body);
            res.redirect("/categories");
        } catch (err) {
            res.json({ error: err });
        }
    },
    // read
    read: async function (req, res) {
        try {
            const categories = await Category.findAll({
                include: [
                    {
                        model: Task,
                        as: "tasks",
                        where: {
                            userId: req.user.id,
                        },
                    },
                ],
            });

            res.render("categories/index", { categories: categories });
        } catch (err) {
            console.log(err);
            res.json({ error: err });
        }
    },
    // update
    update: async function (req, res) {
        try {
            await Category.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });

            res.redirect("/categories");
        } catch (err) {
            res.json({ error: err });
        }
    },
    // destroy
    destroy: async function (req, res) {
        try {
            await Category.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.redirect("/categories");
        } catch (err) {
            res.json({ error: err });
        }
    },
    // Especiales
    //Read One
    readOne: async function (req, res) {
        try {
            const category = await Category.findOne({
                where: { id: req.params.id },
            });

            res.render("categories/show", { category: category });
        } catch (err) {
            JSON.parse(JSON.stringify(err));
            res.json(err);
        }
    },
};
