import React from "react";
import { Dropdown } from "semantic-ui-react";

const RatingFilter = ({ filterValue, setFilterValue }) => {
  const handleFilterChange = (e) => {
    setFilterValue(e.target.textContent);
  };

  const maxRating = 5;

  const tagOptions = Array(maxRating + 1)
    .fill(0)
    .map((star, index) => {
      return {
        text: `${maxRating - index} star`,
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
