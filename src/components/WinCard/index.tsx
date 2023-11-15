import { MessageDetails, Mode } from "../../App";

type WinCardProps = {
  citiesCount: number;
  lastCity: string | undefined;
  onChangeMode: (mode: Mode, details: MessageDetails) => void;
};

const WinCard: React.FC<WinCardProps> = ({ citiesCount, lastCity, onChangeMode }) => {
  return (
    <>
      <div>Поздравляем тебя с победой! Твой противник не вспомнил нужный город!</div>
      <div>Всего было перечислено городов: {citiesCount}</div>
      <div>Очень неплохой результат!</div>
      <div>{lastCity ? `Последний город, названный победителем: ${lastCity}` : ''}</div>
      <button onClick={() => onChangeMode(Mode.Game, {})}>Начать новую игру</button>
    </>
  )
}

export default WinCard;
