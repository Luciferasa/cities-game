import { Message } from "../../App";

type LossCard = {
  messages: Message[];
  explainingMessage: string;
};

const GameOverCard: React.FC<LossCard> = ({ messages, explainingMessage }) => {
  return (
    <>
      <div>{explainingMessage ? explainingMessage : 'К сожалению, твое время вышло! Твой противник победил!'}</div>
      <div>Всего было перечислено городов: {messages.length}</div>
      <div>Очень неплохой результат!</div>
      <div>Последний город, названный победителем: {messages[messages.length - 1]?.message}</div>
      <button>Начать новую игру</button>
    </>
  )
}

export default GameOverCard;
