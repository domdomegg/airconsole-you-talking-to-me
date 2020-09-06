import React, { useState } from 'react';
import Screen from './screen/Screen';
import Controller from './controller/Controller';

function App() {
  const [,forceUpdate] = useState();

  ac.onDisconnect = () => forceUpdate({});
  ac.onConnect = () => forceUpdate({});
  ac.onCustomDeviceStateChange = () => forceUpdate({});

  if (window.location.pathname.endsWith('screen.html')) {
    return <Screen />;
  }
  
  if (window.location.pathname.endsWith('controller.html')) {
    return <Controller />;
  }
  
  console.error('Unexpected path ' + window.location.pathname);
  return <h1>Not found</h1>;
}

export default App;
