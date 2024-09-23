import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FONTS, COLORS, SIZES } from "../../constant";

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    ...FONTS.h4,
    color: COLORS.accent2,
    // Customize label styles as needed
  },
  valueLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
    marginTop: SIZES.base,
  },
});

const MinLabel = ({ value }) => (
  <Text style={styles.label}>{`${value}`}</Text>
);

const MaxLabel = ({ value }) => (
  <Text style={styles.label}>{`${value}`}</Text>
);

const MinMaxLabels = ({ min, max }) => {
  return (
    <View style={styles.valueLabelContainer}>
      <MinLabel value={min} />
      <MaxLabel value={max} />
    </View>
  );
};

export default MinMaxLabels;
