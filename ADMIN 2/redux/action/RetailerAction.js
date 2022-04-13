export const FETCH_RETAILER = "FETCH_RETAILER";
export const ADD_RETAILER = "ADD_RETAILER";

export const UPDATE_RETAILER = "UPDATE_RETAILER";
export const DELETE_RETAILER = "DELETE_RETAILER";

export const RETAILER_COMMENT = "RETAILER_COMMENT";
export const WR_COMMENT = "WR_COMMENT";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getTokenId = async () => {
  let token = await AsyncStorage.getItem("token");
  return token;
};

import url from "./../../config/env";
const BASE_URL = url;
export const fetchRetailer = () => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    let allRetailers = await fetch(`${BASE_URL}/api/v1/retailer`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${tokenId}`,
      }),
      // body: "A=1&B=2",
    });
    allRetailers = await allRetailers.json();

    dispatch({
      type: FETCH_RETAILER,
      payload: allRetailers,
    });
    return allRetailers;
  };
};

export const fetchRetailerComment = (id) => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const retailerComment = await fetch(
      `${BASE_URL}/api/v1/retailer/${id}/comment`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${tokenId}`,
        }),
        // body: "A=1&B=2",
      }
    );
    const commentJson = await retailerComment.json();

    dispatch({
      type: RETAILER_COMMENT,
      payload: commentJson,
    });
    return commentJson;
  };
};

export const fetchWRComment = (retailerId) => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const wrcomment = await fetch(
      `${BASE_URL}/api/v1/retailer/${retailerId}/comment/wholesaler`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${tokenId}`,
        }),
        // body: "A=1&B=2",
      }
    );

    const wrcommentJson = await wrcomment.json();

    dispatch({
      type: WR_COMMENT,
      payload: wrcommentJson,
    });
    return wrcommentJson;
  };
};

export const addRetailer = ({
  firmName,
  location,
  retailerName,
  district,
  state,
  clothCategory,
}) => {
  return async (dispatch) => {
    let tokenId = await getTokenId();

    let createData = await fetch(`${BASE_URL}/api/v1/retailer`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${tokenId}`,
        "Content-type": "application/json",
      }),
      body: JSON.stringify({
        name: retailerName,
        firmName: firmName,
        location: location,
        district,
        state,
        clothCategory,
      }),
    });
    createData = await createData.json();

    dispatch({
      type: ADD_RETAILER,
      payload: createData,
    });

    return createData;
  };
};

// /////   ADMIN ACTION

export const updateRetailer = ({
  id,
  stateName,
  stateFirmName,
  stateclothCategory,
}) => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const updateRetailer = await fetch(`${BASE_URL}/api/v1/retailer/${id}`, {
      method: "PATCH",
      headers: new Headers({
        Authorization: `Bearer ${tokenId}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        name: stateName,
        firmName: stateFirmName,
        clothCategory: stateclothCategory,
      }),
    });

    const updateJson = await updateRetailer.json();

    dispatch({
      type: UPDATE_RETAILER,
      payload: 1,
    });
    return updateJson;
  };
};
export const deleteRetailer = (id) => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const deleteRetailer = await fetch(`${BASE_URL}/api/v1/retailer/${id}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${tokenId}`,
        "Content-Type": "application/json",
      }),
    });

    const deleteJson = await deleteRetailer.json();

    dispatch({
      type: DELETE_RETAILER,
      payload: 1,
    });

    return deleteJson;
  };
};
