import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as wholesalerAction from "../../redux/action/wholesalerAction";
import * as adminAction from "./../../redux/action/adminAction";

const WholesalerBody = (props) => {
  const { name, firmName, clothCategory, mobileNumber, address, active, id } =
    props.route.params;

  let putActive;
  if (active == true) {
    putActive = "true";
  } else if (active == false) {
    putActive = "false";
  } else {
    putActive = "false";
  }

  const [stateActive, setstateActive] = useState(putActive);
  const [stateName, setstateName] = useState(name);
  const [stateFirmName, setstateFirmName] = useState(firmName);
  const [stateclothCategory, setstateclothCategory] = useState(clothCategory);
  const [stateMobileNumber, setstateMobileNumber] = useState(mobileNumber);
  const [stateAddress, setstateAddress] = useState(address);

  const dispatch = useDispatch();

  const submitResponse = () => {
    dispatch(
      adminAction.updateWholesalerByAdmin({
        id,
        stateName,
        stateFirmName,
        stateclothCategory,
        stateMobileNumber,
        stateAddress,
        stateActive,
      })
    )
      .then((res) => {
        if (res.status === "SUCCESS") {
          Alert.alert("SUCCESS", "Data save successfully");
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
    <ScrollView>
      <View style={styles.box}>
        <Text style={styles.textField}>Active: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter herer"
          onChangeText={setstateActive}
          value={stateActive}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.textField}>Name: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter herer"
          onChangeText={setstateName}
          value={stateName}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.textField}>FirmName: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter herer"
          onChangeText={setstateFirmName}
          value={stateFirmName}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.textField}>clothCategory: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter herer"
          onChangeText={setstateclothCategory}
          value={stateclothCategory}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.textField}>MobileNumber: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter here"
          onChangeText={setstateMobileNumber}
          value={`${stateMobileNumber}`}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.textField}>Address: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter herer"
          onChangeText={setstateAddress}
          value={stateAddress}
        />
      </View>

      <View style={styles.buttonArea}>
        <Button
          style={styles.button}
          onPress={() =>
            props.navigation.navigate("WholesalerPassword", { id })
          }
          title="UPDATE   PASSWORD"
          color="red"
        />
        <Text> {`     `}</Text>
        <Button
          style={styles.button}
          onPress={submitResponse}
          title="SAVE"
          color="#2196F3"
        />
      </View>
    </ScrollView>
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
  button: {
    borderRadius: 4,
    elevation: 3,
  },
});

export default WholesalerBody;
