import Board from './board.js';
import NumberRow from './numberRow.js';
import FunctionRow from './functionRow.js';
import React from 'react';
import TextBox from './textBox.js';
import Header from './header.js';
import '../style/game.css';
import '../style/squares.css';
import { checkWin, findErrors } from './checkWin.js';

// Sudoku: The container for the whole sudoku game.
// props: 
//   numStart: an Integer betweeon 17 and 81 that specifies the number of open boxes that should be given to
//        the user.
//   restartGame: a function that handles the event where the game will restart.  It will redirect the game
//        back to the main menu where they can choose to play again.

class Game extends React.Component {
  // state:
  //    board: Array of int (81 long)
  //    selectedCell: Nat, 1 <= selectedCell <= 81
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        board: Array(81).fill(null),
        notes: Array(81).fill(Array(9).fill(false)),
      }],
      numCount: Array(9).fill(0),
      selectedCell: null,
      currStep: 0,
      winModalOpen: false,
      helpModalOpen: false,
      notesSelected: false,
    };

    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.handleNumberRowClick = this.handleNumberRowClick.bind(this);
    this.handleUndoClick = this.handleUndoClick.bind(this);
    this.handleRedoClick = this.handleRedoClick.bind(this);
    this.handleEraseClick = this.handleEraseClick.bind(this);
    this.handleOpenWinModal = this.handleOpenWinModal.bind(this);
    this.handleCloseWinModal = this.handleCloseWinModal.bind(this);
    this.convertStringToBoard = this.convertStringToBoard.bind(this);
    this.convertBoardToString = this.convertBoardToString.bind(this);
    this.handleSolveClick = this.handleSolveClick.bind(this);
    this.handleHintClick = this.handleHintClick.bind(this);
    this.handleNotesClick = this.handleNotesClick.bind(this);
    this.handleAllNotesClick = this.handleAllNotesClick.bind(this);
    this.handleOpenHelpModal = this.handleOpenHelpModal.bind(this);
    this.handleCloseHelpModal = this.handleCloseHelpModal.bind(this);
  }

  // ******************************************************************************************** //
  // ******************************************************************************************** //
  //                           SET UP BOARD FUNCTIONS                                             //
  // ******************************************************************************************** //
  // ******************************************************************************************** //

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  // convertStringToBoard(givenString) converts a sudoku puzzle given by the sudoku.js, givenBoard, into a
  //    board that the user will use to solve.  This is the completely stock board.  
  convertStringToBoard(givenString) {
    let board = Array(81).fill(null);

    console.log(givenString)
    for (let i = 0; i < givenString.length; i++) {
      if (givenString[i] !== ".") {
        board[i] = (givenString[i]);
      }
    }
    return board;
  }

  // convertBoardToString(givenBoard) takes a board and converts it into a string usable by the sudoku.js 
  //  library.
  convertBoardToString(givenBoard) {
    let board = "";

    for (let i = 0; i < givenBoard.length; i++) {
      if (givenBoard[i]) {
        board += givenBoard[i];
      } else {
        board += ".";
      }
    }

    return board;
  }

  // componentWillMount() is executed when the game is about to start.  It handles the creation of the 
  // puzzle that the user will attempt to solve.
  componentWillMount() {
    const numStart = this.props.numStart; // Number of fixed numbers the board will start with
    let board = this.state.history[0].board;
    let boardString = window.sudoku.generate(81); // Generating a random SOLVED board from sudoku API
    let arrOfNum = Array.from(Array(81).keys()); // generate array: [0, 1, .., 80]
    let numCount;
    arrOfNum = this.shuffle(arrOfNum); // shuffling array to randomize contents
    
    for (let i = 0; i < boardString.length; i++) { // Converting board to string
      board[i] = boardString[i];
    }

    for (let i = 0; i < 81 - numStart; i++) { // removing random numbers from SOLVED board to make it unsolved
      board[arrOfNum[i]] = null;
    }

    numCount = this.countNums(board);

    this.setState({
      history: [{
        board: board,
        notes: Array(81).fill(Array(9).fill(false)),
      }],
      numCount: numCount,
    })
  }

  // componentDidMount() is executed after the component is rendered.  In this case, it is being used to
  //    autofocus onto the div so that the user can start with key presses as soon as the game renders instead
  //    of having to first click onto the board before starting.
  componentDidMount() {
    this.focus.focus();
  }

  // ******************************************************************************************** //
  // ******************************************************************************************** //
  //                                    HANDLE BOARD CLICKS                                       //
  // ******************************************************************************************** //
  // ******************************************************************************************** //

  // handleBoardClick(i) takes an integer, i, between 1 and 81 which represents where
  //    on the board the user pressed.  This will highlight the current selected cell
  //    yellow.  See renderRow function in board.js to see how it is being used.
  handleBoardClick(i) {
    this.setState({
      selectedCell: i,
    });
  }

  // handleBoardKeyPress(e) handles when some keys are pressed on the board.  It handles when numbers are 
  //  pressed, and a select few letters.
  handleBoardKeyPress(e) {
    if (!this.state.helpModalOpen && !this.state.winModalOpen) {
      if (49 <= e.charCode && e.charCode <= 57) {
        this.handleNumberRowClick((e.charCode - 48).toString());
        // undo
      } else if (e.key === "r") {
        this.handleUndoClick();
        // redo
      } else if (e.key === "t") {
        this.handleRedoClick();
        // erase/delete
      } else if (e.key === "y") {
        this.handleEraseClick();
        // notes
      } else if (e.key === "u") {
        this.handleNotesClick();
      }
    }
  }

  handleBoardKeyDown(e) {
    if (!this.state.helpModalOpen && !this.state.winModalOpen) {
      if (37 <= e.keyCode && e.keyCode <= 40) {
        e.preventDefault();
        if (this.state.selectedCell !== 0 && !this.state.selectedCell) {
          this.setState({
            selectedCell: 40,
          });
          // up arrow key press
        } else if (e.keyCode === 38 && (this.state.selectedCell >= 9)) {
          this.setState({
            selectedCell: this.state.selectedCell - 9,
          });
          // right arrow key press
        } else if (e.keyCode === 39 && (this.state.selectedCell % 9 !== 8)) {
          this.setState({
            selectedCell: this.state.selectedCell + 1,
          });
          // down arrow key press
        } else if (e.keyCode === 40 && (this.state.selectedCell <= 71)) {
          this.setState({
            selectedCell: this.state.selectedCell + 9
          });
          // left arrow key press
        } else if (e.keyCode === 37 && (this.state.selectedCell % 9 !== 0)) {
          this.setState({
            selectedCell: this.state.selectedCell - 1,
          });
        }
      }
      console.log(this.state.selectedCell);
    }
  }

  // ******************************************************************************************** //
  // ******************************************************************************************** //
  //                           HANDLE HEADER MODAL CLICKS                                         //
  // ******************************************************************************************** //
  // ******************************************************************************************** //

  // handleOpenWinModal() renders the modal to display the win page.
  handleOpenWinModal() {
    this.setState({
      winModalOpen: true,
    })
  }

  // handleCloseWinModal() closes the win page.
  handleCloseWinModal() {
    this.setState({
      winModalOpen: false,
    })
  }

  // handleOpenHelpModal() opens the help page
  handleOpenHelpModal() {
    this.setState({
      helpModalOpen: true,
    })
  }

  // handleOpenHelpModal() closes the help page
  handleCloseHelpModal() {
    this.setState({
      helpModalOpen: false,
    })
  }

  // handleSolveClick() will solve the board for the user.
  handleSolveClick() {
    const history = this.state.history.slice(0, this.state.currStep + 1);
    const currBoard = this.state.history[this.state.currStep].board.slice();
    const currNotes = JSON.parse(JSON.stringify(this.state.history[this.state.currStep].notes.slice()));
    const startingBoard = this.state.history[0].board.slice();

    // handling case when there are errors on the board
    const errorArray = findErrors(currBoard);

    for (let i = 0; i < errorArray.length; i++) {
      if (!startingBoard[errorArray[i]]) {
        currBoard[errorArray[i]] = null;
      }
    }

    const boardString = this.convertBoardToString(currBoard);
    const solvedString = window.sudoku.solve(boardString);
    if (!solvedString) {
      alert("There is no possible solution for the current board.");
      return;
    }
    const solvedBoard = this.convertStringToBoard(solvedString);
    const numCount = Array(9).fill(9);
    this.setState({
      history: history.concat([{
        board: solvedBoard,
        notes: currNotes,
      }]),
      currStep: this.state.currStep + 1,
      numCount: numCount,
    })
  }

  // handleHintClick() will give the user a hint.
  handleHintClick() {
    if (!this.state.selectedCell) {
      alert("Please select the cell that you want a hint for.");
      return;
    }
    const currBoard = this.state.history[this.state.currStep].board.slice();
    const startingBoard = this.state.history[0].board.slice();

    // handling case when there are errors on the board
    const errorArray = findErrors(currBoard);

    for (let i = 0; i < errorArray.length; i++) {
      if (!startingBoard[errorArray[i]]) {
        currBoard[errorArray[i]] = null;
      }
    }

    const boardString = this.convertBoardToString(currBoard);
    const solvedString = window.sudoku.solve(boardString);

    if (!solvedString) {
      alert("There is no solution that can be dervied from the current board.  Therefore a hint cannot be given.");
      return;
    }
    this.handleNumberRowClick(solvedString[this.state.selectedCell], true);
  }

  handleAllNotesClick() {
    const history = this.state.history.slice(0, this.state.currStep + 1);
    const board = this.state.history[this.state.currStep].board.slice();
    const currBoard = this.state.history[this.state.currStep].board.slice();
    const boardString = this.convertBoardToString(currBoard);
    const notesArray = window.sudoku.get_candidates(boardString);
    const randHelper = Array(81).fill(Array(9).fill(false));
    const allNotes = JSON.parse(JSON.stringify(randHelper));


    for (let i = 0; i < notesArray.length; i++) {
      for (let j = 0; j < notesArray[i].length; j++) {
        for (let n = 0; n < notesArray[i][j].length; n++) {
          if (parseInt(notesArray[i][j][n], 10)) {
            allNotes[i * 9 + j][parseInt(notesArray[i][j][n], 10) - 1] = true;
          }
        }
      }
    }

    this.setState({
      history: history.concat([{
        board: board,
        notes: allNotes,
      }]),
      currStep: this.state.currStep + 1,
    });
  }

  // ******************************************************************************************** //
  // ******************************************************************************************** //
  //                           HANDLE NUMBER ROW CLICKS                                           //
  // ******************************************************************************************** //
  // ******************************************************************************************** //

  countNums(board) {
    let numCount = Array(9).fill(0);

    for (let i = 0; i < 81; i++) { // Counting the amount of each number on the board 
      if (board[i]) {
        numCount[parseInt(board[i], 10) - 1] += 1;
      }
    }

    return numCount;
  }

  // handleNumberRowClick(i, fromtHint) takes a character, i, between 1 and 9 which represents where
  //     on the number row the user pressed.  It will insert the number pressed (i) into
  //     the board based on where the current selected cell is on the board.
  handleNumberRowClick(i, fromHint) {
    const history = this.state.history.slice(0, this.state.currStep + 1);
    const currBoard = this.state.history[this.state.currStep].board.slice();
    const currNotes = JSON.parse(JSON.stringify(this.state.history[this.state.currStep].notes.slice()));
    const startingBoard = this.state.history[0].board;
    const selectedCell = this.state.selectedCell;
    let numCount;

    // handles case when notes is selected
    if (this.state.notesSelected && !fromHint) {
      currBoard[selectedCell] = null;
      numCount = this.countNums(currBoard);
      currNotes[selectedCell][i - 1] = !currNotes[selectedCell][i - 1];
      if (!startingBoard[selectedCell] && (selectedCell || selectedCell === 0)) {
        this.setState({
          history: history.concat([{
            board: currBoard,
            notes: currNotes,
          }]),
          currStep: this.state.currStep + 1,
          numCount: numCount,
        });
      }
    // handles case when notes isn't selected
    } else if (currBoard[selectedCell] !== i) {
      currBoard[this.state.selectedCell] = i;
      numCount = this.countNums(currBoard);

      if (!startingBoard[selectedCell] && (selectedCell || selectedCell === 0) && numCount[i - 1] <= 9) {
        this.setState({
          history: history.concat([{
            board: currBoard,
            notes: currNotes,
          }]),
          currStep: this.state.currStep + 1,
          numCount: numCount,
        });
      }

      if (checkWin(currBoard)) {
        setTimeout(() => this.handleOpenWinModal(), 2000);
      }
    }
  }

  // ******************************************************************************************** //
  // ******************************************************************************************** //
  //                           HANDLE FUNCTION ROW CLICKS                                         //
  // ******************************************************************************************** //
  // ******************************************************************************************** //

  // handleUndoClick() changes the current step of the game to decrease by 1 (hence undoing a move).
  handleUndoClick() {
    const newStep = this.state.currStep === 0 ? 0 : this.state.currStep - 1;
    let numCount = this.countNums(this.state.history[newStep].board);
    this.setState({
      currStep: newStep,
      numCount: numCount,
    });
  }

  // handleRedoClick() changes the current step of the game to increase by 1 if there was previously an
  //    undo.  It can tell this by checking if the current step of the game is less than the length of the
  //    history array.
  handleRedoClick() {
    const historyLen = this.state.history.length - 1;
    const newStep = this.state.currStep < historyLen ? this.state.currStep + 1 : this.state.currStep;
    let numCount = this.countNums(this.state.history[newStep].board);
    this.setState({
      currStep: newStep,
      numCount: numCount,
    })
  }

  // checkNotesEmpty(notes) checks if the given notes are empty.  Notes is an Array(0 .. 8) of Bool that
  //    represents a specific cell's notes.
  checkNotesEmpty(notes) {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]) {
        return false;
      }
    }
    return true;
  }

  // handleEraseClick() changes the current selected square's value to be null if it isn't already.
  handleEraseClick() {
    const history = this.state.history.slice(0, this.state.currStep + 1);
    const currBoard = this.state.history[this.state.currStep].board.slice();
    const currNotes = JSON.parse(JSON.stringify(this.state.history[this.state.currStep].notes.slice()));
    const startingBoard = this.state.history[0].board;

    if (this.state.selectedCell && !startingBoard[this.state.selectedCell] && (!this.checkNotesEmpty(currNotes[this.state.selectedCell]) || currBoard[this.state.selectedCell])) {
      currBoard[this.state.selectedCell] = null;
      for (let i = 0; i < 9; i++) {
        currNotes[this.state.selectedCell][i] = false;
      }

      let numCount = this.countNums(currBoard);
      this.setState({
        history: history.concat([{
          board: currBoard,
          notes: currNotes,
        }]),
        currStep: this.state.currStep + 1,
        numCount: numCount,
      });
    }
  }

  handleNotesClick() {
    this.setState({
      notesSelected: !this.state.notesSelected,
    })
  }

  render() {
    const board = this.state.history[this.state.currStep].board.slice();
    const notes = this.state.history[this.state.currStep].notes.slice();
    const text = (
      <div>
        <h1 align="center">Congratulations! You won!</h1>
        <div className="buttonRow">
          <button className="button" onClick={() => this.handleCloseWinModal()}>Return to Board</button>
          <button className="button" onClick={() => this.props.restartGame()}>Back to Main Menu</button>
        </div>
      </div>
    );

    return (
      <div
        className   = "outer"
        ref         = {(c) => (this.focus = c)}
        onKeyPress  = {(e) => this.handleBoardKeyPress(e)}
        onKeyDown   = {(e) => this.handleBoardKeyDown(e)}
        tabIndex    = "0"
      >
        <div className="middle">
          <div className="sudoku">
            <Header 
              restartGame          = {() => this.props.restartGame()}
              handleOpenHelpModal  = {() => this.handleOpenHelpModal()}
              handleCloseHelpModal = {() => this.handleCloseHelpModal()}
              helpModalOpen        = {this.state.helpModalOpen}
              handleSolveClick     = {() => this.handleSolveClick()}
              handleHintClick      = {() => this.handleHintClick()}
              handleAllNotesClick  = {() => this.handleAllNotesClick()}
            />
            <Board 
              handleClick   = {(i) => this.handleBoardClick(i)}
              selectedCell  = {this.state.selectedCell} 
              board         = {board}
              notes         = {notes}
              origBoard     = {this.state.history[0].board}
            />
            <NumberRow 
              handleClick = {(i) => this.handleNumberRowClick(i)} 
              numCount    = {this.state.numCount}
            />
            <FunctionRow 
              handleUndoClick   = {() => this.handleUndoClick()} 
              handleRedoClick   = {() => this.handleRedoClick()} 
              handleEraseClick  = {() => this.handleEraseClick()} 
              handleNotesClick  = {() => this.handleNotesClick()}
              notesSelected     = {this.state.notesSelected}
            />
            <TextBox 
              text                  = {text}
              boxHeight             = "30%"
              boxWidth              = "40%"
              modalOpen             = {this.state.winModalOpen}
              handleCloseWinModal   = {() => this.handleCloseWinModal()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
