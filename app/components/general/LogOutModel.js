import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../auth/CustomButton";

export default function LogOutModel({
    openLogOutModel,
    setOpenLogOutModel,
    gotoLogOut
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openLogOutModel}
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
            width: SIZES.wp(100),
            height: SIZES.hp(100),
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
            <View
                  style={{
                    width: SIZES.base6,
                    height: SIZES.base6,
                    backgroundColor: COLORS.gray3,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base4,
                    marginBottom: SIZES.base
                  }}
                >
                  <Feather
                    name="log-out"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>
          <Text style={{ ...FONTS.h3, color: COLORS.tertiary, marginBottom: SIZES.base }}>
            Log Out
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
              "Are you sure you want to log out of \n your account"
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
              onPress={gotoLogOut}
              text={"Log Out"}
              fill={true}
            />
            <CustomButton
              onPress={() => setOpenLogOutModel(false)}
              text={"Cancel"}
              fill={false}
            />
          </View>
          
        </View>
      </View>
    </Modal>
  );
}
