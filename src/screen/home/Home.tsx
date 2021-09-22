import React from 'react';
import Highlight from '../../shared/Highlight';

function Home() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '4vw' }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="30vh" viewBox="0 0 92.4 99.2" version="1.1">
            <g transform="translate(-9.3 -66.8)">
              <path d="M27.4 159.4c-1.6-3.8 5.6-15.6 5.6-15.6a53.9 53.9 0 01-22.6-31.4c-2.4-11.5-3-35.6 19-43.3 22.3-7.7 41.1 6.5 41.1 6.5l-1.6 3s4.2 5.6 5.4 11.9c1.2 6.3-1.7 5 1 9.2 2.6 4.1 7 4.9 6.6 8.4-.1 1.5-2.8 1.7-3.3 3-.7 1.8 1.4 4 .5 5.5-1.6 3-7.4 1.6-9 4.6-.4.9-.2 2.2.5 2.9 2 1.7 6.6-2.2 7.8.1.8 1.5-2.4 2.5-2.8 4.1-.5 2.6 2.6 5.4 1.3 7.6-2.7 4.6-15 5.3-15 5.3s-7.7 23-11.9 24.6c-2.8 1.2-21.3-3.4-22.6-6.4z" fill="#004e64" strokeWidth=".3" strokeLinecap="butt" />
              <g stroke="#ff6b35" strokeWidth="4" strokeLinecap="round">
                <path d="M85 121.2h14.7" />
                <path d="M85 126.8l12.5 7.5" />
                <path d="M85 115.6l12.5-7.5" />
              </g>
            </g>
          </svg>
        </div>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '6vw' }}>You talking to <Highlight>me</Highlight>?</h1>
          <p>Each player takes it in turns to communicate one of a selection of words to another player, but without other players finding out what it is. Points are awarded based on speed and accuracy.</p>
        </div>
      </div>

      <div style={{ marginTop: '4vw' }}>
        <h2 style={{ fontSize: '4vw', textAlign: 'center' }}>Players</h2>
        <ul>
          {ac.getControllerDeviceIds().map(deviceId => <li key={deviceId}>{ac.getNickname(deviceId)}</li>)}
        </ul>
      </div>
    </>
  )
}

export default Home;
