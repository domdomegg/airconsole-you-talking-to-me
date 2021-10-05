import React from 'react';
import './Controller.css';
import Home from './home/Home';
import Waiting from './waiting/Waiting';
import Resync from './resync/Resync';
import Words from './words/Words';
import Results from './results/Results';

function Controller() {
  const state: State = ac.getCustomDeviceState(AirConsole.SCREEN) || { pageId: 'home' };

  if (state.pageId === 'home') {
    return <Container><Home /></Container>;
  }

  if (state.pageId === 'resync') {
    return <Container><Resync /></Container>
  }
  
  if (!ac.getActivePlayerDeviceIds().includes(ac.getDeviceId())) {
    return <Container><Waiting /></Container>
  }

  if (state.pageId === 'words') {
    return <Container><Words /></Container>
  }
  
  if (state.pageId === 'results') {
    return <Container><Results /></Container>
  }

  throw new Error('Invalid pageId ' + (state as any).pageId);
}

function Container({ children }: React.Props<{}>) {
  return (
    <div id="controller">
      <div className="page">
        {children}
      </div>

      <svg style={{ top: 0 }} className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="#25A18E" fillOpacity="1" d="M0,256L48,234.7C96,213,192,171,288,154.7C384,139,480,149,576,138.7C672,128,768,96,864,101.3C960,107,1056,149,1152,186.7C1248,224,1344,256,1392,272L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
    </div>
  )
}

export default Controller;
