
function toggleSidebar () {
  const sidebar = document.getElementById('sidebar')
  switch (sidebar.style.display) {
    case 'none':
      sidebar.style.display = 'flex'
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
