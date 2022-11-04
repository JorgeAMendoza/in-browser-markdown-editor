import styled from 'styled-components';
import device from '../../../util/device-breakpoints';

const MarkdownTextAreaStyled = styled.section`
  flex: 1;

  div:nth-of-type(1) {
    border: 1px solid black;
    display: flex;
    justify-content: space-between;

    button {
      display: block;
    }

    @media screen and (${device.tablet}) {
      button {
        display: none;
      }
    }
  }
`;

export default MarkdownTextAreaStyled;
