import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";
import BottomNavigation from "./BottomNavigation";
import Onboard from "../screens/onboarding/Onboard";
import ForgetPassword from "../screens/auth/ForgetPassword";
import ListingDetails from "../screens/main/ListingDetails";
import VendorProfile from "../screens/explore/VendorProfile";
import Checkout from "../screens/explore/Checkout";
import { getItem } from "../utils/asyncStorage.js";
import ImageUpload from "../screens/auth/ImageUpload.js";
import ChatScreen from "../screens/main/ChatScreen.js";
import RequestDelivery from "../screens/main/RequestDelivery.js";
import CartScreen from "../screens/explore/CartScreen.js";
import Preferences from "../screens/auth/Preferences.js";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("trowmartonboarded");
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboard">
        <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forget-Password"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={BottomNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboard"
            component={Onboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Listing-Detail"
            component={ListingDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Vendor-Profile"
            component={VendorProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Images"
            component={ImageUpload}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat-Screen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Request-Delivery"
            component={RequestDelivery}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forget-Password"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={BottomNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboard"
            component={Onboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Listing-Detail"
            component={ListingDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Vendor-Profile"
            component={VendorProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Images"
            component={ImageUpload}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat-Screen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Request-Delivery"
            component={RequestDelivery}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Preferences"
            component={Preferences}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default StackNavigator;

const styles = StyleSheet.create({});
