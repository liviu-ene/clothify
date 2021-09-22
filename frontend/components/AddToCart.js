import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY, useUser } from './User';
import Router from 'next/router';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const me = useUser();
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id: id,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function helperAddToCart() {
    if (!me) {
      Router.push({ pathname: '/signin' });
    } else {
      return addToCart();
    }
  }

  return (
    <button disabled={loading} type="button" onClick={helperAddToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
}
