import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderMini({ navigation, title }) {
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
     
      </View>
    </View>
  );
}
