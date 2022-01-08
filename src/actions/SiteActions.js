import axios from "axios";
import { API } from "../libs/consts";
import { GET_SITE_INFO } from "../reducers/crawling_sites";

export const getSiteInfo = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API}/api/site/`, config);
    console.log(response);
    if (response.status === 200) {
      dispatch({ type: GET_SITE_INFO, payload: response.data });
    } else {
      dispatch({ type: GET_SITE_INFO, payload: false });
    }
  } catch (error) {
    dispatch({ type: GET_SITE_INFO, payload: false });
  }
};
