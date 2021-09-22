import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, //tells apollo we'll tale care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      //read the number of items on the page
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;

      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      //check if we have existing items
      //filter is to check if it's undefined
      const items = existing.slice(skip, skip + first).filter((x) => x);

      //If there ARE items AND there aren't enough items to satisfy how many were requested
      //AND we are on the last page THEN just send it.
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      //we don't have any items, we must go to the network to fetch them
      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        return items;
      }

      return false; //fallback to network
    },
    //this runs when apollo comes back from the network with our product
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      //if there are existing items in the cache then we'll take a copy otherwise
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
