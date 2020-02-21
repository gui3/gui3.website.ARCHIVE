function parse (text) {
  const cut = text.split(/(:\w+>)/g)

  let current = ''
  const parsed = {}
  cut.forEach(section => {
    const match = section.match(/^:(\w+)>$/)
    if (match) {
      current = match[1]
    } else if (current && section) {
      parsed[current] = section.trim()
    }
  })

  return parsed
}

module.exports = {
  parse
}
