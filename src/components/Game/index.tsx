import Chat from "../Chat";
import { Message, MessageDetails, Mode } from "../../App";
import { cities } from "../../cities";
import { useEffect, useState } from "react";

type GameProps = {
  onChangeMode: (mode: Mode, details: MessageDetails) => void;
}
const timeoutIntervals = [1000, 2000, 4000];

const Game: React.FC<GameProps> = ({ onChangeMode }) => {
  const [lastLetter, setLastLetter] = useState('');
  const [usedCities, setUsedCities] = useState<string[]>([]);
  const [isPlayer, setIsPlayer] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!isPlayer) {
      const randomIndex = Math.floor(Math.random() * timeoutIntervals.length);
      const randomTimeout = timeoutIntervals[randomIndex];
      const timeout = setTimeout(() => {
        respondAsComputer();
      }, randomTimeout)
      return () => clearTimeout(timeout);
    }
  }, [isPlayer]);

  const handleMessage = (city: string) => {
    let wantedCity = cities.find((item) => city.toLowerCase() === item.toLowerCase().toLowerCase());
    if (city[0]?.toLowerCase() !== lastLetter?.toLowerCase() && usedCities.length) {
      onChangeMode(Mode.GameOver, {
        messageDetails: `Вы должны были написать город на букву "${lastLetter.toUpperCase()}"!`,
        citiesCount: messages.length,
        lastCity: messages[messages.length - 1]?.message,
      })
      return;
    } else if (!wantedCity) {
      onChangeMode(Mode.GameOver, {
        messageDetails: 'Такого города не существует!',
        citiesCount: messages.length,
        lastCity: messages[messages.length - 1]?.message,
      })
      return;
    } else if (usedCities.includes(wantedCity)) {
      onChangeMode(Mode.GameOver, {
        messageDetails: 'Такой город уже был!',
        citiesCount: messages.length,
        lastCity: messages[messages.length - 1]?.message,
      })
      return;
    } else if (wantedCity[wantedCity.length-1] === 'ь' || wantedCity[wantedCity.length-1] === 'ъ' || wantedCity[wantedCity.length-1] === 'ъ') {
      setLastLetter(wantedCity[wantedCity.length-2]);
    } else {
      setLastLetter(wantedCity[wantedCity.length-1]);
    }
    setUsedCities([wantedCity, ...usedCities]);
    setMessages([...messages, { isPlayer: true, message: wantedCity, key: wantedCity }]);
    setIsPlayer(false);
  };

  const respondAsComputer = () => {
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
    onChangeMode(Mode.Win, { citiesCount: messages.length, lastCity: messages[messages.length - 1].message });
  };

  const onGameOver = (message: string) => {
    onChangeMode(Mode.GameOver, {
      messageDetails: message,
      citiesCount: messages.length,
      lastCity: messages[messages.length - 1]?.message
    });
  };

  return (
    <Chat isPlayer={isPlayer} messages={messages} handleMessage={handleMessage} handleGameOver={onGameOver} />
  )
}

export default Game;
