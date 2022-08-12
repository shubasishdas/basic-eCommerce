import { useContext, useState } from "react";
import {
  Container,
  Grid,
  Header,
  Form,
  Radio,
  Input,
  Button,
} from "semantic-ui-react";
import { cartContext } from "../../../context/cart.context";
import CheckoutButton from "../../checkout-modal/checkout-modal.component";
import styles from "./payment-method.module.scss";

const PaymentMethod = ({ subTotal }) => {
  const { setCartItems } = useContext(cartContext);
  const [payment, setPayment] = useState("");

  const handlePaymentChange = (e, { value }) => {
    setPayment(value);
  };

  return (
    <Grid className={styles.wrapper}>
      <Header className={styles.title}>Payment Options</Header>

      <Form className={styles.form_wrapper}>
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
            <Container className={styles.card_info_wrapper}>
              <Input style={{ width: "100%" }} placeholder="Card Number" />
              <Container style={{ display: "flex", gap: 10 }}>
                <Input style={{ flex: 1 }} placeholder="CVC" />
                <Input style={{ flex: 1 }} placeholder="MM/YY" />
              </Container>
              <Input style={{ width: "100%" }} placeholder="Cardholder Name" />
            </Container>
          )}
        </Form.Field>
      </Form>

      <Container style={{ padding: "10px" }}>
        <Button
          className={styles.clear_cart_button}
          fluid
          onClick={() => setCartItems([])}
          size="big"
        >
          Clear Cart
        </Button>
      </Container>
      <Container style={{ padding: 10 }}>
        <CheckoutButton subTotal={subTotal} />
      </Container>
    </Grid>
  );
};

export default PaymentMethod;
