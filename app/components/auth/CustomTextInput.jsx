import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS } from "../../constant";

export default function CustomTextInput({ placeholder, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
      <TextInput
        value={text}
        onChangeText={(value) => setText(value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        style={{
          ...FONTS.body3,
          borderWidth: SIZES.thickness / 3,
          borderColor: isFocused ? COLORS.primary : COLORS.gray4,
          color: COLORS.tertiary,
          marginVertical: SIZES.thickness,
          // width: SIZES.wp(90),
          padding: SIZES.base2,
          borderRadius: SIZES.radius / 2,
        }}
        {...rest}
      />
  );
}

const styles = StyleSheet.create({});
