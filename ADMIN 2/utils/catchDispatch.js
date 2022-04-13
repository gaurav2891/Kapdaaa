import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";

const catchDispatch = (dispatch, data) => {
  return dispatch
    .then((res) => {
      console.log("res=>", res);
      if (res.status === "FAILED" || res.status === "error") {
        Alert.alert("Fail", res.message);
      } else if (res.status === "SUCCESS") {
        Alert.alert("Success", ` ${data}`);
      }
    })
    .catch((err) => {
      Alert.alert("Failed", ` ${err.message} , try again later`);
    });
};

module.exports = catchDispatch;
