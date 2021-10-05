import React from 'react';
import { isMaster } from '../../shared/util';

function Home() {
  if (ac.getControllerDeviceIds().length < 3) {
    return <p>Waiting for at least 3 players before starting</p>
  }
  
  return (
    <>
      {isMaster() ? Master() : NonMaster()}
    </>
  )
}

function Master() {
  return (
    <div className="buttonContainer" style={{ marginTop: '30vh' }} onClick={() => ac.message(AirConsole.SCREEN, { type: "START" })}><button>Start Game</button></div>
  )
}

function NonMaster() {
  return (
    <p>Waiting for {ac.getNickname(ac.getMasterControllerDeviceId())} to start the game</p>    
  )
}

export default Home;
