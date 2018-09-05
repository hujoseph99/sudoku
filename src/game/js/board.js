import React from 'react';
import Square from './square.js';
import { findErrors } from './checkWin.js';

 /* 
  * Board: component that is the board of the sudoku game.
  * props: 
  *     handleClick: function to handle clicks on the board.  Changes the state
  *                 (selectedCell) to the square that the user pressed.
  *     selectedCell: 0 <= Int <= 80
  *     board: Array(0 .. 80) of Chars that represents the current state of the board.
  *     notes: Array(0 .. 80) of Array(0 .. 8) of Bool that represents the notes of the current board
  *     origBoard: Array(1 .. 81) of Chars that represents the beginning state of the board.
  */
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCell: 13,
    };
  }

  // getBorderNum(currIndex, borderBottom) calculates the border type number based on
  //   current row index (0 .. 8) and whether there should be a bottom border.
  // getBorderNum: Nat Bool -> Nat
  getBorderNum(currIndex, borderBottom) {

    // 0 = normal 1px borders
    // 1 = thick border on the right
    // 2 = thick border on the bottom
    // 3 = thick bottom and right border
    let borders = 0;
    if (currIndex === 8 && borderBottom) {
      borders = 2;
    } else if (currIndex === 8) {
      borders = 0;
    } else if (borderBottom && (currIndex + 1) % 3 === 0) {
      borders = 3;
    } else if (borderBottom) {
      borders = 2;
    } else if ((currIndex + 1) % 3 === 0) {
      borders = 1;
    }

    return borders;
  }

  // checkSelectionRange(currIndex) checks if the current square marked by currIndex is
  //    in the range of the selected square (stored in state).
  // currIndex: Int -> Bool
  checkInSelectionRange(currIndex) {
    const curr = this.props.selectedCell;
    // Uncomment below for highlighting everything within same box (and the else if conditon)
    // const rowCurrIndex = Math.floor(currIndex / 9);   
    // const colCurrIndex = currIndex % 9;
    // const rowCurr = Math.floor(curr / 9);
    // const colCurr = curr % 9;

    if (currIndex !== curr && curr !== null) {
      if ((currIndex % 9 === curr % 9) || (Math.floor(currIndex / 9) === Math.floor(curr / 9))) {
        return true;
      // } else if (Math.floor(rowCurrIndex / 3) === Math.floor(rowCurr / 3) &&
      //           (Math.floor(colCurrIndex / 3) === Math.floor(colCurr / 3))) {
      //   return true;
      }
    }
    return false;
  }

  

  // renderRow(rowNum, borderBottom, mistakesArray) renders each row given a row number, rowNum, and 
  //    whether the row should have a thicker bottom border, borderBottom.
  // renderRow: Int Bool -> Component
  renderRow(rowNum, borderBottom, mistakesArray) {
    let row = [];
    let borders;
    let isSelected;
    const selectedNumber = this.props.board[this.props.selectedCell];

    
    // making the array of square components.
    for (let i = 0; i < 9; i++) {
      const currSquareNum = rowNum * 9 + i;
      const currSquareVal = this.props.board[currSquareNum];
      const isMistake = mistakesArray.includes(currSquareNum);

      borders = this.getBorderNum(i, borderBottom);
      isSelected = (selectedNumber && selectedNumber === currSquareVal) || (this.props.selectedCell === currSquareNum) ? true : false;

      row.push(
        <Square 
          value={this.props.board[currSquareNum]} 
          key={currSquareNum} 
          borders={borders}
          isSelected={isSelected} 
          handleClick={() => this.props.handleClick(currSquareNum)} 
          inRange={this.checkInSelectionRange(currSquareNum)} 
          isMistake={isMistake}
          notes={this.props.notes[currSquareNum]}
        />
      );
    }

    return (
      <div className="boardRow">
        {row}
      </div>
    );
  }

  // renderBoard(mistakesArray) renders the whole board.
  // renderBoard:     -> Component
  renderBoard(mistakesArray) {
    let board = [];
    for (let i = 0; i < 9; i++) {
      if ((i + 1) % 3 === 0 && i !== 9) {
        board.push(this.renderRow(i, true, mistakesArray));
      } else {
        board.push(this.renderRow(i, false, mistakesArray));
      }
    }

    return (
      <div className="board">
        {board}
      </div>
    );
  }

  // render() renders the entire component.
  render() {
    let mistakesArray = findErrors(this.props.board);
    return this.renderBoard(mistakesArray);
  }
}

export default Board;