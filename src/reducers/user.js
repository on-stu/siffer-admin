export const GET_USER_INFO = "GET_USER_INFO";
export const NOT_INITED = "not-inited";

const user = (user = "not-inited", action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return action.payload;
    default:
      return user;
  }
};

export default user;
