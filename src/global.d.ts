declare namespace AirConsole {
  const SCREEN: 0;
  const ORIENTATION_PORTRAIT: "portrait";
  const ORIENTATION_LANDSCAPE: "landscape";
}

declare namespace ac {
  function onReady(code: string): void;
  function onConnect(device_id: number): void;
  function onDisconnect(device_id: number): void;

  function getDeviceId(): number;
  function getMasterControllerDeviceId(): number | undefined;
  function getControllerDeviceIds(): number[];
  function getServerTime(): number;

  function message(device_id: number, data: any): void;
  function broadcast(data: any): void;
  function onMessage(device_id: number, data: any): void;

  function getCustomDeviceState(device_id?: number): any;
  function setCustomDeviceState(data: State): void;
  function setCustomDeviceStateProperty(key: string, value: any): void;
  function onCustomDeviceStateChange(device_id: number, custom_data: any): void;
  function onDeviceStateChange(device_id: number, device_data: any): void;

  function getUID(device_id?: number): string | undefined;
  function getNickname(device_id?: number): string | undefined;
  function getProfilePicture(device_id_or_uid?: number | string, size?: number): string | undefined;
  function onDeviceProfileChange(device_id: number): void;
  function isUserLoggedIn(device_id: number): boolean;
  function requestEmailAddress(): void;
  function onEmailAddress(email_address?: string);
  function editProfile(): void;

  function setActivePlayers(max_players?: number): void;
  function onActivePlayersChange(player_number?: number): void;
  function getActivePlayerDeviceIds(): number[];
  function convertPlayerNumberToDeviceId(player_number: number): number | undefined;
  function convertDeviceIdToPlayerNumber(device_id: number): number | undefined;

  function showAd(): void;
}