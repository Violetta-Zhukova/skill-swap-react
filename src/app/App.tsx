import { useState } from "react";
import { Modal } from "../shared/ui/modal";
import testimage from "./../assets/img/icons/test-img/test-img.png";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <button onClick={handleClick}>{"Открыть модалку"}</button>
      {isOpen && (
        <Modal
          onClose={() => {
            setIsOpen(false);
          }}
          image={testimage}
          title={"Ваше предложение создано"}
          text={"Теперь вы можете предложить обмен"}
          buttonText={"Готово"}
        />
      )}
    </div>
  );
}

export default App;
