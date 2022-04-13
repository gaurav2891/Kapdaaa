import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GET_CURRENT_USER,
} from "./../action/authActions";

const initialState = {
  // user: {},
  // token: {},
  // errors: {},
  currentUser: {},
};

// ////  jo apn reducer k ande daal rhe h user: action.payoad , ye sirf tb kaam aayega jb, store mn se kuch call hoga tb mtlb jb json token chahiye hoga

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    // case REGISTER_USER_SUCCESS:
    //   return { ...state, user: action.payload };
    // case LOGIN_USER_SUCCESS:
    //   return { ...state, user: action.payload };
    // case LOGIN_USER_FAIL:
    //   return { ...state, error: action.payload };
    // case REGISTER_USER_FAIL:
    //   return { ...state, error: true };
  }
  return state;
};

export default authReducer;
