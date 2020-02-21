const router = require('express').Router()
const bodyParser = require('body-parser')

const validAndSendToMain = require('../utils/validAndSendToMain')

router.post(
  '/reload',
  bodyParser.json(),
  function (req, res, next) {
    if (req.body.pswd) {
      validAndSendToMain(req.body.pswd, 'reload', next)
    }
    res.redirect('/')
  }
)

router.post(
  '/reboot',
  bodyParser.json(),
  function (req, res, next) {
    if (req.body.pswd) {
      validAndSendToMain(req.body.pswd, 'reboot', next)
    }
    res.redirect('/')
  }
)

module.exports = router
