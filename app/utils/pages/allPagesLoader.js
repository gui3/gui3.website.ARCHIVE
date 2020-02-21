const fs = require('fs')

const loadPage = require('./loadPage')

module.exports = new Promise((resolve, reject) => {
  // automated page loading ====================================================
  /*
   * creates a page for each .hbs found in the app/views/pages folder
   * and adds options if an optionnal .json file of the same name found
  */
  fs.readdir(
    './app/views/pages',
    (err, files) => {
      if (err) {
        reject(err)
      }
      const pageLoaders = []

      const data = {
        politext: [],
        json: [],
        hbs: [],
        other: []
      }

      files.forEach(file => {
        if (file.match(/\.politext$/)) {
          data.politext.push(file)
        } else if (file.match(/\.json$/)) {
          data.json.push(file)
        } else if (file.match(/\.hbs$/)) {
          data.hbs.push(file)
        } else {
          data.other.push(file)
        }
      })

      data.hbs.forEach(template => {
        const page = {}
        page.name = template.replace(/\.hbs$/, '')
        page.file = template

        const pageRegex = new RegExp('^' + page.name)
        page.politext = data.politext.filter(f => f.match(pageRegex))
        page.json = data.json.filter(f => f.match(pageRegex))

        pageLoaders.push(loadPage(page))
      })
      resolve(Promise.all(pageLoaders))
    }
  )
})
