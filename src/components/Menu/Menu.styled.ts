import styled, { keyframes } from 'styled-components';
import { Button } from '../../styles/utils/Button.styled';
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
  transform: translateX(-23rem);
  padding: 2em 1.2em;
  min-width: 23rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #1d1f22;
  color: white;
  overflow-y: auto;
  opacity: ${({ menuVisible }) => (menuVisible ? '1' : '0')};
  /* come back and maybe use another state to make this only happen once, on load? */

  animation-name: ${({ menuVisible }) => (menuVisible ? slideIn : slideOut)};
  animation-duration: 0.3s;
  animation-fill-mode: both;
`;

export const MenuTitle = styled.h2`
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #7c8187;
  font-size: 1.4rem;
  letter-spacing: 2px;
`;

export const MenuDocButton = styled(Button)`
  width: 100%;
  text-transform: capitalize;
  font-size: 1.4rem;
`;

export const MenuLogo = styled.div`
  @media screen and ${device.laptop} {
    display: none;
  }
`;

export default MenuStyled;
