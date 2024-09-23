import { View, Text, Pressable } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";

export default function TickerButton({ onPress, text, fill }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: fill ? COLORS.primaryLight : null,
        height: SIZES.base3,
        borderRadius: SIZES.base,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: SIZES.thickness / 4,
        borderColor: COLORS.gray4,
        paddingHorizontal: SIZES.base
      }}
    >
      <Text
        style={{
          color: fill ? COLORS.primary : COLORS.primary,
          textAlign: "center",
          ...FONTS.body4,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
