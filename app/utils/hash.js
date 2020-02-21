const bcrypt = require('bcrypt')

function hash (string) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(process.env.SALT_ROUNDS, (err, salt) => {
      if (err) reject(err)
      bcrypt.hash(string, salt, (err, hash) => {
        if (err) {
          reject(err)
        } else {
          resolve(hash)
        }
      })
    })
  })
}

module.exports = hash
