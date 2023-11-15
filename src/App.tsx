import { useState } from "react";
import WelcomeCard from "./components/WelcomeCard";
import Game from "./components/Game";
import WinCard from "./components/WinCard";
import GameOverCard from "./components/GameOverCard";

export type Message = {
  isPlayer: boolean;
  message: string;
  key: string;
}

export enum Mode {
  Welcome,
  Game,
  Win,
  GameOver,
}

export type MessageDetails = {
  citiesCount?: number;
  lastCity?: string;
  messageDetails?: string;
}

function App() {
  const [mode, setMode] = useState(Mode.Welcome);
  const [citiesCount, setCitiesCount] = useState<number | undefined>(0);
  const [lastCity, setLastCity] = useState<string | undefined>('');
  const [messageDetails, setMessageDetails] = useState<string | undefined>('');

  const handleGameMode = () => {
    setMode(Mode.Game);
  };

  const handleMode = (mode: Mode, { citiesCount, lastCity, messageDetails }: MessageDetails) => {
    setMode(mode);

    setCitiesCount(citiesCount);
    setLastCity(lastCity);
    setMessageDetails(messageDetails);
  }

  return (
    <div className="bg-white shadow-md rounded-md mb-4">
      {mode === Mode.Welcome && <WelcomeCard handleChatMode={handleGameMode} />}
      {mode === Mode.Game && <Game onChangeMode={handleMode} />}
      {mode === Mode.Win && <WinCard citiesCount={citiesCount!} lastCity={lastCity} onChangeMode={handleMode} />}
      {mode === Mode.GameOver && (
        <GameOverCard lastCity={lastCity} citiesCount={citiesCount!} explainingMessage={messageDetails} onChangeMode={handleMode} />)
      }
    </div>
  );
}

export default App;
