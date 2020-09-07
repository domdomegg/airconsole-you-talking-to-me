import React from 'react';
import Highlight from '../../shared/Highlight';

function Results() {
  const state: ResultsState = ac.getCustomDeviceState(AirConsole.SCREEN);

  return (
    <>
      <h1 style={{ fontSize: '70px' }}>The word was <Highlight>{state.chosenWord}</Highlight></h1>
      <div>
        {Object.keys(state.points).map(x => parseInt(x)).map(key => <p key={key}><Highlight>{ac.getNickname(key)}</Highlight>{state.guesses[key] && <> chose <Highlight>{state.guesses[key]}</Highlight> and</>} has <Highlight>{state.points[key]}</Highlight> points</p>)}
      </div>
      <br/>
      <p>Waiting on <Highlight>{ac.getNickname(ac.getMasterControllerDeviceId())}</Highlight> to start the next round.</p>
    </>
  )
}

export default Results;
