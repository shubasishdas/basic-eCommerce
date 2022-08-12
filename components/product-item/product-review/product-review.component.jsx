import { useContext } from "react";
import {
  Container,
  Image,
  Grid,
  Header,
  Rating,
  Divider,
  Progress,
} from "semantic-ui-react";
import { customersContext } from "../../../context/customers.context";
import { productsContext } from "../../../context/products.context";
import { countRatingPerProduct } from "../../../utils/review";
import styles from "./product-review.module.scss";

const ProductReview = ({ productId }) => {
  const { customers } = useContext(customersContext);
  const { products } = useContext(productsContext);

  const selectedProduct = products?.find(
    (product) => product.id === Number(productId)
  );

  const { roundedRating, totalReviews } =
    countRatingPerProduct(selectedProduct);

  const maxRating = 5;

  const getNumberOfEachRating = (ratingNumber) => {
    const filteredReviews = selectedProduct?.reviews.filter(
      (review) => review.rating === ratingNumber
    );

    return filteredReviews?.length;
  };

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
    <Container>
      <Divider />
      <Header>Ratings & Reviews</Header>
      <Container className={styles.rating_wrapper}>
        <Grid className={styles.rating_average}>
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
          <Grid className={styles.rating_count}>{totalReviews} Ratings</Grid>
        </Grid>
        <Container className={styles.rating_graph_container}>
          {Array(maxRating + 1)
            .fill(0)
            .map((item, index) => {
              const numberOfRating = getNumberOfEachRating(maxRating - index);
              return (
                <Grid className={styles.rating_graph_item} key={index}>
                  <Rating
                    maxRating={maxRating}
                    defaultRating={maxRating - index}
                    icon="star"
                    size="large"
                    disabled
                  />
                  <Progress
                    className={styles.rating_graph_progress}
                    color={numberOfRating / totalReviews ? "green" : "grey"}
                    percent={(numberOfRating / totalReviews) * 100}
                  />

                  <Grid style={{ margin: 0 }}>{numberOfRating}</Grid>
                </Grid>
              );
            })}
        </Container>
      </Container>

      <Divider />
      <Container>
        <Header>Product Reviews</Header>
        <Grid className={styles.product_reviews_wrapper}>
          {customersReviews?.map((review) => {
            const { id, rating, comment, name, avatar } = review;
            return (
              <Grid key={id} className={styles.product_reviews_item}>
                <Rating
                  maxRating={maxRating}
                  defaultRating={rating}
                  icon="star"
                  size="large"
                  disabled
                  className={styles.product_reviews_item_rating}
                />

                <Container>
                  <Image
                    src={avatar}
                    alt={name}
                    className={styles.product_reviews_item_image}
                  />{" "}
                  {name}
                </Container>
                <Container>{comment}</Container>
                <Divider className={styles.product_reviews_item_divider} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Container>
  );
};

export default ProductReview;
