import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import PinCompletedModel from "../../components/general/PinCompletedModel.js";
import CustomTextInput from "../../components/auth/CustomTextInput.jsx";
import CustomButton from "../../components/auth/CustomButton.jsx";

export default function UpdatePassword({ navigation }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [openPinCompletedModel, setOpenPinCompletedModel] = useState(false);
  
  const gotoHome = () => {
    setOpenPinCompletedModel(false);
    navigation.navigate("Change-Password");
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Update Password"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZES.base10 }}
      >
      <KeyboardAvoidingView behavior="padding">
         
          {/* {loginloading ? (
            <ActivityIndicator size="large" color={COLORS.tertiary} />
          ) : null} */}
          <View style={{ marginTop: SIZES.base3 }}>
            <Text style={styles.inputheading}>Old Password</Text>
            <CustomTextInput
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={"Enter old password"}
            />
          </View>

          <View style={{ marginTop: SIZES.base2, marginBottom: SIZES.base2 }}>
            <Text style={styles.inputheading}>New Password</Text>

            <CustomTextInput
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={"Enter New password"}
            />
          </View>
          </KeyboardAvoidingView>
          <CustomButton
            onPress={""}
            text={"Update Passowrd"}
            fill={true}
          />
          </ScrollView>

<PinCompletedModel
          openPinCompletedModel={openPinCompletedModel}
          gotoHome={gotoHome}
          heading={"Pin Created!"}
          subheading={"You have successfully set up a wallet pin for \n your wallet transactions"}
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
  OTPStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray4,
    borderWidth: SIZES.thickness / 2,
    borderRadius: SIZES.base,
    height: SIZES.base8,
    width: SIZES.base8,
    borderBottomWidth: SIZES.thickness / 2,
    marginBottom: SIZES.base3,
  },
});
