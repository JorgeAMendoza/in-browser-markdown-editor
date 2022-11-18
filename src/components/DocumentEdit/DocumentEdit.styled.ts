import styled from 'styled-components';
import device from '../../util/device-breakpoints';

const DocumentEditStyled = styled.main`
  grid-area: document;
  display: flex;
  height: 100%;
  border: 1px solid red;

  > section:nth-of-type(2) {
    display: none;
  }

  @media screen and ${device.tablet} {
    > section:nth-of-type(2) {
      display: block;
    }
  }

  &[data-fullpreview='true'] {
    > section:nth-of-type(1) {
      display: none;
    }
    > section:nth-of-type(2) {
      display: block;
    }
  }
`;

export default DocumentEditStyled;
