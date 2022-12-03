import styled from 'styled-components';

const ModalStyled = styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: -23rem;
  min-width: 100vw;
  min-height: 10rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

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

      button {
        width: 100%;
      }
    }
  }
`;

export default ModalStyled;
