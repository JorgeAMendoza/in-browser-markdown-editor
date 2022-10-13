import styled from 'styled-components';

const AppStyled = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-areas:
    'menu topBar topBar'
    'menu document document';

  grid-template-columns: min-content 1fr 1fr;
  grid-template-rows: auto;
`;

export default AppStyled;
