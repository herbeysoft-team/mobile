import {
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useRef, useState, useMemo } from "react";
import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import placeholder from "../../../assets/placeholder.png";
import { useDispatch } from "react-redux";
import { toggleSetting } from "../../context/features/listingSlice";

export default function MyListingCardView({ listing, handleSettingChange }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleOpenBottomSheet = () => {
    if (handleSettingChange) {
      handleSettingChange({status: true, id: listing._id});
      // console.log(listing._id)
    } else {
      console.error("handleSettingChange is not defined");
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: SIZES.base,
        flex: 1,
        marginBottom: SIZES.base,
        borderBottomColor: COLORS.gray4,
        borderBottomWidth: SIZES.thin,
      }}
    >
      <View
        style={{
          paddingVertical: SIZES.base,
          borderRadius: SIZES.base,
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: SIZES.base,

          flex: 3,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("Listing-Detail", listing)}
        >
          <Image
            source={
              listing?.image && listing?.image[0]
                ? { uri: `${URLBASE.imageBaseUrl}${listing?.image[0]}` }
                : placeholder
            }
            style={{
              height: SIZES.base14,
              width: SIZES.base14,
              flex: 1,
              borderRadius: SIZES.base,
              resizeMode: "cover",
            }}
          />
        </Pressable>
        <View style={{ flex: 2, gap: SIZES.base, alignItems: "flex-start" }}>
          <Text style={{ ...FONTS.listHead, color: COLORS.accent2 }}>
            {listing?.name?.length > 20 ? `${listing?.name.substring(0,19)}..`: listing?.name}
          </Text>
          <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
            {listing?.type == "product"
              ? `₦${listing?.price}`
              : `₦${listing?.price}/${listing?.unit}`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: SIZES.thickness,
            }}
          >
            {listing?.type == "product" ? (
              <Feather
                name="calendar"
                size={SIZES.base2}
                color={COLORS.gray3}
              />
            ) : (
              <Feather name="box" size={SIZES.base2} color={COLORS.gray3} />
            )}
            <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
              {listing?.type == "product"
                ? `${listing?.stock?.quantity <= 0 ? "Out of Stock" : `${listing?.stock?.quantity} ${listing?.unit} left`}`
                : listing?.type == "event"
                ? `${listing?.date} . ${listing?.time}`
                : `${listing?.available} . ${listing?.time}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: SIZES.thickness,
            }}
          >
            <Ionicons
              name="location-outline"
              size={SIZES.base2}
              color={COLORS.gray3}
            />
            <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
              {listing?.location?.address}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleOpenBottomSheet}>
        <Entypo
          name="dots-three-horizontal"
          size={SIZES.base2}
          color={COLORS.accent2}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
