import type { NextPage } from "next";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Input, Icon, Grid } from "semantic-ui-react";
import Categories from "../components/category/category.component";
import Products from "../components/products/products.component";
import AnalyticBanner from "../components/analyticBanner/analyticBanner.component";

const Home: NextPage = () => {
  return (
    <Container style={{ marginTop: 50 }}>
      <Grid columns={1}>
        <Container>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Header as="h2">Basic E-Commerce</Header>
              </Grid.Column>
              <Grid.Column>
                <Input action={{ icon: "search" }} placeholder="Search..." />
              </Grid.Column>
              <Grid.Column>
                <span>0 items</span>
                <Icon name="add to cart" size="big" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <AnalyticBanner />
        <Categories />
        <Products />
      </Grid>
    </Container>
  );
};

export default Home;
