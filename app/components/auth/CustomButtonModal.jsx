import { View, Text, Pressable } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";

export default function CustomButtonModal({ onPress, text, fill, color }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: fill ? color : null,
        height: SIZES.base5,
        borderRadius: SIZES.base,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: SIZES.thickness / 3,
        borderColor: color,
      }}
    >
      <Text
        style={{
          color: fill ? COLORS.white : color,
          textAlign: "center",
          ...FONTS.h4,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
