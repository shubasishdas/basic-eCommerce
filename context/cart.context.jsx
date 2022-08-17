import { createContext, useEffect, useState } from "react";

export const cartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
});

const addCartItem = (cartItems, productToCart, isClickedOnMinus) => {
  const existingCartItem = cartItems?.find(
    (item) => item.id === productToCart.id
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToCart.id
        ? {
            ...item,
            quantity: isClickedOnMinus ? item.quantity - 1 : item.quantity + 1,
          }
        : item
    );
  }

  return [...cartItems, { ...productToCart, quantity: 1 }];
};

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToCart, isClickedOnMinus) => {
    setCartItems(addCartItem(cartItems, productToCart, isClickedOnMinus));
  };

  const value = {
    cartItems,
    setCartItems,
    addItemToCart,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
