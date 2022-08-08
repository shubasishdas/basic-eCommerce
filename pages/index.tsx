import type { NextPage } from "next";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Input, Icon, Grid } from "semantic-ui-react";
import Categories from "../components/category/category.component";
import Products from "../components/products/products.component";
import AnalyticBanner from "../components/analyticBanner/analyticBanner.component";
import { useState } from "react";
import SearchResult from "../components/search-result/search-result.component";

const Home: NextPage = () => {
  const [textSearch, setTextSearch] = useState("");

  console.log({ textSearch });

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
                <Input
                  action={{ icon: "search" }}
                  placeholder="Search..."
                  onChange={(e) => setTextSearch(e.target.value)}
                />
              </Grid.Column>
              <Grid.Column>
                <span>0 items</span>
                <Icon name="add to cart" size="big" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {textSearch.length ? <SearchResult textSearch={textSearch} /> : ""}
        </Container>
        <AnalyticBanner />
        <Categories />
        <Products />
      </Grid>
    </Container>
  );
};

export default Home;
