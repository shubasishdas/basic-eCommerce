import { Grid, Header } from "semantic-ui-react";
import styles from "./order-summary.module.scss";

const OrderSummary = ({ subTotal }) => {
  const deliveryCharge = 50;
  return (
    <Grid style={{ margin: 0 }}>
      <Header style={{ padding: 0 }}>Order Summary</Header>
      <Grid>
        <Grid.Row className={styles.grid_row}>
          <Grid.Column className={styles.grid_row_first_item}>
            Sub Total
          </Grid.Column>
          <Grid.Column className={styles.grid_row_second_item}>
            BDT {subTotal}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className={styles.grid_row}>
          <Grid.Column className={styles.grid_row_first_item}>
            Delivery Charge
          </Grid.Column>
          <Grid.Column className={styles.grid_row_second_item}>
            BDT {deliveryCharge}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className={styles.grid_row}>
          <Grid.Column as="h4" className={styles.grid_row_total}>
            Total
          </Grid.Column>
          <Grid.Column className={styles.grid_row_second_item}>
            BDT {subTotal + deliveryCharge}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
