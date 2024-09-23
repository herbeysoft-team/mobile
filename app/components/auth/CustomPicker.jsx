import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { FONTS, SIZES, COLORS } from '../../constant';

const CustomPicker = ({
  placeholder,
  items,
  onValueChange,
  value,
  style,
  iconColor,
}) => {
  const [isFocused, setIsFocused] = useState(false);

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
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.base2,
        borderRadius: SIZES.radius / 2,
        ...style,
      }}
    >
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => {
          onValueChange(itemValue);
          handleBlur();
        }}
        style={{
          color: COLORS.tertiary,
          width: '100%',
        }}
        mode="dropdown"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <Picker.Item label={placeholder} value={null} />
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
      <AntDesign
        name="down"
        size={SIZES.base2}
        color={iconColor || (isFocused ? COLORS.primary : COLORS.gray4)}
      />
    </View>
  );
};

export default CustomPicker;
