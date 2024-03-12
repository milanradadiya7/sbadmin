const express = require("express");
const app = express();
var expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
const { route } = require("./router");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const nodemailer = require('nodemailer');
var cors = require('cors')

mongoose.connect("mongodb://localhost:27017/user", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(session({
    secret: "Milan",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7  // 1 week
    },
    store: new MongoDBStore({
        uri: "mongodb://localhost:27017/user",
        collection: "session"
    }),
    resave: true,
    saveUninitialized: true,
}));
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.set("view engine", "ejs");
app.set('layout', 'layout/layout');

//route
app.use("/", route);

app.listen(7878, (e) => {
    console.log("server is run");
});