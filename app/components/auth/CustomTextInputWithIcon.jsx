import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { FONTS, SIZES, COLORS } from "../../constant";

export default function CustomTextInputWithIcon({ placeholder,icon, textIcon, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View
      style={{
        ...FONTS.body3,
        borderWidth: SIZES.thickness / 3,
        borderColor: isFocused ? COLORS.primary : COLORS.gray4,
        color: COLORS.tertiary,
        marginVertical: SIZES.thickness,
        flexDirection:"row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: SIZES.base,
        padding: SIZES.base2,
        borderRadius: SIZES.radius / 2,
      }}
    >
      <View style={{flexDirection:"row", gap: SIZES.base, alignItems: "center"}}>
      {icon && <AntDesign name={icon} size={SIZES.base3} color={COLORS.gray3} />} 
      {textIcon && <Text style={{...FONTS.h2, color: COLORS.gray3}}>{textIcon}</Text>}
      <TextInput
        value={text}
        onChangeText={(value) => setText(value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          flex:1,
          ...FONTS.body3,
          color: COLORS.tertiary,
        }}
        placeholder={placeholder}
        {...rest}
      />
      </View>
    </View>
  );
}
