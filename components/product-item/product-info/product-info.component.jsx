import {
  Container,
  Card,
  Image,
  Header,
  Rating,
  Button,
  Icon,
} from "semantic-ui-react";

import Link from "next/link";
import { useContext } from "react";
import { productsContext } from "../../../context/products.context";
import { countRatingPerProduct } from "../../../utils/review";
import { cartContext } from "../../../context/cart.context";
import styles from "./product-info.module.scss";

const ProductInfo = ({ productId }) => {
  const { products } = useContext(productsContext);
  const { cartItems, addItemToCart } = useContext(cartContext);

  const selectedProduct = products?.find(
    (product) => product.id === Number(productId)
  );

  const { title, description, price, product_img, discount } =
    selectedProduct ?? {};

  const { roundedRating } = countRatingPerProduct(selectedProduct);

  const handleOrderCount = (e) => {
    const isClickedOnMinus = e.target.className.includes("minus");

    addItemToCart(selectedProduct, isClickedOnMinus);
  };

  const orderedProduct = cartItems?.filter(
    (item) => item.id === selectedProduct?.id
  )[0];

  const { quantity } = orderedProduct ?? 0;

  return (
    <Container className={styles.wrapper}>
      <Card className={styles.image}>
        <Image src={product_img} alt={title} />
      </Card>
      <Card className={styles.description_wrapper}>
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
        <Container className={styles.description_price}>
          BDT <span style={{ textDecoration: "line-through" }}>{price}</span>
          {price - discount}
        </Container>
        <Container style={{ display: "flex", gap: 10 }}>
          {quantity ? (
            <Button.Group style={{ width: "200px" }} basic>
              <Button
                className="minus"
                content={<Icon name="minus" />}
                onClick={handleOrderCount}
              ></Button>
              <Button onClick={handleOrderCount}>{quantity} in cart</Button>
              <Button
                className="plus"
                content={<Icon name="plus" />}
                onClick={handleOrderCount}
              ></Button>
            </Button.Group>
          ) : (
            <Button
              style={{ width: "200px", background: "#6435c9" }}
              positive
              onClick={handleOrderCount}
            >
              Add to Cart
            </Button>
          )}
          {quantity ? (
            <Link href="/cart">
              <Button style={{ background: "#6435c9" }} positive>
                Buy Now
              </Button>
            </Link>
          ) : (
            ""
          )}
        </Container>
      </Card>
    </Container>
  );
};

export default ProductInfo;
