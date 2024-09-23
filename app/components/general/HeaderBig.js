import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";

export default function HeaderBig({title, navigation}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SIZES.base3
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <View
          style={{
            width: SIZES.base4,
            height: SIZES.base4,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.base4,
            alignItems: "center",
            justifyContent: "center",
            flex:1
          }}
        >
          <AntDesign
            name="shoppingcart"
            size={SIZES.base2}
            color={COLORS.white}
          />
        </View>
      </TouchableOpacity>
      <Text style={{ ...FONTS.h1, color: COLORS.secondary, textAlign:"center", flex:3, alignItems:"center" }}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <View
          style={{
            width: SIZES.base4,
            height: SIZES.base4,
            backgroundColor: COLORS.gray4,
            borderRadius: SIZES.base4,
            alignItems: "center",
            justifyContent: "center",
            flex:1
          }}
        >
          <AntDesign
            name="shoppingcart"
            size={SIZES.base2}
            color={COLORS.gray3}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
