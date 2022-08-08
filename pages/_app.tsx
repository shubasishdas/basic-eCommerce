import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CategoriesContextProvider } from "../context/categories.context";
import { ProductsContextProvider } from "../context/products.context";
import { CartContextProvider } from "../context/cart.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CategoriesContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </ProductsContextProvider>
    </CategoriesContextProvider>
  );
}

export default MyApp;
