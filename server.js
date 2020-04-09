const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const Sequelize = require("sequelize");

const app = express();

const tasks = require("./routes/tasks.routes");
const registrations = require("./routes/registrations.routes");
const sessions = require("./routes/sessions.routes");

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

app.set("view engine", "pug");

app.use(tasks);
app.use(registrations);
app.use(sessions);

app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});
