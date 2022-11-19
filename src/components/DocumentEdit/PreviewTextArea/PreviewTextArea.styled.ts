import styled from 'styled-components';

const PreviewTextAreaStyled = styled.section`
  flex: 1;

  div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.previewArea.header};
    padding: 0.9em;

    h1 {
      color: ${({ theme }) => theme.previewArea.color};
      font-weight: 500;
      font-family: 'Roboto';
      font-size: 1.4rem;
      font-style: normal;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    button {
      background: none;
      border: none;
      
    }
  }
`;

export const PreviewText = styled.div`
  padding: 1em;
  overflow-y: auto;
  height: 92vh;
`;

export default PreviewTextAreaStyled;
