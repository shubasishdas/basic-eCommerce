import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { categoriesContext } from "../../../context/categories.context";

const CategoryFilter = ({ filterValue, setFilterValue }) => {
  const { categories } = useContext(categoriesContext);

  const handleFilterChange = (e) => {
    setFilterValue(() => {
      return e.target.textContent;
    });
  };

  const tagOptions = categories.map((category) => {
    const { id, name } = category;
    return {
      text: name,
      value: id,
    };
  });

  return (
    <Dropdown text={filterValue} icon="filter">
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
