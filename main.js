require('dotenv').config()

const mainEventEmitter = require('./app/utils/mainEventEmitter')
const reload = require('./app/utils/reload')
const reboot = require('./app/utils/reboot')

let main // the main app process

mainEventEmitter.on(
  'reboot' + process.env.MAIN_PASSWORD,
  function () {
    reboot(main)
  }
)

mainEventEmitter.on(
  'reload' + process.env.MAIN_PASSWORD,
  function () {
    reload(main)
  }
)

main = require('./app/app')
