interface ModalProps {
  title: string;
  message: string;
  children: React.ReactNode;
}

const Modal = ({
  title,
  message,
  children,
}: ModalProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>
      <div>{children}</div>
    </div>
  );
};

export default Modal;
