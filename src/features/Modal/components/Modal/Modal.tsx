import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import ModalStyled from './Modal.styled';
import { removeModal } from '@/redux/document-reducer';
import { useModalAction } from '@features/Modal/hooks/modal-actions';

interface ModalProps {
  showMenu: boolean;
}

export const Modal = ({ showMenu }: ModalProps) => {
  const { modalAction, modalInformation } = useAppSelector((state) => state);
  const methods = useModalAction();
  const dispatch = useAppDispatch();

  return (
    <ModalStyled showMenu={showMenu}>
      <div data-cy="modalPrompt">
        <h3>{modalInformation?.title}</h3>
        <p>{modalInformation?.message}</p>

        {modalAction !== 'title' ? (
          <button onClick={() => dispatch(removeModal())}>Cancel</button>
        ) : null}

        {/* <button onClick={dispatch(methods['switch'])}>Confirm</button> */}
        {modalAction !== null && modalAction !== 'title' ? (
          <button onClick={() => dispatch(methods[modalAction])}>
            Confirm
          </button>
        ) : null}

        {modalAction === 'title' ? (
          <button onClick={() => dispatch(removeModal())}>OK</button>
        ) : null}
      </div>
    </ModalStyled>
  );
};
