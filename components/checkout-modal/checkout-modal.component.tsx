import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Button, Modal } from "semantic-ui-react";
import { cartContext } from "../../context/cart.context";

const CheckoutButton = ({ subTotal }) => {
  const [open, setOpen] = React.useState(false);
  const { cartItems, setCartItems } = useContext(cartContext);

  const router = useRouter();

  // useEffect(() => {
  //   if (open) {
  //     setCartItems([]);
  //     router.push("/");
  //   }
  // }, [open, router, setCartItems]);

  const handleFunc = () => {
    setOpen(false);
    setCartItems([]);
  };

  const handleCheckout = async () => {
    // handleFunc();
    setOpen(false);
    setCartItems([]);
    router.push("/");
  };

  return (
    <Modal
      style={{ textAlign: "center" }}
      centered={true}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button fluid size="big" color="violet" disabled={subTotal <= 0}>
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
        <Button color="violet" onClick={handleCheckout}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CheckoutButton;
