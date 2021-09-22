import Products from '../../components/Products';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/router';

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);

  return (
    <div>
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
