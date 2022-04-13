import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Restart } from "fiction-expo-restart";

import { AuthContext } from "./../../navigation/context";
import WholesalerCard from "../../component/wholesalerCard";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const AllWholesaler = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setfilteredDataSource] = useState([]);

  const { allWholesaler } = useSelector((state) => state.admin);

  if (
    !allWholesaler.data ||
    allWholesaler.status === "FAILED" ||
    allWholesaler.status === "error"
  ) {
    Alert.alert("NOT AUTHORIZED", "you are not authorized", [
      {
        text: "ok",
        onPress: async () => {
          await AsyncStorageLib.removeItem("token");
          await AsyncStorageLib.removeItem("currentUser");
          Restart();
        },
      },
    ]);

    return props.navigation.navigate("loginScreen");
  }
  const wholesalerData = allWholesaler?.data?.doc;

  if (!wholesalerData || Object.keys(wholesalerData).length == 0) {
    Alert.alert("Fail", "Didn't get data , try after some time");
    props.navigation.navigate("RetailerName");
  }

  const [masterDataSource, setmasterDataSource] = useState(wholesalerData);

  const searchFilteredfunction = (text) => {
    // setmasterDataSource(wholesalerData);
    try {
      if (text) {
        const newData = wholesalerData.filter(function (item) {
          const itemData = item.firmName
            ? item.firmName.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setfilteredDataSource(newData);
        setSearch(text);
        setIsLoading(false);
      } else if (text == null) {
        setfilteredDataSource(masterDataSource);
        setSearch(text);
        setIsLoading(false);
      } else {
        setfilteredDataSource(masterDataSource);
        setSearch(text);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert("Failed", "Unable to  fetch retailers  404 ");
      props.navigation.navigate("RetailerName");
    }
  };

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={(text) => searchFilteredfunction(text)}
        />
      </View>

      <FlatList
        data={filteredDataSource}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <WholesalerCard
            style={styles.card}
            navigation={props.navigation}
            name={item.name}
            firmName={item.firmName}
            clothCategory={item.clothCategory}
            mobileNumber={item.mobileNumber}
            address={item.address}
            active={item.active}
            id={item._id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  card: {
    marginTop: 80,
  },
  centerd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "flex-end",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "95%",
    padding: 6,
    backgroundColor: "lightblue",
    marginTop: 10,
    marginBottom: 4,
  },
});

export default AllWholesaler;
