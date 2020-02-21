const mainEventEmitter = require('./mainEventEmitter')

module.exports = function (main) {
  console.log('===============>REBOOT - bye bye')
  main.close()
  process.exit(0)
}
