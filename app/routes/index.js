const router = require("express").Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  // res.send('main home page');
  res.render("home");
});
router.get('/about', function(req, res) {
  // res.send('About');
  res.render("about")
});

const usersRoutes = require("./users")
router.use("/users",usersRoutes)

module.exports = router;
