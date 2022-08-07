import { createContext, useState } from "react";

export const productsContext = createContext({
  products: [],
  setProducts: () => {},
});

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products, setProducts };
  return (
    <productsContext.Provider value={value}>
      {children}
    </productsContext.Provider>
  );
};
