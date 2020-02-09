
function toggleSidebar () {
  const sidebar = document.getElementById('sidebar')
  switch (sidebar.style.display) {
    case 'none':
      sidebar.style.display = ''
      break
    default:
      sidebar.style.display = 'none'
  }
}

function listen (elem, evnt, func) {
  if (elem.addEventListener) { // W3C DOM
    elem.addEventListener(evnt, func, false)
  } else if (elem.attachEvent) { // IE DOM
    var r = elem.attachEvent('on' + evnt, func)
    return r
  } else console.log('I\'m sorry Dave, I\'m afraid I can\'t do that.')
}

function clearElement (elemt) {
  while (elemt.firstChild) {
    elemt.removeChild(elemt.firstChild)
  }
}

function removeElement (arg) {
  let elemt
  if (arg.appendChild) {
    elemt = arg
  } else {
    elemt = document.querySelector(arg)
  }
  elemt.parentNode.removeChild(elemt)
}

const flashMessage = (function () {
  let flashCount = 0

  return function (type, text) {
    const flash = document.createElement('p')
    flash.classList.add('flash', type)
    flashCount++
    const flashId = 'flashClient' + flashCount
    flash.id = flashId
    flash.appendChild(document.createTextNode(text))
    const button = document.createElement('button')
    listen(button, 'click', function () {
      removeElement('#' + flashId)
    })
    button.appendChild(document.createTextNode('X'))
    flash.appendChild(button)

    document.getElementById('flashes').appendChild(flash)
  }
})()
