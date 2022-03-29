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
  console.log(data);
  return {
    "__typename": "User",
    "id": "6241f35e8f645100162e8148",
    "email": "demo@example.com",
    "name": "Demo",
    "role": {
        "__typename": "Role",
        "canManageProducts": false,
        "canManageCart": true,
        "canManageOrders": true
    },
    "cart": [
        {
            "__typename": "CartItem",
            "id": "6241f5c98f645100162e8149",
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
        },
        {
            "__typename": "CartItem",
            "id": "6241f5ce8f645100162e814a",
            "quantity": 1,
            "product": {
                "__typename": "Product",
                "id": "6137f347f3be834c1831fab7",
                "price": 424222,
                "name": "Nike SB Dunk",
                "description": "100% Authentic",
                "photo": {
                    "__typename": "ProductImage",
                    "image": {
                        "__typename": "CloudinaryImage_File",
                        "publicUrlTransformed": "https://res.cloudinary.com/dpol6zi0q/image/upload/v1631056712/sickfits/6137f347f3be834c1831fab5.webp"
                    }
                }
            }
        }
    ]
};
}
