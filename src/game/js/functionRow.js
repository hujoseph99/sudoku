import React from 'react';
import '../style/functionRow.css';

/* FunctionRow is a row of squares that serves the purpose of giving the users more 
 * ways to interact with the board.  It contains a square for: undo, redo, and erase.
 * props:
 *  handleUndoClick: function that handles when the undo button is clicked.
 *  handleRedoClick: function that handles when the redo button is clicked.
 *  handleEraseClick: function that handles when the erase button is clicked.  It will set the current
 *          square's value to be null if it isn't already.
 *  handlesNotesClick: function that handles when the notes button is clicked.
 *  notesSelected: a boolean value that indicates whether or not the notes button is activated.
 */
class FunctionRow extends React.Component {
  getSquares() {
    let squareRow = [];
    squareRow.push(
      <figure className="imageContainer" onClick={() => this.props.handleUndoClick()}>
        <img src={require('../../images/undo.jpg')} alt="undo" className="functionImage" key={90} />
        <figcaption>Undo</figcaption>
      </figure>
    );
    squareRow.push(
      <figure className="imageContainer" onClick={() => this.props.handleRedoClick()}>
        <img src={require('../../images/redo.jpg')} alt="redo" className="functionImage" key={91}/>
        <figcaption>Redo</figcaption>
      </figure> 
    );
    squareRow.push(
      <figure className="imageContainer" onClick={() => this.props.handleEraseClick()}>
        <img src={require('../../images/delete.svg')} alt="delete" className="functionImage" key={92} />
        <figcaption>Delete</figcaption>
      </figure> 
    );

    if (this.props.notesSelected) {
      squareRow.push(
        <figure className="imageContainer" onClick={() => this.props.handleNotesClick()}>
          <img src={require('../../images/notesSelected.jpg')} alt="notes" className="functionImage" key={93} />
          <figcaption>Notes</figcaption>
        </figure> 
      );
    } else {
      squareRow.push(
        <figure className="imageContainer" onClick={() => this.props.handleNotesClick()}>
          <img src={require('../../images/notes.jpg')} alt="notes" className="functionImage" key={93} />
          <figcaption>Notes</figcaption>
        </figure> 
      );
    }

    return squareRow;
  }

  render() {
    return (
      <div className="functionRow">
        {this.getSquares()}
      </div>
    );
  }
}

export default FunctionRow;