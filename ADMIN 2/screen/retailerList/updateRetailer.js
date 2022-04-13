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

import * as retailerAction from "./../../redux/action/RetailerAction";
import catchDispatch from "./../../utils/catchDispatch";

const WholesalerBody = (props) => {
  const { name, firmName, clothCategory, id } = props.route.params[0];

  const [stateName, setstateName] = useState(name);
  const [stateFirmName, setstateFirmName] = useState(firmName);
  const [stateclothCategory, setstateclothCategory] = useState(clothCategory);

  const dispatch = useDispatch();

  const deleteRetailer = () => {
    catchDispatch(
      dispatch(retailerAction.deleteRetailer(id)),
      "Retailer Deleted"
    );
    props.navigation.navigate("RetailerName");
  };

  const updateRetailer = () => {
    catchDispatch(
      dispatch(
        retailerAction.updateRetailer({
          id,
          stateName,
          stateFirmName,
          stateclothCategory,
        })
      ),
      "Retailer Updated"
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

      <View style={styles.buttonArea}>
        <Button
          style={styles.button}
          onPress={() => {
            deleteRetailer();
            return props.navigation.navigate("RetailerName", { id });
          }}
          title="DELETE RETAILER"
          color="red"
        />
        <Text> {`     `}</Text>
        <Button
          style={styles.button}
          onPress={() => {
            updateRetailer();
            return props.navigation.navigate("RetailerName");
          }}
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
