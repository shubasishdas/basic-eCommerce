import { useContext } from "react";
import { Container, Icon, Grid, Image, Divider } from "semantic-ui-react";
import { cartContext } from "../../../context/cart.context";
import styles from "./cart-item.module.scss";

const CartItem = ({ item }) => {
  const { cartItems, setCartItems, addItemToCart } = useContext(cartContext);

  const { id, quantity, price, product_img, title } = item;

  const handleDeleteItem = (e) => {
    const { id: deleteId } = e.target;
    setCartItems((items) => {
      const restItems = cartItems.filter(
        (item) => item.id !== Number(deleteId)
      );

      return restItems;
    });
  };

  const handleOrderCount = (e) => {
    const isClickedOnMinus = e.target.className.includes("minus");
    const productId = e.target.id;

    const selectedProduct = cartItems.find(
      (item) => item.id === Number(productId)
    );

    addItemToCart(selectedProduct, isClickedOnMinus);
  };

  if (!quantity) {
    setCartItems((cartitems) => {
      const updatedCartItems = cartitems?.filter((item) => item.id !== id);
      return updatedCartItems ?? [];
    });
  }

  return (
    <Container className={styles.wrapper}>
      <Container className={styles.container}>
        <Grid className={styles.item_arrow_section}>
          <Icon
            id={id}
            className="plus"
            name="arrow up"
            style={{ padding: 0, margin: 0 }}
            onClick={handleOrderCount}
          />
          {quantity}
          <Icon
            id={id}
            className="minus"
            style={{ padding: 0, margin: 0 }}
            name="arrow down"
            onClick={handleOrderCount}
          />
        </Grid>
        <Grid style={{ width: "8rem", margin: 0 }}>
          <Image src={product_img} alt={title} />
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
          }}
        >
          <Grid>{title}</Grid>
          <Grid>BDT {price}</Grid>
        </Grid>
        <Grid style={{ margin: 0 }}>BDT {quantity * price}</Grid>
        <Grid className={styles.item_delete}>
          <Icon id={id} name="delete" onClick={handleDeleteItem} />
        </Grid>
      </Container>
      <Divider />
    </Container>
  );
};

export default CartItem;
