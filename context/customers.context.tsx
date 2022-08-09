import { createContext, useState } from "react";

export const customersContext = createContext({
  customers: [],
  setCusomers: () => {},
});

export const CustomersContextProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const value = { customers, setCustomers };
  return (
    <customersContext.Provider value={value}>
      {children}
    </customersContext.Provider>
  );
};
