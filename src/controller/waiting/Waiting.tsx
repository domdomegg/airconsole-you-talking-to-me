import React from 'react';
import Highlight from '../../shared/Highlight';

function Waiting() {
  return (
    <>
      <p>Hi <Highlight>{ac.getNickname(ac.getDeviceId())}</Highlight>. A game is currently in progress, but you'll get in the next one.</p>
    </>
  )
}

export default Waiting;
