import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../auth/CustomButton";

export default function GetVerifiedModel({
  openGetVerifiedModel,
  setOpenGetVerifiedModel,
  gotoGetVerified
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openGetVerifiedModel}
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
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.base2,
            paddingHorizontal: SIZES.base3,
            paddingVertical: SIZES.base4,
            width: SIZES.wp(85),
            shadowColor: COLORS.gray,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: SIZES.thickness,
            elevation: SIZES.thickness,
          }}
        >
          <MaterialIcons
            name="verified"
            size={SIZES.base6}
            color={COLORS.primary}
          />
          <Text style={{ ...FONTS.h3, color: COLORS.tertiary }}>
            Get Verified
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              textAlign: "center",
              lineHeight: SIZES.base3,
              color: COLORS.gray3,
              marginBottom: SIZES.base2
            }}
          >
            {
              "Submit a Government issued ID and a selfie of yourself to get verified. \n\n This boosts the credibility of your profile"
            }
          </Text>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              gap: SIZES.base,
              width: SIZES.wp(75),
            }}
          >
            <CustomButton
              onPress={gotoGetVerified}
              text={"Continue"}
              fill={true}
            />
            <CustomButton
              onPress={() => setOpenGetVerifiedModel(false)}
              text={"Close"}
              fill={false}
            />
          </View>
          
        </View>
      </View>
    </Modal>
  );
}
