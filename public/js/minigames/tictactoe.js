
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
    const btn = evnt.target
    const cell = tttCells[btn.x][btn.y]
    if (over) {
      resetGame()
    } else if (cell.state !== '') {
      message('Cette cellule est déjà prise !')
    } else {
      setCell(cell, getPlayerSymbol(1))
      if (!checkGameOver()) {
        botTurn()
        checkGameOver()
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
    if (over) return true
    else return false
  }

  function botTurn () { // AI playing --------------
    const cells = []
    const lines = getAllLines()
    lines.forEach(line => {
      line.forEach(cell => {
        cell.score = 0
        cells.push(cell)
      })
    })

    function getLineScore (line) {
      line.score = 0
      line.forEach(cell => {
        if (cell.state === 0) {
          line.score + 2
        } else if (cell.state === getPlayerSymbol(2)) {
          line.score += 5
        } else {
          line.score -= 2
        }
      })
      line.forEach(cell => {
        if (cell.state === '') cell.score += line.score
        // console.log(cell)
      })
    }

    lines.forEach(getLineScore)
    const bestLine = lines.reduce((a, b) => a.score > b.score ? a : b)
    const bestCell = bestLine.reduce((a, b) => a.score > b.score ? a : b)

    console.log(bestCell)
    setCell(bestCell, getPlayerSymbol(2))
  }

  function winGame (line) {
    const text = 'les ' + line[0].state +
      ' ont gagné ! \ncliquez pour rejouer'
    message(text)
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
