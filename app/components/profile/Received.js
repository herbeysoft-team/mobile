import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { FONTS, COLORS, SIZES, URLBASE, listing, vendor } from "../../constant";
import React, { useState, useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getVendorReviews } from "../../context/features/reviewSlice";
import { getItem } from "../../utils/asyncStorage.js";
import ReviewCard from "./ReviewCard.js";
import { TextInput } from "react-native-gesture-handler";

export default function Received({ navigation }) {
  const dispatch = useDispatch();
  const { loadingvendorreview, errorvendorreview, vendorreview } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");
        if (id) {
          dispatch(getVendorReviews(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeVendorReview = useMemo(() => vendorreview, [vendorreview]);
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
      {/* Analytics Box */}
      {loadingvendorreview ? (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      ) : (
        <View>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.secondary,
              flex: 3,
              textAlign: "left",
            }}
          >
            Average Rating
          </Text>
          {/* RATING ANALYTICS */}
          <View
            style={{
              flexDirection: "row",
              gap: SIZES.base5,
              width: SIZES.width,
              alignItems: "center",
              justifyContent: "flex-start",
              flex: 1,
              marginBottom: SIZES.base,
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
            }}
          >
            <View
              style={{
                gap: -SIZES.base,
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: SIZES.base2,
                paddingHorizontal: SIZES.base,
              }}
            >
              <Text
                style={{
                  ...FONTS.rating,
                  color: COLORS.secondary,
                  textAlign: "left",
                }}
              >
                {memoizeVendorReview?.vendorRating?.toFixed(1)}
              </Text>
              <View style={{ flexDirection: "row", gap: SIZES.thin }}>
                <FontAwesome
                  name="star"
                  size={SIZES.base2}
                  color={COLORS.amber}
                />
                <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                  {`${memoizeVendorReview?.vendorRating?.toFixed(1)} (${
                    memoizeVendorReview?.ratingCount
                  })`}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: SIZES.base2,
                paddingHorizontal: SIZES.base,
                width: SIZES.wp(50),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: SIZES.base,
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {"5"}
                </Text>
                <View
                  style={{
                    width: "90%",
                    backgroundColor: COLORS.white,
                    height: 2,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: COLORS.secondary,
                      height: 2,
                    }}
                  ></View>
                </View>
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {memoizeVendorReview?.reviewStats
                    ? memoizeVendorReview?.reviewStats["5"]
                    : "0"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: SIZES.base,
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {"4"}
                </Text>
                <View
                  style={{
                    width: "90%",
                    backgroundColor: COLORS.white,
                    height: 2,
                  }}
                >
                  <View
                    style={{
                      width: "90%",
                      backgroundColor: COLORS.secondary,
                      height: 2,
                    }}
                  ></View>
                </View>
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {memoizeVendorReview?.reviewStats
                    ? memoizeVendorReview?.reviewStats["4"]
                    : "0"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: SIZES.base,
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {"3"}
                </Text>
                <View
                  style={{
                    width: "90%",
                    backgroundColor: COLORS.white,
                    height: 2,
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      backgroundColor: COLORS.secondary,
                      height: 2,
                    }}
                  ></View>
                </View>
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {memoizeVendorReview?.reviewStats
                    ? memoizeVendorReview?.reviewStats["3"]
                    : "0"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: SIZES.base,
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {"2"}
                </Text>
                <View
                  style={{
                    width: "90%",
                    backgroundColor: COLORS.white,
                    height: 2,
                  }}
                >
                  <View
                    style={{
                      width: "70%",
                      backgroundColor: COLORS.secondary,
                      height: 2,
                    }}
                  ></View>
                </View>
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {memoizeVendorReview?.reviewStats
                    ? memoizeVendorReview?.reviewStats["2"]
                    : "0"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: SIZES.base,
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {"1"}
                </Text>
                <View
                  style={{
                    width: "90%",
                    backgroundColor: COLORS.white,
                    height: 2,
                  }}
                >
                  <View
                    style={{
                      width: "60%",
                      backgroundColor: COLORS.secondary,
                      height: 2,
                    }}
                  ></View>
                </View>
                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {memoizeVendorReview?.reviewStats
                    ? memoizeVendorReview?.reviewStats["1"]
                    : "0"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {memoizeVendorReview?.reviews?.length > 0 &&
        memoizeVendorReview.reviews.map((item, index) => (
          <ReviewCard
            key={item._id}
            review={item}
            navigation={navigation}
            option={false}
          />
        ))}
      {memoizeVendorReview?.reviews?.length < 1 && (
        <Text
          style={{
            alignSelf: "center",
            justifyContent: "center",
            ...FONTS.body4,
            padding: SIZES.base2,
          }}
        >
          No Review Yet !
        </Text>
      )}
    </ScrollView>
  );
}
