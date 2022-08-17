import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import Hero from "../../components/hero/hero.component";
import Footer from "../../components/footer/footer.component";
import ProductReview from "../../components/product-item/product-review/product-review.component";
import ProductInfo from "../../components/product-item/product-info/product-info.component";

const ProductComponent = () => {
  const router = useRouter();
  const { product: productId } = router.query;

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
      <ProductInfo productId={productId} />
      <ProductReview productId={productId} />
      <Footer />
    </Container>
  );
};

export default ProductComponent;
