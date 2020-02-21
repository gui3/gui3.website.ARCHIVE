function error404 (req, res, next) {
  res.status(404)

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', {
      url: req.url,
      layout: 'layouts/bare'
    })
    return
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Page not Found' })
    return
  }

  // default to plain-text. send()
  res.type('txt').send('ERROR - Page not found')
}

module.exports = error404
