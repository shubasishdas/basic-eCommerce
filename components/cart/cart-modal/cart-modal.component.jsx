import Link from "next/link";
import { useContext } from "react";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import { cartContext } from "../../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import styles from "./cart-modal.module.scss";

const Cart = (props) => {
  const { isCartOpen, setIsCartOpen } = props;
  const { cartItems } = useContext(cartContext);

  const subTotal = cartItems?.reduce((sum, current) => {
    const { quantity, price } = current;
    return sum + quantity * price;
  }, 0);

  return (
    <Container className={styles.wrapper}>
      <Container className={styles.container}>
        <Container className={styles.header_section}>
          <Header className={styles.header_title}>Cart </Header>
          <Icon
            className={styles.header_icon}
            name="delete"
            onClick={() => setIsCartOpen(!isCartOpen)}
          />
        </Container>
        <Container>
          {cartItems?.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Container>

        <Container className={styles.view_cart}>
          <Container className={styles.sub_total} as={"h4"}>
            Sub Total - BDT {subTotal}
          </Container>
          <Link href="/cart">
            <Button fluid size="big" color="violet" disabled={subTotal <= 0}>
              View Cart
            </Button>
          </Link>
        </Container>
      </Container>
    </Container>
  );
};

export default Cart;
