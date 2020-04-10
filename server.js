const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const expSession = require("express-session");

const app = express();

const tasks = require("./routes/tasks.routes");
const registrations = require("./routes/registrations.routes");
const sessions = require("./routes/sessions.routes");
const categories = require("./routes/categories.routes");

const findUserMiddleware = require("./middlewares/find_user");
const authUserMiddleware = require("./middlewares/auth_user");

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

app.set("view engine", "pug");

app.use(
    expSession({
        secret: [
            "dnoasn5345431doapsbdipweyf",
            "KHJSDFBQIUdbasi43242duySdhaPBSDIUBASD",
        ],
        saveUninitialized: false,
        resave: false,
    })
);

app.use(findUserMiddleware);
app.use(authUserMiddleware);

app.use(tasks);
app.use(registrations);
app.use(sessions);
app.use(categories);

app.get("/", function (req, res) {
    if (!req.session.userId) return res.redirect("/sessions");

    res.render("home", { user: req.user });
});

app.get("*", function (req, res) {
    res.redirect("/sessions");
});

app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});
