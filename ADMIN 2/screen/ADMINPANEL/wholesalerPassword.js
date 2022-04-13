import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";

import * as adminAction from "./../../redux/action/adminAction";

const App = (props) => {
  const dispatch = useDispatch();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");

  const { id } = props.route.params;

  const submitResponse = () => {
    dispatch(adminAction.updatePassByAdmin(id, password, passwordConfirm))
      .then((res) => {
        if (res.status === "SUCCESS") {
          Alert.alert("Data save successfully");
        } else if (res.status === "FAILED" || res.status === "error") {
          Alert.alert(`Failed`, res.message);
        } else {
          Alert.alert("Failed", `${res.message}`);
        }
      })
      .catch((err) => {
        Alert.alert("Failed", `${err.message}`);
      });
  };

  return (
    <View>
      <View>
        <Text style={styles.textField}>Password: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter herer"
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <View>
        <Text style={styles.textField}>Confirm Password: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter herer"
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
        />
      </View>

      <View style={styles.buttonArea}>
        <Button
          style={styles.button}
          onPress={() => {
            submitResponse();
            props.navigation.navigate("AllWholesalers");
          }}
          title="UPDATE   PASSWORD"
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    // margin: 5,
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    paddingStart: 20,
  },
  textField: {
    fontSize: 20,
    fontWeight: "bold",
    paddingStart: 20,
    marginTop: 10,
  },
  input: {
    width: 300,
    backgroundColor: "#B6BFC4",
    borderRadius: 25,
    padding: 10,
    fontSize: 19,
    marginTop: 10,
    marginVertical: 10,
  },
  buttonArea: {
    padding: 30,
  },
});
export default App;
