import Chat from "../Chat";
import { Message, MessageDetails, Mode } from "../../App";
import { cities } from "../../cities";
import { useEffect, useState } from "react";
import { getLastLetter } from "../utils";

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
    };
  }, [isPlayer]);

  const handleMessage = (city: string) => {
    let wantedCity = cities.find((item) => city.toLowerCase() === item.toLowerCase().toLowerCase());
    if (city[0]?.toLowerCase() !== lastLetter?.toLowerCase() && usedCities.length) {
      onChangeMode(Mode.GameOver, {
        messageDetails: `Вы должны были написать город на букву "${lastLetter.toUpperCase()}"!`,
        citiesCount: messages.length,
        lastCity: messages[messages.length - 1]?.message,
      });
      return;
    } else if (!wantedCity) {
      onChangeMode(Mode.GameOver, {
        messageDetails: 'Такого города не существует!',
        citiesCount: messages.length,
        lastCity: messages[messages.length - 1]?.message,
      });
      return;
    } else if (usedCities.includes(wantedCity)) {
      onChangeMode(Mode.GameOver, {
        messageDetails: 'Такой город уже был!',
        citiesCount: messages.length,
        lastCity: messages[messages.length - 1]?.message,
      })
      return;
    } else {
      setLastLetter(getLastLetter(wantedCity));
    }
    setUsedCities([wantedCity, ...usedCities]);
    setMessages([...messages, { isPlayer: true, message: wantedCity, key: wantedCity }]);
    setIsPlayer(false);
  };

  const respondAsComputer = () => {
    let suitableCities = [];
    for (let city of cities) {
      if (city[0].toLowerCase() === lastLetter && !usedCities.includes(city)) {
        suitableCities.push(city);
      }
    }
    if (suitableCities.length) {
      const randomIndex = Math.floor(Math.random() * suitableCities.length);
      const randomCity = suitableCities[randomIndex];

      setLastLetter(getLastLetter(randomCity));

      setUsedCities([randomCity, ...usedCities]);
      setMessages([...messages, { isPlayer: false, message: randomCity, key: randomCity }]);
      setIsPlayer(true);
    } else {
      onChangeMode(Mode.Win, { citiesCount: messages.length, lastCity: messages[messages.length - 1].message });
    }
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
