import { createContext, SetStateAction, useState } from "react";

export const categoriesContext = createContext({
  categories: [],
  setCategories: () => {},
});

export const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const value = { categories, setCategories };
  return (
    <categoriesContext.Provider value={value}>
      {children}
    </categoriesContext.Provider>
  );
};
