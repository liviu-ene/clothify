import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--gradient-right);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

export default function RemoveFromCart({ id }) {
  const [removeFromCart] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: {
      id: id,
    },
    update,
  });

  return (
    <BigButton type="button" onClick={removeFromCart}>
      &times;
    </BigButton>
  );
}
