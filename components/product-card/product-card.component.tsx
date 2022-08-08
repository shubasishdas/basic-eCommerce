import { Container, Card, Image } from "semantic-ui-react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const { title, product_img, price, discount } = product;
  return (
    <Link key={product.id} href={`products/${product.id}`}>
      <Card
        style={{
          flexBasis: "20%",
          height: "20rem",
          flexGrow: 1,
          margin: 20,
          cursor: "pointer",
        }}
      >
        <Image src={product_img} alt={title} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
        </Card.Content>
        <Card.Content extra>{price}</Card.Content>
      </Card>
    </Link>
  );
};

export default ProductCard;
