const EventEmitter = require('events')
class MainEmitter extends EventEmitter {}
const mainEventEmitter = new MainEmitter()

module.exports = mainEventEmitter
