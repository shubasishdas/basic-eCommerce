import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CategoriesContextProvider } from "../context/categories.context";
import { ProductsContextProvider } from "../context/products.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CategoriesContextProvider>
      <ProductsContextProvider>
        <Component {...pageProps} />
      </ProductsContextProvider>
    </CategoriesContextProvider>
  );
}

export default MyApp;
