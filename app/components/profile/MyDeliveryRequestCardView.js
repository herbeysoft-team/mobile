import {
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
import CustomButton from "../auth/CustomButton";

export default function MyDeliveryRequestCardView({ navigation, delivery }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: SIZES.base,
        marginBottom: SIZES.base,
        borderBottomColor: COLORS.gray4,
        borderBottomWidth: SIZES.thin,
        paddingBottom: SIZES.base,
        paddingTop: SIZES.base,
      }}
    >
      <View
        style={{
          paddingVertical: SIZES.base,
          borderRadius: SIZES.base,
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: SIZES.base,
        }}
      >
        <View style={{ gap: SIZES.base, alignItems: "flex-start", flex: 4 }}>
          <Text style={{ ...FONTS.h3, color: COLORS.accent }}>
            {delivery?.parcelName}
          </Text>
          <Text style={{ ...FONTS.body4, color: COLORS.accent2 }}>
            {`Deliver To : ${delivery?.dropOffLocation}`}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.whiteGreen,
            paddingHorizontal: SIZES.base,
            flex: 1,
            borderRadius: SIZES.base2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ ...FONTS.body4, paddingVertical: SIZES.thin }}>
            {delivery.delivered
              ? "Delivered"
              : delivery?.pickedUp
              ? "On the way"
              : delivery?.readyForDelivery
              ? "Ready"
              : "Pending"}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <CustomButton
          onPress={() => navigation.navigate("My-Delivery-Details", delivery)}
          text={"Track Package"}
          fill={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
