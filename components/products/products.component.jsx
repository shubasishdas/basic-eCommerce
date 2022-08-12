import { useContext, useEffect, useState } from "react";
import {
  Container,
  Header,
  Icon,
  Grid,
  Pagination,
  Card,
} from "semantic-ui-react";
import { productsContext } from "../../context/products.context";
import ProductCard from "../product-card/product-card.component";
import { customersContext } from "../../context/customers.context";
import CategoryFilter from "../filter/category-filter/category-filter.component";
import RatingFilter from "../filter/rating-filter/rating-filter.component";
import styles from "./products.module.scss";
import { categoriesContext } from "../../context/categories.context";
import { countRatingPerProduct } from "../../utils/review";
import PaginationWrapper from "../pagination/pagination-component";

const Products = () => {
  const { products, setProducts, filteredProducts, setFilteredProducts } =
    useContext(productsContext);
  const { setCustomers } = useContext(customersContext);
  const { categories } = useContext(categoriesContext);

  const [productsOnPage, setProductsOnPage] = useState([]);
  const [valueOfRatingFilter, setValueOfRatingFilter] =
    useState("Rating Filter");
  const [valueOfCategoryFilter, setValueOfCategoryFilter] =
    useState("Category Filter");

  const defaultActivePage = 1;
  const productsPerPage = 20;

  useEffect(() => {
    const getProductData = async () => {
      const data = await fetch("api/mock/products");
      const { response } = await data.json();

      setProducts(response);
      setFilteredProducts(response);

      productsOnActivePage(response, defaultActivePage);
    };

    const getCustomerData = async () => {
      const data = await fetch("api/mock/customers");
      const { response } = await data.json();

      setCustomers(response);
    };

    getProductData();
    getCustomerData();
  }, [setCustomers, setFilteredProducts, setProducts]);

  const productsOnActivePage = (products, activePage) => {
    const filteredProducts = products.filter((product, index) => {
      const filterByIndex =
        activePage * productsPerPage > index &&
        (activePage - 1) * productsPerPage <= index;

      return filterByIndex;
    });

    setProductsOnPage(filteredProducts);
  };

  useEffect(() => {
    const filterAllProducts = () => {
      let filteredByRating;

      if (valueOfRatingFilter === "Rating Filter") {
        filteredByRating = products;
      } else {
        filteredByRating = products.filter((product, index) => {
          return valueOfRatingFilter.includes(
            countRatingPerProduct(product).roundedRating
          );
        });
      }

      let filteredByCategory;

      if (valueOfCategoryFilter === "Category Filter") {
        filteredByCategory = filteredByRating;
      } else {
        filteredByCategory = filteredByRating?.filter((product) => {
          const filteredCategoryById = categories?.find(
            (category) => category?.name === valueOfCategoryFilter
          )?.id;

          return product?.categories?.includes(filteredCategoryById);
        });
      }

      return filteredByCategory;
    };

    const newFilteredProducts = filterAllProducts();

    setFilteredProducts(newFilteredProducts);

    productsOnActivePage(newFilteredProducts, defaultActivePage);
  }, [
    valueOfRatingFilter,
    valueOfCategoryFilter,
    categories,
    products,
    setFilteredProducts,
  ]);

  return (
    <Container>
      <Container className={styles.header_section}>
        <Header as="h2" className={styles.header_title}>
          Products
        </Header>
        <Grid className={styles.header_filter}>
          <CategoryFilter
            filterValue={valueOfCategoryFilter}
            setFilterValue={setValueOfCategoryFilter}
          />
          <RatingFilter
            filterValue={valueOfRatingFilter}
            setFilterValue={setValueOfRatingFilter}
          />
        </Grid>
      </Container>

      <Card.Group itemsPerRow={4}>
        {productsOnPage.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Card.Group>

      <PaginationWrapper
        filteredProductsByCategory={filteredProducts}
        productsOnActivePage={productsOnActivePage}
      />
    </Container>
  );
};

export default Products;
