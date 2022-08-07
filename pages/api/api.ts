import products from "./dataset/products.json";
import customers from "./dataset/customers.json";
import categories from "./dataset/categories.json";

const mockApi = async (endpoint: string) => {
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve("resolved");
    }, 500)
  );

  switch (endpoint) {
    case "products":
      return products;
    case "customers":
      return customers;
    case "categories":
      return categories;
    default:
      return;
  }

  // return JSON.parse("{ a: 5 }");
};

export const get = async (endpoint: string) => {
  const response = await mockApi(endpoint);
  console.log({ response, endpoint });

  // return response.json();
  return response;
};
