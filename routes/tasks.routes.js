const { Router } = require("express");

const router = Router();

const tasks = require("../controllers/tasks.controllers");

router.route("/tasks").get(tasks.home).post(tasks.create);

router.get("/tasks/new", tasks.new);

router.get("/tasks/edit/:id", tasks.edit);

router
    .route("/tasks/:id")
    .get(tasks.show)
    .put(tasks.update)
    .delete(tasks.destroy);

module.exports = router;
