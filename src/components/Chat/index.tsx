import { useEffect, useState } from "react";
import { Message } from "../../App";

type ChatProps = {
  handleMessage: (city: string) => void;
  messages: Message[];
  isPlayer: boolean;
};

const Chat: React.FC<ChatProps> = ({ handleMessage, messages, isPlayer }) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState(120);

  useEffect(() => {
    if (messages.length) {
      resetTimer();
    }
  }, [messages.length]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [messages.length]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimeRemaining(120);
  };

  const getPlaceholderText = () => {
    if (!isPlayer) {
      return "Ожидаем ответа соперника...";
    } else if (!messages.length) {
      return "Напишите любой город, например: Где вы живете?";
    } else {
      const city = messages[messages.length - 1].message;
      let letter = city[city.length - 1] === 'ъ' || city[city.length - 1] === 'ь' ? city[city.length - 2] : city[city.length - 1];
      return `Знаете город на букву "${letter.toUpperCase()}"?`
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold">
            {isPlayer ? 'Сейчас ваша очередь' : 'Сейчас очередь соперника'}
            {formatTime(timeRemaining)}
          </h2>
        </div>

        <div className="p-4">
          {messages.map((message) => (
            <div
              className={`flex items-center mb-2 ${
                message.isPlayer ? 'justify-end' : ''
              }`}
            >
              <div
                className={`bg-${
                  message.isPlayer ? 'green' : 'blue'
                }-500 rounded-full p-2 h-8 w-8 flex items-center justify-center ${
                  message.isPlayer ? 'ml-2' : 'mr-2'
                }`}
              >
              </div>
              <div
                className={`bg-${
                  message.isPlayer  ? 'blue' : 'gray'
                }-100 p-3 rounded-lg`}
              >
                <p className="text-gray-800">{message?.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div>Всего перечислено городов: {messages.length}</div>
        <div className="bg-gray-100 p-4 flex">
          <input
            type="text"
            placeholder={getPlaceholderText()}
            className="flex-grow border rounded-full p-2 focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-full p-2 ml-2"
            onClick={() => {
              handleMessage(newMessage);
              setNewMessage('');
            }}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat;
