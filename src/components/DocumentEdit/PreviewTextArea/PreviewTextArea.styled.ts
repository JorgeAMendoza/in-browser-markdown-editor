import styled from 'styled-components';

const PreviewTextAreaStyled = styled.section`
  flex: 1;
  border-left: 1px solid ${({ theme }) => theme.seperatorOutline};
  min-width: 50%;
  &[data-fullpreview='false'] {
    border-left: none;
  }
  div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.previewArea.header};
    padding: 0.9em;
    h1 {
      color: ${({ theme }) => theme.previewArea.header};
      font-weight: 500;
      font-family: 'Roboto';
      font-size: 1.4rem;
      font-style: normal;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: ${({ theme }) => theme.previewArea.color};
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
  & > * {
    margin-block-end: 2rem;
  }
  a {
    color: inherit;
    font-weight: inherit;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${({ theme }) => theme.previewArea.previewMarkdown.header};
  }
  h2 {
    font-weight: lighter;
  }
  h6 {
    color: #e46643;
  }
  p {
    color: ${({ theme }) => theme.previewArea.previewMarkdown.text};
    line-height: 2.4rem;
  }
  ul li,
  ol li {
    color: ${({ theme }) => theme.previewArea.previewMarkdown.text};
    margin-left: 2.75rem;
    &:not(:last-child) {
      margin-block-end: 1.25rem;
    }
  }
  li {
    padding-left: 1rem;
  }
  ul li {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: #e46643;
      border-radius: 50%;
      top: 50%;
      left: 0;
      transform: translate(-250%, -50%);
    }
  }
  code {
    color: ${({ theme }) => theme.previewArea.previewMarkdown.codeBlock.color};
  }
  pre {
    background-color: ${({ theme }) =>
      theme.previewArea.previewMarkdown.codeBlock.background};
    padding: 1.75em;
    border-radius: 4px;
    overflow-x: auto;
  }
  blockquote {
    background-color: ${({ theme }) =>
      theme.previewArea.previewMarkdown.blockquote.background};
    padding: 1.75em;
    font-weight: bold;
    border-radius: 4px;
    p {
      color: ${({ theme }) =>
        theme.previewArea.previewMarkdown.blockquote.color};
      line-height: 2.4rem;
    }
  }
`;

export default PreviewTextAreaStyled;
