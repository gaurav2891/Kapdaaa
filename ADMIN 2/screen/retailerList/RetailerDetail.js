import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import * as retailerAction from "../../redux/action/RetailerAction";
import * as addCommentAction from "../../redux/action/addCommentAction";
import catchDispatch from "./../../utils/catchDispatch";

import SplashScreen from "../splashScreen";

const App = (props) => {
  let { name, firmName, clothCategory, id } = props.route.params;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(retailerAction.fetchRetailerComment(id)).then(() =>
      setIsLoading(false)
    );
    dispatch(retailerAction.fetchWRComment(id)).then(() => setIsLoading(false));
  }, [dispatch]);

  const retailer = useSelector((state) => state.retailer);

  const deleteComment = (id) => {
    catchDispatch(
      dispatch(addCommentAction.deleteComment(id)),
      "Comment Deleted"
    );
  };

  if (isLoading) {
    return (
      <View style={{ backgroundColor: "pink" }}>
        <SplashScreen message="fetching comment" />
      </View>
    );
  }

  const retailerComments = retailer.retailerComment;

  let comments = retailerComments?.data?.doc;

  if (comments?.length === 0) {
    comments = {
      comment: "Nothing...",
      date: "DATE",
    };
  }
  const firstComment = comments ? comments[0] : "NO COMMENTS";
  const secondComment = comments ? comments[1] : "NO COMMENTS";
  const thirdComment = comments ? comments[2] : "NO COMMENTS";
  const fourthComment = comments ? comments[3] : "NO COMMENTS";
  return (
    <ScrollView>
      {/*  OUTLINE DESIGN */}
      <Text style={styles.name}>{firmName}</Text>
      <Text style={styles.status}>Retailer : {name} </Text>
      <Text style={styles.status}>Cloth Category : {clothCategory}-</Text>
      <Text style={styles.status}>Comments :-</Text>

      {/*  COMMENT DESIGN */}
      <View style={styles.description}>
        <Text style={styles.comment}>
          {firstComment?.comment
            ? `${
                firstComment.comment.length <= 55
                  ? firstComment.comment
                  : firstComment.comment.substr[(0, 55)]
              }`
            : "No comments..."}
        </Text>
        <Text style={styles.comment}>
          {secondComment?.comment
            ? `${
                secondComment.comment.length <= 55
                  ? secondComment.comment
                  : `${secondComment.comment.substr[(0, 55)]} ...`
              }`
            : "\n"}
        </Text>

        <Text style={styles.comment}>
          {thirdComment?.comment
            ? `${
                thirdComment.comment.length <= 55
                  ? thirdComment.comment
                  : `${thirdComment.comment.substr[(0, 55)]} ...`
              } `
            : "\n"}
          {fourthComment?.comment ? `........` : "\n"}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("ShowDetails", {
            comments,
            id,
          })
        }
      >
        <Text style={styles.click}> SHOW MORE ...</Text>
      </TouchableOpacity>

      <Button
        style={styles.button}
        title="Add Comment"
        onPress={() =>
          props.navigation.navigate("AddComment", {
            id: id,
          })
        }
      />
      <Text style={styles.or}> OR </Text>
      <Button
        color="red"
        style={styles.button}
        title="delete My comment"
        onPress={() =>
          Alert.alert("Delete", "DO you wanto delete your comment", [
            {
              text: "Delete",
              onPress: () => deleteComment(id),
            },
            {
              text: "Cancel",
            },
          ])
        }
      />
      <Text style={styles.or}> OR </Text>
      <Button
        color="grey"
        style={styles.button}
        title="Update Retailer"
        onPress={() =>
          props.navigation.navigate("UpdateRetailer", [
            {
              id: id,
              name: name,
              firmName: firmName,
              clothCategory: clothCategory,
            },
          ])
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  status: {
    marginTop: 10,
    paddingStart: 10,
    fontSize: 20,
  },
  waitData: {
    marginBottom: 22,
    marginTop: 15,
  },
  click: {
    fontSize: 16,
    marginBottom: 22,
    marginTop: 15,
  },
  name: {
    padding: 10,
    fontSize: 30,
  },
  description: {
    shadowColor: "lightgreen",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 200,
    margin: 10,
  },
  comment: {
    fontSize: 24,
    paddingStart: 10,
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 20,
  },
  or: {
    justifyContent: "space-between",
    fontSize: 25,
    textAlign: "center",
  },
});

export default App;
