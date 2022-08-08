import { useContext, useEffect } from "react";
import { Container, Header, Input, Icon, Grid, Card } from "semantic-ui-react";
import { categoriesContext } from "../../context/categories.context";
import CategoryList from "../../pages/api/dataset/categories.json";
import { get } from "../../pages/api/api";
import Link from "next/link";

const Categories = () => {
  const { categories, setCategories } = useContext(categoriesContext);

  useEffect(() => {
    const getCategoryData = async () => {
      const response = await get("categories");

      setCategories(response.categories);
    };

    getCategoryData();
  }, []);

  console.log({ categories });

  return (
    <Container style={{ marginTop: 50 }}>
      <Header as="h2">Categories</Header>
      <Grid style={{ display: "flex", gap: 20 }}>
        {categories.map((category) => {
          return (
            <Link key={category.id} href={`categories/${category.name}`}>
              <Card
                style={{
                  flexBasis: "15%",
                  flexGrow: 1,
                  height: "10rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Card.Header>{category.name}</Card.Header>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Categories;
