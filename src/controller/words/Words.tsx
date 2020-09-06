import React from 'react';
import Highlight from '../../shared/Highlight';

function Words() {
  const state: WordsState = ac.getCustomDeviceState(AirConsole.SCREEN);

  if (state.guesses[ac.getDeviceId()]) {
    return (
      <p>You've guessed <Highlight>{state.guesses[ac.getDeviceId()]}</Highlight></p>
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
    <p>You are trying to tell <Highlight>{ac.getNickname(state.receiver)}</Highlight> the word <Highlight>{state.chosenWord}</Highlight></p>
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
