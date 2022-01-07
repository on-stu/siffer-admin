import axios from "axios";
import { API } from "../libs/API";
import { GET_USER_INFO } from "../reducers/user";

export const getMyInfo = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/api/user/${pk}`);
    console.log(response);
    // if (response.data.status === "success") {
    //   dispatch({ type: GET_USER_INFO, payload: user });
    // } else {
    //   dispatch({ type: GET_USER_INFO, payload: false });
    // }
  } catch (error) {
    dispatch({ type: GET_USER_INFO, payload: false });
  }
};
