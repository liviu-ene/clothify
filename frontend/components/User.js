import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        role {
          canManageProducts
          canManageCart
          canManageOrders
        }
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return {
    "__typename": "User",
    "id": "60d116b1c44a614e1c2a8f8d",
    "email": "remember5n@gmail.com",
    "name": "Ene Liviu",
    "role": {
        "__typename": "Role",
        "canManageProducts": true,
        "canManageCart": true,
        "canManageOrders": true
    },
    "cart": [
        {
            "__typename": "CartItem",
            "id": "6240b156b8ad9a566c0426f2",
            "quantity": 1,
            "product": {
                "__typename": "Product",
                "id": "6137f259f3be834c1831fab4",
                "price": 53334,
                "name": "Yeezy Boost 350",
                "description": "signed by kanye himself",
                "photo": {
                    "__typename": "ProductImage",
                    "image": {
                        "__typename": "CloudinaryImage_File",
                        "publicUrlTransformed": "https://res.cloudinary.com/dpol6zi0q/image/upload/v1631056473/sickfits/6137f258f3be834c1831fab2.webp"
                    }
                }
            }
        }
    ]
}
}
