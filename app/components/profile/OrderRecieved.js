import {  Text, ScrollView, ActivityIndicator } from "react-native";
import { FONTS, COLORS, SIZES} from "../../constant";
import React, {  useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderRecieved } from "../../context/features/orderSlice";
import { getItem } from "../../utils/asyncStorage.js";
import MyOrderRecievedCardView from "./MyOrderRecievedCardView.js";



export default function OrderRecieved({ navigation }) {
  const dispatch = useDispatch();
  const { loadingorderrecieved, orderRecieved } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");
        if (id) {
          dispatch(getOrderRecieved(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeOrderRecieved = useMemo(() => orderRecieved, [orderRecieved]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.base2,
        paddingHorizontal: SIZES.base2,
        marginBottom: SIZES.base10,
      }}
    >
      {loadingorderrecieved && (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      )}
    
      {memoizeOrderRecieved.length > 0 &&
        memoizeOrderRecieved.map((item, index) => (
          <MyOrderRecievedCardView
            key={item._id}
            order={item}
            navigation={navigation}
          />
        ))}

      {memoizeOrderRecieved?.length < 1 && (
        <Text
          style={{
            alignSelf: "center",
            justifyContent: "center",
            ...FONTS.body4,
            padding: SIZES.base2,
          
          }}
        >
          No Order Yet !
        </Text>
      )}
    </ScrollView>
  );
}
