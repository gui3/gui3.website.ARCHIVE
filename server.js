// Setup
var express = require('express');
var app = express();

require('dotenv').config();

const models = require("./app/db/models")

// models.Post.create(
//   {title:"test", content:"blablabla"},
//   (err, post) => {
//     if (err) {console.log(err)}
//     else {console.log("post test créé !")}
// });


const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));
app.use(require("express-partials")());

app.use(express.static('public'));

// Routes
// app.get("/", (req, res) => {
//    res.render('index');
// });
const routes = require("./app/routes/index");
app.use('/', routes);

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server listening on port :' + port);
});
