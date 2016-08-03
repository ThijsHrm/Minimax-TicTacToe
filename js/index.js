  // Initialize variables 
  var constrInput, resetInp, move, No, returnVal;
  var playField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var moveScore = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  // Insert X/O 
  function insertMove(input, numberInput) {
    //place player
    $(input).html("X");
    playField[numberInput - 1] = "X";
    $(input).attr("onclick", "");
    if (checkWin("X", playField)) {
      window.alert("You Win!");
      resetGame();
      return;
    }
    //check if there's no draw
    if (!countMoves()) {
      window.alert("Draw");
      resetGame();
      return;
    }
    //place opponent
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
          if (checkWin(player, input) && player == "O") {moveScore[i]+=1000000;}
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
          if (checkWin(player, input) && player == "X") {
              score -= 10;
              continue;
            }
          if (checkWin(player, input) && player == "O") {
              score += 10;
              continue;
            }
          if (player == "X") {
                score += fillField(input.slice(0,9),"X");
            } else {
                score += fillField(input.slice(0,9),"O");
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

  // Just a function to count the amount of moves left 
  function countMoves() {
    var output = 0;
    for (var i = 0; i <= 8; i++) {
      if (playField[i] === 0) {
        output += 1;
      }
    }
    return output;
  }

  // check if there's a winner 
  function checkWin(playChar, field) {
    for (var i = 0; i <= 3; i++) {
      if ((field[i] === playChar &&
          field[i + 3] === playChar &&
          field[i + 6] === playChar) ||
         (field[i] === playChar &&
          field[i + (4 - i)] === playChar &&
          field[i + (4 - i) + (4 - i)] === playChar)) {
        return true;
      }
    }
    if ((field[0] === playChar && field[1] === playChar &&
        field[2] === playChar) || (field[6] === playChar &&
        field[7] === playChar && field[8] === playChar)) {
      return true;
    }
    return false;
  }

  // RESET function
  function resetGame() {
    for (var i = 1; i<= 9; i++) {
      resetInp = "#button" + i;
      $(resetInp).attr("onclick", 'insertMove("' +
        resetInp + '",' + i + ')');
      $(resetInp).html("");
      playField[i - 1] = 0;
    }
  }
