import styled from 'styled-components';

interface ModalStyledProps {
  showMenu: boolean;
}

const ModalStyled = styled.div<ModalStyledProps>`
  position: absolute;
  display: block;
  top: 0;
  left: ${({ showMenu }) => (showMenu ? '-23rem' : '0')};
  min-width: 100vw;
  min-height: 10rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: none;
    padding: 0.7em 1em;
    border-radius: 5px;
    background-color: #e46643;
    color: white;
    width: 100%;
  }

  > div {
    background-color: #fff;
    width: min(95%, 34.3rem);
    display: flex;
    flex-direction: column;
    padding: 1.5em;
    gap: 1.5rem;
    border-radius: 4px;

    h3 {
      font-size: 2rem;
    }

    p {
      font-size: 1.4rem;
    }

    > div {
      width: 100%;
      display: flex;
      gap: 1rem;
    }
  }
`;

export default ModalStyled;
