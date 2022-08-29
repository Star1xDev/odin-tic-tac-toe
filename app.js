
//---------- gameboard module -------------//

const gameboard = (function(){
  const cellss = document.querySelectorAll(".cell");
  const cells = Array.from(document.querySelectorAll(".cell"));
  let board = ["","","",
               "","","",
               "","",""];

  // function to render the board
  function render(){
    console.log("in render");

    cells.forEach( function(cell, index) {

          // cell.textContent = board[index];
          if (board[index] === "x") {
            cell.classList.add("showx");
          }
          if (board[index] === "o") {
            cell.classList.add("showo");
          }

    });
  }


  // add event listeners on each cell
  cells.forEach(function(cell,index){
    cell.addEventListener("click", ()=>{
        // console.log(game.currentplayer.name);

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


//----------- create player factory---------//

const playerFactory = function(name, marker){
  return {
    name,
    marker
  }
}


//-------------- game module --------------//

const game = (function(){

  // function start game
  function startGame(){
    const startBtn = document.querySelector(".start")
    const gameboard = document.querySelector(".gameboard");
    startBtn.addEventListener("click", ()=>{

      if (!gameboard.classList.contains("show")) {
        gameboard.classList.add("show");
      }
    })
  }
  startGame();

  // create players
  let playerOne = playerFactory("playerone", "x");
  let playerTwo = playerFactory("playertwo", "o");


  function updatePlayers(){
    const saveBtns = document.querySelectorAll(".save");
    const playerOneInput = document.getElementById("playerone");
    const playerTwoInput = document.getElementById("playertwo");
    saveBtns[0].addEventListener("click", ()=>{
        console.log("updating playerone");
        // game.playerOne = playerFactory(playerOneInput.value,"x");
        let playerone = playerFactory(playerOneInput.value,"x");
        game.setPlayerOne(playerone)
        playerOneInput.value = "";
        console.log(game.playerOne);
        console.log(game.currentplayer);

    })
    saveBtns[1].addEventListener("click", ()=>{
        console.log("updating playerone");
        // game.playerTwo = playerFactory(playerTwoInput.value,"o");
        let playertwo = playerFactory(playerTwoInput.value,"o");
        game.setPlayerTwo(playertwo);
        playerTwoInput.value = "";
        console.log(game.playerTwo);

    })
  }

  updatePlayers();

  // function to set players
  function setPlayerOne(playerone){
    this.playerOne = playerone;
    this.currentplayer = playerone;
  }
  function setPlayerTwo(playertwo){
    this.playerTwo = playertwo;
  }

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
        winningAxes.forEach((item, index) => {
            // [0, 1, 2, 3, 4, 5, 6, 7]
            if (gameboard.board[item[0]] === this.currentplayer.marker && gameboard.board[item[1]] === this.currentplayer.marker && gameboard.board[item[2]] === this.currentplayer.marker) {
                console.log('winner!');
                alert(`${this.currentplayer.name} wins!`);
                this.winnerDeclared = true;
                this.resetGame();
            }
        })

    }

  // next player
  function nextTurn(){
    if (this.currentplayer === this.playerOne) {
      this.currentplayer = this.playerTwo;
    } else{
      this.currentplayer = this.playerOne;
    }
  }

  // reset the game
  function resetGame(){
    this.currentplayer = playerOne;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.winnerDeclared = false;
    this.remainingSpots = 9;
    const cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach( function(cell) {
      cell.style.pointerEvents = "auto";
    });
    gameboard.board.forEach( function(elm,index, arr) {
      arr[index] = "";
    });
    gameboard.render();
    console.log("after reset");
    console.log(game.playerOne);
    console.log(game.playerTwo);
    console.log(game.currentplayer);
  }


  return {
    currentplayer,
    winnerDeclared,
    remainingSpots,
    nextTurn,
    checkWinner,
    resetGame,
    playerOne,
    playerTwo,
    setPlayerOne,
    setPlayerTwo
  }

})();


console.log("in start");
console.log(game.playerOne);
console.log(game.playerTwo);
const cell = document.querySelector(".cell");
console.log(cell);
console.log(cell.firstElementChild);

