// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import products from "../dataset/products.json";
import customers from "../dataset/customers.json";
import categories from "../dataset/categories.json";

export default function handler(req, res) {
  const result = req.query.data;
  let response = null;

  switch (result) {
    case "products":
      response = products;
      break;
    case "customers":
      response = customers;
      break;
    case "categories":
      response = categories;
      break;
    default:
  }

  if (response) {
    res.status(200).json({ response });
  } else {
    res.status(500).json({
      error: "no data found",
    });
  }
}
