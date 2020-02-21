// Setup ---------------------------------------------------------------------
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// const models = require('./app/db/models') // models =======================

// models.Post.create(
//   {title:'test', content:'blablabla'},
//   (err, post) => {
//     if (err) {console.log(err)}
//     else {console.log('post test créé !')}
// });

// view engine ===============================================================
const path = require('path')
/*
const handlebars = require('express-handlebars')

app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/components'),
  defaultLayout: 'index',
  extname: 'hbs'
}))
*/
const hbs = require('hbs')
hbs.registerPartials(path.join(__dirname, '/views/components'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.set('view options', { layout: 'layouts/index' })
// app.use(require('express-partials')())

// static and favicon ========================================================
app.use(express.static('app/public'))

const favicon = require('serve-favicon')
app.use(favicon(path.join(
  __dirname, 'public', 'favicon.ico'
)))

// Messages to MAIN ==========================================================
// const hash = require('./helpers/hash')
app.use(require('./middlewares/toMain'))

// ROUTES ====================================================================
app.use('/', require('./routes/index'))

// 404 and 500 errors ========================================================
app.use(require('./middlewares/error404'))
app.use(require('./middlewares/error500'))

// Listen ====================================================================
const port = process.env.PORT || 3000

module.exports = app.listen(port, () => {
  console.log('Server listening on port :' + port)
})
