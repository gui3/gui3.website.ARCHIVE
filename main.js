require('dotenv').config()

const EventEmitter = require('events')
class MainEmitter extends EventEmitter {}
const mainEventEmitter = new MainEmitter()

let main // the main app process

mainEventEmitter.on('reload' + process.env.MAIN_PASSWORD, function () {
  console.log('===============>RELOAD ATTEMPT')
  main.close()
  Object.keys(require.cache).forEach(function (key) { // clear cache
    if (!key.match(/node_modules/)) {
      delete require.cache[key]
      console.log('--> rebooting ' + key)
    }
  })
  main = require('./app/app')(mainEventEmitter)
  console.log('===============>RELOAD SUCCESS')
})

mainEventEmitter.on('reboot' + process.env.MAIN_PASSWORD, function () {
  console.log('===============>REBOOT - bye bye')
  main.close()
  process.exit(0)
})

main = require('./app/app')(mainEventEmitter)
