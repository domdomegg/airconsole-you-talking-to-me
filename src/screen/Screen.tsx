import React, { useRef } from 'react';
import Home from './home/Home';
import Resync from './resync/Resync';
import Words from './words/Words';
import Results from './results/Results';
import './Screen.css';
import { sample } from '../shared/util';

const DICTIONARY = ["people", "time", "work", "film", "water", "good", "history", "art", "money", "world", "information", "map", "two", "family", "example", "while", "government", "help", "go", "business", "great", "being", "health", "study", "game", "few", "might", "still", "system", "computer", "life", "meat", "form", "air", "day", "place", "number", "public", "read", "year", "part", "keep", "start", "field", "give", "fish", "human", "local", "back", "process", "general", "she", "thanks", "heat", "specific", "long", "hand", "music", "person", "experience", "job", "reading", "book", "method", "end", "play", "data", "point", "type", "feel", "high", "food", "understanding", "home", "theory", "economy", "tonight", "law", "value", "put", "body", "market", "common", "set", "bird", "guide", "literature", "interest", "change", "problem", "software", "state", "simple", "control", "knowledge", "power", "radio", "ability", "economics", "course", "love", "company", "price", "size", "past", "internet", "television", "big", "possible", "science", "card", "list", "mind", "trade", "particular", "library", "nature", "fact", "product", "line", "idea", "temperature", "care", "group", "risk", "word", "fat", "force", "key", "light", "training", "today", "name", "school", "top", "major", "personal", "investment", "current", "national", "amount", "level", "order", "practice", "research", "sense", "service", "area", "society", "piece", "cut", "natural", "physical", "show", "try", "web", "check", "second", "activity", "story", "boss", "industry", "media", "thing", "sport", "call", "move", "pay", "fun", "house", "page", "term", "test", "let", "oven", "answer", "sound", "increase", "single", "community", "definition", "safety", "focus", "matter", "individual", "turn", "quality", "kind", "soil", "development", "language", "board", "oil", "picture", "ask", "buy", "guard", "hold", "main", "offer", "potential", "professional", "management", "player", "variety", "video", "week", "access", "garden", "range", "rate", "reason", "international", "travel", "future", "site", "cook", "demand", "exercise", "image", "alternative", "following", "special", "working", "security", "case", "cause", "coast", "whole", "country", "exam", "movie", "organization", "action", "age", "bad", "boat", "record", "result", "section", "dance", "excuse", "building", "mouse", "equipment", "physics", "cash", "class", "nothing", "period", "plan", "store", "tax", "analysis", "policy", "series", "thought", "side", "subject", "cold", "commercial", "low", "purchase", "basis", "boyfriend", "direction", "strategy", "technology", "space", "deal", "primary", "worth", "army", "camera", "freedom", "paper", "rule", "stock", "weather", "fall", "environment", "chance", "figure", "man", "model", "source", "necessary", "positive", "produce", "search", "child", "instance", "month", "truth", "beginning", "earth", "program", "present", "spend", "talk", "marketing", "university", "writing", "chicken", "design", "feature", "head", "material", "purpose", "question", "rock", "salt", "creative", "tell", "article", "department", "difference", "goal", "news", "act", "birth", "car", "dog", "object", "scale", "sun", "cost", "drive", "green", "support", "audience", "fishing", "growth", "income", "marriage", "user", "note", "profit", "rent", "speed", "style", "war", "glad", "remove", "return", "run", "combination", "failure", "meaning", "medicine", "philosophy", "bank", "craft", "half", "inside", "outside", "standard", "complex", "due", "effective", "middle", "regular", "reserve", "teacher", "bus", "exchange", "eye", "fire", "position", "pressure", "stress", "independent", "leave", "original", "reach", "rest", "serve", "watch", "communication", "night", "advantage", "benefit", "box", "frame", "issue", "step", "beautiful", "charge", "chemistry", "disease", "disk", "energy", "nation", "road", "role", "soup", "cycle", "face", "item", "metal", "paint", "review", "room", "screen", "structure", "view", "active", "break", "negative", "safe", "stay", "visit", "visual", "advertising", "location", "success", "account", "ball", "discipline", "medium", "share", "affect", "cover", "report", "rise", "addition", "apartment", "education", "math", "moment", "painting", "politics", "balance", "bit", "black", "bottom", "choice", "gift", "impact", "machine", "shape", "tool", "wind", "walk", "white", "attention", "decision", "event", "property", "shopping", "student", "wood", "address", "average", "career", "culture", "morning", "pot", "sign", "table", "task", "beyond", "junior", "pick", "unique", "competition", "distribution", "entertainment", "office", "population", "president", "unit", "condition", "contact", "credit", "egg", "hope", "ice", "network", "north", "square", "anything", "classic", "final", "lift", "mix", "private", "stop", "teach", "western", "category", "cigarette", "context", "introduction", "opportunity", "performance", "attempt", "date", "effect", "link"];
const ROUND_LENGTH_MILISECONDS = 30 * 1000;

