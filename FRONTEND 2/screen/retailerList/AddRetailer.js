import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from "react-native";

import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";

import * as retailerAction from "../../redux/action/RetailerAction";
import catchDispatch from "./../../utils/catchDispatch";

const retailerSchema = yup.object({
  firmName: yup.string().required().min(5).max(30),
  location: yup.string().required().min(5).max(20),
  retailerName: yup.string().required().min(3).max(20),
  district: yup.string().required().min(3).max(20),
  state: yup.string().required().min(3).max(20),
  clothCategory: yup.string().required(),
});

const App = (props) => {
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Formik
        initialValues={{
          firmName: "",
          location: "",
          retailerName: "",
          district: "",
          state: "",
          clothCategory: "",
        }}
        validationSchema={retailerSchema}
        onSubmit={(values) => {
          catchDispatch(
            dispatch(retailerAction.addRetailer(values)),
            "Retailer Added"
          );
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.name}>
              <Text style={styles.firmName}>Retailer Name</Text>
              <TextInput
                name="retailerName"
                style={styles.firmInput}
                placeholder={"Enter Retailer Name..."}
                onChangeText={props.handleChange("retailerName")}
                values={props.values.retailerName}
                onBlur={props.handleBlur("retailerName")}
              />
              <Text style={styles.error}>
                {props.touched.retailerName && props.errors.retailerName}
              </Text>
            </View>

            <View style={styles.name}>
              <Text style={styles.firmName}>FirmName</Text>
              <TextInput
                style={styles.firmInput}
                placeholder={"Enter retailer FirmName.."}
                onChangeText={props.handleChange("firmName")}
                values={props.values.firmName}
                onBlur={props.handleBlur("firmName")}
              />
              <Text style={styles.error}>
                {props.touched.firmName && props.errors.firmName}
              </Text>
            </View>

            <View style={styles.name}>
              <Text style={styles.firmName}>location</Text>
              <TextInput
                style={styles.firmInput}
                placeholder={"Enter retailer location..."}
                onChangeText={props.handleChange("location")}
                values={props.values.location}
                onBlur={props.handleBlur("location")}
              />
              <Text style={styles.error}>
                {props.touched.location && props.errors.location}
              </Text>
            </View>

            <View style={styles.name}>
              <Text style={styles.firmName}>District</Text>
              <TextInput
                style={styles.firmInput}
                placeholder={"Enter district Name..."}
                onChangeText={props.handleChange("district")}
                values={props.values.district}
                onBlur={props.handleBlur("district")}
              />
              <Text style={styles.error}>
                {props.touched.district && props.errors.district}
              </Text>
            </View>

            <View style={styles.name}>
              <Text style={styles.firmName}>State</Text>
              <TextInput
                style={styles.firmInput}
                placeholder={"Enter stateName..."}
                onChangeText={props.handleChange("state")}
                values={props.values.state}
                onBlur={props.handleBlur("state")}
              />
              <Text style={styles.error}>
                {props.touched.state && props.errors.state}
              </Text>
            </View>

            <View style={styles.name}>
              <Text style={styles.firmName}>Cloth Category</Text>
              <Text style={styles.select}> SELECT: </Text>

              <Text style={styles.options}>Ready_Made </Text>
              <Text style={styles.options}> Kaccha_Kapda </Text>

              <TextInput
                style={styles.firmInput}
                placeholder={"Enter your cloth Cateogry..."}
                onChangeText={props.handleChange("clothCategory")}
                values={props.values.clothCategory}
                onBlur={props.handleBlur("clothCategory")}
              />
            </View>

            <Button
              style={styles.button}
              title="SAVE RETAILER"
              onPress={() => {
                return props.handleSubmit();
              }}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  name: {
    width: "100%",
  },
  retailerName: {
    marginTop: 20,
    fontSize: 19,
    paddingStart: 10,
    marginVertical: 10,
  },
  firmName: {
    // marginTop: 10,
    fontSize: 19,
    paddingStart: 10,
    marginVertical: 10,
  },
  firmInput: {
    fontSize: 17,
    paddingStart: 20,
    // marginTop: 3,
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  container: {
    shadowColor: "lightgreen",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 800,
    margin: 10,
  },
  button: {
    color: "blue",
    marginTop: 10,
    marginBottom: 30,
    justifyContent: "flex-end",
  },
  error: {
    color: "red",
    paddingStart: 10,
  },
  options: {
    fontSize: 17,
    paddingStart: 70,
    marginBottom: 8,
  },
  select: {
    fontSize: 16,
    paddingStart: 0,
    color: "dimgray",
    fontWeight: "700",
  },
});
export default App;
