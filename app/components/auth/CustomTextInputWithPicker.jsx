import React, { useState, useEffect } from "react";
import { View, Platform, TouchableWithoutFeedback } from "react-native";
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
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setIsPickerOpen(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsPickerOpen(false);
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Simulate blur effect after a short delay
      if (!isPickerOpen) {
        const timer = setTimeout(() => {
          setIsFocused(false);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [isPickerOpen]);

  return (
    <TouchableWithoutFeedback onPress={handleFocus}>
      <View
        style={{
          ...FONTS.body3,
          borderWidth: SIZES.thickness / 3,
          borderColor: isFocused ? COLORS.primary : COLORS.gray4,
          color: COLORS.tertiary,
          marginVertical: SIZES.thickness,
          borderRadius: SIZES.radius / 2,
          overflow: 'hidden',
        }}
      >
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: placeholder,
            value: null,
            color: COLORS.gray4,
          }}
          onValueChange={(value) => {
            onValueChange(value);
            if (Platform.OS === 'android') {
              setIsPickerOpen(false);
            }
          }}
          items={items}
          value={rest.value}
          style={{
            inputIOS: {
              ...FONTS.body3,
              color: COLORS.tertiary,
              paddingVertical: SIZES.base2,
              paddingHorizontal: SIZES.base2,
              paddingRight: SIZES.base3,
            },
            inputAndroid: {
              ...FONTS.body3,
              color: COLORS.tertiary,
              paddingVertical: SIZES.base2,
              paddingHorizontal: SIZES.base2,
              paddingRight: SIZES.base3,
            },
            placeholder: {
              ...FONTS.body3,
              color: COLORS.gray,
            },
            iconContainer: {
              position: 'absolute',
              right: 10,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              width: SIZES.base * 3,
            },
          }}
          Icon={() => (
            <View style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
              <AntDesign
                name="down"
                size={SIZES.base2}
                color={isFocused ? COLORS.primary : COLORS.tertiary}
              />
            </View>
          )}
          onOpen={() => {
            handleFocus();
            setIsPickerOpen(true);
          }}
          onClose={() => {
            if (Platform.OS === 'ios') {
              handleBlur();
            } else {
              setIsPickerOpen(false);
            }
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomTextInputWithPicker;