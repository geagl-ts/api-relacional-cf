const express = require("express");
const Sequelize = require("sequelize");

const app = express();

const tasks = require("./routes/tasks.routes");

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "pug");

app.use(tasks);

app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});
