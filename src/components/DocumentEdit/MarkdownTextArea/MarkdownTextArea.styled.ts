import styled from 'styled-components';
import device from '../../../utils/device-breakpoints';

const MarkdownTextAreaStyled = styled.section`
  flex: 1;
  min-width: 50%;
  textarea {
    vertical-align: top;
    min-width: 100%;
    height: 92vh;
    display: inline-block;
    padding: 1em;
    padding-bottom: 3em;
    resize: none;
    border: none;
    color: ${({ theme }) => theme.markdownArea.color};
    background-color: ${({ theme }) => theme.markdownArea.background};
  }
  div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.markdownArea.header};
    color: ${({ theme }) => theme.markdownArea.color};
    padding: 0.9em;
    h1 {
      font-weight: 500;
      font-family: 'Roboto';
      font-size: 1.4rem;
      font-style: normal;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: ${({ theme }) => theme.markdownArea.headerColor};
    }
    button {
      display: block;
      background: none;
      border: none;
      min-width: 1.6rem;
    }
    @media screen and (${device.tablet}) {
      button {
        display: none;
      }
    }
  }
`;

export default MarkdownTextAreaStyled;
