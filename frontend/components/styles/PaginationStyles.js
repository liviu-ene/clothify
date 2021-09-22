import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 28rem;
  border: 1px solid var(--lightGrey);
  border-radius: 10px;
  & > * {
    margin: 0;
    color: black;
    padding: 15px 30px;
    border-right: 1px solid var(--lightGrey);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

export default PaginationStyles;
