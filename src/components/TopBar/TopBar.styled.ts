import styled from 'styled-components';
import device from '../../util/device-breakpoints';

const TopBarStyled = styled.header`
  grid-area: topBar;
  overflow: hidden;
  background-color: #2b2d31;
  color: white;
  padding: 1rem 0;
  min-height: 5.5rem;

  display: flex;
  justify-content: space-between;

  > div:nth-of-type(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.5rem;

    @media screen and ${device.laptop} {
      gap: 5rem;
    }
  }
`;

export const MenuButton = styled.button`
  border: 1px solid yellow;
`;

export const MarkdownLogo = styled.div`
  display: none;

  @media screen and ${device.laptop} {
    display: inline-block;
  }
`;

export const DocumentName = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  div > p {
    display: none;

    @media screen and ${device.tablet} {
      display: block;
    }
  }
`;

export const DocOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SaveButton = styled.button`
  display: flex;
  p {
    display: none;
  }
  @media screen and ${device.tablet} {
    p {
      display: inline-block;
    }
  }
`;
export default TopBarStyled;
