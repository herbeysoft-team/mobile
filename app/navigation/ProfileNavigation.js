import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/main/Profile";
import EditProfile from "../screens/profile/EditProfile";
import GetVerified from "../screens/profile/GetVerified";
import MyListing from "../screens/profile/MyListing";
import MyOrders from "../screens/profile/MyOrders";
import DeliveryRequests from "../screens/profile/DeliveryRequests";
import Insights from "../screens/profile/Insights";
import Wallet from "../screens/profile/Wallet";
import Ratings from "../screens/profile/Ratings";
import Setting from "../screens/profile/Settings";
import MySubscription from "../screens/profile/MySubscription";
import Help from "../screens/profile/Help";
import ChangePassword from "../screens/profile/ChangePassword";
import EditListing from "../screens/profile/EditListing";
import EditRating from "../screens/profile/EditRating";
import ListingPreferences from "../components/profile/ListingPreferences";
import CreateWalletPin from "../screens/profile/CreateWalletPin";
import MyOderDetails from "../screens/profile/MyOderDetails";
import MyOrderRecievedDetails from "../screens/profile/MyOrderRecievedDetails";
import Upgrade from "../screens/profile/Upgrade";
import ChangeResetPin from "../screens/profile/ChangeResetPin";
import UpdatePassword from "../screens/profile/UpdatePassword";
import TransactionDetails from "../screens/profile/TransactionDetails";
import TopUp from "../screens/profile/TopUp";
import MyDeliveryDetails from "../screens/profile/MyDeliveryDetails";

const Prof = createNativeStackNavigator();
const ProfileNavigation = () => {
  return (
      <Prof.Navigator initialRouteName="Profile">
        <Prof.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Edit-Profile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Get-Verified"
          component={GetVerified}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="My-Listing"
          component={MyListing}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="My-Order"
          component={MyOrders}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Delivery-Request"
          component={DeliveryRequests}
          options={{ headerShown: false }}
        />
         <Prof.Screen
          name="Insight"
          component={Insights}
          options={{ headerShown: false }}
        />
         <Prof.Screen
          name="Wallet"
          component={Wallet}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Transaction-Details"
          component={TransactionDetails}
          options={{ headerShown: false }}
        />
          <Prof.Screen
          name="Topup"
          component={TopUp}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Rating"
          component={Ratings}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
         <Prof.Screen
          name="My-Subscription"
          component={MySubscription}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Help"
          component={Help}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Change-Password"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Edit-Listing"
          component={EditListing}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Edit-Rating"
          component={EditRating}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Listing-Preferences"
          component={ListingPreferences}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Create-Wallet-Pin"
          component={CreateWalletPin}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Change-Reset-Pin"
          component={ChangeResetPin}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Update-Password"
          component={UpdatePassword}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="My-Order-Details"
          component={MyOderDetails}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="My-Order-Recieved-Details"
          component={MyOrderRecievedDetails}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="My-Delivery-Details"
          component={MyDeliveryDetails}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Upgrade"
          component={Upgrade}
          options={{ headerShown: false }}
        />
      </Prof.Navigator>
  );
};

export default ProfileNavigation;

const styles = StyleSheet.create({});
