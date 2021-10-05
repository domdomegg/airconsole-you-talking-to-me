import React from 'react';
import Highlight from '../../shared/Highlight';
import { isMaster } from '../../shared/util';

function Results() {
  const state: ResultsState = ac.getCustomDeviceState(AirConsole.SCREEN);

  return (
    <>
      <p>You now have <Highlight>{state.points[ac.getDeviceId()] || 0}</Highlight> points!</p>
      <br/>
      <Guess guess={state.guesses[ac.getDeviceId()]} actual={state.chosenWord} />
      {isMaster() && <div className="buttonContainer" onClick={() => ac.message(AirConsole.SCREEN, { type: "START" })} style={{ marginTop: '15vh' }}><button>Start Round</button></div>}
    </>
  )
}

function Guess({ guess, actual }: { guess: string, actual: string } & React.Props<{}>) {
  if (!guess) {
    return null;
  }

  if (guess === actual) {
    return <p>You guessed <Highlight>{guess}</Highlight>, which was correct!</p>;
  }

  return <p>You guessed <Highlight>{guess}</Highlight>, but the word was <Highlight>{actual}</Highlight>.</p>;
}

export default Results;
