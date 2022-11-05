import styled from 'styled-components';

const TopBarStyled = styled.header`
  grid-area: topBar;
  overflow: hidden;
  background-color: #2b2d31;
  color: white;
  padding: 1rem 0;

  display: flex;
  justify-content: space-between;

  > div:nth-of-type(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5rem;
  }
`;

export const DocumentName = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
export default TopBarStyled;
