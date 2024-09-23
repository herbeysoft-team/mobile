import { Switch, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
import { setItem, getItem, removeItem } from "../../utils/asyncStorage.js";

export default function NotifyList({ title, description, storageKey, state }) {
  const [isEnabled, setIsEnabled] = useState(state);

  useEffect(() => {
    const loadStateFromStorage = async () => {
      try {
        const storedState = await getItem(storageKey);
        if (storedState !== null) {
          setIsEnabled(storedState === "true");
        }
      } catch (error) {
        console.error("Error loading state from AsyncStorage:", error);
      }
    };
    loadStateFromStorage();
  }, [storageKey]);

  const toggleSwitch = async () => {
    try {
      await setItem(storageKey, String(!isEnabled));
      setIsEnabled((previousState) => !previousState);
    } catch (error) {
      console.error("Error saving state to AsyncStorage:", error);
    }
  };
  return (
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
          <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
            {description}
          </Text>
        </View>
        <View>
          <Switch
            trackColor={{ false: COLORS.gray2, true: COLORS.primary }}
            thumbColor={isEnabled ? COLORS.gray2 : COLORS.gray2}
            ios_backgroundColor={COLORS.gray2}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
   
  );
}

const styles = StyleSheet.create({});
