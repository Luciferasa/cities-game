import { MessageDetails, Mode } from "../../App";

type GameOverCard = {
  citiesCount: number;
  lastCity: string | undefined;
  explainingMessage: string | undefined;
  onChangeMode: (mode: Mode, details: MessageDetails) => void;
};

const GameOverCard: React.FC<GameOverCard> = ({ citiesCount, lastCity, explainingMessage, onChangeMode }) => {
  return (
    <div className="w-full flex flex-col h-full justify-evenly text-center prose">
        <div>
          <div>{explainingMessage ? explainingMessage : 'Твой противник победил!'}</div>
          <div>Твой противник победил!</div>
        </div>
        <div className="font-semibold text-xl text-red-600">00:00</div>
        <div>
          <div>Всего было перечислено городов: {citiesCount}</div>
          <div>Очень неплохой результат!</div>
        </div>
        {lastCity &&
          <div>
            <div>Последний город, названный победителем</div>
            <strong>{lastCity}</strong>
          </div>
        }
        <button
          className="block bg-violet-600 rounded text-white p-2 my-4 mt-0 mx-auto"
          onClick={() => onChangeMode(Mode.Game, {})}
        >
          Начать новую игру
        </button>
      </div>
  )
}

export default GameOverCard;
