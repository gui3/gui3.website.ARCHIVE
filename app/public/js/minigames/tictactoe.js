
listen(window, 'load', () => {
  const tttCells = [[], [], []] // a grid with all cells
  let over = false // true if game is full or winned

  // GENERIC functions =========================================================
  function message (text) {
    // displays a message in the bottom div of the game
    const messageBox = document.getElementById('tttMessages')
    clearElement(messageBox)
    messageBox.appendChild(
      document.createTextNode(text)
    )
    // messageBox.scrollTop = messageBox.scrollHeight
  }

  function getPlayerSymbol (player) {
    // returns the player's symbol
    const symbol = player === 1 ? 'O' : 'X'
    return symbol
  }

  function setCell (cell, symbol) {
    // sets the state of a cell and its symbol
    cell.state = symbol
    clearElement(cell.button)
    cell.button.appendChild(
      document.createTextNode(symbol)
    )
  }

  function resetGame () {
    // resets the grid to empty cells
    over = false
    tttCells.forEach(col => {
      col.forEach(cell => {
        setCell(cell, '')
        cell.button.style.color = ''
      })
    })
  }

  function getAllLines () {
    // scans the grid and returns an array
    // with all the possible lines
    // (rows, columns and diagonals)
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
    // checks if game is won
    // OR if all cells are full
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
      message('Partie terminée, \ncliquez une case pour recommencer')
      return true
    } else return false
  }

  function winGame (line) {
    // when game is won by any player
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

  // AI function for bot playing ===============================================
  function botTurn () {
    // gives a score of interest to each cell
    // according to the state of the line it is in
    // then select a random cell between those
    // who have the highest score
    const cells = []
    const lines = getAllLines()

    lines.forEach(line => {
      line.forEach(cell => {
        cell.score = [0, 2].includes(cell.x) && [0, 2].includes(cell.y)
          ? 5 // a bonus to cells in the corners
          : cell.x === 1 && cell.y === 1
            ? 2 // a little bonus to the cell in the middle
            : 0 // no bonus to other cells
        cells.push(cell)
      })
    })

    function getLineScore (line) {
      // calculate the interest of playing inside a line
      let botCount = 0 // counts the
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
      const scoreGrid = [ // interrest according to the lines schema :
        [2, -2, 20, 0], // ..., O.., OO., OOO
        [5, 0, 0],      // ..X, .OX, OOX
        [30, 0],        // .XX, OXX
        [0]             // XXX
      ]
      line.score = scoreGrid[botCount][playerCount]
      // the interrest of the line

      line.forEach(cell => {
        if (cell.state === '') cell.score += line.score
        // each cell of the line get the line score as a bonus/malus
      })
    }

    lines.forEach(getLineScore)
    let bestScore
    cells.forEach(cell => {
      if (cell.state === '' && (bestScore === undefined || cell.score > bestScore)) {
        bestScore = cell.score
        // finding the best score
        // there must be a more efficient way of doing that
      }
    })

    const bestCells = cells.filter(c => c.score === bestScore && c.state === '')
    const bestCell = bestCells[Math.floor(Math.random() * bestCells.length)]
    // if multiple cells have the best score,
    // pick one randomly
    setCell(bestCell, getPlayerSymbol(2)) // the bot plays
  }

  // function PLAY =============================================================
  function play (evnt) {
    // the main function
    // called on button click
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

  // Setting up the Game =======================================================
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
  // game ready
})
