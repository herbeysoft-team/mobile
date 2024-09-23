import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderSmall({ navigation, title }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: SIZES.base,
      }}
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={SIZES.base2} color={COLORS.gray} />
      </TouchableOpacity>
      <View style={{ flex: 4, alignItems: "center" }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.secondary,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: SIZES.base2,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <View
            style={{
              width: SIZES.base3,
              height: SIZES.base3,
              backgroundColor: COLORS.gray2,
              borderRadius: SIZES.base3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign
              name="shoppingcart"
              size={SIZES.base2}
              color={COLORS.gray3}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Share")}>
          <Ionicons
            name="md-share-outline"
            size={SIZES.base2}
            color={COLORS.gray3}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
