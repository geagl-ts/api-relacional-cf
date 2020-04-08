const { Router } = require("express");

const router = Router();

const tasks = require("../controllers/tasks");

router.route("/tasks").get(tasks.home).post(tasks.create);

router.get("/tasks/new", tasks.new);

module.exports = router;
