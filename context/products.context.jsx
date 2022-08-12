import { createContext, useState } from "react";

export const productsContext = createContext({
  products: [],
  setProducts: () => {},
  filteredProducts: [],
  setFilteredProducts: () => {},
});

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const value = {
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
  };
  return (
    <productsContext.Provider value={value}>
      {children}
    </productsContext.Provider>
  );
};
