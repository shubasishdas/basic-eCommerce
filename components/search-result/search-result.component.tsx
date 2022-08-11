import { useContext } from "react";
import { Container, Divider, Grid, Image } from "semantic-ui-react";
import { categoriesContext } from "../../context/categories.context";
import { productsContext } from "../../context/products.context";
import Link from "next/link";
import styles from "./search-result.module.scss";

const SearchResult = ({ textSearch }) => {
  const { categories } = useContext(categoriesContext);
  const { products } = useContext(productsContext);

  const filteredCategories = categories.filter((category) =>
    category.name.includes(textSearch)
  );

  const filteredProducts = products.filter((product) =>
    product.title.includes(textSearch)
  );

  console.log({ styles });

  return (
    <Container className={styles.wrapper}>
      <Container className={styles.container}>
        <Container className={styles.category_wrapper}>
          <h3>Categories</h3>
          <Container className={styles.category_wrapper_container}>
            {filteredCategories.map((category) => {
              return (
                <Link href={`/categories/${category.id}`} key={category.id}>
                  <Container className={styles.category_list}>
                    {category.name}
                  </Container>
                </Link>
              );
            })}
          </Container>
        </Container>

        <Divider />

        <Container className={styles.products_wrapper}>
          <h3>Products</h3>
          <Container className={styles.products_wrapper_container}>
            {filteredProducts.map((product) => {
              const { id, product_img, title, price } = product;
              return (
                <Link key={id} href={`/products/${id}`}>
                  <Container className={styles.products_list}>
                    <Image size="small" src={product_img} alt={title} />

                    <Container className={styles.product_info}>
                      <p>{title}</p>
                      <p>BDT {price}</p>
                    </Container>
                  </Container>
                </Link>
              );
            })}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default SearchResult;
