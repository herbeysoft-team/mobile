import { Text, ScrollView, ActivityIndicator} from "react-native";
import { FONTS, COLORS, SIZES} from "../../constant";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderMade } from "../../context/features/orderSlice";
import { getItem } from "../../utils/asyncStorage.js";
import MyOrderMadeCardView from "./MyOrderMadeCardView.js";


export default function OrderMade({ navigation }) {
  const dispatch = useDispatch();
  const { loadingordermade, orderMade } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");
        if (id) {
          dispatch(getOrderMade(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeOrderMade = useMemo(() => orderMade, [orderMade]);

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
      {loadingordermade && (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      )}
    
      {memoizeOrderMade.length > 0 &&
        memoizeOrderMade.map((item, index) => (
          <MyOrderMadeCardView
            key={item._id}
            order={item}
            navigation={navigation}
           
          />
        ))}

      {memoizeOrderMade?.length < 1 && (
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
