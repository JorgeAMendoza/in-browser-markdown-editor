import ModalStyled from './Modal.styled';

interface ModalProps {
  title: string;
  message: string;
  children: React.ReactNode;
}

const Modal = ({ title, message, children }: ModalProps) => {
  return (
    <ModalStyled data-testid="modalPrompt">
      <h3>{title}</h3>
      <p>{message}</p>
      <div>{children}</div>
    </ModalStyled>
  );
};

export default Modal;
