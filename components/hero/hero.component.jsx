import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Container, Header, Input, Icon, Grid } from "semantic-ui-react";
import { cartContext } from "../../context/cart.context";
import Cart from "../cart/cart-modal/cart-modal.component";
import SearchResult from "../search-result/search-result.component";
import styles from "./hero.module.scss";

const Hero = () => {
  const [textSearch, setTextSearch] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  const { cartItems } = useContext(cartContext);

  useEffect(() => {
    setCartCount(() => {
      return cartItems?.reduce((sum, current) => sum + current.quantity, 0);
    });
  }, [cartItems]);

  return (
    <Container className={styles.hero_wrapper}>
      <Grid columns={3} className={styles.hero_container}>
        <Grid.Row verticalAlign="middle" className={styles.hero_grid_row}>
          <Grid.Column height="fit-content">
            <Link href={`/`}>
              <Header as="h2" className={styles.hero_header}>
                Basic E-Commerce
              </Header>
            </Link>
          </Grid.Column>
          <Grid.Column height="fit-content">
            <Input
              fluid
              action={{ icon: "search" }}
              placeholder="Search..."
              onChange={(e) => setTextSearch(e.target.value)}
            />
            {textSearch.length ? <SearchResult textSearch={textSearch} /> : ""}
          </Grid.Column>
          <Grid.Column
            height="fit-content"
            floated="right"
            className={styles.hero_cart}
          >
            <p style={{ color: "yellow" }}> {cartCount} items</p>
            <Icon
              style={{ cursor: "pointer" }}
              name="add to cart"
              size="big"
              onClick={() => setIsCartOpen(!isCartOpen)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {isCartOpen && (
        <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      )}
    </Container>
  );
};
export default Hero;
