// gameboard module
const gameboard = (function(){
  const cells = Array.from(document.querySelectorAll(".cell"));
  let board = ["","","",
               "","","",
               "","",""];

  // function to render the board
  function render(){
    cells.forEach( function(cell, index) {
          cell.textContent = board[index];
    });
  }


  // add event listeners on each cell
  cells.forEach(function(cell,index){
    cell.addEventListener("click", ()=>{

        // add player marker to board
        board[index] = game.currentplayer.marker;
        render();

        // remove event listener from cell
        cell.style.pointerEvents = "none";
        game.remainingSpots--;

        //check winner
        game.checkWinner();

        // next turn
        if(game.winnerDeclared === false){
          if (game.remainingSpots > 0) {
            game.nextTurn();
          } else{
            alert("it a tie!")
            game.resetGame();
          }
        }

    })
  })

  return {
    board,
    render
  }

})();

// gameboard.render()

// create player factory
const createPlayer = function(name, marker){
  return {
    name,
    marker
  }
}

// game module
const game = (function(){
  // create players
  let playerOne = createPlayer("star","x");
  let playerTwo = createPlayer("jin", "o");

  // set starting point
  let currentplayer = playerOne;
  let winnerDeclared = false;
  let remainingSpots = 9;

  // winning conditions
  const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
      ];

  // checkwinner function
   function checkWinner() {
        winningAxes.forEach((item, index) => { // [0, 1, 2, 3, 4, 5, 6, 7]
            if (gameboard.board[item[0]] === this.currentplayer.marker && gameboard.board[item[1]] === this.currentplayer.marker && gameboard.board[item[2]] === this.currentplayer.marker) {
                console.log('winner!');
                alert(`${this.currentplayer.name} wins!`);
                this.winnerDeclared = true;
                resetGame();
            }
        })
    }

  // next player
  function nextTurn(){
    if (this.currentplayer === playerOne) {
      this.currentplayer = playerTwo;
    } else{
      this.currentplayer = playerOne;
    }
  }

  // reset the game
  function resetGame(){
    this.currentplayer = playerOne;
    this.winnerDeclared = false;
    this.remainingSpots = 9;
    gameboard.board.forEach( function(elm,index, arr) {
      arr[index] = "";
    });
    gameboard.render();
  }


  return {
    currentplayer,
    winnerDeclared,
    remainingSpots,
    nextTurn,
    checkWinner,
    resetGame
  }

})();





