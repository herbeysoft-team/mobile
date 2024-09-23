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
  import { useNavigation } from "@react-navigation/native";
  import placeholder from "../../../assets/placeholder.png";
  import moment from "moment";
  
  export default function MyOrderRecievedCardView({ order }) {
    const navigation = useNavigation();
   
    return (
      <Pressable
      onPress={() => navigation.navigate("My-Order-Recieved-Details", order)}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: SIZES.base,
          flex: 1,
          marginBottom: SIZES.base,
          borderBottomColor: COLORS.gray4,
          borderBottomWidth: SIZES.thin,
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
          {order?.user?.fullname || order?.user?.businessName}
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
  