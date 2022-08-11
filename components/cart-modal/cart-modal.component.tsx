import Link from "next/link";
import { useContext, useState } from "react";
import {
  Container,
  Header,
  Icon,
  Grid,
  Image,
  Divider,
  Button,
} from "semantic-ui-react";
import { cartContext } from "../../context/cart.context";
import CheckoutButton from "../checkout-modal/checkout-modal.component";
import styles from "./cart-modal.module.scss";

const Cart = (props) => {
  const { isCartOpen, setIsCartOpen } = props;

  const { cartCount, cartItems, setCartItems, addItemToCart } =
    useContext(cartContext);

  const handleDeleteItem = (e) => {
    const { id: deleteId } = e.target;
    setCartItems((items) => {
      const restItems = cartItems.filter(
        (item) => item.id !== Number(deleteId)
      );
      console.log({ restItems, deleteId });

      return restItems;
    });
  };

  const handleOrderCount = (e) => {
    const isClickedOnMinus = e.target.className.includes("minus");
    const productId = e.target.id;

    const selectedProduct = cartItems.find(
      (item) => item.id === Number(productId)
    );
    console.log({ selectedProduct, target: e.target });

    addItemToCart(selectedProduct, isClickedOnMinus);
  };

  const subTotal = cartItems?.reduce((sum, current) => {
    const { quantity, price } = current;
    return sum + quantity * price;
  }, 0);

  const deliveryCharge = 50;

  return (
    <Container className={styles.wrapper}>
      <Container className={styles.container}>
        <Container className={styles.header_section}>
          <Header style={{ margin: 0, color: "#fff" }}>Cart </Header>
          <Icon
            style={{ margin: 0, cursor: "pointer" }}
            name="delete"
            onClick={() => setIsCartOpen(!isCartOpen)}
          />
        </Container>
        <Container>
          {cartItems?.map((item) => {
            const { id, quantity, price, product_img, title } = item;
            if (!quantity) {
              setCartItems((cartitems) => {
                const updatedCartItems = cartitems?.filter(
                  (item) => item.id !== id
                );
                return updatedCartItems ?? [];
              });
            }

            return (
              <Container
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "90%",
                }}
              >
                <Container
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    height: 100,
                    marginLeft: 5,
                  }}
                >
                  <Grid
                    style={{
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
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
                  <Grid style={{ cursor: "pointer", margin: 0 }}>
                    <Icon id={id} name="delete" onClick={handleDeleteItem} />
                  </Grid>
                </Container>
                <Divider />
              </Container>
            );
          })}
        </Container>

        <Container
          style={{
            padding: 10,
            position: "absolute",
            bottom: 0,
            left: "0px",
            background: "aliceBlue",
          }}
        >
          <Container style={{ display: "flex", padding: 10 }}>
            <Container as={"h4"} style={{ margin: 0, width: "fit-content" }}>
              Sub Total - BDT {subTotal}
            </Container>
            {/* <Container style={{ width: "fit-content" }}>BDT{subTotal}</Container> */}
          </Container>
          <Link href="/cart">
            <Button
              // style={{ position: "absolute", bottom: 0, left: "0px" }}
              fluid
              size="big"
              color="violet"
              disabled={subTotal <= 0}
              // onClick={()=>Link}
            >
              View Cart
            </Button>
          </Link>
        </Container>
      </Container>
    </Container>
  );
};

export default Cart;
