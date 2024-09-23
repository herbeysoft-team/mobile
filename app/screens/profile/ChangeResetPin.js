import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import CustomButton from "../../components/auth/CustomButton";
import OTPTextView from "react-native-otp-textinput";
import { setItem, getItem, removeItem } from "../../utils/asyncStorage.js";
import Toast from "react-native-toast-message";
import PinCompletedModel from "../../components/general/PinCompletedModel.js";

export default function ChangeResetPin({ navigation }) {
  const [oldOtpValue, setOldOtpValue] = useState(""); // State to hold OTP value
  const [newOtpValue, setNewOtpValue] = useState(""); // State to hold OTP value
  const [openPinCompletedModel, setOpenPinCompletedModel] = useState(false);
  const steps = [1, 2];
  const [currentStep, setCurrentStep] = useState(0);
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

  const gotoNewPin = async () => {
    console.log("I got here")
    try {
      if (!isWalletPinSet) {
        Toast.show({
          type: "error",
          text1: "Create A New Wallet Pin",
        });
        navigation.navigate("Change-Password");
      } else {
        let oldPin = await getItem("trowmartOTP");
        if(oldPin == oldOtpValue){
            setCurrentStep(1)
        }else{
            Toast.show({
                type: "error",
                text1: "Incorrect Old Pin",
              });
        }
        
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save OTP.");
    }
  };

  const saveOTPToStorage = async () => {
    try {
      if (newOtpValue) {
        await setItem("trowmartOTP", newOtpValue); // Save OTP to async storage
        setOpenPinCompletedModel(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save OTP.");
    }
  };

  const gotoHome = () => {
    setOpenPinCompletedModel(false);
    navigation.navigate("Change-Password");
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Change/Reset Pin"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZES.base10 }}
      >
      {/* Indicator container */}
      <View
        style={{
          flex: 1,
          paddingBottom: SIZES.base,
          flexDirection: "row",
          marginTop: SIZES.base,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        {/* Render indicator */}
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentStep == index && {
                backgroundColor: COLORS.primaryDeep,
                width: SIZES.base3,
                height: SIZES.thickness,
              },
            ]}
          />
        ))}
      </View>

      {/* the Pages here */}
      {currentStep == 0 && (
        <View>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray3,
              paddingVertical: SIZES.base,
            }}
          >
            Enter old wallet PIN
          </Text>

          <OTPTextView
            textInputStyle={styles.OTPStyle}
            inputCount={4}
            tintColor={COLORS.gray4}
            handleTextChange={(text) => setOldOtpValue(text)}
          />
            <View
            style={{
              marginTop: SIZES.base,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: SIZES.base,
              marginBottom: SIZES.base
            }}
          >
            <Text style={{ ...FONTS.body4, color: COLORS.primary }}>Forget Wallet Pin ? </Text>
            <Pressable onPress={() => navigation.navigate("Reset-Pin")}>
              <Text style={{ ...FONTS.h4, color: COLORS.secondary }}>
                Reset
              </Text>
            </Pressable>
          </View>
          <CustomButton
            onPress={() => gotoNewPin()}
            text={"Continue"}
            fill={true}
          />
        </View>
      )}

      {/* the Pages here */}
      {currentStep == 1 && (
        <View>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray3,
              paddingVertical: SIZES.base,
            }}
          >
            Enter new wallet PIN
          </Text>

          <OTPTextView
            textInputStyle={styles.OTPStyle}
            inputCount={4}
            tintColor={COLORS.gray4}
            handleTextChange={(text) => setNewOtpValue(text)}
          />

          <CustomButton
            onPress={() => saveOTPToStorage()}
            text={"Save"}
            fill={true}
          />
        </View>
      )}
        </ScrollView>
      <PinCompletedModel
          openPinCompletedModel={openPinCompletedModel}
          gotoHome={gotoHome}
          heading={"Pin Changed!"}
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
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base2,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
});
