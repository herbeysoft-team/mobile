import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { FONTS, COLORS, SIZES, URLBASE, listing, vendor } from "../../constant";
import React, { useState, useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getMyReviews } from "../../context/features/reviewSlice";
import { getItem } from "../../utils/asyncStorage.js";
import ReviewCard from "./ReviewCard.js";

export default function Given({ navigation, handleSettingChangeFunction }) {
  const dispatch = useDispatch();
  const { loadinguserreview, erroruserreview, userreview } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");
        if (id) {
          dispatch(getMyReviews(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeUserReview = useMemo(() => userreview, [userreview]);

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
      {loadinguserreview && (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      )}

      {memoizeUserReview?.length > 0 &&
        memoizeUserReview.map((item, index) => (
          <ReviewCard
            key={item._id}
            review={item}
            navigation={navigation}
            option={true}
            handleSettingChange={handleSettingChangeFunction}
          />
        ))}

      {memoizeUserReview?.length < 1 && (
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
