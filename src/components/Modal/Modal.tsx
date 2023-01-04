import ModalStyled from './Modal.styled';

interface ModalProps {
  title: string;
  message: string;
  children: React.ReactNode;
  showMenu: boolean;
}

const Modal = ({ title, message, children, showMenu }: ModalProps) => {
  return (
    <ModalStyled showMenu={showMenu}>
      <div data-cy="modalPrompt">
        <h3>{title}</h3>
        <p>{message}</p>
        <div>{children}</div>
      </div>
    </ModalStyled>
  );
};

export default Modal;
