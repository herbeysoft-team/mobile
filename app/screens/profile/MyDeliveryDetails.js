import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import CustomButton from "../../components/auth/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
    updateOrderStatus
  } from "../../context/features/orderSlice";
import moment from "moment";
import { Feather } from '@expo/vector-icons';
import Toast from "react-native-toast-message";

export default function MyDeliveryDetails({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const [readyForDelivery, setReadyForDelivery] = useState(true);
  const [pickup, setPickup] = useState(true);
  const [delivered, setDelivered] = useState(true);

  console.log(route.params);

  useEffect(() => {
    if (route.params) {
      setReadyForDelivery(route.params?.readyForDelivery);
      setPickup(route.params?.pickedUp);
      setDelivered(route.params?.delivered);
    }
  }, [route.params]);

  const handleMarkAsDelivered = () => {
    // if(readyForDelivery && pickup){
    //     dispatch(updateOrderStatus({formData:{
    //         orderId: route.params?._id,
    //         status: "delivered"
    //     }, Toast}))
    // }else{
    //     Toast.show({
    //         type: "error",
    //         text1: "Order is yet to be ready or pick up",
    //       });
    // }
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Track Package"} />
      <View
        style={{
          paddingVertical: SIZES.thin,
          borderRadius: SIZES.base,
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: SIZES.thin,
          marginBottom: SIZES.base,
          borderBottomColor: COLORS.gray4,
          borderBottomWidth: SIZES.thin,
        }}
      >

        <Text style={{ ...FONTS.h3, color: COLORS.accent2 }}>
          {route?.params?.parcelName}
        </Text>
        {/* <Text style={{ ...FONTS.body4, color: COLORS.accent2 }}>
          {route?.params?.parcelDescription}
        </Text> */}
        <Text style={{ ...FONTS.body4, color: COLORS.accent2 }}>
          {route?.params?.deliveryObject == "Package" ? "" : `Order ID: ${route?.params?._id.substring(0, 12)}`}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: SIZES.thickness,
          }}
        >
          <Feather name="truck" size={SIZES.base2}
            color={COLORS.gray3} />
          
          <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
            {`${ `Pickup from: ${route?.params?.pickUpLocation}` }`}
          </Text>
        </View>
        <View>
          <Text style={{marginLeft:SIZES.thickness, color: COLORS.gray3}}>
            |
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: SIZES.thickness,
          }}
        >
          <Ionicons
            name="location-outline"
            size={SIZES.base2}
            color={COLORS.gray3}
          />
          <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
            {`${`Deliver to: ${route?.params?.dropOffLocation}`
            }`}
          </Text>
        </View>
      </View>
      <CustomButton onPress={handleMarkAsDelivered} text={"Mark as delivered"} fill={false} />
      <View style={styles.container2}>
        <View style={styles.progress}>
          <View
            style={{
              width: SIZES.base3,
              height: SIZES.base3,
              borderRadius: SIZES.base3,
              borderColor: COLORS.gray3,
              borderWidth: SIZES.thin,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign
              name="checkcircle"
              size={SIZES.base2}
              color={readyForDelivery ? COLORS.primary : COLORS.white}
            />
          </View>

          <View style={styles.line} />
          <View
            style={{
              width: SIZES.base3,
              height: SIZES.base3,
              borderRadius: SIZES.base3,
              borderColor: COLORS.gray3,
              borderWidth: SIZES.thin,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign
              name="checkcircle"
              size={SIZES.base2}
              color={pickup ? COLORS.primary : COLORS.white}
            />
          </View>

          <View style={styles.line} />
          <View
            style={{
              width: SIZES.base3,
              height: SIZES.base3,
              borderRadius: SIZES.base3,
              borderColor: COLORS.gray3,
              borderWidth: SIZES.thin,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign
              name="checkcircle"
              size={SIZES.base2}
              color={delivered ? COLORS.primary : COLORS.white}
            />
          </View>
        </View>
      </View>
      <View style={styles.steps}>
        <View>
          <Text style={[styles.stepText]}>{"Ready for Delivery"}</Text>
          <Text style={[styles.stepSubText]}>
            {`${
              route.params?.readyForDeliveryDate != null
                ? moment(route.params?.readyForDeliveryDate).format(
                    "DD MMM, h:mmA"
                  )
                : " "
            }`}
          </Text>
        </View>

        <View>
          <Text style={[styles.stepText]}>
            {`${
              route?.params?.deliveryType == "PickUp"
                ? "Picked up by you"
                : "Picked up by courier"
            }`}
          </Text>
          <Text style={[styles.stepSubText]}>
            {`${
              route.params?.pickedUpDate != null
                ? moment(route.params?.pickedUpDate).format("DD MMM, h:mmA")
                : " "
            }`}
          </Text>
        </View>

        <View>
          <Text style={[styles.stepText]}>{"Item Delivered"}</Text>
          <Text style={[styles.stepSubText]}>
            {`${
              route.params?.deliveredDate != null
                ? moment(route.params?.deliveredDate).format("DD MMM, h:mmA")
                : " "
            }`}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: SIZES.thin / 2,
          height: SIZES.thin,
          borderColor: COLORS.gray4,
          marginVertical: SIZES.thin,
          marginBottom: SIZES.base3
        }}
      ></View>

      
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
  itemContainer: {
    paddingVertical: SIZES.base,
    borderRadius: SIZES.base,
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: SIZES.base2,
    borderBottomWidth: SIZES.thin / 2,
    borderColor: COLORS.gray4,
  },
  container2: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.base,
    paddingHorizontal: SIZES.base,
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.base2,
  },
  line: {
    flex: 1,
    height: SIZES.thickness,
    backgroundColor: COLORS.gray2,
  },
  steps: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.base2,
    paddingHorizontal: SIZES.base,
  },
  stepText: {
    ...FONTS.body4,
    color: COLORS.accent,
  },
  stepSubText: {
    ...FONTS.body4,
    color: COLORS.accent2,
  },
  activeStep: {
    fontWeight: "bold",
    color: "green",
  },
});
