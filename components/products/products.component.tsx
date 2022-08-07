import { useContext, useEffect } from "react";
import { Container, Header, Input, Icon, Grid } from "semantic-ui-react";
import { productsContext } from "../../context/products.context";
import { get } from "../../pages/api/api";

const Products = () => {
  const { products, setProducts } = useContext(productsContext);

  useEffect(() => {
    const getProductData = async () => {
      const response = await get("products");
      setProducts(response);
    };

    getProductData();
  }, []);

  console.log({ products });

  return (
    <Container>
      <Header as="h2">Products</Header>
      {products.map((product) => {
        return <Grid key={product.id}>{product.title}</Grid>;
      })}
    </Container>
  );
};

export default Products;
