const mongo = require("./connection")

var models = {
  Post: require("./models/posts")
}

module.exports = models
