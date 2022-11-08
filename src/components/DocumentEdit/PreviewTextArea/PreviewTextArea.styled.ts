import styled from 'styled-components';

const PreviewTextAreaStyled = styled.section`
  flex: 1;

  div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
  }
`;

export const PreviewText = styled.div`
  padding: 1em;
  overflow-y: auto;
  height: 92vh;
`;

export default PreviewTextAreaStyled;
