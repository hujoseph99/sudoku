import React from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import '../style/numberRow.css';

 /* NumberRow: component that is the row of numbers underneath the sudoku board.
  *            It is what the users use to enter numbers into the sudoku board.
  * props:
  *     handleClick: function that handles when the user clicks on the number row.
  *                  It changes the state of the Sudoku component (board) so that
  *                  the currently selected cell contains the number that thet user
  *                  pressed on (the one parameter).
  *     numCount: array of length 9 that holds the count of each number on the board.  For example,
  *         it will pass an array similar to [4, 5, 2, 1, 5, 2, 3, 5, 1].  This will show that there are
  *         four instances of the number "1" on the board.  Each is index represents the number 1 greater 
  *         itself since arrays start at 0 and we are trying to represent numbers from 1 to 9.
  */

class NumberRow extends React.Component {
  render() {
    let row = [];
    for (let i = 1; i <= 9; i++) {
      const curr = i.toString();
      row.push( 
        <div className="circle" onClick={() => this.props.handleClick(curr)} >
          <ProgressButton 
            value={i} 
            percent={Math.floor(this.props.numCount[i - 1] / 9 * 100)}
            
            key={80 + i} 
          />
        </div>
      );
    }

    return (
      <div className="numberRow">
        {row}
      </div>
    );
  }
}

/* ProgressButton: component that represents each number underneath the sudoku board.  It has a progress bar
 *  on the outside showing how many of that number have been put onto the board.
 *  props:
 *      value: the number that is stored in the button.
 *      onClick: a function that executes after the component is clicked.
 *      percent: the percentage full of the progress bar
 */

function ProgressButton(props) {
  return (
    <Progress
      theme={
        {
          error: {
            symbol: props.value,
            trailColor: 'rgb(240, 240, 240)',
            color: 'rgb(7, 76, 188)',
          },
          default: {
            symbol: props.value,
            trailColor: 'rgb(245, 245, 240)',
            color: 'rgb(7, 76, 188)',
        },
          active: {
            symbol: props.value,
            trailColor: 'rgb(245, 245, 240)',
            color: 'rgb(7, 76, 188)',
          },
          success: {
            symbol: props.value,
            trailColor: 'rgb(245, 245, 240)',
            color: 'rgb(0, 215, 0)',
          },
        }
      }
      type="circle"
      percent={props.percent}
      width={60}
      strokeWidth={12}
    />
  );
}

export default NumberRow;