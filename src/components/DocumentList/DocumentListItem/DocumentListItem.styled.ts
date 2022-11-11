import styled from 'styled-components';

const DocumentListItemStyled = styled.li`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const ListItemInfo = styled.div`
  p {
    font-family: 'Roboto', sans-serif;
    font-size: 1.4rem;
    color: #7c8187;
    font-weight: 300;
  }

  h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

export default DocumentListItemStyled;
