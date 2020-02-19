module.exports = function (eventEmitter) {
  // Setup ---------------------------------------------------------------------
  const express = require('express')
  const app = express()

  const bodyParser = require('body-parser')
  // app.use(bodyParser.urlencoded({ extended: false }))
  // app.use(bodyParser.json())

  require('dotenv').config()

  // const models = require('./app/db/models') // models =======================

  // models.Post.create(
  //   {title:'test', content:'blablabla'},
  //   (err, post) => {
  //     if (err) {console.log(err)}
  //     else {console.log('post test créé !')}
  // });

  // view engine ===============================================================
  const path = require('path')
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))
  app.use(require('express-partials')())

  // static and favicon ========================================================
  app.use(express.static('app/public'))

  const favicon = require('serve-favicon')
  app.use(favicon(path.join(
    __dirname, 'public', 'favicon.ico'
  )))

  // RELOAD & REBOOT ===========================================================
  // const hash = require('./helpers/hash')
  const bcrypt = require('bcrypt')

  function validAndSendToMain (pswd, evnt, next) {
    bcrypt.compare(pswd, process.env.ADMIN_HASH, (err, valid) => {
      if (err) next(err)
      if (valid) {
        console.log('INFO --> valid ' + evnt + ' password POSTed')
        eventEmitter.emit(evnt + process.env.MAIN_PASSWORD)
      } else {
        console.log('WARNING --> INVALID ' + evnt + ' password POSTed !')
      }
    })
  }

  app.post(
    '/reload',
    bodyParser.json(),
    function (req, res, next) {
      if (req.body.pswd) {
        validAndSendToMain(req.body.pswd, 'reload', next)
      }
      res.redirect('/')
    }
  )

  app.post(
    '/reboot',
    bodyParser.json(),
    function (req, res, next) {
      if (req.body.pswd) {
        validAndSendToMain(req.body.pswd, 'reboot', next)
      }
      res.redirect('/')
    }
  )
  // ROUTES ====================================================================
  app.use('/', require('./routes/index'))

  // ERROR HANDLER =============================================================
  app.use(require('./middlewares/errorHandler'))

  // Listen ====================================================================
  const port = process.env.PORT || 3000
  return app.listen(port, () => {
    console.log('Server listening on port :' + port)
  })
}
