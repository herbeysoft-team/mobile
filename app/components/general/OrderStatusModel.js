import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import CustomButtonModal from "../auth/CustomButtonModal";



const OrderStatusModel = ({
  openOrderStatusModel,
  setOpenOrderStatusModel,
  updateStatusCallback,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={openOrderStatusModel}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            margin: SIZES.base2,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.base2,
            paddingHorizontal: SIZES.base3,
            paddingVertical: SIZES.base4,
            width: SIZES.wp(85),
            shadowColor: COLORS.gray,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: SIZES.thickness,
            elevation: SIZES.thickness,
          }}
        >
          {/* <MaterialIcons
            name="verified"
            size={SIZES.base6}
            color={COLORS.primary}
          /> */}
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.accent,
              marginBottom: SIZES.base,
            }}
          >
            {"Change Status"}
          </Text>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              gap: SIZES.thin,
              alignItems:"flex-start",
              width: SIZES.wp(75),
              marginTop: SIZES.base2
            }}
          >
            <TouchableOpacity onPress={()=>updateStatusCallback("readyForDelivery")}>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "center",
                  lineHeight: SIZES.base3,
                  color: COLORS.gray3,
                  marginBottom: SIZES.base,
                }}
              >
                Ready For Delivery
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>updateStatusCallback("pickedUp")}>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "center",
                  lineHeight: SIZES.base3,
                  color: COLORS.gray3,
                  marginBottom: SIZES.base2,
                }}
              >
                Picked Up
              </Text>
            </TouchableOpacity>
            
          </View>
          <View style={{width:"100%", marginTop:SIZES.base}}>
          <CustomButtonModal
              onPress={()=> setOpenOrderStatusModel(false)}
              text={"Cancel"}
              fill={true}
              color={COLORS.red}
            />
            </View>
        </View>
        
      </View>
    </Modal>
  );
};

export default OrderStatusModel;

const styles = StyleSheet.create({});
