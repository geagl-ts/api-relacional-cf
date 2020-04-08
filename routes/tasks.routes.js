const { Router } = require("express");

const router = Router();

const tasks = require("../controllers/tasks");

router.route("/tasks").get(tasks.home).post(tasks.create);

module.exports = router;
