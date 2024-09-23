import { Text, ScrollView, ActivityIndicator, StyleSheet} from "react-native";
import { FONTS, COLORS, SIZES, URLBASE, listing, vendor } from "../../constant";
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveryMade } from "../../context/features/deliverySlice";
import { getItem } from "../../utils/asyncStorage.js";
import HeaderMedium from "../../components/general/HeaderMedium";
import { SafeAreaView } from "react-native-safe-area-context";
import MyDeliveryRequestCardView from "../../components/profile/MyDeliveryRequestCardView.js";

export default function DeliveryRequests({ navigation }) {
  const dispatch = useDispatch();
  const { loadingdeliverymade, errordeliverymade, deliveryMade } = useSelector(
    (state) => state.delivery
  );

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");
        if (id) {
          dispatch(getDeliveryMade(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeDeliveryMade = useMemo(() => deliveryMade, [deliveryMade]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Delivery Requests"} />
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
      {loadingdeliverymade && (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      )}
    
      {memoizeDeliveryMade.length > 0 &&
        memoizeDeliveryMade.map((item, index) => (
          <MyDeliveryRequestCardView
            key={item._id}
            delivery={item}
            navigation={navigation}
          />
        ))}

      {memoizeDeliveryMade?.length < 1 && (
        <Text
          style={{
            alignSelf: "center",
            justifyContent: "center",
            ...FONTS.body4,
            padding: SIZES.base2,
          
          }}
        >
          No Delivery Request Yet !
        </Text>
      )}
    </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
});
