import React from "react";
import { WHOLESALER_COMMENT } from "../action/wholesalerAction";

const initialState = {
  comment: [],
};

const WholesalerCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case WHOLESALER_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };
  }

  return state;
};

export default WholesalerCommentReducer;
