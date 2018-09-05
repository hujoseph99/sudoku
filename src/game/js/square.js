import React from 'react';

 /* 
  * Square: component that represents each individual square (used in both board and
  *         number row)
  * props: 
  *     borders: 0 <= Int <= 4.  Represents what the borders should be like for the square.
  *     handleClick: function that handles the click.  The functionality changes 
  *                  depending on if the square is in the board or if the square is
  *                  in the number row.  Takes an integer representing which square
  *                  was pressed.
  *     isSelected: Bool, represents if the square is selected.
  *     isFunction: Bool, represents if the square is in the function row.
  *     inRange: Bool, represents if the square is in the same range as the selected square.
  *     isMistake: Bool, represents if the square has a value that results in a mistake.
  *     selectedRange: Boo, represents if the square is in the range of the selected square.
  *     value: Int, the value that is to be displayed in the square.
  *     notes: Array(0 .. 8) of Bool that represnts the notes of the current square
  * 
  *     key: Should be 0 - 80 for the squares in the board.
  *          81 - 89 for the number row.
  *          90 - 92 for function row.
  */

class Square extends React.Component {

  // getSquareClassName() gets the class name of the square based on various factors such as the position
  //    of the square on the board and its relation to the currently selceted cell on the board.
  getSquareClassName() {
    let className = "square";

    if (this.props.isMistake) {
      className += " mistake";
    } else if (this.props.isSelected) {
      className += " selected";
    } else if (this.props.inRange) {
      className += " selectedRange"
    }

    // 0 = normal 1px borders
    // 1 = thick border on the right
    // 2 = thick border on the bottom
    // 3 = thick bottom and right border
    if (this.props.borders === 1) {
      className += " thickRight";
    } else if (this.props.borders === 2) {
      className += " thickBottom";
    } else if (this.props.borders === 3) {
      className += " thickBottom thickRight";
    } 

    return className;
  }

  getSquareContent() {
    if (this.props.value) {
      return this.props.value;
    }
    let gridContents = [];
    for (let i = 0; i < this.props.notes.length; i++) {
      const number = this.props.notes[i] ? i + 1 : null;
      gridContents.push(
        <div className="miniSquare">
          {number}
        </div>
      );
    }

    return (
      <div className="miniGrid">
        {gridContents}
      </div>
    );
  }
  
  render() {
    return (
      <div className={this.getSquareClassName()} onClick={() => this.props.handleClick()}>
        <div className="inner">
          {this.getSquareContent()}
        </div>
      </div>
    );
  }
}

export default Square;