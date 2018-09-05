import React from 'react';
import TextBox from './textBox.js';
import '../style/header.css';

/* 
 * Header is the component that renders the header of the sudoku game.  It will gave a button that starts
 * a new game on the left and a hover button on the right side that gives instructions on how to play
 * the game.
 * props:
 *    restartGame: a function that redirects the page to the main menu, thus restarting the game.
 *    handleOpenHelpModal: a function that handles the opening of the help modal
 *    handleCloseHelpModal: a function that handles the closing of the help modal
 *    helpModalOpen: a boolean value that determines if the help modal should be open
 *    handleSolveClick: a function that handles when the solve button is clicked.
 *    handleHintClick: a function that handles when the hint button is clicked.
 *    handleAllNotesClick: a function that handles when the all notes button is clicked.
 */

export default function Header(props) {
  const text = (
    <div>
      <h1>Sudoku</h1>
      <h3>About</h3>
      <p>Sudoku is a logic-based number placement puzzle.  The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 boxes that compose the grid contains all of the digits from 1 to 9.</p>
      <h3>Controls</h3>
      <p>You can either use mouse to manually click the buttons and the board, or you can also use keyboard controls.  R - undo, T - Redo, Y - Erase, U - Toggle Notes.  Arrow keys to control the selection and number keys to enter numbers.</p>
      <h3>Extra Help</h3>
      <div className="buttonRow">
        <button className="button" onClick={() => props.handleSolveClick()}>Solve</button> 
        <button className="button" onClick={() => props.handleHintClick()}>Hint</button>
        <button className="button" onClick={() => props.handleAllNotesClick()}>All Notes</button>
      </div>
    </div>
  );

  return (
    <div className="header">
      <button className="newGameButton" onClick={() => props.restartGame()}>
        &lt;New Game&gt;
      </button>
      <img 
        src={require('../../images/help.png')}  
        alt="help" 
        className='helpButton' 
        onClick={() => props.handleOpenHelpModal()} />
      <TextBox 
        text={text}
        boxWidth='50%'
        boxHeight='70%'
        modalOpen={props.helpModalOpen}
        handleCloseModal={() => props.handleCloseHelpModal()}
      />
    </div>
  )
}