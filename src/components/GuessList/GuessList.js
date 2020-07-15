import React from 'react';
import CircleList from '../../components/CircleList/CircleList'

function GuessList(props) {
  const guessHistory = props.guessHistory;
	const responseHistory = props.responseHistory;
  const listGuesses = guessHistory.map((guess, index) => {
		const responseContent = responseHistory[index];
		return <div key={index}>Guess {index + 1}: <CircleList array={guess} /> Hints: <CircleList array={responseContent} /></div>
	});
  return (
    <div>{listGuesses}</div>
  );
}

export default GuessList;