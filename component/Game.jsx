const React = require('react');

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      newGamekey: 1,
    };
    this.newGametry = this.newGametry.bind(this);
  }

  newGametry() {
    var keychange = this.state.newGamekey;
    keychange++;
    this.setState({
      newGamekey: keychange,
    })
  }

  render() {
    return <div>Hello World</div>;
    /*return (
      <div key={this.state.newGamekey} className="gameContainer">
        <h1>Tic Tac Toe</h1>
        <div className="gameBoard">
          <Board/>
        </div>
        <div className="gameInfo">
          <button onClick={this.newGametry.bind(this)}>Reset</button>
        </div>
      </div>
    );*/
  }
}

module.exports = Game;