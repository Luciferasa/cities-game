import { useEffect, useState } from "react";
import WelcomeCard from "./components/WelcomeCard";
import Chat from "./components/Chat";
import { cities } from "./cities";
import GameOverCard from "./components/GameOverCard";
import WinCard from "./components/WinCard";

export type Message = {
  isPlayer: boolean;
  message: string;
  key: string;
}

const timeoutIntervals = [1000, 2000, 4000];

function App() {
  const [isChatMode, setIsChatMode] = useState(false);
  const [lastLetter, setLastLetter] = useState('');
  const [usedCities, setUsedCities] = useState<string[]>([]);
  const [isPlayer, setIsPlayer] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinGame, setIsWinGame] = useState(false);
  const [explainingMessage, setExplainingMessage] = useState('');

  useEffect(() => {
    if (!isPlayer) {
      const randomIndex = Math.floor(Math.random() * timeoutIntervals.length);
      const randomTimeout = timeoutIntervals[randomIndex];
      const timeout = setTimeout(() => {
        playComputer();
      }, randomTimeout)
      return () => clearTimeout(timeout);
    }
  }, [isPlayer])

  const handleChatMode = () => {
    setIsChatMode(true);
  }

  const handleMessage = (city: string) => {
    let wantedCity = cities.find((item) => city.toLowerCase() === item.toLowerCase().toLowerCase());
    if (city[0]?.toLowerCase() !== lastLetter?.toLowerCase() && usedCities.length) {
      setIsGameOver(true);
      setExplainingMessage(`Вы должны были написать город на букву "${lastLetter}"!`)
      return;
    } else if (!wantedCity) {
      setIsGameOver(true);
      setExplainingMessage('Такого города не существует!')
      return;
    } else if (usedCities.includes(wantedCity)) {
      setIsGameOver(true);
      setExplainingMessage('Такой город уже был!')
      return;
    } else if (wantedCity[wantedCity.length-1] === 'ь' || wantedCity[wantedCity.length-1] === 'ъ' || wantedCity[wantedCity.length-1] === 'ъ') {
      setLastLetter(wantedCity[wantedCity.length-2]);
    } else {
      setLastLetter(wantedCity[wantedCity.length-1]);
    }
    setUsedCities([wantedCity, ...usedCities]);
    setMessages([...messages, { isPlayer: true, message: wantedCity, key: wantedCity }]);
    setIsPlayer(false);
  }

  const playComputer = () => {
    for (let city of cities) {
      if (city[0].toLowerCase() === lastLetter && !usedCities.includes(city)) {
        if (city[city.length-1] === 'ь' || city[city.length-1] === 'ъ' || city[city.length-1] === 'ы') {
          setLastLetter(city[city.length-2]);
        } else {
          setLastLetter(city[city.length-1]);
        }
        setUsedCities([city, ...usedCities]);
        setMessages([...messages, { isPlayer: false, message: city, key: city }]);
        setIsPlayer(true);
        return;
      }
    }
    setIsWinGame(true);
  }

  return (
    <div className="bg-white shadow-md rounded-md mb-4">
      {isChatMode
        ? (!isWinGame && !isGameOver ? <Chat isPlayer={isPlayer} messages={messages} handleMessage={handleMessage} /> : null)
        : <WelcomeCard handleChatMode={handleChatMode} />}
      {isGameOver && <GameOverCard explainingMessage={explainingMessage} messages={messages} />}
      {isWinGame && <WinCard messages={messages} />}
    </div>
  );
}

export default App;
