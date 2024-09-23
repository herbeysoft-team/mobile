import { View, StyleSheet, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import { FONTS, COLORS, SIZES } from "../../constant";
import RnRangeSlider from "rn-range-slider";
import MinMaxLabels from "./MinMaxLabels";

const Slider = ({ min, max, initialMin, initialMax, handleValueChange }) => {
  const Thumb = () => <View style={styles.thumb} />;
  const Rail = () => <View style={styles.rail} />;
  const RailSelected = () => <View style={styles.railSelected} />;
  const Label = ({ text }) => <Text style={styles.label}>{text}</Text>;
  const Notch = () => <View style={styles.notch} />;

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  return (
    <RnRangeSlider
      style={styles.slider}
      min={min}
      max={max}
      step={1000}
      floatingLabel
      value={[initialMin, initialMax]}
      onValueChanged={handleValueChange}
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      renderLabel={renderLabel}
      renderNotch={renderNotch}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    flex: 1,
    alignSelf: "center",
    // Add any other styles you want for the slider container
  },
  thumb: {
    width: SIZES.base2,
    height: SIZES.base2,
    borderRadius: SIZES.base2,
    backgroundColor: COLORS.gray4,
    borderColor: COLORS.gray4,
    // Customize thumb styles as needed
  },
  rail: {
    flex: 1,
    height: SIZES.thickness,
    backgroundColor: COLORS.gray4,
    // Customize rail styles as needed
  },
  railSelected: {
    flex: 1,
    height: SIZES.thickness,
    backgroundColor: COLORS.primary,
    // Customize selected rail styles as needed
  },
  label: {
    textAlign: "center",
    color: COLORS.accent,
    // Customize label styles as needed
  },
  notch: {
    width: SIZES.thin,
    height: SIZES.thin,
    borderRadius: SIZES.base2,
    backgroundColor: COLORS.primary,
    // Customize notch styles as needed
  },
});

export default Slider;
