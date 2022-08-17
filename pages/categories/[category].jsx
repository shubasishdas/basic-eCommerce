import { useRouter } from "next/router";
import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { productsContext } from "../../context/products.context";
import {
  Container,
  Card,
  Header,
  Segment,
  Dimmer,
  Loader,
  Image,
} from "semantic-ui-react";
import ProductCard from "../../components/product-card/product-card.component";
import Hero from "../../components/hero/hero.component";
import Footer from "../../components/footer/footer.component";
import PaginationWrapper from "../../components/pagination/pagination-component";
import styles from "./category.module.scss";

const CategoryComponent = () => {
  const router = useRouter();
  const { category: categoryId } = router.query;

  const [productsOnPage, setProductsOnPage] = useState([]);
  const { products } = useContext(productsContext);

  const filteredProductsByCategory = useMemo(() => {
    return products?.filter((product) =>
      product.categories.includes(Number(categoryId))
    );
  }, [categoryId, products]);

  const defaultActivePage = 1;
  const productsPerPage = 20;

  useEffect(() => {
    productsOnActivePage(filteredProductsByCategory, defaultActivePage);
  }, [categoryId, filteredProductsByCategory]);

  const productsOnActivePage = (products, activePage) => {
    const filteredProducts = products?.filter((product, index) => {
      const filterByIndex =
        activePage * productsPerPage > index &&
        (activePage - 1) * productsPerPage <= index;

      return filterByIndex;
    });
    setProductsOnPage(filteredProducts);
  };

  return (
    <Container
      id="app"
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: "relative",
      }}
    >
      <Hero />
      <Container>
        <Header as="h2">Products</Header>
        <Card.Group itemsPerRow={4}>
          {productsOnPage.length ? (
            productsOnPage.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })
          ) : (
            <Card
              style={{
                width: "100%",
                height: "41vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              No Products!
            </Card>
          )}
        </Card.Group>
      </Container>
      <PaginationWrapper
        filteredProductsByCategory={filteredProductsByCategory}
        productsOnActivePage={productsOnActivePage}
      />
      <Footer />
    </Container>
  );
};

export default CategoryComponent;
