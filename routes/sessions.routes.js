const { Router } = require("express");

const router = Router();

const sessions = require("../controllers/sessions.controllers");

router
    .route("/sessions")
    .get(sessions.new)
    .post(sessions.create)
    .delete(sessions.destroy);

module.exports = router;
