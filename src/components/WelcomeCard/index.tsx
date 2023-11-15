type WelcomeCardProps = {
  handleChatMode: () => void;
};

const WelcomeCard: React.FC<WelcomeCardProps> = ({ handleChatMode }) => {
  return (
    <>
      <div>
        <h2 className="text-base font-semibold text-center mt-4 prose">Игра в города на время</h2>
      </div>
      <hr className="my-4 border-t border-gray-300" />
      <div className="p-4 prose">
        <p>Цель: Назвать как можно больше реальных городов.</p>
        <div className="max-w-md mx-auto">
          <ul className="list-disc space-y-2 mb-0">
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
      <button className="block bg-violet-600 rounded text-white p-2 my-8 mt-0 mx-auto" onClick={() => handleChatMode()}>Начать игру</button>
    </>
  );
};

export default WelcomeCard;
