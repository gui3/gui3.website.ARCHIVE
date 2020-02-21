const bcrypt = require('bcrypt')
const eventEmitter = require('./mainEventEmitter')

function validAndSendToMain (pswd, evnt, next) {
  bcrypt.compare(pswd, process.env.ADMIN_HASH, (err, valid) => {
    if (err) next(err)
    if (valid) {
      console.log('INFO --> valid ' + evnt + ' password POSTed')
      eventEmitter.emit(evnt + process.env.MAIN_PASSWORD)
    } else {
      console.log('WARNING --> INVALID ' + evnt + ' password POSTed !')
    }
  })
}

module.exports = validAndSendToMain
