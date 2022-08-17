import { useContext, useEffect } from "react";
import { Container, Header, Card } from "semantic-ui-react";
import { categoriesContext } from "../../context/categories.context";
import Link from "next/link";
import styles from "./category.module.scss";

const Categories = () => {
  const { categories, setCategories } = useContext(categoriesContext);

  useEffect(() => {
    const getCategoryData = async () => {
      const data = await fetch("api/mock/categories");
      const { response } = await data.json();

      setCategories(response.categories);
    };

    getCategoryData();
  }, [setCategories]);

  return (
    <Container>
      <Header as="h2" className={styles.header}>
        Categories
      </Header>
      <Card.Group itemsPerRow={5}>
        {categories?.map((category) => {
          return (
            <Link key={category.id} href={`categories/${category.id}`}>
              <Card className={styles.card}>
                <Card.Content className={styles.content}>
                  <Card.Header className={styles.header}>
                    {category.name}
                  </Card.Header>
                </Card.Content>
              </Card>
            </Link>
          );
        })}
      </Card.Group>
    </Container>
  );
};

export default Categories;
