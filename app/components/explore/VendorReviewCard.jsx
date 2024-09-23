import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS, COLORS, SIZES } from "../../constant";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function VendorReviewCard({ navigation }) {
  return (
    <Pressable onPress={() => {}}>
      <View
        style={{
          paddingVertical: SIZES.base,
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
            {"Victor Jackson"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: SIZES.base,
            }}
          >
            <FontAwesome name="star" size={SIZES.base2} color={COLORS.amber} />
            <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
              {`4.5 . 1 year ago`}
            </Text>
          </View>

          <Text style={{ ...FONTS.body3, color: COLORS.gray3 }}>
            {
              "We’re your neighbourhood cake artisans, crafting delectable moments since 2018. Our passion is to bake joy into every slice."
            }
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
