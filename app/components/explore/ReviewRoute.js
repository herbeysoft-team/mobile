import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { FONTS, COLORS, SIZES, URLBASE, listing } from "../../constant";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendorReviews } from "../../context/features/reviewSlice";
import ReviewCard from "../../components/profile/ReviewCard";

const ReviewRoute = ({ navigation, id }) => {
  const dispatch = useDispatch();
  const { loadingvendorreview, vendorreview } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (id) {
      dispatch(getVendorReviews(id));
    }
  }, []);

  const memoizeVendorReview = useMemo(() => vendorreview, [vendorreview]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.base2,
      }}
    >
      {loadingvendorreview && (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
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
    </ScrollView>
  );
};

export default ReviewRoute;
