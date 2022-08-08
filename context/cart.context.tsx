import { createContext, useState } from "react";

export const cartContext = createContext({
  cartCount: {},
  setCartCount: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

const addCartItem = (cartItems, productToCart, isClickedOnMinus) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToCart.id
  );

  console.log({ isClickedOnMinus });

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
  const [cartCount, setCartCount] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToCart, isClickedOnMinus) => {
    setCartItems(addCartItem(cartItems, productToCart, isClickedOnMinus));
  };

  const value = {
    cartCount,
    setCartCount,
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
