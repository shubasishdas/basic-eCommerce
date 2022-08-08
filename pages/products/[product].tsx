import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { productsContext } from "../../context/products.context";
import {
  Container,
  Card,
  Image,
  Grid,
  Header,
  Rating,
  Button,
  Icon,
} from "semantic-ui-react";
import { cartContext } from "../../context/cart.context";

const ProductComponent = () => {
  const router = useRouter();
  const { products } = useContext(productsContext);
  const { addItemToCart, cartItems } = useContext(cartContext);
  const { product: productId } = router.query;

  const selectedProduct = products.find(
    (product) => product.id === Number(productId)
  );

  const {
    title,
    description,
    price,
    product_img,
    discount,
    categories,
    reviews,
  } = selectedProduct ?? {};

  const totalReviews = selectedProduct?.reviews.length;

  const sumOfRatings = selectedProduct?.reviews.reduce((prev, current) => {
    return prev + current.rating;
  }, 0);

  const averageOfRating = sumOfRatings / totalReviews;

  let roundedRating;

  if (averageOfRating - Math.floor(averageOfRating) < 0.5) {
    roundedRating = Math.floor(averageOfRating);
  } else {
    roundedRating = Math.floor(averageOfRating) + 1;
  }

  const handleOrderCount = (e) => {
    const isClickedOnMinus = e.target.className.includes("minus");

    addItemToCart(selectedProduct, isClickedOnMinus);
  };

  const orderedProduct = cartItems.filter(
    (item) => item.id === selectedProduct.id
  )[0];

  const { quantity } = orderedProduct ?? 0;

  return (
    <Container style={{ display: "flex", gap: 20 }}>
      <Card style={{ flex: 1 }}>
        <Image src={product_img} alt={title} />
      </Card>
      <Card
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Container>
          <Header>{title}</Header>
          <p>{description}</p>
          <Rating
            maxRating={5}
            defaultRating={roundedRating}
            icon="star"
            size="small"
            disabled
          />
        </Container>
        <Container>Tk.{price}</Container>
        <Container>
          {quantity ? (
            <Button.Group basic>
              <Button
                className="plus"
                content={<Icon name="plus" />}
                onClick={handleOrderCount}
              ></Button>
              <Button onClick={handleOrderCount}>{quantity} in cart</Button>
              <Button
                className="minus"
                content={<Icon name="minus" />}
                onClick={handleOrderCount}
              ></Button>
            </Button.Group>
          ) : (
            <Button positive onClick={handleOrderCount}>
              Add to Cart
            </Button>
          )}
          <Button positive>Buy Now</Button>
        </Container>
      </Card>
    </Container>
  );
};

export default ProductComponent;
