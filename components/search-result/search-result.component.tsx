import { useContext } from "react";
import { Container, Grid, Header, Image } from "semantic-ui-react";
import { categoriesContext } from "../../context/categories.context";
import { productsContext } from "../../context/products.context";
import Link from "next/link";

const SearchResult = ({ textSearch }) => {
  const { categories } = useContext(categoriesContext);
  const { products } = useContext(productsContext);

  console.log({ categories, products });

  const filteredCategories = categories.filter((category) =>
    category.name.includes(textSearch)
  );

  const filteredProducts = products.filter((product) =>
    product.title.includes(textSearch)
  );

  console.log({ filteredCategories });

  return (
    <Container
      style={{
        position: "absolute",
        width: "30rem",
        height: "30rem",
        background: "aliceBlue",
        boxShadow: "0px 2px 6px -2px rgba(0,0,0,0.6)",
        overflowY: "auto",
      }}
    >
      <Grid style={{ padding: 20 }}>
        <h3>Categories</h3>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 5,
          }}
        >
          {filteredCategories.map((category) => {
            return (
              <Grid key={category.id}>
                <Link href={`/categories/${category.name}`}>
                  <Container
                    style={{ height: "fit-content", cursor: "pointer" }}
                  >
                    {category.name}
                  </Container>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid style={{ padding: 20 }}>
        <h3>Products</h3>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 5,
          }}
        >
          {filteredProducts.map((product) => {
            const { product_img, title, price } = product;
            return (
              <Grid key={product.id}>
                <Link href={`/products/${title}`}>
                  <Grid
                    style={{
                      display: "flex",
                      height: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    <Grid style={{ width: 100, height: 100 }}>
                      <Image src={product_img} alt={title} />
                    </Grid>
                    <Grid style={{ display: "flex", flexDirection: "column" }}>
                      <Grid>{title}</Grid>
                      <Grid>{price}</Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
            );
          })}
        </Container>
      </Grid>
    </Container>
  );
};

export default SearchResult;
