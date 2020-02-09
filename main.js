let main

function boot () {
  // Setup ---------------------------------------------------------------------
  var express = require('express')
  var app = express()

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
  app.set('views', path.join(__dirname, 'app/views'))
  app.use(require('express-partials')())

  app.use(express.static('public'))

  // reboot route ==============================================================
  app.get('/reboot:' + process.env.ADMIN_PASSWORD, function (req, res) {
    main.close()
    Object.keys(require.cache).forEach(function (key) { // clear cache
      delete require.cache[key]
    })
    main = boot()
    req.flashes = [{
      class: 'info',
      text: 'server successfully semi-rebooted'
    }]
    res.redirect('/')
  })

  // ROUTES ====================================================================
  const routes = require('./app/routes/index')
  app.use('/', routes)

  // ERROR HANDLER =============================================================
  app.use(function (err, req, res, next) {
    console.error(err.stack)

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

main = boot()
