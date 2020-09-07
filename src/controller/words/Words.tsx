import React from 'react';
import Highlight from '../../shared/Highlight';

function Words() {
  const state: WordsState = ac.getCustomDeviceState(AirConsole.SCREEN);

  if (state.guesses[ac.getDeviceId()]) {
    const remainingGuessers = ac.getActivePlayerDeviceIds().filter(device_id => !state.guesses[device_id] && state.sender !== device_id);

    return (
      <>
        <p>You've guessed <Highlight>{state.guesses[ac.getDeviceId()]}</Highlight></p>
        <br/>
        <p>Waiting for <Highlight>{remainingGuessers.slice(0, 3).map((device_id) => ac.getNickname(device_id)).join(', ')}</Highlight> to guess</p>
      </>
    );
  }

  return (
    <>
      {state.sender === ac.getDeviceId() ? Sender(state) : Guesser(state)}
    </>
  );
}

function Sender(state: WordsState) {
  return (
    <>
      <p>Try to tell <Highlight>{ac.getNickname(state.receiver)}</Highlight> the word <Highlight>{state.chosenWord}</Highlight></p>
      <br/>
      <p>Guesser's choices:</p>
      <ul>
        {state.words.map(word => <li key={word}>{word}</li>)}
      </ul>
    </>
  );
}

function Guesser(state: WordsState) {
  return (
    <>
      <p>What's your guess?</p>
      <ul>
        {state.words.map(word => <button key={word} onClick={() => ac.message(AirConsole.SCREEN, { type: "GUESS", word })}>{word}</button>)}
      </ul>
    </>
  );
}

export default Words;
