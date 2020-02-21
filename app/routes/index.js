const router = require('express').Router()

const pageOptions = require('../utils/pageOptions')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

const root = 'home' // set here the page to launch at address '/'

router.get('/', (req, res) => {
  res.render(
    'home',
    {
      page: pageOptions('home')
    }
  )
})




require('../utils/allPagesLoader')
  .then(pages => { // http responses ===========================================
    pages.forEach(page => {
      console.log(page.name + ' --> page loaded')

      const options = {
        shared: { // shared options for all the pages-------------------------
          links: ''
        },
        page: page // page options -------------------------------------------
      }

      router.get('/' + page.name, function (req, res) {
        res.render('pages/' + page.name, options)
      })
    })

    return pages
  })
  .then(pages => { // root =====================================================
    const rootPage = pages.filter(page => page.name === root)[0]
    const options = {
      shared: {
        pages: pages
      },
      page: rootPage
    }
    router.get('/', function (req, res) {
      res.render('pages/' + rootPage.name, options)
    })
    console.log('ROOT page set to -> ' + rootPage.name)
  })
  .then(_ => { // subdomains ===================================================
    /*
    const usersRoutes = require('./users')
    router.use('/users', usersRoutes)
    */
  })
  .then(_ => { // voluntary error ==============================================
    router.get('/error', function (req, res) {
      const err = new Error('YOU WANT TO SEE AN ERROR ? HERE IT IS')
      err.code = 'VOLUNTARY'
      throw err
    })
  })
  .catch(err => { // error handler =============================================
    throw err
  })

module.exports = router
