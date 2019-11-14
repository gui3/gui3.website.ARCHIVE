// Setup
var express = require('express');
var app = express();

require('dotenv').config();

const models = require("./app/db/models")

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));
app.use(require("express-partials")());

// Routes
// app.get("/", (req, res) => {
//    res.render('index');
// });
const routes = require("./app/routes/index");
app.use('/', routes);

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})
