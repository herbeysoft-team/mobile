import React, { useState } from "react";
import { View, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";

const CustomTextInputWithPicker = ({
  placeholder,
  items,
  onValueChange,
  ...rest
}) => {
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
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        ...FONTS.body3,
        borderWidth: SIZES.thickness / 3,
        borderColor: isFocused ? COLORS.primary : COLORS.gray4,
        color: COLORS.tertiary,
        marginVertical: SIZES.thickness,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: SIZES.base,
        borderRadius: SIZES.radius / 2,
      }}
    >
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        placeholder={{
          label: placeholder,
          value: null,
          color: COLORS.black,
        }}
        onValueChange={onValueChange}
        items={items}
        value={rest.value}
        style={{
          inputIOS: {
            ...FONTS.body3,
            color: COLORS.tertiary,
          },
          inputAndroid: {
            ...FONTS.body3,
            color: COLORS.tertiary,
            paddingHorizontal: 10, // Adjust padding to your liking
            paddingVertical: 8,
            borderWidth: 0,
            borderColor: "transparent",
          },
          placeholder: {
            ...FONTS.body3,
            color: COLORS.gray,
          },
          iconContainer: {
            position: "absolute",
            top: SIZES.base2,
            right: -SIZES.wp(50),
          },
        }}
        Icon={() => {
          return (
            <AntDesign
              name="down"
              size={SIZES.base2}
              color={isFocused ? COLORS.primary : COLORS.gray4}
            />
          );
        }}
        onOpen={handleFocus}
        onClose={handleBlur}
      />
    </View>
  );
};

export default CustomTextInputWithPicker;
