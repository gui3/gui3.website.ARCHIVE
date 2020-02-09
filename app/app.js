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

  app.use(express.static('app/public'))

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
      /*
      res.locals.flashes = [{
        class: 'info',
        text: 'server successfully semi-rebooted'
      }]
      */
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
  const routes = require('./routes/index')
  app.use('/', routes)

  // ERROR HANDLER =============================================================
  app.use(function (err, req, res, next) {
    if (err.code !== 'VOLUNTARY') console.error(err.stack)

    function textErrorPage (handlerError, originalError) {
      // in case there is NO RENDERER
      // this is my last resooort ...
      res.status(500)
        .type('text')
        .send(
          '\n\n' +
          '**************************************\n' +
          'OUPS ???? j ai cru voir une grosse erreur ...\n' +
          'Si vous voyez ce message, ' +
          'merci de me prevenir a cette addresse :\n' +
          'guillaume.silvent@hotmail.fr\n' +
            '**************************************\n\n' +
          'ERROR HANDLING AN ERROR --------------------\n\n' +
          handlerError.stack +
          '\n\nORIGINAL ERROR -----------------------------\n\n' +
          originalError.stack
        )
    }

    try { // rendered error page -----------------------------------------------
      res.status(500)
      res.render(
        'ERROR',
        {
          err: err,
          layout: 'layoutBare'
        },
        function (e, html) {
          if (e) { // renderer not working 1 -----------------------------------
            textErrorPage(e, err)
          } else { // renderer working -----------------------------------------
            res.send(html)
          }
        }
      )
    } catch (e) { // renderer not working 2 ------------------------------------
      textErrorPage(e, err)
    }
  })

  // Listen ====================================================================
  const port = process.env.PORT || 3000
  return app.listen(port, () => {
    console.log('Server listening on port :' + port)
  })
}
