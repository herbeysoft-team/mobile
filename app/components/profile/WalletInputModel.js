import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../auth/CustomButton";
import CustomButtonModal from "../auth/CustomButtonModal";
import CustomTextInput from "../auth/CustomTextInput";

const WalletInputModel = ({
  openWalletInputModal,
  setOpenWalletInputModal,
  Heading,
  InputHeading,
  setAmount,
  amount,
  ButtonName,
  handlePay
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={openWalletInputModal}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            margin: SIZES.base2,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.base2,
            paddingHorizontal: SIZES.base3,
            paddingVertical: SIZES.base2,
            width: SIZES.wp(85),
            shadowColor: COLORS.gray,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.50,
            shadowRadius: SIZES.thickness,
            elevation: SIZES.base20,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.accent,
              marginBottom: SIZES.base2,
            }}
          >
            {Heading}
          </Text>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              gap: SIZES.base,
              width: SIZES.wp(75),
            }}
          >
            <Text
            style={{
              ...FONTS.body3,
              textAlign: "left",
              lineHeight: SIZES.base3,
              color: COLORS.gray3,
              marginBottom: SIZES.thin,
            }}
          >
            {InputHeading}
            </Text>
             <CustomTextInput
              value={amount}
              onChangeText={(text) => setAmount(text)}
              keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={"Enter amount to add"}
              
            /> 
            <CustomButtonModal
              onPress={handlePay}
              text={ButtonName}
              fill={true}
              color={COLORS.primary}
            />

        <TouchableOpacity
        style={{alignItems:"center"}}
          onPress={()=>setOpenWalletInputModal(false)}
        >
        <MaterialIcons name="cancel" size={SIZES.base3} color={COLORS.gray3} />
        </TouchableOpacity>
            {/* <CustomButton
              onPress={() => setOpenWalletInputModal(false)}
              text={"Cancel"}
              fill={false}
            /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WalletInputModel;

const styles = StyleSheet.create({});
