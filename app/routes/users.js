const router = require("express").Router();

router.get('/', function(req, res) {
  res.send('Users home page');
});

router.get('/about', function(req, res) {
  res.send('About users');
});

module.exports = router;
