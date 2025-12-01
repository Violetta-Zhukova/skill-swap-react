import { useState } from "react";
import { Modal } from "../shared/ui/modal";

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
        >
          <h2>{"TEST"}</h2>
          <p>{"Test text"}</p>
          <button onClick={() => setIsOpen(false)}>{"Закрыть модалку"}</button>
        </Modal>
      )}
    </div>
  );
}

export default App;
