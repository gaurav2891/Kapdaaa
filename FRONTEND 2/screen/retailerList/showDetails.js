import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";

import CommentCard from "../../component/commentCard";

import SplashScreen from "../splashScreen";
import { useSelector } from "react-redux";

const App = (props) => {
  const { comments, id } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);

  console.log("SD=>", comments);

  let wrComment = useSelector((state) => state.retailer.wrComment);
  console.log("wrComment", wrComment);

  if (isLoading) {
    return (
      <View>
        <SplashScreen />
      </View>
    );
  }

  if (wrComment.data == null || wrComment.status === "FAILED") {
    wrComment.data = {
      date: "00 - 00 - 0000",
      comment: "No Comment....",
    };

    console.log(wrComment);
  }

  let i = 1;
  return (
    // <View>
    <SafeAreaView style={styles.commentContainer}>
      <Text style={styles.commentText}>MY COMMENT</Text>
      <CommentCard
        style={styles.card}
        date={wrComment.data.date}
        comment={wrComment.data.comment}
        number={0}
      />

      <Text style={styles.commentText}> All COMMENTS:</Text>

      <FlatList
        style={styles.allComment}
        data={comments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CommentCard
            style={styles.card}
            date={item.date}
            comment={item.comment}
            number={i++}
          />
        )}
      />
    </SafeAreaView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  allComment: {
    height: "90%",
  },
  commentText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    paddingStart: 30,
    fontWeight: "bold",
  },
  card: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
  },
  commentContainer: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: "98%",
    margin: 10,
    fontSize: 25,
    marginBottom: 30,
  },
  date: {
    color: "blue",
    marginTop: 9,
    fontSize: 19,
    marginBottom: 9,
  },
  comment: {
    fontSize: 23,
    paddingStart: 10,
  },
});
export default App;
