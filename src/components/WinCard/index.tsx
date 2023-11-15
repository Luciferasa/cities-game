import { Message } from "../../App";

type WinCardProps = {
  messages: Message[];
};

const WinCard: React.FC<WinCardProps> = ({ messages }) => {
  return (
    <>
      <div>Поздравляем тебя с победой! Твой противник не вспомнил нужный город!</div>
      <div>Всего было перечислено городов: {messages.length}</div>
      <div>Очень неплохой результат!</div>
      <div>Последний город, названный победителем: {messages[messages.length - 1]?.message}</div>
      <button>Начать новую игру</button>
    </>
  )
}

export default WinCard;
