import styled from 'styled-components';
import device from '../../util/device-breakpoints';
import { Button } from '../../styles/utils/Button.styled';

const TopBarStyled = styled.header`
  grid-area: topBar;
  overflow: hidden;
  background-color: #2b2d31;
  color: white;
  min-height: 5.6rem;

  @media screen and ${device.tablet} {
    min-height: 7rem;
  }

  display: flex;
  justify-content: space-between;

  > div:nth-of-type(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.5rem;

    @media screen and ${device.laptop} {
      /* gap: 3rem; */
    }
  }
`;

export const MenuButton = styled.div`
  height: 100%;
  padding: 0;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 5.5rem;
  background-color: #35393f;

  button {
    background: none;
    border: none;
    width: 2.5rem;
  }
`;

export const MarkdownLogo = styled.div`
  display: none;

  @media screen and ${device.laptop} {
    display: inline-block;
    margin-right: 4rem;
    position: relative;

    &::after {
      content: '';
      height: 0.1rem;
      width: 5rem;
      background-color: #5a6069;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateX(115%) rotate(90deg);
    }
  }
`;

export const DocumentName = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  div > img {
    min-width: 1.5rem;
  }

  div > p {
    display: none;
    font-weight: 300;
    font-family: 'Roboto';
    color: #7c8187;
    text-transform: capitalize;
    font-size: 1.5rem;

    @media screen and ${device.tablet} {
      display: block;
    }
  }

  div > input {
    font-family: 'Roboto';
    background: none;
    color: white;
    font-weight: 400;
    font-size: 1.5rem;
  }
`;

export const DocOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;
`;

export const SaveButton = styled(Button)`
  min-width: 4rem;
  min-height: 4rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    min-width: 1.6rem;
  }

  p {
    display: none;
    text-transform: capitalize;
  }
  @media screen and ${device.tablet} {
    p {
      display: inline-block;
    }
  }
`;

export const DeleteButton = styled(Button)`
  background: none;
  display: flex;
  justify-content: center;
`;

export default TopBarStyled;
