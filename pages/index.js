import "semantic-ui-css/semantic.min.css";
import { Container, Divider } from "semantic-ui-react";
import Categories from "../components/category/category.component";
import Products from "../components/products/products.component";
import AnalyticBanner from "../components/analyticBanner/analyticBanner.component";
import Hero from "../components/hero/hero.component";
import Footer from "../components/footer/footer.component";

const Home = () => {
  return (
    <Container
      id="app"
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: 15,
        position: "relative",
      }}
    >
      <Hero />
      <AnalyticBanner />
      <Categories />
      <Container>
        <Divider />
      </Container>
      <Products />
      <Footer />
    </Container>
  );
};

export default Home;
