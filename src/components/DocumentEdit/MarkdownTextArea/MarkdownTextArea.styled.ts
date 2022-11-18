import styled from 'styled-components';
import device from '../../../util/device-breakpoints';

const MarkdownTextAreaStyled = styled.section`
  flex: 1;
  border: 1px solid yellow;

  textarea {
    vertical-align: top;
    min-width: 100%;
    height: 92vh;
    display: inline-block;
    padding: 1em;
    padding-bottom: 3em;
    resize: none;
    border: none;
  }

  div:nth-of-type(1) {
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
