import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  StatusBar,
} from "react-native";

import { useSelector } from "react-redux";

import Card from "../../component/card";
import SplashScreen from "../splashScreen";

const App = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const data = useSelector((state) => state.retailer.retailer);

  const [search, setSearch] = useState("");
  const [filteredDataSource, setfilteredDataSource] = useState([]);
  const [masterDataSource, setmasterDataSource] = useState(data);

  if (!data) {
    return (
      <View style={styles.centerd}>
        <SplashScreen />
      </View>
    );
  }

  const searchFilteredfunction = (text) => {
    setmasterDataSource(data);
    try {
      if (text) {
        const newData = masterDataSource.filter(function (item) {
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
        setfilteredDataSource(data);
        setSearch(text);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error aa gyaa");
    }
  };

  return (
    <View style={styles.body}>
      <StatusBar backgroundColor="black" />

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
          <Card
            style={styles.card}
            navigation={props.navigation}
            name={item.name}
            firmName={item.firmName}
            clothCategory={item.clothCategory}
            id={item._id}
          />
        )}
      />

      <Button
        style={styles.button}
        title="add Retailer"
        color="red"
        onPress={() => {
          return props.navigation.navigate("AddRetailer");
        }}
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

export default App;
