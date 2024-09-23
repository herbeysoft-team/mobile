import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../auth/CustomButton";
import CustomButtonModal from "../auth/CustomButtonModal";

const GeneralModal = ({
  openGeneralModal,
  setOpenGeneralModal,
  gotoGeneralModel,
  Heading,
  SubHeading,
  ButtonName,
  handleDelete,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={openGeneralModal}>
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
          {/* <MaterialIcons
            name="verified"
            size={SIZES.base6}
            color={COLORS.primary}
          /> */}
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.accent,
              marginBottom: SIZES.base,
            }}
          >
            {Heading}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              textAlign: "center",
              lineHeight: SIZES.base3,
              color: COLORS.gray3,
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
            <CustomButtonModal
              onPress={handleDelete}
              text={ButtonName}
              fill={true}
              color={COLORS.red}
            />
            <CustomButton
              onPress={() => setOpenGeneralModal(false)}
              text={"Cancel"}
              fill={false}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GeneralModal;

const styles = StyleSheet.create({});
