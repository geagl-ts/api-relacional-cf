const { Router } = require("express");

const router = Router();

const registrations = require("../controllers/registrations.controllers");

router.get("/signup", registrations.new);

router.route("/users").post(registrations.create);

module.exports = router;
