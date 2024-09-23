import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import NotifyList from "../../components/profile/NotifyList";
import GotoList from "../../components/profile/GotoList";


export default function Setting({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Notifications"} />
      <NotifyList
        title={"Low Stock Alerts"}
        description={"Be notified when your items are low in stock"}
        storageKey={"trowmartLowStockNotifications"}
        state={true}
      />
      <NotifyList
        title={"New Listings"}
        description={"Be notified when a new listing is available near you"}
        storageKey={"trowmartNewListingAvailable"}
        state={true}
      />
      <GotoList
        title={"Listing Preferences"}
        navigation={navigation}
        destinationScreen={"Listing-Preferences"} 
        />
      <NotifyList
        title={"Messages"}
        description={"Be notified when you receive a message"}
        storageKey={"trowmartReceiveMessage"}
        state={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
});
