const React = require('react');
const Square = require('./Square');

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      nextPlayer: true,
      gameWinner: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  static calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  nextMove(squareArrays) {
    console.log("ALET");
    var count = 0, move = 0, item, ca = 0;
    var corner = [0, 2, 6, 8];
    var middle = [1, 3, 5, 7];
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < this.state.squares.length; i++) {
      if (this.state.squares[i] == null) {
        count++;
      }
    }
    if (count == 9) {
      move = 1;
    }
    else if (count == 7) {
      move = 2;
    }
    //if first Move
    if (move == 1) {
      //if first move is center
      if ((squareArrays[4] == 'X')) {
        item = corner[Math.floor(Math.random() * corner.length)];
      }
      else {
        item = 4;
      }
    }
    // Not first move
    else {
      var winCheck = 1;
      var compWin = 1;
      for (let iterator = 0; iterator < lines.length; iterator++) {
        const [a, b, c] = lines[iterator];
        if (squareArrays[a] == 'O' && squareArrays[b] == 'O') {
          if (squareArrays[c] == null) {
            item = c;
            console.log(c);
            winCheck++;
            compWin++;
            break;
          }
        }
        if (squareArrays[b] == 'O' && squareArrays[c] == 'O') {
          if (squareArrays[a] == null) {
            item = a;
            console.log(a);
            winCheck++;
            compWin++;
            break;
          }
        }
        if (squareArrays[a] == 'O' && squareArrays[c] == 'O') {
          if (squareArrays[b] == null) {
            item = b;
            console.log(b);
            winCheck++;
            compWin++
            break;
          }
        }
      }
      if (compWin == 1) {
        for (let iterator = 0; iterator < lines.length; iterator++) {
          const [a, b, c] = lines[iterator];
          if (squareArrays[a] == 'X' && squareArrays[b] == 'X') {
            if (squareArrays[c] == null) {
              item = c;
              console.log(c);
              winCheck++;
              break;
            }
          }
          if (squareArrays[b] == 'X' && squareArrays[c] == 'X') {
            if (squareArrays[a] == null) {
              item = a;
              console.log(a);
              winCheck++;
              break;
            }
          }
          if (squareArrays[a] == 'X' && squareArrays[c] == 'X') {
            if (squareArrays[b] == null) {
              item = b;
              console.log(b);
              winCheck++;
              break;
            }
          }
        }
      }
      if (winCheck == 1 && move == 2) {
        if (squareArrays[4] == 'X') {
          if (squareArrays[0]) {
            item = 6;
          }
          else {
            item = 0;
          }
        }
        else if (squareArrays[0] == 'X' || squareArrays[2] == 'X' || squareArrays[6] == 'X' || squareArrays[8] == 'X') {
          item = middle[Math.floor(Math.random() * middle.length)];
        }
        else {
          item = corner[Math.floor(Math.random() * corner.length)];
        }

      }
      else if (winCheck == 1) {
        var temp = [];
        for (let j = 0; j < squareArrays.length; j++) {
          if (squareArrays[j] == null) {
            temp[ca] = j;
            ca++;
          }

        }
        item = temp[Math.floor(Math.random() * temp.length)];
      }

    }
    if (!(squareArrays[item])) {
      squareArrays[item] = 'O';
      this.setState({
        squares: squareArrays,
        nextPlayer: !this.state.nextPlayer
      });
    }
  }

  handleClick(i) {
    const winner = Board.calculateWinner(this.state.squares);
    if (!(this.state.squares[i] || winner)) {
      const squareArrays = this.state.squares.slice();
      squareArrays[i] = 'X';
      const winner = Board.calculateWinner(squareArrays);
      if (winner) {
        this.setState({
          squares: squareArrays,
          nextPlayer: !this.state.nextPlayer
        });
      }
      else {
        this.nextMove(squareArrays);
      }
    }
  }

  renderSquare(i) {
    return (<Square value={this.state.squares[i]} onClick={this.handleClick.bind(this, i)}/>);
  }

  render() {
    const winner = Board.calculateWinner(this.state.squares);
    let status;
    let drawCheck = 0;
    for (let i = 0; i < this.state.squares.length; i++) {
      if (this.state.squares[i] == null) {
        drawCheck++;
        break;
      }
    }
    if (winner) {
      status = "Winner : " + winner;
    }
    else if (drawCheck == 0) {
      status = "It's tie!!!!! Better luck Next time";
    }
    return (
      <div className="boxHolder">
        <div className="status">{status}</div>
        < div className="eachRow">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </ div>
        < div className="eachRow">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </ div>
        < div className="eachRow">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </ div>
      </ div>
    );
  }

}

module.exports = Board;