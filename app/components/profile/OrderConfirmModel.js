import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../auth/CustomButton";
import CustomButtonModal from "../auth/CustomButtonModal";
import CustomTextInput from "../auth/CustomTextInput";

const OrderConfirmModel = ({
  openWalletInputModal,
  setOpenWalletInputModal,
  Heading,
  SubHeading,
  InputHeading,
  setPin,
  pin,
  ButtonName,
  handleConfirmStatus,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openWalletInputModal}
    >
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
            // alignItems: "center",
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
            shadowOpacity: 0.5,
            shadowRadius: SIZES.thickness,
            elevation: SIZES.base20,
          }}
        >
          <TouchableOpacity
            style={{ justifyContent:"flex-end" }}
            onPress={() => setOpenWalletInputModal(false)}
          >
            <MaterialIcons
              name="cancel"
              size={SIZES.base3}
              color={COLORS.gray3}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.accent2,
              marginBottom: SIZES.base2,
              textAlign:"center"
            }}
          >
            {Heading}
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.accent,
              marginBottom: SIZES.base2,
            }}
          >
            {SubHeading}
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
              value={pin}
              onChangeText={(text) => setPin(text)}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={"Enter order pin"}
            />
            <CustomButtonModal
              onPress={handleConfirmStatus}
              text={ButtonName}
              fill={true}
              color={COLORS.primary}
            />

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

export default OrderConfirmModel;

const styles = StyleSheet.create({});
