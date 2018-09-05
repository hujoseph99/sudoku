import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game/js/game.js';
import ScrollBar from './scrollBar/scrollBar.js';
import './index.css';
import TextBox from './game/js/textBox.js';


// Sudoku is the outer-most container for the whole Sudoku web page.  It manages when the main menu and game
//    will be shown.
class Sudoku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numStart: 30,
      gameStart: false,
      isWinner: false,
      modalOpen: false,
    };
    this.changeStartNum = this.changeStartNum.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  // handleWin() handles the event where the user wins.  It will make the page go back to the main menu
  //    and reset everything to default values.
  restartGame() {
    this.setState({
      isWinner: true,
      numStart: 30,
      gameStart: false,
    });
  }

  // changeStartNum(value) is a function that is used by the slider.  It will take the current value 
  // of the slider and change the state to reflect it.
  changeStartNum(value) {
    this.setState({
      numStart: value,
      isWinner: false,
    });
  }

  // onClickStart() handles the event of when the start button is pressed by the user.  It will start
  //    the game for the user.
  handleClickStart() {
    this.setState({
      gameStart: true,
    });
  }

  // handleOpenModal() opens the textbox
  handleOpenModal() {
    this.setState({
      modalOpen: true,
    })
  }

  // handleCloseModal() closes the textbox
  handleCloseModal() {
    this.setState({
      modalOpen: false,
    })
  }

  // getOutputComponent() decides what should be shown on the screen.  It will return the value used in
  //    render.  Right now, it displays either the main menu or the game component.
  getOutputComponent() {
    let renderComp;
    if (this.state.gameStart) {
      renderComp = <Game numStart={this.state.numStart} restartGame={() => this.restartGame()}/>;
    } else {
      const text = (
        <div>
          <h1>Sudoku</h1>
          <h3>Outline</h3>
          <p>Sudoku is a logic-based number placement puzzle.  The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 boxes that compose the grid contains all of the digits from 1 to 9.</p>
          <p>Drag the slider to select the number of cells that you would like to start with.</p>
          <h3>Difficulties</h3>
          <table className="difficultyTable">
            <tr>
              <th>Difficuluty</th>
              <th>Number of Cells</th>
            </tr>
            <tr>
              <td>Easy</td>
              <td>62</td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>53</td>
            </tr>
            <tr>
              <td>Hard</td>
              <td>44</td>
            </tr>
            <tr>
              <td>Very Hard</td>
              <td>35</td>
            </tr>
            <tr>
              <td>Insane</td>
              <td>26</td>
            </tr>
            <tr>
              <td>Inhuman</td>
              <td>17</td>
            </tr>
          </table>
        </div>
      );

      renderComp = (
        <div className="outer">
          <div className="middle">
            <div className="menuContainer">
              <img src={require('./images/help.png')} alt="help" onClick={() => this.handleOpenModal()} className="help" />
              <p align="center" style={{'font-size': '1.3em'}}>Start with {this.state.numStart} cells prefilled</p>
              <ScrollBar 
                handleChange={(value) => this.changeStartNum(value)}
              />
              <button className="startButton" onClick={() => this.handleClickStart()}>Play Sudoku</button>
              <TextBox
                text={text}
                boxHeight="70%"
                boxWidth="60%"
                handleCloseModal={() => this.handleCloseModal()}
                modalOpen={this.state.modalOpen}
              />
            </div>
          </div>
        </div>
      );
    }

    return renderComp;
  }
  
  render() {
    const retval = this.getOutputComponent();
    return retval;
    // return <Game numStart={this.state.numStart} restartGame={() => this.restartGame()}/>;
  }
}

ReactDOM.render(<Sudoku />, document.getElementById("root"));