import axios from "axios";
import { API } from "../libs/consts";
import { GET_PRODUCTS_INFO } from "../reducers/products";

export const getProductInfo = (token) => async (dispatch) => {
  try {
    console.log(token);
    const response = await axios.get(`${API}/api/product/`, {
      headers: { Authorization: `Token ${token}` },
    });
    console.log(response);
    if (response.status === 200) {
      dispatch({ type: GET_PRODUCTS_INFO, payload: response.data });
    } else {
      dispatch({ type: GET_PRODUCTS_INFO, payload: false });
    }
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_INFO, payload: false });
  }
};
