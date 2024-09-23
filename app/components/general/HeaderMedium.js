import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";

export default function HeaderMedium({ navigation, title }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: SIZES.base3,
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}    
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={SIZES.base2} color={COLORS.gray} />
      </TouchableOpacity>

      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.secondary,
          flex: 3,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}
