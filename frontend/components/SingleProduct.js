import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <ProductStyles>
      <Head>
        <title>Clothify | {data.Product.name}</title>
      </Head>
      <img
        src={data.Product.photo.image.publicUrlTransformed}
        alt={data.Product.photo.altText}
      />
      <div className="details">
        <h2>{data.Product.name}</h2>
        <p>{data.Product.description}</p>
      </div>
    </ProductStyles>
  );
}
