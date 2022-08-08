import { useContext, useEffect, useState } from "react";
import {
  Container,
  Header,
  Input,
  Icon,
  Grid,
  Pagination,
} from "semantic-ui-react";
import { productsContext } from "../../context/products.context";
import { get } from "../../pages/api/api";
import ProductCard from "../product-card/product-card.component";
import Link from "next/link";

const Products = () => {
  const { products, setProducts } = useContext(productsContext);
  const [productsOnPage, setProductsOnPage] = useState([]);
  const defaultActivePage = 1;
  const productsPerPage = 20;

  useEffect(() => {
    const getProductData = async () => {
      const response = await get("products");
      setProducts(response);
      productsOnActivePage(response, defaultActivePage);
    };

    getProductData();
  }, []);

  const productsOnActivePage = (products, activePage) => {
    const filteredProducts = products.filter(
      (product) =>
        activePage * productsPerPage < product.id &&
        product.id <= (activePage + 1) * productsPerPage
    );
    setProductsOnPage(filteredProducts);
  };

  const handlePageChange = (e, pageInfo) => {
    const activePage = Number(pageInfo.activePage);
    productsOnActivePage(products, activePage);
  };

  return (
    <Container style={{ marginTop: 50 }}>
      <Header as="h2">Products</Header>
      <Grid style={{ display: "flex", gap: 15, width: "fit-content" }}>
        {productsOnPage.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Grid>

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
          totalPages={products.length / productsPerPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </Container>
  );
};

export default Products;
