type WelcomeCardProps = {
  handleChatMode: () => void;
};

const WelcomeCard: React.FC<WelcomeCardProps> = ({ handleChatMode }) => {
  return (
    <>
      <div>
        <h2 className="text-base font-semibold mb-2">Игра в города на время</h2>
      </div>
      <hr className="my-4 border-t border-gray-300" />
      <div>
        <p>Цель: Назвать как можно больше реальных городов.</p>
        <div className="max-w-md mx-auto">
          <ul className="list-disc space-y-2">
            <li>Запрещается повторение городов.</li>
            <li>
              Названий городов на твердый "ъ" и мягкий "ь" знак нет. Из-за этого
              мы пропускаем эту букву и игрок должен назвать город на букву,
              стояющую перед ъ или ь знаком.
            </li>
            <li>
              Каждому игроку дается 2 минуты на размышления, если, спустя это
              время, игрок не вводит слово, он считается проигравшим.
            </li>
          </ul>
        </div>
      </div>
      <button className="bg-indigo-400" onClick={() => handleChatMode()}>Начать игру</button>
    </>
  );
};

export default WelcomeCard;
