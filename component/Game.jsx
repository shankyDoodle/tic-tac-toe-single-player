const React = require('react');
const Board = require('./Board');

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      newGameKey: 1,
    };

    this.newGameTry = this.newGameTry.bind(this);
  }

  newGameTry() {
    let keyChange = this.state.newGameKey;
    keyChange++;
    this.setState({
      newGameKey: keyChange,
    })
  }

  render() {
    return (
      <div key={this.state.newGameKey} className="gameContainer">
        <h1>Tic Tac Toe</h1>
        <div className="gameBoard">
          <Board/>
        </div>
        <div className="gameInfo">
          <button onClick={this.newGameTry}>Reset</button>
        </div>
      </div>
    );
  }
}

module.exports = Game;