const fs = require('fs')
const router = require('express').Router()

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

const root = 'home' // set here the page to launch at address '/'

new Promise((resolve, reject) => { // automated page loading ===================
  /*
   * creates a page for each .ejs found in the app/views/pages folder
   * and adds options if an optionnale .json file of the same name found
  */
  fs.readdir(
    './app/views/pages',
    (err, files) => {
      err ? reject(err) : resolve(files)
    }
  )
})
  .then(files => { // file parsing =============================================
    const pageLoaders = []
    files.forEach(file => {
      const fileName = file.replace(/.ejs$/, '')
      if (!fileName.includes('.')) { // exclude other files
        pageLoaders.push(new Promise((resolve, reject) => {
          const page = {}
          page.name = file.replace(/.ejs$/, '')
          // options.json ------------------------------------------------------
          fs.readFile(
            './app/views/pages/' + page.name + '.json',
            (err, data) => {
              if (!err) {
                page.options = JSON.parse(data)
                console.log(page.name + ' - options loaded')
                resolve(page)
              } else if (err && err.code === 'ENOENT') {
                console.log(
                  page.name + ' - .json not found - no options for this page'
                )
                page.options = {}
                resolve(page)
              } else { // error handler
                reject(err)
              }
            }
          )
        }))
      }
    })
    return Promise.all(pageLoaders)
  })
  .then(pages => { // http responses ===========================================
    pages.forEach(page => {
      console.log(page.name + ' --> page loaded')
      router.get('/' + page.name, function (req, res) {
        const options = {
          shared: { // shared options for all the pages-------------------------
            pages: pages
          },
          page: page.options // page options -----------------------------------
        }
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
      page: rootPage.options
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
  .then(_ => { // 404 page not found ===========================================
    const error404 = require('./404')
    router.use(error404)
    console.log('--> all pages ready')
  })
  .catch(err => { // error handler =============================================
    console.error(err)
  })

module.exports = router
