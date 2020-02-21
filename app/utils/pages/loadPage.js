const fs = require('fs')
const path = require('path')

const politext = require('./politext')

module.exports = function loadPage (page) {
  return new Promise((resolve) => {
    page.options = {}
    page.json.forEach(json => {
      const data = JSON.parse(
        fs.readFileSync(
          path.join('./app/views/pages/', json)
        )
      )
      Object.keys(data).forEach(key => {
        page.options[key] = data[key]
      })
    })
    page.lang = {}
    page.politext.forEach(file => {
      const lang = file.match(/\.(\w+)\.politext$/)[1]
      if (lang) {
        const data = String(fs.readFileSync(
          path.join('./app/views/pages/', file)
        ))
        page.lang[lang] = politext.parse(data)
        console.log(politext.parse(data))
      }
    })
    resolve(page)
  })
    .catch(err => {
      throw err
    })
}
