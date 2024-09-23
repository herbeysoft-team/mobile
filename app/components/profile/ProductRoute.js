import { View, Text, ScrollView } from "react-native";
import { FONTS, COLORS, SIZES, URLBASE, listing } from "../../constant";
import React, { useState, useEffect, useMemo } from "react";
import MyListingCardView from "./MyListingCardView";
import { Ionicons } from "@expo/vector-icons";

export default function ProductRoute({
  listing,
  navigation,
  handleSettingChangeFunction,
}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.base2,
        paddingHorizontal: SIZES.base2,
        marginBottom: SIZES.base3,
      }}
    >
      {listing.length > 0 &&
        listing.map((item, index) => (
          <MyListingCardView
            key={item._id}
            listing={item}
            navigation={navigation}
            handleSettingChange={handleSettingChangeFunction}
          />
        ))}

      {listing.length < 1 ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", marginVertical:SIZES.base3 }}
        >
          <Ionicons
            name="ios-basket-outline"
            size={SIZES.base5}
            color={COLORS.accent2}
          />
          <Text
            style={{ ...FONTS.body3, color: COLORS.accent2 }}
          >{`No Product Listing`}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
