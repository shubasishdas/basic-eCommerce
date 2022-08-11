import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { productsContext } from "../../context/products.context";
import {
  Container,
  Card,
  Image,
  Grid,
  Header,
  Rating,
  Button,
  Icon,
  Divider,
  Pagination,
} from "semantic-ui-react";
import { cartContext } from "../../context/cart.context";
import { customersContext } from "../../context/customers.context";
import { categoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import Hero from "../../components/hero/hero.component";
import Footer from "../../components/footer/footer.component";
// import styles from "./category.module.scss";

const CategoryComponent = () => {
  const router = useRouter();
  const { category: categoryId } = router.query;

  const [productsOnPage, setProductsOnPage] = useState([]);
  const { products } = useContext(productsContext);

  const filteredProductsByCategory = products?.filter((product) =>
    product.categories.includes(Number(categoryId))
  );

  const defaultActivePage = 1;
  const productsPerPage = 20;

  useEffect(() => {
    productsOnActivePage(filteredProductsByCategory, defaultActivePage);
  }, [categoryId]);

  const productsOnActivePage = (products, activePage) => {
    const filteredProducts = products?.filter(
      (product) =>
        // activePage * productsPerPage < product.id &&
        // product.id <= (activePage + 1) * productsPerPage

        activePage * productsPerPage >= product.id &&
        (activePage - 1) * productsPerPage < product.id
    );
    setProductsOnPage(filteredProducts);
  };

  const handlePageChange = (e, pageInfo) => {
    const activePage = Number(pageInfo.activePage);
    productsOnActivePage(filteredProductsByCategory, activePage);
  };

  // console.log({ heroComponent: <Hero /> });

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
        {/* <Grid style={{ display: "flex", gap: 15, width: "fit-content" }}>
        {productsOnPage.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Grid> */}

        <Card.Group itemsPerRow={4}>
          {productsOnPage.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </Card.Group>
      </Container>

      <Container
        style={{
          marginTop: 20,
          marginBottom: 20,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Pagination
          defaultActivePage={1}
          ellipsisItem={{
            content: <Icon name="ellipsis horizontal" />,
            icon: true,
          }}
          firstItem={{ content: <Icon name="angle double left" />, icon: true }}
          lastItem={{ content: <Icon name="angle double right" />, icon: true }}
          prevItem={{ content: <Icon name="angle left" />, icon: true }}
          nextItem={{ content: <Icon name="angle right" />, icon: true }}
          totalPages={
            Math.floor(filteredProductsByCategory?.length / productsPerPage) + 1
          }
          onPageChange={handlePageChange}
        />
      </Container>
      <Footer />
    </Container>
  );
};

export default CategoryComponent;
