import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Input, Rating } from "semantic-ui-react";
import { categoriesContext } from "../../context/categories.context";
import { productsContext } from "../../context/products.context";

const RatingFilter = () => {
  const { categories } = useContext(categoriesContext);
  const { products } = useContext(productsContext);
  const [filterValue, setFilterValue] = useState("Rating Filter");

  useEffect(() => {
    console.log("mounted ~~~2");

    return console.log("unmounted ~~~2");
  }, []);

  const handleFilterChange = (e) => {
    console.log({ text: e.target.textContent });
    setFilterValue(e.target.textContent);
  };

  const maxRating = 5;

  const tagOptions = Array(maxRating + 1)
    .fill(0)
    .map((star, index) => {
      return {
        text: `${maxRating - index} star`,
        // text: (
        //   <Rating
        //     id={maxRating - index}
        //     maxRating={maxRating}
        //     defaultRating={maxRating - index}
        //     icon="star"
        //     disabled
        //   />
        // ),
        value: maxRating - index,
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

export default RatingFilter;
