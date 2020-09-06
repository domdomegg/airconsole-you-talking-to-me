interface Interval {
  starts: number;
  ends: number;
}

type State = HomeState | ResyncState | WordsState | ResultsState;

interface HomeState {
  pageId: 'home';
}

interface ResyncState {
  pageId: 'resync';
  now: number;
}

interface WordsState {
  pageId: 'words';
  words: string[];
  chosenWord: string;
  sender: number;
  receiver: number;
  guesses: {
    [device_id: number]: string
  }
  points: {
    [device_id: number]: number
  }
  timer: Interval
}

interface ResultsState {
  pageId: 'results';
  chosenWord: string;
  guesses: {
    [device_id: number]: string
  }
  points: {
    [device_id: number]: number
  }
}

type MessageData = StartMessageData | GuessMessageData;

interface StartMessageData {
  type: 'START';
  other: string;
}

interface GuessMessageData {
  type: 'GUESS';
  word: string;
}