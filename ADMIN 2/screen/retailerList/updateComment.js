import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as addCommentAction from "../../redux/action/addCommentAction";
import catchDispatch from "./../../utils/catchDispatch";

import { useDispatch } from "react-redux";

const App = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { isLoading, setIsLoading } = useState(false);

  const { id } = props.route.params;

  const updateComment = (comment, id) => {
    catchDispatch(
      dispatch(addCommentAction.updateComment(comment, id)),
      `Updated Comment: ${comment}`
    );
  };

  console.log("UC+>", id);
  return (
    <ScrollView>
      <Text style={styles.header}>Update your Comment here</Text>
      <TextInput
        style={styles.commentContainer}
        placeholder={"Update comment here"}
        value={comment}
        multiline
        onChangeText={(text) => setComment(text)}
      />

      <Button
        style={styles.button}
        title="Update comment"
        onPress={() => updateComment(comment, id)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 19,
    marginTop: 12,
    textAlign: "center",
    justifyContent: "center",
  },
  commentContainer: {
    paddingStart: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 300,
    margin: 20,
    fontSize: 25,
  },
  button: {
    margin: 20,
    width: 50,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default App;
