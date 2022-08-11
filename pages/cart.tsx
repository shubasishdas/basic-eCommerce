import { useRouter } from "next/router";
import { useContext, useState } from "react";
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
  Progress,
  Form,
  Radio,
  Input,
} from "semantic-ui-react";
import Hero from "../components/hero/hero.component";
import Footer from "../components/footer/footer.component";
import { customersContext } from "../context/customers.context";
import { cartContext } from "../context/cart.context";
import { productsContext } from "../context/products.context";
import CheckoutButton from "../components/checkout-modal/checkout-modal.component";

const ProductComponent = () => {
  const router = useRouter();
  const { products } = useContext(productsContext);
  const { customers } = useContext(customersContext);

  const [payment, setPayment] = useState("");

  const { addItemToCart, cartItems, cartCount, setCartItems } =
    useContext(cartContext);
  const { product: productId } = router.query;

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

  const handlePaymentChange = (e, { value }) => {
    console.log({ e, value });

    setPayment(value);
  };

  return (
    <Container
      id="app"
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Hero />

      <Container style={{ display: "flex", gap: 20 }}>
        <Card
          style={{
            width: "60%",
            margin: 0,
            padding: 20,
            height: "fit-content",
            minHeight: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!cartItems.length && <Header>No items in your cart</Header>}
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
                    <Grid>BDT {price} </Grid>
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
        </Card>

        <Card.Group
          style={{
            width: "40%",
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Card style={{ width: "100%", margin: 0, padding: 10 }}>
            <Grid style={{ margin: 0 }}>
              <Header style={{ padding: 0 }}>Shipping Address</Header>
              <Grid>
                <Grid.Row
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid.Column style={{ width: "fit-content" }}>
                    Sub Total
                  </Grid.Column>
                  <Grid.Column style={{ padding: 0, width: "5rem" }}>
                    BDT {subTotal}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid.Column style={{ width: "fit-content" }}>
                    Delivery Charge
                  </Grid.Column>
                  <Grid.Column style={{ padding: 0, width: "5rem" }}>
                    BDT {deliveryCharge}
                  </Grid.Column>
                </Grid.Row>
                {/* <Divider /> */}

                <Grid.Row
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid.Column
                    as="h4"
                    style={{ width: "fit-content", fontWeight: "bold" }}
                  >
                    Total
                  </Grid.Column>
                  <Grid.Column style={{ padding: 0, width: "5rem" }}>
                    BDT {subTotal + deliveryCharge}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid>
          </Card>

          <Card style={{ width: "100%", margin: 0, padding: 10 }}>
            <Grid style={{ margin: 0 }}>
              <Header style={{ padding: 0 }}>Order Summary</Header>
              <Grid>
                <Grid.Row
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid.Column style={{ width: "fit-content" }}>
                    Sub Total
                  </Grid.Column>
                  <Grid.Column style={{ padding: 0, width: "5rem" }}>
                    BDT {subTotal}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid.Column style={{ width: "fit-content" }}>
                    Delivery Charge
                  </Grid.Column>
                  <Grid.Column style={{ padding: 0, width: "5rem" }}>
                    BDT {deliveryCharge}
                  </Grid.Column>
                </Grid.Row>
                {/* <Divider /> */}

                <Grid.Row
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid.Column
                    as="h4"
                    style={{ width: "fit-content", fontWeight: "bold" }}
                  >
                    Total
                  </Grid.Column>
                  <Grid.Column style={{ padding: 0, width: "5rem" }}>
                    BDT {subTotal + deliveryCharge}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid>
            <Divider />

            <Grid
              style={{ margin: 0, display: "flex", flexDirection: "column" }}
            >
              <Header style={{ margin: 0, padding: 0 }}>Payment Options</Header>

              <Form style={{ padding: "20px 0px 20px 20px" }}>
                <Form.Field>
                  <Radio
                    label="Cash on Delivery"
                    name="radioGroup"
                    value="cash"
                    checked={payment === "cash"}
                    onChange={handlePaymentChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Pay with Card"
                    name="radioGroup"
                    value="card"
                    checked={payment === "card"}
                    onChange={handlePaymentChange}
                  />
                  {payment == "card" && (
                    <Container
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                        padding: "20px 10px 20px 0px",
                      }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Card Number"
                      />
                      <Container style={{ display: "flex", gap: 10 }}>
                        <Input style={{ flex: 1 }} placeholder="CVC" />
                        <Input style={{ flex: 1 }} placeholder="MM/YY" />
                      </Container>
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Cardholder Name"
                      />
                    </Container>
                  )}
                </Form.Field>
              </Form>
              <Container style={{ padding: 10 }}>
                <CheckoutButton subTotal={subTotal} />
              </Container>
            </Grid>
          </Card>
        </Card.Group>
      </Container>

      <Footer />
    </Container>
  );
};

export default ProductComponent;
