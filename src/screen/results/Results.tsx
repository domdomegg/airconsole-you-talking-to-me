import React from 'react';
import Highlight from '../../shared/Highlight';

function Results() {
  const state: ResultsState = ac.getCustomDeviceState(AirConsole.SCREEN);

  return (
    <>
      <h1 style={{ fontSize: '70px' }}>The word was {state.chosenWord}</h1>
      <div>
        {Object.keys(state.guesses).map(x => parseInt(x)).map(key => <p key={key}><Highlight>{ac.getNickname(key)}</Highlight> chose <Highlight>{state.guesses[Number(key)]}</Highlight></p>)}
      </div>
      <br/>
      <p>Waiting on <Highlight>{ac.getNickname(ac.getMasterControllerDeviceId())}</Highlight> to start the next round.</p>
    </>
  )
}

export default Results;
