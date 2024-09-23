import { View, Text, Pressable } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";

export default function CustomButton({ onPress, text, fill }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: fill ? COLORS.primary : null,
        height: SIZES.base5,
        borderRadius: SIZES.base,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: SIZES.thickness / 3,
        borderColor: COLORS.primary,
      }}
    >
      <Text
        style={{
          color: fill ? COLORS.white : COLORS.primary,
          textAlign: "center",
          ...FONTS.h4,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
