import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useMemo } from "react";
import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { getSimilarListings } from "../../context/features/listingSlice";
import { FlashList } from "@shopify/flash-list";
import ListingCardView from "./ListingCardView";

const SimilarListing = ({ navigation, listingcontent }) => {
  const dispatch = useDispatch();
  const { loadingsimilarlistings, similarlistings } = useSelector(
    (state) => state.listing
  );
  const listingSelectedDistance = useSelector(
    (state) => state.map.listingSelectedDistance
  );

  useEffect(() => {
    if (listingcontent) {
      dispatch(getSimilarListings({listingcontent, listingSelectedDistance}));
    }
  }, [listingcontent]);

  const memoizedSimilarListings = useMemo(
    () => similarlistings,
    [similarlistings]
  );

  return (
    <View
      style={{
        paddingTop: SIZES.base3,
        flex: 1,
        height: "auto",
        width: "100%",
      }}
    >
      {loadingsimilarlistings ? (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      ) : (
        <>
          <Text style={{ ...FONTS.h3, color: COLORS.accent2 }}>
            Similar Listing
          </Text>
          <View style={styles.listContainer}>
          <FlashList
            contentContainerStyle={{ paddingBottom: SIZES.thin}}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={2}
            data={memoizedSimilarListings}
            renderItem={({ item }) => (
              <ListingCardView listing={item} navigation={navigation} />
            )}
          />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    listContainer: {
      width: SIZES.wp(100) - 40, // Adjust width as needed
      height: SIZES.hp(100) - 100, // Adjust height as needed
    },
  });
export default SimilarListing;
