import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  function toggleCart() {
    setCartOpen(!cart);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

//custom hook for accessing the cart local state
//so we don't have to import both useCart and localStateContext
function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
