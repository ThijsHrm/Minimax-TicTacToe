  /* Initialize variables */
  var constrInput, resetInp, move, No, returnVal;
  var playField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var moveScore = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  /* Insert X/O */
  function insertMove(input, numberInput) {

    $(input).html("X");
    playField[numberInput - 1] = "X";
    $(input).attr("onclick", "");
    if (checkWin("X", playField)) {
      window.alert("You Win!");
      resetGame();
      return;
    }

    if (!countMoves()) {
      window.alert("Draw");
      resetGame();
      return;
    }
    
    makeScores(playField.slice(0,9), "O");
    move = makeDecision();
    $(move[0]).html("O");
    playField[move[1]] = "O";
    $(move[0]).attr("onclick", "");
    if (checkWin("O", playField)) {
      window.alert("You Lose!");
      resetGame();
    }
  }

  // Decision making algorithm 
  // The first function searches for empty spaces and
  // then calls the fillField function on each empty 
  // field to assess wether it's a good choice or not
  function makeScores(input,player) {
    for (var i = 0; i < 9; i++) {
        if (input[i] === 0) {
          input[i] = player;
          moveScore[i] = fillField(input.slice(0,9), player, 0);
          input[i] = 0;
        }
     }
    return;
  }

  // The second function is a recursive implementation of 
  // the minimax algorithm
function fillField(input, player) {
  player == "X" ? player = "O" : player = "X";
  var score = 0;
  for (var i = 0; i < 9; i++) {
    if (input[i] === 0) {
        input[i] = player;
        if (player == "X") {
              score += fillField(input.slice(0,9),"X");
          } else {
              score += fillField(input.slice(0,9),"O");
          }
          if (checkWin(player, input) && player == "X") {
            score -= 10;
          }
          if (checkWin(player, input) && player == "O") {
            score += 10;
          }
        input[i] = 0;
    }
  }
  return score;
}

// The third function assesses the scoreboard, chooses the 
// empty spot with the highest possible minimax score, and
// then clears the scoreboard and returns the best move
function makeDecision() {
    returnVal = moveScore.indexOf(Math.max.apply(null, moveScore));
    while (playField[returnVal] !== 0) {
      moveScore[returnVal] -=100000;
      returnVal = moveScore.indexOf(Math.max.apply(null, moveScore));
    }
    for (var e = 0; e < 9; e++) {
      moveScore[e] = 0;
    }
    constrInput = "#button" + (returnVal+1).toString();
    return [constrInput, returnVal];
}

  /* Just a function to count the moves left */
  function countMoves() {
    var output = 0;
    No = 0;
    while (No <= 8) {
      if (playField[No] === 0) {
        output += 1;
      }
      No++;
    }
    return output;
  }

  /* check if there's a winner */
  function checkWin(playChar, field) {
    No = 0;
    while (No <= 3) {
      if ((field[No] === playChar &&
          field[No + 3] === playChar &&
          field[No + 6] === playChar) ||
        (field[No] === playChar &&
          field[No + (4 - No)] === playChar &&
          field[No + (4 - No) + (4 - No)] === playChar)) {
        return true;
      }
      No++;
    }
    if ((field[0] === playChar && field[1] === playChar &&
        field[2] === playChar) || (field[6] === playChar &&
        field[7] === playChar && field[8] === playChar)) {
      return true;
    }
    return false;
  }

  /* RESET function */
  function resetGame() {
    No = 1;
    while (No <= 9) {
      resetInp = "#button" + No;
      $(resetInp).attr("onclick", 'insertMove("' +
        resetInp + '",' + No + ')');
      $(resetInp).html("");
      playField[No - 1] = 0;
      No++;
    }
    console.log(playField);
  }