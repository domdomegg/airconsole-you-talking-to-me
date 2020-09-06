declare namespace AirConsole {
  const SCREEN: 0;
  const ORIENTATION_PORTRAIT: "portrait";
  const ORIENTATION_LANDSCAPE: "landscape";
}

declare namespace ac {
  function onReady(code: string);
  function onConnect(device_id: number);
  function onDisconnect(device_id: number);

  function getDeviceId(): number;
  function getMasterControllerDeviceId(): number | undefined;
  function getControllerDeviceIds(): number[];
  function getServerTime(): number;

  function message(device_id: number, data: any);
  function broadcast(data: any);
  function onMessage(device_id: number, data: any);

  function getCustomDeviceState(device_id?: number): any;
  function setCustomDeviceState(data: State);
  function setCustomDeviceStateProperty(key: string, value: any);
  function onCustomDeviceStateChange(device_id: number, custom_data: any);
  function onDeviceStateChange(device_id: number, device_data: any);

  function getUID(device_id?: number): string | undefined;
  function getNickname(device_id?: number): string | undefined;
  function getProfilePicture(device_id_or_uid?: number | string, size?: number): string | undefined;
  function onDeviceProfileChange(device_id: number);
  function isUserLoggedIn(device_id: number): boolean;
  function requestEmailAddress();
  function onEmailAddress(email_address?: string);
  function editProfile();

  function setActivePlayers(max_players?: number);
  function onActivePlayersChange(player_number?: number);
  function getActivePlayerDeviceIds(): number[];
  function convertPlayerNumberToDeviceId(player_number: number): number | undefined;
  function convertDeviceIdToPlayerNumber(device_id: number): number | undefined;
}