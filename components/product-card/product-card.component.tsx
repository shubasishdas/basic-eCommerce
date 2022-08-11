import { Container, Card, Image, Rating } from "semantic-ui-react";
import Link from "next/link";
import { countRatingPerProduct } from "../../pages/products/[product]";

const ProductCard = ({ product }) => {
  const { title, product_img, price, discount } = product;
  const { roundedRating } = countRatingPerProduct(product);
  console.log({ roundedRating }, "~~~~~");

  return (
    <Link key={product.id} href={`/products/${product.id}`}>
      <Card
        className="card"
        style={{
          height: "20rem",
          cursor: "pointer",
        }}
      >
        <Image src={product_img} alt={title} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          {/* <Rating
            maxRating={5}
            defaultRating={roundedRating}
            icon="star"
            size="small"
            disabled
            // style={{ background: "yellow" }}
          /> */}
        </Card.Content>
        <Card.Content extra style={{ display: "flex", gap: 10 }}>
          BDT <span style={{ textDecoration: "line-through" }}>{price}</span>
          {price - discount}
        </Card.Content>
      </Card>
    </Link>
  );
};

export default ProductCard;
