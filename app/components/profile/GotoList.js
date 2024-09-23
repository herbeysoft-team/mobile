import { Switch, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState} from "react";
import { FONTS, COLORS, SIZES} from "../../constant";
import { MaterialIcons } from "@expo/vector-icons";


export default function GotoList({ title, navigation, destinationScreen }) {
    const handlePress = () => {
        navigation.navigate(destinationScreen);
      };

    
  return (
    <Pressable onPress={handlePress}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: SIZES.base2,
          borderRadius: SIZES.base,
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: SIZES.base,
          marginBottom: SIZES.base,
          borderBottomColor: COLORS.gray4,
          borderBottomWidth: SIZES.thin,
        }}
      >
        <View style={{ flex: 2, gap: SIZES.base, alignItems: "flex-start" }}>
          <Text style={{ ...FONTS.listHead, color: COLORS.accent2 }}>
            {title}
          </Text>
        </View>
        <View>
          <MaterialIcons
          name="keyboard-arrow-right"
          size={SIZES.base2}
          color={COLORS.tertiary}
        />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
