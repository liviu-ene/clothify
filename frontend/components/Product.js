import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';
import { useUser } from './User';
import HideButtons from './HideButtons';
import PleaseSignIn from './PleaseSignIn';

export default function Product({ product }) {
  const user = useUser();
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>

      <div className="buttonList">
        <AddToCart id={product.id} />
        {user && (
          <>
            <HideButtons>
              <DeleteProduct id={product.id}>Delete</DeleteProduct>
              <Link
                href={{
                  pathname: '/update',
                  query: {
                    id: product.id,
                  },
                }}
              >
                Edit ✏️
              </Link>
            </HideButtons>
          </>
        )}
      </div>
    </ItemStyles>
  );
}
