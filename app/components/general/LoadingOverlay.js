import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { FONTS, SIZES, COLORS } from "../../constant";

const LoadingOverlay = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color={COLORS.tertiary}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0, 0, 0, 0.0)', // Semi-transparent background
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999, // Ensure it's above other components
  },
  activityIndicatorContainer: {
    position: 'absolute',
    zIndex: 1000, // Higher zIndex for the ActivityIndicator
  },
});

export default LoadingOverlay;
