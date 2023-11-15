import { MessageDetails, Mode } from "../../App";

type GameOverCard = {
  citiesCount: number;
  lastCity: string | undefined;
  explainingMessage: string | undefined;
  onChangeMode: (mode: Mode, details: MessageDetails) => void;
};

const GameOverCard: React.FC<GameOverCard> = ({ citiesCount, lastCity, explainingMessage, onChangeMode }) => {
  return (
    <>
      <div>{explainingMessage ? explainingMessage : 'Твой противник победил!'} Вы проиграли!</div>
      <div>Всего было перечислено городов: {citiesCount}</div>
      <div>Очень неплохой результат!</div>
      <div>{lastCity ? `Последний город, названный победителем: ${lastCity}` : ''}</div>
      <button onClick={() => onChangeMode(Mode.Game, {})}>Начать новую игру</button>
    </>
  )
}

export default GameOverCard;
