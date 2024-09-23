import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { FONTS, SIZES, COLORS } from "../../constant";
import { Ionicons } from '@expo/vector-icons';

const CheckBoxComponent = ({ isChecked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[!isChecked ? styles.checkbox : styles.checked]}>
        {isChecked && <Ionicons name="checkbox-outline" size={SIZES.base5/2} color={COLORS.primary}/>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: SIZES.base2,
    height: SIZES.base2,
    borderWidth: SIZES.thin,
    borderColor: COLORS.primary,
    borderRadius: SIZES.thickness,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: COLORS.white,
  },
});

export default CheckBoxComponent;
