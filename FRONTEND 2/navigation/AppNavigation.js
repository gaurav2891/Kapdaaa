import AsyncStorage from "@react-native-async-storage/async-storage";
import { Restart } from "fiction-expo-restart";

import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Alert } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";

import * as retailerAction from "../redux/action/RetailerAction";
import * as authAction from "../redux/action/authActions";
import * as wholesalerAction from "../redux/action/wholesalerAction";
import SplashScreen from "./../screen/splashScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// RETAILER LIST
import AddRetailer from "../screen/retailerList/AddRetailer";
import Retailer from "./../screen/retailerList/Retailer";
import RetailerDetail from "./../screen/retailerList/RetailerDetail";
import AddComment from "./../screen/retailerList/addComment";
import ShowDetails from "./../screen/retailerList/showDetails";
import UpdateComment from "./../screen/retailerList/updateComment";
// COMMENT
import Comment from "./../screen/comments/Comment";
// ME
import LogoutScreen from "../screen/USER/logoutScreen";
import UpdateMe from "../screen/USER/updateMe";
import UpdatePassword from "./../screen/USER/updatePassword";

// RETAILER LISTS
const RetailersList = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RetailerName" component={Retailer} />
      <Stack.Screen name="RetailerDetail" component={RetailerDetail} />
      <Stack.Screen name="AddRetailer" component={AddRetailer} />
      <Stack.Screen name="ShowDetails" component={ShowDetails} />
      <Stack.Screen name="AddComment" component={AddComment} />
      <Stack.Screen name="UpdateComment" component={UpdateComment} />
    </Stack.Navigator>
  );
};

// PROFILE
const WholesalerList = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="logoutScreen" component={LogoutScreen} />
      <Stack.Screen name="UpdateMe" component={UpdateMe} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          if (route.name === "MyComments") {
            iconName = "comment-multiple";
          } else if (route.name === "RetailersList") {
            return <Fontisto name="shopping-store" size={24} color="black" />;
          } else if (route.name === "Profile") {
            iconName = "face-profile";
          } else if (route.name === "ADMIN AREA") {
            iconName = "server-security";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={24} color="black" />
          );
        },
      })}
    >
      <Tab.Screen
        name="RetailersList"
        component={RetailersList}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyComments"
        component={Comment}
        options={<MaterialIcons name="favorite" size={24} color="black" />}
      />
      <Tab.Screen
        name="Profile"
        component={WholesalerList}
        options={{
          title: "My Profile",
          headerStyle: {
            backgroundColor: "lightcyan",
          },
          headerTintColor: "#813",
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  try {
    useEffect(() => {
      setIsLoading(true);

      dispatch(authAction.getCurrentUser());
      dispatch(wholesalerAction.fetchWholesalerComment());
      dispatch(retailerAction.fetchRetailer())
        .then((res) => {
          if (res.status === "SUCCESS") {
            console.log("DISPATCHED ALL ✅");
            setIsLoading(false);
          } else if (res.status === "FAILED") {
            Alert.alert("Failed", `Settings has changed\n\n REOPEN THE APP `, [
              {
                text: "ok",
                onPress: async () => {
                  console.log("HTA DE BRO");
                  await AsyncStorage.removeItem("token");
                  await AsyncStorage.removeItem("currentUser");
                  Restart();
                },
              },
            ]);
          }
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("Failed", `  ${err.message} \n\n \n "REOPEN THE APP"`, [
            {
              text: "ok",
              onPress: async () => {
                console.log("HTA DE BRO");
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("currentUser");
                Restart();
              },
            },
          ]);
        });
    }, [dispatch]);
  } catch (error) {
    console.log("APP_NAVIGATION =>", error.message);
    Alert.alert("Failed", "Unable to fetching details");
  }

  if (isLoading) {
    return (
      <View style={styles.centerd}>
        <SplashScreen />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centerd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
