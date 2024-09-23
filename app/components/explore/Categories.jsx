import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <View style={{ flexDirection: "row", gap: SIZES.base, marginBottom:SIZES.base2 }}>
      {categories.map((cat, index) => {
        let isActive = cat.key === activeCategory?.key;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleChangeCategory(isActive ? null : cat)}
            style={{
              paddingHorizontal: SIZES.base,
              paddingVertical: SIZES.base,
              flex: 1,
              borderRadius: SIZES.base,
              borderColor: COLORS.gray4,
              borderWidth: isActive ? null : SIZES.thin,
              backgroundColor: isActive ? COLORS.primary : null,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: isActive ? COLORS.white : COLORS.accent,
              }}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
