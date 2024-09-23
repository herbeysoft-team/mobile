import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import CustomButton from "../../components/auth/CustomButton";
import OTPTextView from "react-native-otp-textinput";
import { setItem, getItem, removeItem } from "../../utils/asyncStorage.js";
import PinCompletedModel from "../../components/general/PinCompletedModel.js";

export default function CreateWalletPin({ navigation }) {
  const [otpValue, setOtpValue] = useState(""); // State to hold OTP value
  const [openPinCompletedModel, setOpenPinCompletedModel] = useState(false);
  const [isWalletPinSet, setIsWalletPinSet] = useState(false);
  useEffect(() => {
    // removeItem("trowmartOTP");
    checkIfWalletPinSet();
  }, []); // Run once when component mounts

  const checkIfWalletPinSet = async () => {
    try {
      const storedOTP = await getItem("trowmartOTP");
      if (storedOTP) {
        setIsWalletPinSet(true); // Wallet PIN is set
      }
    } catch (error) {
      console.log("Error checking wallet PIN:", error);
    }
  };

  const saveOTPToStorage = async () => {
    try {
      if (otpValue) {
        await setItem("trowmartOTP", otpValue); // Save OTP to async storage
        setOpenPinCompletedModel(true);
      }
    } catch (error) {
      console.log("Error", "Failed to save OTP.");
    }
  };

  const gotoHome = () => {
    setOpenPinCompletedModel(false);
    navigation.navigate("Change-Password");
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Create Wallet Pin"} />
      {isWalletPinSet ? (
        <Text style={{ ...FONTS.body3, color: COLORS.gray3 }}>
          Wallet PIN is already set.
        </Text>
      ) : (
        <View>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray3,
              paddingVertical: SIZES.base2,
            }}
          >
            Enter a 4 digit pin to use when making wallet transactions such as
            withdrawals and transfers
          </Text>

          <OTPTextView
            textInputStyle={styles.OTPStyle}
            inputCount={4}
            tintColor={COLORS.gray4}
            handleTextChange={(text) => setOtpValue(text)}
          />

          <CustomButton
            onPress={()=>saveOTPToStorage()}
            text={"Set PIN"}
            fill={true}
          />
        </View>
      )}

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
