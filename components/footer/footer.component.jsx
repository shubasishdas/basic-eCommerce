import { Container, Header } from "semantic-ui-react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <Container className={styles.footer_container}>
      <Header textAlign="center" className={styles.footer_container_header}>
        Footer Section
      </Header>
    </Container>
  );
};
export default Footer;
