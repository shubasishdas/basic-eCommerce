import { Card, Image, Rating } from "semantic-ui-react";
import Link from "next/link";
import { countRatingPerProduct } from "../../utils/review";
import styles from "./product-card.module.scss";

const ProductCard = ({ product }) => {
  const { title, product_img, price, discount } = product;
  const { roundedRating } = countRatingPerProduct(product);

  return (
    <Link key={product.id} href={`/products/${product.id}`}>
      <Card className={styles.product_card}>
        <Image src={product_img} alt={title} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Rating
            maxRating={5}
            defaultRating={roundedRating}
            icon="star"
            size="small"
            disabled
          />
        </Card.Content>
        <Card.Content extra className={styles.product_card_component}>
          BDT <span style={{ textDecoration: "line-through" }}>{price}</span>
          {price - discount}
        </Card.Content>
      </Card>
    </Link>
  );
};

export default ProductCard;
