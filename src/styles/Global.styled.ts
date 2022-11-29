import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *,
  *::after,
  *::before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    line-height: 1.4;
  }
  body{
    font-family: 'Roboto Slab', serif;
    font-size: 1.6rem;
    min-height: 100vh;
    position:relative;
    background-color: ${({ theme }) => theme.background};
  } 
  img,svg {
    max-width: 100%;
    display: block;
  }
  input {
    font-family: inherit;
    border: none;
  }
  ul{
    list-style: none;
  }
  p,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }
`;
