import type { NextPage } from "next";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Input, Icon, Grid } from "semantic-ui-react";
import Categories from "../components/category/category.component";
import Products from "../components/products/products.component";
import AnalyticBanner from "../components/analyticBanner/analyticBanner.component";
import Hero from "../components/hero/hero.component";

const Home: NextPage = () => {
  return (
    <Container style={{ marginTop: 50 }}>
      <Hero />
      <Grid columns={1}>
        <AnalyticBanner />
        <Categories />
        <Products />
      </Grid>
    </Container>
  );
};

export default Home;
