const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const expSession = require("express-session");

const socketio = require("socket.io");

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

let server = app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});

let io = socketio(server);
let sockets = {};

let userCount = 0;

io.on("connection", function (socket) {
    //Manejo de usuarios en tiempo real
    const userId = socket.request._query.loggeduser;
    if (userId) sockets[userId] = socket;

    // Eventos en tiempo real
    userCount++;
    io.emit("count_updated", { count: userCount });

    socket.on("new_task", function (data) {
        if (data.userId) {
            let userSocket = sockets[data.userId];
            if (!userSocket) return;
            userSocket.emit("new_task", data);
        }
    });

    socket.on("disconnect", function () {
        Object.keys(sockets).forEach((userId) => {
            if (userId) {
                let s = sockets[userId];
                if (s.id == socket.id) sockets[userId] = null;
            }
        });

        userCount--;
        io.emit("count_updated", { count: userCount });
    });
});

const client = require("./realtime/client");
