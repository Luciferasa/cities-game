import { useEffect, useState } from "react";
import { Message } from "../../App";
import { getLastLetter } from "../utils";

type ChatProps = {
  handleMessage: (city: string) => void;
  messages: Message[];
  isPlayer: boolean;
  handleGameOver: (message: string) => void;
};

const time = 2 * 60;

const Chat: React.FC<ChatProps> = ({ handleMessage, messages, isPlayer, handleGameOver }) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState(time);
  const [timerWidth, setTimerWidth] = useState(100);

  useEffect(() => {
    if (messages.length) {
      resetTimer();
    }
  }, [messages.length]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimerWidth((prevWidth) => prevWidth - 1);
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    } else {
      handleGameOver('К сожалению, твое время вышло!');
    }
  }, [messages.length, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimeRemaining(time);
  };

  const getPlaceholderText = () => {
    if (!isPlayer) {
      return "Ожидаем ответа соперника...";
    } else if (!messages.length) {
      return "Напишите любой город, например: Где вы живете?";
    } else {
      const city = messages[messages.length - 1].message;
      const letter = getLastLetter(city);
      return `Знаете город на букву "${letter.toUpperCase()}"?`
    }
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex justify-between p-4 items-center">
        <h2 className="">
          {isPlayer ? 'Сейчас ваша очередь' : 'Сейчас очередь соперника'}
        </h2>
        <strong className="text-base font-semibold text-center">{formatTime(timeRemaining)}</strong>
      </div>
      <hr className="bg-violet-300 h-1" style={{ width: `${timerWidth}%` }} />

      <div className={"p-4 overflow-y-auto flex-auto " + (messages.length === 0 && "flex items-center justify-center")}>
        {messages.length === 0 && <span className="text-gray-400">Первый участник вспоминает города...</span>}
        {messages.map((message) => (
          <div
            className={`flex items-center mb-2 ${
              message.isPlayer ? 'justify-end' : ''
            }`}
          >
            <div
              className={`rounded-lg p-3 bg-${
                message.isPlayer  ? 'violet-600 text-white rounded-br-none' : 'gray-100 rounded-bl-none'
              }`}
            >
              {message?.message}
            </div>
          </div>
        ))}
        {messages.length !== 0 && <div className="text-center text-gray-400">Всего перечислено городов: {messages.length}</div> }
      </div>

      <form
        className="p-4"
        onSubmit={(e) => {
          handleMessage(newMessage);
          setNewMessage('');
          e.preventDefault();
        }}>
        <div className="bg-gray-100 p-2 rounded-lg flex">
          <input
            type="text"
            placeholder={getPlaceholderText()}
            className="flex-grow border bg-transparent color-black border-0 px-2 focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value.trim())}
          />
          <button className="bg-violet-600 text-white rounded-lg p-2 ml-2" type="submit">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_7618_580)">
                <path d="M8.33337 11.6667L17.5 2.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.5001 2.5L12.0834 17.5C12.0468 17.5798 11.9881 17.6474 11.9143 17.6948C11.8404 17.7422 11.7545 17.7674 11.6667 17.7674C11.579 17.7674 11.493 17.7422 11.4192 17.6948C11.3453 17.6474 11.2866 17.5798 11.2501 17.5L8.33339 11.6667L2.50006 8.75C2.42027 8.71344 2.35266 8.65474 2.30526 8.58088C2.25786 8.50701 2.23267 8.4211 2.23267 8.33333C2.23267 8.24557 2.25786 8.15965 2.30526 8.08579C2.35266 8.01193 2.42027 7.95323 2.50006 7.91667L17.5001 2.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_7618_580">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat;
