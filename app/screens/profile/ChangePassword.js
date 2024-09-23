import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import GotoList from "../../components/profile/GotoList";

export default function ChangePassword({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Security"} />
      <GotoList title={"Create Wallet Pin"} navigation={navigation} destinationScreen={"Create-Wallet-Pin"}/>
      <GotoList title={"Change/Reset Pin"} navigation={navigation} destinationScreen={"Change-Reset-Pin"}/>
      <GotoList title={"Update Password"} navigation={navigation} destinationScreen={"Update-Password"}/>
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
