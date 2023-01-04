import styled from 'styled-components';
import device from '../../utils/device-breakpoints';

const DocumentEditStyled = styled.main`
  grid-area: document;
  display: flex;
  height: 100%;

  > section:nth-of-type(2) {
    display: none;
  }
  @media screen and (${device.tablet}) {
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

export const NoDocumentContainer = styled.div`
  width: 85%;
  padding-top: 5rem;
  margin: 0 auto;
  text-align: center;
  > p {
    color: white;
    font-size: 2.4rem;
  }

  div > img {
    width: 4rem;
    margin: 0 auto;
    margin-top: 2rem;
  }
`;

export default DocumentEditStyled;
