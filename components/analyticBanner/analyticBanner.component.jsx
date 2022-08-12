import { Container, Header } from "semantic-ui-react";
import styles from "./analyticBanner.module.scss";

const AnalyticBanner = () => {
  return (
    <Container className={styles.banner_container}>
      <Header as="h1">Analytical Banner</Header>
    </Container>
  );
};

export default AnalyticBanner;
