import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constant';

const RefreshControlComponent = ({ refreshing }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={refreshing}
        size="large"
        color={COLORS.primary}
      />
      <Text style={styles.text}>
        {refreshing ? 'Refreshing...' : 'Pull down to refresh'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  text: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
});

export default RefreshControlComponent;
