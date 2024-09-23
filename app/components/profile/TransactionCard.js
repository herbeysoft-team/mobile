import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
{
  /* <Feather name="arrow-up-right" size={24} color="black" /> */
}
export default function TransactionCard({navigation, type, date, amount, to, status, reference}) {
  return (
    <Pressable
    onPress={()=> navigation.navigate("Transaction-Details", {type, to, date, amount, to, status, reference})}
      style={{
        flexDirection: "row",
        height: SIZES.base6,
        borderBottomWidth: SIZES.thin,
        borderBottomColor: COLORS.gray4,
        justifyContent:"space-between",
        paddingHorizontal: SIZES.base2,
        marginVertical: SIZES.base
        
      }}
    >
      <View
        style={{ gap: SIZES.base2, flexDirection: "row", alignItems: "center", justifyContent:"center" }}
      >
        <View
          style={{
            width: SIZES.base5,
            height: SIZES.base5,
            borderRadius: SIZES.base5,
            backgroundColor: type == "Purchase" ? COLORS.whiteRed : type == "Withdrawal" ? COLORS.whiteRed : COLORS.whiteGreen,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather
            name={type == "Purchase" ? "arrow-down-left": type == "Withdrawal" ? "arrow-down-left" : "arrow-up-right"}
            size={SIZES.base2}
            color={type == "Purchase" ? COLORS.red : type == "Withdrawal" ? COLORS.red : COLORS.success}
          />
        </View>
        <View style={{ flexDirection: "column", gap: SIZES.thin }}>
          <Text style={{ ...FONTS.h4, color: COLORS.accent2 }}>{type}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.accent2 }}>
            {moment(date).format(
                    "MMM DD"
                  )}
          </Text>
        </View>
      </View>
      <View style={{alignItems:"center", justifyContent:"center"}}>
      <Text
          style={{ ...FONTS.h4, color: type == "Purchase" ? COLORS.red : type == "Withdrawal" ? COLORS.red : COLORS.success }}
        >{`₦${amount}`}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
