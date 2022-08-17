import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  Container,
  Card,
  Image,
  Grid,
  Header,
  Icon,
  Divider,
  Progress,
  Form,
  Radio,
  TextArea,
  Input,
} from "semantic-ui-react";
import Hero from "../components/hero/hero.component";
import Footer from "../components/footer/footer.component";
import { customersContext } from "../context/customers.context";
import { cartContext } from "../context/cart.context";
import { productsContext } from "../context/products.context";
import CheckoutButton from "../components/checkout-modal/checkout-modal.component";
import CartItem from "../components/cart/cart-item/cart-item.component";
import PaymentMethod from "../components/cart/payment-method/payment-method.component";
import Shipping from "../components/shipping/shipping.component";
import OrderSummary from "../components/cart/order-summary/order-summary.component";

const ProductComponent = () => {
  const { cartItems } = useContext(cartContext);

  const subTotal = cartItems?.reduce((sum, current) => {
    const { quantity, price } = current;
    return sum + quantity * price;
  }, 0);

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
            return <CartItem key={item.id} item={item} />;
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
          <Shipping />

          <Card style={{ width: "100%", margin: 0, padding: 10 }}>
            <OrderSummary subTotal={subTotal} />
            <Divider />
            <PaymentMethod subTotal={subTotal} />
          </Card>
        </Card.Group>
      </Container>

      <Footer />
    </Container>
  );
};

export default ProductComponent;
