const cache = (function () {
  const cached = {}
  let ttlInterval = 1000

  function set (key, value, ttl = 0) {
    cached[key] = {
      val: value,
      exp: ttl === 0 ? 0 : Date.now + ttl
    }
    return new Promise(resolve => resolve(value))
  }

  function get (key) {
    return new Promise(resolve => resolve(cached[key].val || null))
  }

  function setTtlInterval (ms) {
    ttlInterval = ms
  }

  function checkTtl () {
    const now = Date.now()
    Object.keys(cached)
      .filter(data => now > data.exp)
      .forEach(expKey => {
        delete cached[expKey]
      })
    setTimeout(checkTtl, ttlInterval)
  }
  setTimeout(checkTtl, ttlInterval)

  return {
    get,
    set,
    setTtlInterval
  }
})()

module.exports = cache
