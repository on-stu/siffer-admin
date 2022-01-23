export const GET_PRODUCTS_INFO = "GET_PRODUCTS_INFO";

const products = (products = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS_INFO:
      return action.payload;
    default:
      return products;
  }
};

export default products;
