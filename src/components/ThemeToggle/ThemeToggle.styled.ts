import styled from 'styled-components';

const ThemeToggleStyled = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Toggle = styled.button`
  position: relative;
  max-height: 2.4rem;
  min-width: 4.8rem;
  background-color: #5a6069;
  border-radius: 14px;
  border: none;

  &[data-toggle='light'] {
    &::after {
      transform: translate(220%, -50%);
    }
  }

  &[data-toggle='dark'] {
    &::after {
      transform: translate(60%, -50%);
    }
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 0;
    background-color: white;
    content: '';
    width: 13px;
    height: 13px;
    z-index: 1;
    border-radius: 50%;
    transition: transform 0.15s ease-in;
    /* transition for theme toggle */
  }
`;

export default ThemeToggleStyled;