function Screen() {
  const state: State = ac.getCustomDeviceState(AirConsole.SCREEN) || { pageId: 'home' };
  const gameTimer = useRef<NodeJS.Timeout>(null) as React.MutableRefObject<NodeJS.Timeout>;

  ac.onMessage = (device_id, data: MessageData) => {
    if ((state.pageId === "home" || state.pageId === "results") && data.type === "START") {
      if (device_id !== ac.getMasterControllerDeviceId()) {
        console.error('Got start message from non master device', device_id);
        return;
      }

      ac.setActivePlayers();

      const deviceIds = ac.getActivePlayerDeviceIds();

      const words = sample(DICTIONARY, 20);
      const chosenWord = sample(words, 1)[0];
      const sender = sample(deviceIds, 1)[0];
      const receiver = sample(deviceIds.filter(id => id !== sender), 1)[0];
      const points = state.pageId === 'results' ? state.points : {};

      ac.setCustomDeviceState({
        pageId: 'words',
        words, 
        chosenWord,
        sender,
        receiver,
        guesses: {},
        points,
        timer: {
          starts: Date.now(),
          ends: Date.now() + ROUND_LENGTH_MILISECONDS
        }
      });

      gameTimer.current = setTimeout(() => {
        const wordsState: WordsState = ac.getCustomDeviceState();
        ac.setCustomDeviceState({
          pageId: 'results',
          chosenWord: wordsState.chosenWord,
          guesses: wordsState.guesses,
          points: wordsState.points
        });
      }, ROUND_LENGTH_MILISECONDS);
      return;
    }

    if (state.pageId === "words" && data.type === "GUESS") {
      if (device_id === state.sender) {
        console.error('Got guess from sender', device_id);
        return;
      }

      if (state.guesses[device_id]) {
        console.error('Got guess', data.word, ' for device', device_id, 'with existing guess', state.guesses[device_id]);
        return;
      }

      if (!state.words.includes(data.word)) {
        console.error('Got guess', data.word, ' for device', device_id, 'with word out of set', data.word);
        return;
      }

      state.guesses[device_id] = data.word;
      state.points[device_id] = (state.points[device_id] || 0) + (data.word === state.chosenWord ? 1000 : 0);
      state.points[state.sender] = (state.points[state.sender] || 0) + (data.word === state.chosenWord ? (device_id === state.receiver ? 2000 : -200) : 0);
      
      if (Object.keys(state.guesses).length === ac.getActivePlayerDeviceIds().length - 1) {
        clearTimeout(gameTimer.current);
        ac.setCustomDeviceState({
          pageId: 'results',
          chosenWord: state.chosenWord,
          guesses: state.guesses,
          points: state.points
        });
      } else {
        ac.setCustomDeviceState(state);
      }

      return;
    }

    console.error('Got bad message from device', device_id, 'with data', data, 'while on page', state.pageId);
  }

  if (state.pageId === 'home') {
    return <Container><Home /></Container>;
  }

  if (state.pageId === 'resync') {
    return <Container><Resync /></Container>
  }

  if (state.pageId === 'words') {
    return <Container><Words /></Container>
  }
  
  if (state.pageId === 'results') {
    return <Container><Results /></Container>
  }

  throw new Error('Invalid pageId ' + state!.pageId);
}

function Container({ children }: React.Props<{}>) {
  return (
    <div id="screen">
      <div className="page">
        {children}
      </div>

      <svg style={{ top: 0 }} className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#25A18E" fillOpacity="1" d="M0,224L24,213.3C48,203,96,181,144,192C192,203,240,245,288,218.7C336,192,384,96,432,85.3C480,75,528,149,576,176C624,203,672,181,720,154.7C768,128,816,96,864,80C912,64,960,64,1008,80C1056,96,1104,128,1152,128C1200,128,1248,96,1296,122.7C1344,149,1392,235,1416,277.3L1440,320L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path>
      </svg>

      <svg style={{ bottom: 0 }} className="wave" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#25A18E" fillOpacity="1" d="M0,160L26.7,144C53.3,128,107,96,160,117.3C213.3,139,267,213,320,234.7C373.3,256,427,224,480,229.3C533.3,235,587,277,640,256C693.3,235,747,149,800,133.3C853.3,117,907,171,960,197.3C1013.3,224,1067,224,1120,197.3C1173.3,171,1227,117,1280,117.3C1333.3,117,1387,171,1413,197.3L1440,224L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>
      </svg>
    </div>
  )
}

export default Screen;
