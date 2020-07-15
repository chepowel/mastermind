import React from 'react';
import 'tachyons';
import './App.css'
import GuessList from '../../components/GuessList/GuessList';
import CircleList from '../../components/CircleList/CircleList';
import { getRandomNumber, getShuffledArray } from '../../utils/helpers';

/* REDUX */
import { connect } from 'react-redux';
import { updateStore } from '../../redux/game';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
			guess: [],
			codeLength: 4,
			guessCount: 10,
    };

    this.handleChangeGuessCount = this.handleChangeGuessCount.bind(this);
		this.handleChangeCodeLength = this.handleChangeCodeLength.bind(this);
    this.handleClickGuess = this.handleClickGuess.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
		this.handleClickColor = this.handleClickColor.bind(this);

  }

	createNewCode(){
		const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'orange'];
		const codeLength = this.state.codeLength;
		let code = [];
		for(let i = 0; i < codeLength; i++){
			code.push(colors[getRandomNumber(colors.length)]);
		}
		return code;
	}

	handleClickReset(event) {
		let codeLength = this.state.codeLength;
		let guessCount = this.state.guessCount;
		let code = this.createNewCode();
		this.props.updateStore({
			code: code,
			turn: 0,
			guessHistory: [],
			guess: [],
			responseHistory: [],
			codeLength: codeLength,
			guessCount: guessCount,
		});
  }

	getHintPegs(blackPegs, whitePegs) {
		let blackArray = Array.apply(null, Array(blackPegs)).map(_ => 'black');
		let whiteArray = Array.apply(null, Array(whitePegs)).map(_ => 'white');
		let feedbackArray = getShuffledArray(blackArray.concat(whiteArray));
		let responseHistory = this.props.game.responseHistory;
		responseHistory.push(feedbackArray);
		this.setState({
			responseHistory: responseHistory,
		});
	}

	checkGuess(arr, code) {
		let blackPegs = 0;
		let whitePegs = 0;
		let leftoverArr = {};
		let leftoverCode = {};
		if (String(code) === String(arr)) {
			console.log('code matches', code);
			alert('You Win!');
			return;
		}
		for (let i = 0; i < 4; i++) {
			if (arr[i] === code[i]) {
				blackPegs++;
			} else {
				leftoverArr[arr[i]] = i;
				leftoverCode[code[i]] = i;
			}
		}
		let leftoverArrPegs = Object.keys(leftoverArr);
		for (let j = 0; j < leftoverArrPegs.length; j++) {
			if (leftoverArrPegs[j] in leftoverCode) {
				whitePegs++;
			}
		}
		return this.getHintPegs(blackPegs, whitePegs);
	}

  handleClickGuess(){
		let guess = this.state.guess.slice(0);
		const code = this.props.game.code;
		const guessHistory = this.props.game.guessHistory;
		guessHistory.push(guess);
		this.setState({
			guess: [],
		});
		let game = this.props.game;
		this.props.updateStore({
			code: game.code,
			turn: game.turn + 1,
			guessHistory: game.guessHistory,
			responseHistory: game.responseHistory,
			codeLength: this.state.codeLength,
			guessCount: this.state.guessCount,
		});
		return this.checkGuess(guess, code);
	}

	handleChangeGuessCount(event) {
		this.setState({guessCount: event.target.value});
  }

	handleChangeCodeLength(event) {
    this.setState({codeLength: event.target.value});
  }
  handleClickColor(event) {
    let guess = this.state.guess.slice(0);
		guess.push(event.target.id);
    this.setState({guess: guess});
  }

  render() {
		const { code, turn, responseHistory, guessHistory } = this.props.game;

    return (
      <div className="tc">
				<header>
          <h1>Master Mind</h1>
        </header>
        <div className="tc">
					<p>Code Length</p>
					<input
            type="text"
            value={this.state.codeLength}
            onChange={(codeLength) => this.handleChangeCodeLength(codeLength)}
          />
          <p>Number of Guesses</p>
          <input
						type="text"
            value={this.state.guessCount}
            onChange={(guessCount) => this.handleChangeGuessCount(guessCount)}
          /><br /><br />
					<div>Code: <CircleList array={code} /></div>
					<br />
          <button onClick={this.handleClickReset}>Start New Game</button>
        </div><br /><br />
				<div className="tc">
					<GuessList
						guessHistory={guessHistory}
						responseHistory={responseHistory}
					/>
					<p>Turn: {turn}</p>
					<CircleList
						array={this.state.guess}
					/><br />
					{turn === this.state.guessCount &&
						<div>
							<p>Out of Guesses</p>
						</div>
					}
					{turn < this.state.guessCount &&
						<div>
							<button id="blue" onClick={this.handleClickColor}>Blue</button>
							<button id="green" onClick={this.handleClickColor}>Green</button>
							<button id="yellow" onClick={this.handleClickColor}>Yellow</button>
							<button id="pink" onClick={this.handleClickColor}>Pink</button>
							<button id="red" onClick={this.handleClickColor}>Red</button>
							<button id="orange" onClick={this.handleClickColor}>Orange</button>
							<br /><br />
							<button onClick={this.handleClickGuess}>Submit Guess</button>
						</div>
					}
        </div>
      </div>
    )
  }
}


/* REDUX */
function mapStateToProps(state) {
  const { game } = state;
  return { game };
}
const mapDispatchToProps = (dispatch) => ({
	updateStore: (data) => dispatch(updateStore(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
