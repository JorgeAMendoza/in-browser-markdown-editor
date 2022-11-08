import styled from 'styled-components';

const DocumentEditStyled = styled.main`
  grid-area: document;

  &[data-fullpreview='true'] {
    > section:nth-of-type(1) {
      display: none;
    }
  }

  display: flex;
  height: 100%;
`;

export default DocumentEditStyled;
