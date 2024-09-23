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
import { useDispatch } from "react-redux";
import moment from "moment";

export default function MyOrderMadeCardView({
  navigation,
  order,
 
}) {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  // const handleOpenBottomSheet = () => {
  //   if (handleSettingChange) {
  //     handleSettingChange({ status: true, id: order._id });
  //     // console.log(listing._id)
  //   } else {
  //     console.error("handleSettingChange is not defined");
  //   }
  // };

  return (
    <Pressable
      onPress={() => navigation.navigate("My-Order-Details", order)}
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: SIZES.base,
        flex: 1,
        marginBottom: SIZES.base,
        borderBottomColor: COLORS.gray4,
        borderBottomWidth: SIZES.thin,
        paddingVertical: SIZES.base,
      }}
    >
      <View
        style={{
          paddingVertical: SIZES.base,
          borderRadius: SIZES.base,
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: SIZES.base,
          flex: 2,
        }}
      >
        <Text style={{ ...FONTS.listHead, color: COLORS.accent2 }}>
          {order?.vendor?.fullname || order?.vendor?.businessName}
        </Text>
        <Text style={{ ...FONTS.body4, color: COLORS.accent2 }}>
          {moment(order?.createdAt).format("Do MMM YYYY.HH:mm")}
        </Text>
      </View>

      <View
        style={{
          paddingVertical: SIZES.base,
          borderRadius: SIZES.base,
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: SIZES.base,
          flex: 2,
        }}
      >
        <Text style={{ ...FONTS.body4, color: COLORS.accent2 }}>
          {`Order #${order?.orderId}`}
        </Text>
        {/* <TouchableOpacity onPress={handleOpenBottomSheet}>
          <Entypo
            name="dots-three-horizontal"
            size={SIZES.base3}
            color={COLORS.accent2}
          />
        </TouchableOpacity> */}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
