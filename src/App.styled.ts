import styled from 'styled-components';

interface AppStyledProps {
  menuVisible: boolean;
}

const AppStyled = styled.div<AppStyledProps>`
  position: fixed;
  display: grid;
  grid-template-areas:
    'menu topBar topBar'
    'menu document document';

  grid-template-columns: min-content 1fr 1fr;
  grid-template-rows: auto;
  height: 100vh;

  > div {
    transform: ${({ menuVisible }) =>
      menuVisible ? 'translateX(23rem)' : 'translateX(0)'};
    transition: transform 0.3s;
    /* transition for markdown section */
    width: 100vw;
    height: 100%;
  }
`;

export default AppStyled;
