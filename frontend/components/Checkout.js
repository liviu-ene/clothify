import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import styled from 'styled-components';
import SickButton from './styles/SickButton';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    //stop the form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true);
    console.log('we gotta do some work');
    //start page transition
    nProgress.start();
    //create payment method via stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    //handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return;
    }
    //send token to keystone server via custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log('Finished with the order!');
    console.log(order);
    //change the page to view the order
    router.push({
      pathname: '/order/[id]',
      query: {
        id: order.data.checkout.id,
      },
    });
    //close cart
    closeCart();
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <SickButton>Check out now</SickButton>
    </CheckoutFormStyles>
  );
}
export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
