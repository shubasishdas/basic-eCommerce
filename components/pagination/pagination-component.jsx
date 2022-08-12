import { Container, Icon, Pagination } from "semantic-ui-react";
import styles from "./pagination-component.module.scss";

const PaginationWrapper = ({
  filteredProductsByCategory,
  productsOnActivePage,
}) => {
  const productsPerPage = 20;

  const handlePageChange = (e, pageInfo) => {
    const activePage = Number(pageInfo.activePage);
    productsOnActivePage(filteredProductsByCategory, activePage);
  };

  let totalPages = filteredProductsByCategory?.length / productsPerPage;

  if (totalPages % 1 !== 0) {
    totalPages = Math.floor(totalPages) + 1;
  }

  return (
    <Container className={styles.wrapper}>
      <Pagination
        defaultActivePage={1}
        ellipsisItem={{
          content: <Icon name="ellipsis horizontal" />,
          icon: true,
        }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default PaginationWrapper;
