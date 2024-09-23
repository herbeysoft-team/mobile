import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getVendorDetails } from "../../context/features/vendorSlice";
import placeholder from "../../../assets/placeholder.png";

export default function VendorCard({ navigation, user }) {
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.map);
  
  const { loadingvendor, vendordetails } = useSelector((state) => state.vendor);

  const vendor = {
    id: user,
    longitude: userLocation.longitude,
    latitude: userLocation.latitude,
  };

  useEffect(() => {
    dispatch(getVendorDetails(vendor));
  }, []);

  const memoizeVendorDetails = useMemo(() => vendordetails, [vendordetails]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Vendor-Profile", memoizeVendorDetails)
      }
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: SIZES.base2,
          borderColor: COLORS.gray4,
          paddingVertical: SIZES.base2,
          borderBottomWidth: SIZES.thin / 2,
          marginBottom: SIZES.base3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: SIZES.base2,
          }}
        >
          <Image
            source={
              memoizeVendorDetails?.vendor?.profile
                ? {
                    uri: `${URLBASE.imageBaseUrl}${memoizeVendorDetails?.vendor?.profile}`,
                  }
                : placeholder
            }
            style={{
              height: SIZES.base6,
              width: SIZES.base6,
              borderRadius: SIZES.base6,
            }}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: SIZES.base,
              }}
            >
              <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
                {memoizeVendorDetails?.vendor?.fullname ||
                  memoizeVendorDetails?.vendor?.businessName}
              </Text>
              {memoizeVendorDetails?.vendor?.verifiedAccount && (
                <MaterialIcons
                  name="verified"
                  size={SIZES.base2}
                  color={COLORS.primary}
                />
              )}
              {memoizeVendorDetails?.vendor?.physicalStore && (
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: COLORS.primaryLight,
                    borderRadius: SIZES.base2,
                    padding: SIZES.thickness,
                  }}
                >
                  <MaterialIcons
                    name="storefront"
                    size={SIZES.base3 / 2}
                    color={COLORS.primary}
                  />
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: SIZES.base,
              }}
            >
              <FontAwesome
                name="star"
                size={SIZES.base2}
                color={COLORS.amber}
              />
              <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                {`${memoizeVendorDetails?.vendor?.rating?.toFixed(1)} (${memoizeVendorDetails?.vendor?.ratingCount})`}
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
              <Text
                numberOfLines={1}
                style={{ ...FONTS.body4, color: COLORS.gray3 }}
              >
                {`${memoizeVendorDetails?.vendor?.address.slice(
                  0,
                  20
                )} . ${parseInt(
                  memoizeVendorDetails?.vendor?.distance
                )}km away`}
              </Text>
            </View>
          </View>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={SIZES.base2}
          color={COLORS.tertiary}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
