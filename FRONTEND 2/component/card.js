import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Card = (props) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        firmName={props.firmName}
        onPress={() =>
          props.navigation.navigate("RetailerDetail", {
            firmName: props.firmName,
            name: props.name,
            clothCategory: props.clothCategory,
            id: props.id,
          })
        }
      >
        <Text style={styles.text}>{props?.firmName ? props.firmName : ""}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 45,
    margin: 10,
    // marginTop: 15,
  },
  name: {
    padding: 10,
  },
  text: {
    paddingStart: 10,
    paddingTop: 8,
    fontWeight: "900",
    fontSize: 20,
  },
});
export default Card;
