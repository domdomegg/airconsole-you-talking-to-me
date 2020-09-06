import React from 'react';
import Highlight from '../../shared/Highlight';

function Words() {
  const state: WordsState = ac.getCustomDeviceState(AirConsole.SCREEN);

  return (
    <>
      <h1 style={{ fontSize: '70px' }}><Highlight>{ac.getNickname(state.sender)}</Highlight> is communicating one of these</h1>
      <Loader timer={state.timer} />
      <ul>
        {state.words.map(word => <li key={word}>{word}</li>)}
      </ul>
    </>
  )
}

function Loader({ timer }: { timer: Interval } & React.Props<{}>) {
  // return (
  //   <div style={{ backgroundColor: 'rgba(37, 161, 142, 0.2)', borderRadius: '10px', overflow: 'hidden', margin: '30px 0' }}>
  //     <div ref={recalcAnimation(timer)} style={{ height: '20px', backgroundColor: '#25A18E', animationTimingFunction: 'linear', animationFillMode: 'forwards', width: 0, animationDuration: `${timer.ends - timer.starts}ms` }}></div>
  //   </div>
  // )

  return (
    <svg style={{ bottom: 0, zIndex: 1 }} className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <defs>
        <clipPath id="clip-path">
          <path fill="#25A18E" fillOpacity="1" d="M0,160L26.7,144C53.3,128,107,96,160,117.3C213.3,139,267,213,320,234.7C373.3,256,427,224,480,229.3C533.3,235,587,277,640,256C693.3,235,747,149,800,133.3C853.3,117,907,171,960,197.3C1013.3,224,1067,224,1120,197.3C1173.3,171,1227,117,1280,117.3C1333.3,117,1387,171,1413,197.3L1440,224L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>
        </clipPath>
      </defs>
      
      <rect ref={(e) => e != null && setTimeout(() => e.style.fill = '#004E64', 0)} style= {{ transition: 'all 1s ease', fill: '#25A18E' }} width="100%" height="100%" clipPath="url(#clip-path)" ></rect>
      <rect ref={recalcAnimation(timer)} fill="#25A18E" style={{ animationTimingFunction: 'linear', animationFillMode: 'forwards', animationDuration: `${timer.ends - timer.starts}ms` }} width="0" height="100%" clipPath="url(#clip-path)" />
    </svg>
  )
}

const recalcAnimation = (timer: Interval) => (element: SVGRectElement | null) => {
  if (element == null) return;

  // Reset the animation
  element.style.animationName = '';
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  // element.offsetHeight; // force reflow
  element.getBBox(); // force reflow
  element.style.animationName = 'toMaxWidth'

  element.style.animationDelay = `-${Date.now() - timer.starts}ms`;
}

export default Words;
