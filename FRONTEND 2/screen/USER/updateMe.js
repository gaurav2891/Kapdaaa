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
import catchDispatch from "./../../utils/catchDispatch";

const WholesalerBody = (props) => {
  const { id, name, landMark, whatsappNumber, mobileNumber, address } =
    props.route.params;

  const [stateName, setstateName] = useState(name);
  const [stateLandMark, settateLandMark] = useState(landMark);
  const [stateMobileNumber, setstateMobileNumber] = useState(mobileNumber);
  const [stateWhatsappNumber, setstateWhatsappNumber] =
    useState(whatsappNumber);
  const [stateAddress, setstateAddress] = useState(address);

  const dispatch = useDispatch();

  const submitResponse = () => {
    catchDispatch(
      dispatch(
        wholesalerAction.updateMe(
          stateName,
          stateLandMark,
          stateMobileNumber,
          stateWhatsappNumber,
          stateAddress
        )
      ),
      `${name} Updated`
    );
  };

  return (
    <ScrollView>
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
        <Text style={styles.textField}>LandMark: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter herer"
          onChangeText={settateLandMark}
          value={stateLandMark}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.textField}>Whatsapp Number: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter herer"
          onChangeText={setstateWhatsappNumber}
          value={`${stateWhatsappNumber}`}
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
          title="SAVE"
          onPress={() => {
            submitResponse();
            props.navigation.navigate("logoutScreen");
          }}
          color="#2196F3"
        />
        <Text> {`     `}</Text>
        <Button
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("UpdatePassword", { id });
          }}
          title="update password"
          color="red"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
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
