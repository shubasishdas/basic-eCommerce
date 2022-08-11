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
  Divider,
  Progress,
} from "semantic-ui-react";
import { cartContext } from "../../context/cart.context";
import { customersContext } from "../../context/customers.context";
import Hero from "../../components/hero/hero.component";
import Footer from "../../components/footer/footer.component";
import Link from "next/link";

export const countRatingPerProduct = (product) => {
  const totalReviews = product?.reviews.length;

  const sumOfRatings = product?.reviews.reduce((prev, current) => {
    return prev + current.rating;
  }, 0);

  const averageOfRating = sumOfRatings / totalReviews;

  let roundedRating;

  if (averageOfRating - Math.floor(averageOfRating) < 0.5) {
    roundedRating = Math.floor(averageOfRating);
  } else {
    roundedRating = Math.floor(averageOfRating) + 1;
  }

  return { roundedRating, totalReviews };
};

const ProductComponent = () => {
  const router = useRouter();
  const { products } = useContext(productsContext);
  const { customers } = useContext(customersContext);

  const { addItemToCart, cartItems } = useContext(cartContext);
  const { product: productId } = router.query;

  const selectedProduct = products?.find(
    (product) => product.id === Number(productId)
  );

  console.log({ products, selectedProduct });

  const {
    title,
    description,
    price,
    product_img,
    discount,
    categories,
    reviews,
  } = selectedProduct ?? {};

  const { roundedRating, totalReviews } =
    countRatingPerProduct(selectedProduct);

  const handleOrderCount = (e) => {
    const isClickedOnMinus = e.target.className.includes("minus");

    addItemToCart(selectedProduct, isClickedOnMinus);
  };

  const orderedProduct = cartItems?.filter(
    (item) => item.id === selectedProduct?.id
  )[0];

  const { quantity } = orderedProduct ?? 0;
  const maxRating = 5;

  const getNumberOfEachRating = (ratingNumber) => {
    const filteredReviews = selectedProduct?.reviews.filter(
      (review) => review.rating === ratingNumber
    );
    <Grid>{totalReviews} Ratings</Grid>;

    return filteredReviews?.length;
  };

  // console.log({ customers }, "~2");

  // const customersReviews = selectedProduct?.reviews
  //   .map((review) => {
  //     const filteredCustomers = customers.filter(
  //       (customer) => customer.u_id === review.u_id
  //     );
  //     return filteredCustomers;
  //   })
  //   .flatMap((e) => e);

  // console.log({ customersReviews });

  const customersReviews = selectedProduct?.reviews
    .map((review) => {
      const filteredCustomers = customers.filter((customer) => {
        if (customer.u_id === review.u_id) {
          customer.rating = review.rating;
          customer.comment = review.comment;
          return true;
        }
        return false;
      });

      return filteredCustomers;
    })
    .flatMap((data) => data);

  return (
    <Container
      id="app"
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: "relative",
      }}
    >
      <Hero />
      <Container style={{ display: "flex", gap: 20 }}>
        <Card style={{ flex: 1, margin: 0 }}>
          <Image src={product_img} alt={title} />
        </Card>
        <Card
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: 0,
            padding: "2rem",
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
          <Container style={{ display: "flex", gap: 10 }}>
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
      <Container>
        <Header>Ratings & Reviews</Header>
        <Container
          style={{ display: "flex", flexDirection: "row", gap: "5rem" }}
        >
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              margin: 0,
              gap: 20,
              padding: "2rem",
            }}
          >
            <Header style={{ margin: 0, padding: 0 }}>
              {roundedRating}/{maxRating}
            </Header>
            <Rating
              style={{ margin: 0, padding: 0 }}
              maxRating={maxRating}
              defaultRating={roundedRating}
              icon="star"
              size="large"
              disabled
            />
            <Grid style={{ margin: 0, padding: 0 }}>
              {totalReviews} Ratings
            </Grid>
          </Grid>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
              width: "fit-content",
            }}
          >
            {Array(maxRating + 1)
              .fill(0)
              .map((item, index) => {
                return (
                  <Grid
                    style={{ display: "flex", gap: 25, margin: 0 }}
                    key={index}
                  >
                    <Rating
                      maxRating={maxRating}
                      defaultRating={maxRating - index}
                      icon="star"
                      size="large"
                      disabled
                    />
                    <Progress
                      style={{
                        width: "10rem",
                        margin: 0,
                        background: "grey",
                      }}
                      color={
                        getNumberOfEachRating(maxRating - index) / totalReviews
                          ? "green"
                          : "grey"
                      }
                      percent={
                        (getNumberOfEachRating(maxRating - index) /
                          totalReviews) *
                        100
                      }
                    />

                    <Grid style={{ margin: 0 }}>
                      {getNumberOfEachRating(maxRating - index)}
                    </Grid>
                  </Grid>
                );
              })}
          </Container>
        </Container>

        <Divider />
        <Container>
          <Header>Product Reviews</Header>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              // marginTop: 30,
              padding: "2rem",
            }}
          >
            {customersReviews?.map((review) => {
              const { id, rating, comment, name, avatar } = review;
              return (
                <Grid
                  key={review.id}
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <Rating
                    maxRating={maxRating}
                    defaultRating={review.rating}
                    icon="star"
                    size="large"
                    disabled
                    style={{ width: "fit-content" }}
                  />

                  <Container>
                    <Image
                      src={avatar}
                      alt={name}
                      style={{ borderRadius: "25px" }}
                    />{" "}
                    {name}
                  </Container>
                  <Container>{comment}</Container>
                  <Divider />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
      <Footer />
    </Container>
  );
};

export default ProductComponent;
