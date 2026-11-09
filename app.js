require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const app = express();

mongoose.connect(process.env.MONGO_URI);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.SESSION_MONGO_URI,
        collectionName: "sessions"
    })
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.message = req.session.message || "";
    req.session.message = "";
    next();
});

//Főoldal és User router:
app.use("/", require("./routes/userRouter"));
//Üzenetek:
app.use("/contact", require("./routes/contactRouter"));
app.use("/messages", require("./routes/messageRouter"));
//Crud:
app.use("/crud/inventions", require("./routes/crud/inventionRouter"));
app.use("/crud/inventors", require("./routes/crud/inventorRouter"));
//Csak olvasható Db:
app.use("/show", require("./routes/databaseReader"));
//Diagramok:
app.use("/api/diagrams", require("./routes/diagram/diagramApiRouter"));
app.use("/diagrams", require("./routes/diagram/diagramRouter"));

const port = 3000;
app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});