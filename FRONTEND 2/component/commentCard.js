import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const Card = (props) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.text}>{props?.number ? props.number : "*"}</Text>
        <Text style={styles.date}>
          {` Date : ${props?.date ? props.date : "date"}`}
        </Text>
        <Text style={styles.text}>{`Comment:    ${
          props?.comment ? props.comment : ""
        }`}</Text>
        <Text style={styles.text}>
          {props.firmName
            ? ` Firm_Name :  ${props.firmName ? props.firmName : ""} `
            : ""}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 6,
    margin: 10,
  },
  name: {
    padding: 10,
  },
  date: {
    justifyContent: "flex-end",
    color: "black",
    alignContent: "center",
    textAlign: "right",
    paddingEnd: 30,
    fontFamily: "monospace",
    fontVariant: ["small-caps"],
    fontSize: 20,
  },
  text: {
    paddingStart: 10,
    paddingTop: 10,
    fontWeight: "900",
    fontSize: 19,
    color: "black",
    backgroundColor: "aliceblue",
    paddingEnd: 15,
    paddingHorizontal: 10,
    paddingStart: 15,
    fontFamily: "Roboto",
    fontVariant: ["lining-nums"],
    fontSize: 20,
  },
});
export default Card;
