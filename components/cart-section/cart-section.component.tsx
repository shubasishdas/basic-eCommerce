import React from "react";
import { Button, Modal } from "semantic-ui-react";

const CheckoutButton = ({ subTotal }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      style={{ textAlign: "center" }}
      centered={true}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button
          style={{ position: "absolute", bottom: 0, left: "0px" }}
          fluid
          size="big"
          color="violet"
          disabled={subTotal <= 0}
        >
          Checkout
        </Button>
      }
    >
      <Modal.Header style={{ background: "#9c73dc", color: "#fff" }}>
        Thank you!
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>Your order has been placed</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="violet" onClick={() => setOpen(false)}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CheckoutButton;
