const { Router } = require("express");

const router = Router();

const categories = require("../controllers/categories.controllers");
const auth_session = require("../middlewares/auth_session");

router.get("/categories/new", categories.renderCreate);
router.get("/categories/edit/:id", categories.renderEdit);

router
    .route("/categories")
    .get(auth_session, categories.read)
    .post(categories.create);

router
    .route("/categories/:id")
    .get(categories.readOne)
    .delete(categories.destroy)
    .put(categories.update);

module.exports = router;
