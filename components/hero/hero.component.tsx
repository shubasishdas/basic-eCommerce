import { useContext, useState } from "react";
import {
  Container,
  Header,
  Input,
  Icon,
  Grid,
  Image,
  Divider,
  Button,
} from "semantic-ui-react";
import { cartContext } from "../../context/cart.context";
import CheckoutButton from "../checkout-modal/checkout-modal.component";
import SearchResult from "../search-result/search-result.component";

const Hero = () => {
  const [textSearch, setTextSearch] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
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

  const subTotal = cartItems.reduce((sum, current) => {
    const { quantity, price } = current;
    return sum + quantity * price;
  }, 0);

  const deliveryCharge = 50;

  return (
    <Container style={{ marginTop: 50 }}>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">Basic E-Commerce</Header>
          </Grid.Column>
          <Grid.Column>
            <Input
              action={{ icon: "search" }}
              placeholder="Search..."
              onChange={(e) => setTextSearch(e.target.value)}
            />
          </Grid.Column>
          <Grid.Column>
            {/* <span>{cartCount} items</span> */}
            <Icon
              style={{ cursor: "pointer" }}
              name="add to cart"
              size="big"
              onClick={() => setIsCartOpen(!isCartOpen)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {textSearch.length ? <SearchResult textSearch={textSearch} /> : ""}

      {isCartOpen && (
        <Container
          style={{
            position: "absolute",
            width: "30rem",
            height: "30rem",
            background: "aliceBlue",
            boxShadow: "0px 2px 6px -2px rgba(0,0,0,0.6)",
            overflowY: "auto",
            zIndex: 1,
          }}
        >
          <Grid
            style={{
              margin: 0,
              background: "#AFB4FF",
              //   background: "#AFB4FF",

              height: 50,
              boxShadow: "0px 2px 6px -2px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Header style={{ margin: 0, color: "#fff" }}>Cart </Header>
            <Icon
              style={{ margin: 0, cursor: "pointer" }}
              name="delete"
              onClick={() => setIsCartOpen(!isCartOpen)}
            />
          </Grid>
          <Grid>
            {cartItems.map((item) => {
              const { id, quantity, price, product_img, title } = item;
              return (
                <Grid
                  key={id}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Grid
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
                    <Grid style={{ width: "8rem" }}>
                      <Image src={product_img} alt={title} />
                    </Grid>
                    <Grid style={{ display: "flex", flexDirection: "column" }}>
                      <Grid>{title}</Grid>
                      <Grid>Tk. {price}</Grid>
                    </Grid>
                    <Grid>Tk. {quantity * price}</Grid>
                    <Grid style={{ cursor: "pointer" }}>
                      <Icon id={id} name="delete" onClick={handleDeleteItem} />
                    </Grid>
                  </Grid>
                  <Divider />
                </Grid>
              );
            })}
          </Grid>
          <Grid style={{ marginTop: 20 }}>
            <Header>Order Summery</Header>
            <Grid>
              <Grid.Row>
                <Grid.Column style={{ width: "fit-content" }}>
                  Sub Total
                </Grid.Column>
                <Grid.Column>{subTotal}</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column style={{ width: "fit-content" }}>
                  Delivery Charge
                </Grid.Column>
                <Grid.Column>{deliveryCharge}</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column style={{ width: "fit-content" }}>
                  Total
                </Grid.Column>
                <Grid.Column>{subTotal + deliveryCharge}</Grid.Column>
              </Grid.Row>
            </Grid>
            {/* <Divider /> */}
          </Grid>
          <Container style={{ padding: 10 }}>
            {/* <Button fluid color="violet">
              Checkout
            </Button> */}
            <CheckoutButton subTotal={subTotal} />
          </Container>
        </Container>
      )}
    </Container>
  );
};
export default Hero;
