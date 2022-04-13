import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../navigation/context";
import SplashScreen from "./../../screen/splashScreen";

const LogOut = (props) => {
  // const { signout } = useContext(AuthContext);
  const { signout } = useContext(AuthContext);
  let { currentUser } = useSelector((state) => state.auth);

  if (
    currentUser == undefined ||
    currentUser.status === "error" ||
    currentUser.status === "FAILED" ||
    JSON.stringify(currentUser).length == null
  ) {
    return <SplashScreen message={currentUser?.message} />;
  }

  if (currentUser.status === "SUCCESS") {
    currentUser = currentUser.currentUser;
  }

  const {
    _id,
    name,
    firmName,
    address,
    landMark,
    mobileNumber,
    whatsappNumber,
    clothCategory,
    slug,
  } = currentUser;

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.textField}>Id: </Text>
          <Text style={styles.resultField}>{slug} </Text>

          <Text style={styles.textField}>FirmName: </Text>
          <Text style={styles.resultField}>{firmName} </Text>

          <Text style={styles.textField}>Address: </Text>
          <Text style={styles.resultField}>{address} </Text>

          <Text style={styles.textField}>clothCategory: </Text>
          <Text style={styles.resultField}>{clothCategory} </Text>

          <Text style={styles.textField}>MobileNumber: </Text>
          <Text style={styles.resultField}>{mobileNumber} </Text>
        </View>
      </View>

      <View style={styles.buttonArea}>
        <Button
          style={styles.button}
          color="red"
          title="UPDATE  ME"
          onPress={() =>
            props.navigation.navigate("UpdateMe", {
              id: _id,
              name,
              mobileNumber,
              landMark,
              whatsappNumber,
              address,
            })
          }
        />
        <Text> {`     `}</Text>

        <Button
          style={styles.button}
          title={"Log Out"}
          onPress={() => {
            // dispatch()
            Alert.alert(
              "LoggedOut",
              "Do you really want to Log Out ?, After This you can not access Kapda Bazar APP",
              [
                { text: "cancel", onPress: () => console.log("cancel") },
                {
                  text: "OK",
                  onPress: () => {
                    signout();
                  },
                },
              ]
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
  },

  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    // margin: 5,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    // height: "80%",
  },
  textField: {
    fontSize: 25,
    fontWeight: "bold",
    // margin: 10,
    marginTop: 30,
    color: "black",
  },
  resultField: {
    fontSize: 25,
    // fontWeight: "bold",
    fontWeight: "200",
    color: "grey",
    // padding: 20,
  },
  button: {
    // marginTop: 150,
    // justifyContent: "flex-end",
    // // width: "100%",
    // backgroundColor: "grey",
    // borderRadius: 25,
    // padding: 10,
    // fontSize: 16,
    margin: 80,
    borderRadius: 4,
    elevation: 3,
    // marginVertical: 10,
  },
  buttonArea: {
    padding: 30,
  },
});

export default LogOut;
