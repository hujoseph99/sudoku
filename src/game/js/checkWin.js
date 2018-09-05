
//    This file is meant to hold the functions which check to see the progress of the player.  It holds
//    functions that check to see if they had made any errors or to see if they have won.


// assert(condition, message) is a custom assert function that mimics the behaviour of the assert function
//    found in C.  If the condition is false, it throws an error.  If it is true, nothing happens.

function assert(condition, message) {
  if (!condition) {
    message = message || "Asssertion failed";
    if (typeof Error !== "undefined") {
      throw new Error(message);
    }
    throw message;
  }
}


// checkRow(currIndex, board) takes the currIndex and the board as arguments and then checks the row that
//    contains currIndex to see if it has any numbers that are the same as the value in currIndex.  Returns
//    true if there is a mistake and returns false if there isn't.
// requires: 0 <= currIndex <= 80 and board is a valid sudoku board (array of length 81)
// checkRow: Int ArrayOf(Int) --> Bool

function checkRow(currIndex, board) {
  assert(0 <= currIndex && currIndex <= 80 && board.length === 81);
  const rowStart = Math.floor(currIndex / 9) * 9;
  const currVal = board[currIndex];

  if (!currVal) {
    return false;
  } 

  for (let i = rowStart; i < rowStart + 9; i++) {
    if (i !== currIndex && board[i] === currVal) {
      return true;
    }
  }
  return false;
}

// checkCol(currIndex, board) takes the currIndex and the board as arguments and then checks the column
//    that contains currIndex to see if it has any numbers that are the same as the value in currIndex.
//    Returns true if there is a mistake and returns false if there isn't.
// requires: 0 <= currIndex <= 80 and board is a valid sudoku board (array of length 81)
// checkCol: Int ArrayOf(Int) --> Bool

function checkCol(currIndex, board) {
  assert(0 <= currIndex && currIndex <= 80 && board.length === 81);
  const colStart = (currIndex % 9);
  const currVal = board[currIndex];

  if (!currVal) {
    return false;
  }
  
  let currChecking;
  for (let i = 0; i < 9; i++) {
    currChecking = i * 9 + colStart;
    if (currChecking !== currIndex && board[currChecking] === currVal) {
      return true;
    }
  }
  return false;

}

// checkBox(currIndex, board) takes the currIndex and the board as arguments and then checks the box
//    that contains currIndex to see if it has any numbers that are the same as the value in currIndex.
//    In this case, the box is the 9 squares in a single box in a sudoku game.  Returns true if there 
//    is a mistake and returns false if there isn't.
// requires: 0 <= currIndex <= 80 and board is a valid sudoku board (array of length 81)
// checkBox: Int ArrayOf(Int) --> Bool
function checkBox(currIndex, board) {
  assert(0 <= currIndex && currIndex <= 80 && board.length === 81);
  const currVal = board[currIndex];
  const topRight = (Math.floor(currIndex / 27) * 27) + (Math.floor((currIndex % 9) / 3) * 3);

  if (!currVal) {
    return false;
  }

  let currChecking;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      currChecking = topRight + j + (i * 9);
      if (currChecking !== currIndex && currVal === board[currChecking]) {
        return true;
      }
    }
  }
  return false;
}


// findErrors(board) looks for the errors in the board and the returns the indices of the squares that are
//    wrong in the form: [1, 4, 7] where 1, 4, and 7 are indices that are wrong
// requires: board is a valid sudoku board (array of length 81)
// findError: ArrayOf(Int) --> ArrayOf(Int)
export function findErrors(board) {
  assert(board.length === 81);
  let mistakeArray = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] && (checkCol(i, board) || checkRow(i, board) || checkBox(i, board))) {
      mistakeArray.push(i);
    }
  }

  return mistakeArray;
}

export function checkWin(board) {
  assert(board.length === 81);
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      return false;
    }
  }
  if (findErrors(board).length === 0) {
    return true;
  } else {
    return false;
  }
}