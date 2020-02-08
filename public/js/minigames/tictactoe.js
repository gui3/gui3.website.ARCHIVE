
listen(window, 'load', () => {
  const tttCells = [[], [], []]
  let over = false;

  // generic functions ------------------
  function message (text) {
    const messageBox = document.getElementById('tttMessages')
    clearElement(messageBox)
    messageBox.appendChild(
      document.createTextNode(text)
    )
    //messageBox.scrollTop = messageBox.scrollHeight
  }

  function getPlayerSymbol (player) {
    const symbol = player === 1 ? 'O' : 'X'
    return symbol
  }

  // function play ----------------------
  function play (evnt) {
    message('partie en cours...')
    const btn = evnt.target
    const cell = tttCells[btn.x][btn.y]
    if (over) {
      resetGame()
    } else if (cell.state !== '') {
      message('Cette cellule est déjà prise !')
    } else {
      setCell(cell, getPlayerSymbol(1))
      over = checkGameOver()
      if (!over) {
        botTurn()
        over = checkGameOver()
      } else {
        over = true
      }
    }
  }

  function resetGame () {
    over = false
    tttCells.forEach(col => {
      col.forEach(cell => {
        setCell(cell, '')
        cell.button.style.color = ''
      })
    })
  }

  function setCell (cell, symbol) {
    cell.state = symbol
    cell.button.innerHTML = symbol
  }

  function getAllLines () {
    const results = []
    const diagUp = []
    const diagDown = [];
    [0, 1, 2].forEach(num => {
      // check rows -----------
      results.push([
        tttCells[0][num],
        tttCells[1][num],
        tttCells[2][num]])
      // check columns --------
      results.push([
        tttCells[num][0],
        tttCells[num][1],
        tttCells[num][2]])
      // check diags ----------
      diagUp.push(tttCells[num][num])
      diagDown.push(tttCells[num][2 - num])
    })
    results.push(diagUp)
    results.push(diagDown)

    return results
  }

  function checkGameOver () {
    const lines = getAllLines()
    let over = true
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line[0].state === '' ||
          line[1].state === '' ||
          line[2].state === '') {
        over = false
      } else {
        if (line[0].state === line[1].state &&
            line[0].state === line[2].state) {
          winGame(line)
          return true
        }
      }
    }
    if (over) {
      message('Partie terminée, cliquez une case pour recommencer')
      return true
    } else return false
  }

  function botTurn () { // AI playing --------------
    const cells = []
    const lines = getAllLines()
    lines.forEach(line => {
      line.forEach(cell => {
        cell.score = [0, 2].includes(cell.x) && [0, 2].includes(cell.y)
          ? 5
          : cell.x === 1 && cell.y === 1
            ? 2
            : 0
        cells.push(cell)
      })
    })

    function getLineScore (line) {
      let botCount = 0
      let playerCount = 0
      line.forEach(cell => {
        switch (cell.state) {
          case getPlayerSymbol(2):
            botCount++
            break
          case getPlayerSymbol(1):
            playerCount++
            break
        }
      })
      const scoreGrid = [
        [2, -2, 20, 0], // ..., X.., XX., XXX
        [5, 0, 0],      // ..O, OX., OXX
        [30, 0],        // .OO, XOO
        [0]             // OOO
      ]
      line.score = scoreGrid[botCount][playerCount]

      line.forEach(cell => {
        if (cell.state === '') cell.score += line.score
        // console.log(cell)
      })
    }

    lines.forEach(getLineScore)
    let bestScore
    cells.forEach(cell => {
      if (cell.state === '' && (bestScore === undefined || cell.score > bestScore)) {
        bestScore = cell.score
      }
    })

    console.log(cells)
    console.log(bestScore)
    const bestCells = cells.filter(c => c.score === bestScore && c.state === '')
    console.log(bestCells)
    const bestCell = bestCells[Math.floor(Math.random() * bestCells.length)]
    setCell(bestCell, getPlayerSymbol(2))
  }

  function winGame (line) {
    const text = 'les ' + line[0].state +
      ' ont gagné ! \ncliquez une case pour rejouer'
    message(text)
    line.forEach(cell => {
      cell.button.style.color = '#d22'
    })
    /*
    setTimeout(_ => {
      alert(text)
    }, 500)
    */
  };

  // getting the cells ------------------
  [0, 1, 2].forEach(x => {
    [0, 1, 2].forEach(y => {
      const btn = document.getElementById('ttt' + x + '.' + y)
      btn.x = x
      btn.y = y
      btn.addEventListener('click', play)
      const cell = {
        button: btn,
        state: ''
      }
      setCell(
        cell,
        btn.innerHTML === 'O'
          ? getPlayerSymbol(1)
          : btn.innerHTML
            ? getPlayerSymbol(2)
            : '')
      tttCells[x][y] = cell
    })
  })
  console.log(tttCells)
})
