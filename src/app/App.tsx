import { ModalConfirm } from "../widgets/modal-confirm/modal-confirm";

function App() {
  return (
    <div style={{ width: "556px", height: "420px" }}>
      <ModalConfirm
        image=""
        title={"Ваше предложение создано"}
        text={"Теперь вы можете предложить обмен"}
        buttonText={"Готово"}
        onClose={() => {
          console.log("Нажали на кнопку закрыть");
        }}
      />
    </div>
  );
}

export default App;
