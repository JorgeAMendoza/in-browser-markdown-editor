import styled, { keyframes } from 'styled-components';
import device from '../../util/device-breakpoints';

interface MenuStyledProps {
  menuVisible: boolean;
}

const slideIn = keyframes`
  from{
    visibility: visible;
    transform: translateX(-23rem);
  }
  to{
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    visibility: visible;
    transform: translateX(0);
  }

  to{
    visibility: hidden;
    transform: translateX(-23rem);
  }
`;

const MenuStyled = styled.section<MenuStyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  padding: 1.2em;
  transition: transform 0.2s ease-in;
  min-width: 23rem;
  transform: translateX(-23rem);
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #2b2d31;
  color: white;
  overflow-y: auto;

  animation-name: ${({ menuVisible }) => (menuVisible ? slideIn : slideOut)};
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
`;

export const MenuLogo = styled.div`
  @media screen and ${device.tablet} {
    display: none;
  }
`;

export default MenuStyled;
