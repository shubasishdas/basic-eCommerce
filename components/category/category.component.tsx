import { useContext, useEffect } from "react";
import { Container, Header, Input, Icon, Grid } from "semantic-ui-react";
import { categoriesContext } from "../../context/categories.context";
import CategoryList from "../../pages/api/dataset/categories.json";
import { get } from "../../pages/api/api";

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
    <Container>
      <Header as="h2">Categories</Header>
      <Grid>
        {categories.map((category) => {
          return <Container key={category.id}>{category.name}</Container>;
        })}
      </Grid>
    </Container>
  );
};

export default Categories;
