interface ModalProps {
  title: string;
  message: string;
  confirmMethod: () => void;
  cancelMethod?: () => void;
}

const Modal = ({ title, message, confirmMethod, cancelMethod }: ModalProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>
      <div>
        <button onClick={confirmMethod}>confirm</button>
        {cancelMethod && <button onClick={cancelMethod}>cancel</button>}
      </div>
    </div>
  );
};

export default Modal;
