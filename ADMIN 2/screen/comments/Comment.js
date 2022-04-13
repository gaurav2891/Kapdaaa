import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CommentCard from "./../../component/commentCard";
import SplashScreen from "./../splashScreen";

const App = (props) => {
  const wholesalerComment = useSelector(
    (state) => state.WholesalerComment.comment
  );

  if (
    !wholesalerComment.data ||
    wholesalerComment.status === "FAILED" ||
    wholesalerComment.status === "error"
  ) {
    return (
      <View>
        <SplashScreen message="Unable to find Comment" />
      </View>
    );
  }

  const { allComment } = wholesalerComment.data;

  let i = 1;
  return (
    <View style={styles.body}>
      <View>
        <FlatList
          data={allComment}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CommentCard
              style={styles.card}
              number={i++}
              navigation={props.navigation}
              comment={item.comment}
              firmName={item.retailer.firmName}
              date={item.date}
            />
          )}
        />
      </View>
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
  text: {
    textAlign: "center",
    justifyContent: "center",
  },
  firm: {
    color: "blue",
    padding: 10,
  },
  button: {
    color: "red",
    marginTop: 90,
    marginBottom: 30,
  },
});
export default App;
