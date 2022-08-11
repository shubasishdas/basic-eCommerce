import { useContext, useEffect, useState } from "react";
import {
  Container,
  Header,
  Icon,
  Grid,
  Pagination,
  Card,
} from "semantic-ui-react";
import { productsContext } from "../../context/products.context";
import { get } from "../../pages/api/api";
import ProductCard from "../product-card/product-card.component";
import { customersContext } from "../../context/customers.context";
import CategoryFilter from "../category-filter/category-filter.component";
import RatingFilter from "../rating-filter/rating-filter.component";
import styles from "./products.module.scss";

const Products = () => {
  const { products, setProducts } = useContext(productsContext);
  const { customers, setCustomers } = useContext(customersContext);
  const [productsOnPage, setProductsOnPage] = useState([]);
  const defaultActivePage = 1;
  const productsPerPage = 20;

  useEffect(() => {
    const getProductData = async () => {
      const data = await fetch("api/mock/products");
      const { response } = await data.json();

      setProducts(response);
      productsOnActivePage(response, defaultActivePage);
    };

    const getCustomerData = async () => {
      const data = await fetch("api/mock/customers");
      const { response } = await data.json();

      setCustomers(response);
    };

    getProductData();
    getCustomerData();
  }, []);

  const productsOnActivePage = (products, activePage) => {
    const filteredProducts = products.filter(
      (product) =>
        // activePage * productsPerPage < product.id &&
        // product.id <= (activePage + 1) * productsPerPage

        activePage * productsPerPage >= product.id &&
        (activePage - 1) * productsPerPage < product.id
    );
    setProductsOnPage(filteredProducts);
  };

  const handlePageChange = (e, pageInfo) => {
    console.log("page changed");

    const activePage = Number(pageInfo.activePage);
    productsOnActivePage(products, activePage);
  };

  console.log({ productsOnPage });

  return (
    <Container>
      <Container className={styles.header_section}>
        <Header as="h2" className={styles.header_title}>
          Products
        </Header>
        <Grid className={styles.header_filter}>
          <CategoryFilter />
          <RatingFilter />
        </Grid>
      </Container>

      <Card.Group itemsPerRow={4}>
        {productsOnPage.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Card.Group>

      <Container className={styles.pagination}>
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
          totalPages={products?.length / productsPerPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </Container>
  );
};

export default Products;
