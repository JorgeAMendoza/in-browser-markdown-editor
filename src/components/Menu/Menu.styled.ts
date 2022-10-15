import styled from 'styled-components';

interface MenuStyledProps {
  menuVisible: boolean;
}

const MenuStyled = styled.section<MenuStyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.2s ease-in;
  min-width: 23rem;
  transform: ${({ menuVisible }) =>
    menuVisible ? 'translateX(0)' : 'translateX(-23rem)'};
  height: 100vh;
`;

export default MenuStyled;
