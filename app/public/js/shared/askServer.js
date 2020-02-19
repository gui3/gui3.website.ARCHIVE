
const askServer = (function setupCooldown () {
  const coolDown = 5000
  let lastClick = Date.now() - coolDown

  function startCoolDown () {
    lastClick = Date.now()
  }
  function checkCoolDown () {
    const notOver = Date.now() - lastClick < coolDown
    if (notOver) alert('stop spamming the server !')
    return !notOver
  }

  return function askServer (code) {
    if (checkCoolDown()) {
      startCoolDown()

      const password = prompt('please give the PASSWORD')
      if (password) {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', '/' + code, true)
        xhr.setRequestHeader(
          'Content-Type',
          'application/json'
        )
        xhr.send(JSON.stringify({
          pswd: password
        }))
        console.log(code + ' request send')
      }
    }
  }
})()
