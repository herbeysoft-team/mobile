import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import placeholder from "../../../assets/placeholder.png";
import moment from "moment";

export default function ReviewCard({ navigation, review, option, handleSettingChange }) {
  const handleOpenBottomSheet = () => {
    if (handleSettingChange) {
      handleSettingChange({status: true, id: review});
      // console.log(listing._id)
    } else {
      console.error("handleSettingChange is not defined");
    }
  };
  return (
    <View
      style={{
        paddingVertical: SIZES.base,
        borderColor: COLORS.gray4,
        borderBottomWidth: SIZES.thin / 2,
        marginBottom: SIZES.base3,
        gap:SIZES.base
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
              review?.user?.profile
                ? {
                    uri: `${URLBASE.imageBaseUrl}${review?.user?.profile}`,
                  }
                : placeholder
            }
            style={{
              height: SIZES.base5,
              width: SIZES.base5,
              borderRadius: SIZES.base5,
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
                {review?.user?.fullname || review?.user?.businessName}
              </Text>
              {review?.user?.verifiedAccount && (
                  <MaterialIcons
                    name="verified"
                    size={SIZES.base2}
                    color={COLORS.primary}
                  />
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
                {`${review?.rating?.toFixed(1)} . ${moment(review?.createdAt).fromNow()}`}
              </Text>
            </View>
            {/* <View
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
              </View> */}
          </View>
        </View>
        {option && (
          <TouchableOpacity onPress={handleOpenBottomSheet}>
            <Entypo
              name="dots-three-horizontal"
              size={SIZES.base2}
              color={COLORS.accent2}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={{ ...FONTS.body3, color: COLORS.accent2}}>{review?.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
