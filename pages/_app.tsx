import "../styles/globals.module.scss";
import type { AppProps } from "next/app";
import { CategoriesContextProvider } from "../context/categories.context";
import { ProductsContextProvider } from "../context/products.context";
import { CartContextProvider } from "../context/cart.context";
import { CustomersContextProvider } from "../context/customers.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomersContextProvider>
      <CategoriesContextProvider>
        <ProductsContextProvider>
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </ProductsContextProvider>
      </CategoriesContextProvider>
    </CustomersContextProvider>
  );
}

export default MyApp;
