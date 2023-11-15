import { MessageDetails, Mode } from "../../App";

type WinCardProps = {
  citiesCount: number;
  lastCity: string | undefined;
  onChangeMode: (mode: Mode, details: MessageDetails) => void;
};

const WinCard: React.FC<WinCardProps> = ({ citiesCount, lastCity, onChangeMode }) => {
  return (
    <>
      <div className="w-full flex flex-col h-full justify-evenly text-center prose">
        <div>
          <div>Поздравляем тебя с победой!</div>
          <div>Твой противник не вспомнил нужный город!</div>
        </div>
        <div className="font-semibold text-xl text-green-600">00:00</div>
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
    </>
  )
}

export default WinCard;
