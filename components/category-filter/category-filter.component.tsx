import React, { useContext } from "react";
import { Dropdown, Input } from "semantic-ui-react";
import { categoriesContext } from "../../context/categories.context";
import { productsContext } from "../../context/products.context";

const CategoryFilter = () => {
  const { categories } = useContext(categoriesContext);
  const { products } = useContext(productsContext);

  const handleFilterChange = (e) => {
    const filteredCategory = categories?.find(
      (category) => category?.name === e.target.textContent
    );

    const filteredProducts = products.filter((product) =>
      product.categories.includes(filteredCategory.id)
    );
  };

  const tagOptions = categories.map((category) => {
    const { id, name } = category;
    return {
      text: name,
      value: id,
    };
  });

  return (
    <Dropdown text="Category Filter" icon="filter">
      <Dropdown.Menu>
        <Dropdown.Header icon="tags" content="Tag Label" />
        <Dropdown.Menu scrolling>
          {tagOptions.map((option) => (
            <Dropdown.Item
              key={option.value}
              {...option}
              onClick={handleFilterChange}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryFilter;
