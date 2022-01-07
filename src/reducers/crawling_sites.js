export const GET_SITE_INFO = "GET_SITE_INFO";

const site = (site = [], action) => {
  switch (action.type) {
    case GET_SITE_INFO:
      return action.payload;
    default:
      return site;
  }
};

export default site;
