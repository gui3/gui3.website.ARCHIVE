
listen(window, "load", () => {

  let tttCells = [[],[],[]];

  //generic functions ------------------
  function message (text) {
    let messageBox = document.getElementById("tttMessages");
    messageBox.appendChild(
      document.createTextNode("\n" + text)
    );
    messageBox.scrollTop = messageBox.scrollHeight;
  }

  function getPlayerSymbol () {
    return "O";
  }

  //function play ----------------------
  function play (evnt) {
    let btn = event.target;
    let cell = tttCells[btn.x][btn.y];
    if (checkGameOver()) {
      resetGame();
    } else if (cell.state != "") {
      message("Cette cellule est déjà prise, finis la partie!")
    } else {
      cell.state = "O";
      btn.innerHTML = getPlayerSymbol();
      checkGameOver();
      botTurn();
      checkGameOver();
    }
  };

  function checkGameOver () {
    //check rows
    [0,1,2].forEach(row => {
      let consecutive = 0;
      let cursor = null;
      [0,1,2].forEach(x => {
        if (cursor == tttCells[x][row].state) {
          ++consecutive;
        }else {
          consecutive = 0;
        };
        cursor = tttCells[x][row].state;
        console.log(cursor + ":"+consecutive)
      })
      if (consecutive == 2 && cursor != "") winGame(cursor)
    });
  }

  function botTurn () {

  }

  function winGame (symbol) {
    console.log(symbol + "a gagne")
  }

  //getting the cells ------------------
  [0,1,2].forEach(x => {
    [0,1,2].forEach(y => {
      let btn = document.getElementById("ttt"+x+"."+y);
      btn.x = x;
      btn.y = y;
      btn.addEventListener("click", play);
      tttCells[x][y] = {
        button: btn,
        state: btn.innerHTML
      };
    });
  });
  console.log(tttCells);


})
