// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

global.AirConsole = {
    SCREEN: 0,
    ORIENTATION_PORTRAIT: "portrait",
    ORIENTATION_LANDSCAPE: "landscape"
}

global.ac = {
    onReady: () => {},
    onConnect: () => {},
    onDisconnect: () => {},
  
    getDeviceId: () => -1,
    getMasterControllerDeviceId: () => undefined,
    getControllerDeviceIds: () => [],
    getServerTime: () => { throw "AirConsole constructor was not called with {synchronize_time: true}" },
  
    message: () => {},
    broadcast: () => {},
    onMessage: () => {},

    getCustomDeviceState: () => undefined,
    setCustomDeviceState: () => {},
    setCustomDeviceStateProperty: () => {},
    onCustomDeviceStateChange: () => {},
    onDeviceStateChange: () => {},

    getUID: () => undefined,
    getNickname: () => undefined,
    getProfilePicture: () => undefined,
    onDeviceProfileChange: () => {},
    isUserLoggedIn: () => false,
    requestEmailAddress: () => {},
    onEmailAddress: () => {},
    editProfile: () => {},
  
    setActivePlayers: () => {},
    onActivePlayersChange: () => {},
    getActivePlayerDeviceIds: () => [],
    convertPlayerNumberToDeviceId: () => undefined,
    convertDeviceIdToPlayerNumber: () => undefined,
}