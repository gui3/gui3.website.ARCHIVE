const mainEventEmitter = require('./mainEventEmitter')

module.exports = function (main) {
  console.log('===============>RELOAD ATTEMPT')
  main.close()
  Object.keys(require.cache).forEach(function (key) { // clear cache
    if (!key.match(/node_modules/)) {
      delete require.cache[key]
      console.log('--> rebooting ' + key)
    }
  })
  main = require('../app')
  console.log('===============>RELOAD SUCCESS')
}
