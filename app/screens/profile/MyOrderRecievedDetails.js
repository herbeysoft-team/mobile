import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator} from "react-native";
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
  updateOrderStatus,
  getOrderDetails,
} from "../../context/features/orderSlice";
import moment from "moment";
import Toast from "react-native-toast-message";
import OrderStatusModel from "../../components/general/OrderStatusModel";
import OrderConfirmModel from "../../components/profile/OrderConfirmModel";
import { RefreshControl } from "react-native-gesture-handler";

export default function MyOderRecievedDetails({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  console.log(route?.params)
  const { orderdetails, loadingorderdetails, errororderdetails } = useSelector((state) => state.order);
  const [orderId, setOrderId] = useState("");
  const [readyForDelivery, setReadyForDelivery] = useState(true);
  const [openWalletInputModal, setOpenWalletInputModal] = useState(false);
  const [pickup, setPickup] = useState(true);
  const [delivered, setDelivered] = useState(true);
  const [openOrderStatusModel, setOpenOrderStatusModel] = useState(false);
  const [pin, setPin] = useState("");
  const [title, setTitle] = useState("");
  const [stat, setStat] = useState("");

  const gotoWalletInputModel = () => {
    setOpenWalletInputModal(true);
  };

  useEffect(() => {
    if (route.params) {
      setOrderId(route?.params?._id);
      dispatch(getOrderDetails(route?.params?._id));
      setReadyForDelivery(route.params?.readyForDelivery);
      setPickup(route.params?.pickedUp);
      setDelivered(route.params?.delivered);
    }
  }, [route.params]);

  useEffect(() => {
    
      setReadyForDelivery(orderdetails?.readyForDelivery);
      setPickup(orderdetails?.pickedUp);
      setDelivered(orderdetails?.delivered);
    
  }, [orderdetails]);

  const updateStatus = (status) => {
    // Implement your logic to update the status here
    if (status === "readyForDelivery") {
      if (readyForDelivery) {
        Toast.show({
          type: "error",
          text1: "Status already updated",
        });
        setOpenOrderStatusModel(false);
      } else {
        setTitle("Ready for Delivery");
        setStat(status);
        dispatch(
          updateOrderStatus({
            formData: {
              orderId: route.params?._id,
              status: status,
            },
            Toast,
          })
        );
        setOpenOrderStatusModel(false);
        setOpenWalletInputModal(false);
        setTimeout(() => {
          handleRefresh();
        }, 3000);
      }
    } else if (status === "pickedUp") {
      if (!readyForDelivery) {
        Toast.show({
          type: "error",
          text1: "Kindly update the first status",
        });
      } else {
        setTitle("Picked Up");
        setStat(status);
        setOpenOrderStatusModel(false);
        setOpenWalletInputModal(true);
      }
    }
  };

  const handleConfirmStatus = () => {
    if (pin && pin == route?.params?.otp) {
      //compare the pin and the order pin
      if (!pickup) {
        setOpenWalletInputModal(false);
        setPin("");
        dispatch(
          updateOrderStatus({
            formData: {
              orderId: route.params?._id,
              status: stat,
            },
            Toast,
          })
        );
        setTimeout(() => {
          handleRefresh();
        }, 1000);
      } else {
        setPin("");
        setOpenOrderStatusModel(false);
        Toast.show({
          type: "error",
          text1: "Status already updated",
        });
      }
    } else {
      setOpenWalletInputModal(false);
      Toast.show({
        type: "error",
        text1: "Incorrect Pin",
      });
      setPin("");
    }
  };

  // Format the balance
  const formattedBalance = (balance) =>
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(balance);
    

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getOrderDetails(orderId));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for refresh, remove this in your actual implementation
  };

  if (loadingorderdetails) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </SafeAreaView>
    );
  }

  if (errororderdetails) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{errororderdetails}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Order Details"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: SIZES.base5 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />}
      >
        <View
          style={{
            paddingVertical: SIZES.thin,
            borderRadius: SIZES.base,
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: SIZES.base,
            marginBottom: SIZES.base,
            borderBottomColor: COLORS.gray4,
            borderBottomWidth: SIZES.thin,
          }}
        >
          {/* <Image
          source={
            route?.params?.items[0]?.product?.image &&
            route?.params?.items[0]?.product?.image[0]
              ? {
                  uri: `${URLBASE.imageBaseUrl}${route?.params?.items[0]?.product?.image[0]}`,
                }
              : placeholder
          }
          style={{
            height: SIZES.hp(25),
            width: SIZES.width,
            borderRadius: SIZES.base,
            resizeMode: "cover",
          }}
        /> */}
          <Text style={{ ...FONTS.h2, color: COLORS.accent2 }}>
            {`Order #${orderdetails?.orderId}`}
          </Text>
          <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
            {orderdetails?.user?.fullname || orderdetails?.user?.businessName}
          </Text>

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
              {`${
                orderdetails?.deliveryType == "PickUp"
                  ? "Pick up at:"
                  : "Deliver to:"
              }  ${
                orderdetails?.deliveryType == "PickUp"
                  ? orderdetails?.user?.address
                  : orderdetails?.vendor?.address
              }`}
            </Text>
          </View>
        </View>
        <CustomButton
          onPress={() => setOpenOrderStatusModel(true)}
          text={"Change Status"}
          fill={false}
        />
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
                color={orderdetails?.readyForDelivery ? COLORS.primary : COLORS.white}
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
                color={orderdetails?.pickedUp ? COLORS.primary : COLORS.white}
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
                color={orderdetails?.delivered ? COLORS.primary : COLORS.white}
              />
            </View>
          </View>
        </View>
        <View style={styles.steps}>
          <View>
            <Text style={[styles.stepText]}>{"Ready for Delivery"}</Text>
            <Text style={[styles.stepSubText]}>
              {`${
                orderdetails?.readyForDeliveryDate != null
                  ? moment(orderdetails?.readyForDeliveryDate).format(
                      "DD MMM, h:mmA"
                    )
                  : " "
              }`}
            </Text>
          </View>

          <View>
            <Text style={[styles.stepText]}>
              {`${
                orderdetails?.deliveryType == "PickUp"
                  ? "Picked up by you"
                  : "Picked up by courier"
              }`}
            </Text>
            <Text style={[styles.stepSubText]}>
              {`${
                orderdetails?.pickedUpDate != null
                  ? moment(orderdetails?.pickedUpDate).format("DD MMM, h:mmA")
                  : " "
              }`}
            </Text>
          </View>

          <View>
            <Text style={[styles.stepText]}>{"Item Delivered"}</Text>
            <Text style={[styles.stepSubText]}>
              {`${
                orderdetails?.deliveredDate != null
                  ? moment(orderdetails?.deliveredDate).format("DD MMM, h:mmA")
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
            marginBottom: SIZES.base3,
          }}
        ></View>

        {/* Details of the item */}
        <View style={styles.itemContainer}>
          {orderdetails?.items !== null &&
            orderdetails?.items?.map((item, index) => (
              <React.Fragment key={item._id}>
                <View
                  key={item._id}
                  style={{
                    paddingVertical: SIZES.thickness,
                    borderRadius: SIZES.base,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: SIZES.wp(95),
                    justifyContent: "space-between",
                    gap: SIZES.base,
                  }}
                >
                  <Image
                    source={{
                      uri: `${URLBASE.imageBaseUrl}${item?.product?.image[0]}`,
                    }}
                    style={{
                      height: SIZES.base14,
                      width: SIZES.base12,
                      flex: 1,
                      borderRadius: SIZES.base,
                      resizeMode: "cover",
                    }}
                  />
                  <View
                    style={{
                      flex: 2,
                      gap: SIZES.base,
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                      {`Item ${index + 1}`}
                    </Text>
                    <Text style={{ ...FONTS.h4, color: COLORS.accent2 }}>
                      {item?.product?.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      gap: SIZES.base,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                      {`₦${formattedBalance(item?.price)}`}
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
        </View>

        {/* Summary */}
        <View style={styles.itemContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: SIZES.wp(90),
              alignItems: "center",
            }}
          >
            <Text
              style={{ ...FONTS.body3, color: COLORS.gray3 }}
            >{`Item (${orderdetails?.items?.length})`}</Text>
            <Text
              style={{ ...FONTS.body3, color: COLORS.gray3 }}
            >{`₦${formattedBalance(
              orderdetails?.totalAmount - orderdetails?.dispatchFee
            )}`}</Text>
          </View>

          {/* Calculate the distance and shipping fee */}
          {orderdetails?.deliveryType != "PickUp" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: SIZES.wp(90),
                alignItems: "center",
              }}
            >
              <Text
                style={{ ...FONTS.body3, color: COLORS.gray3 }}
              >{`Delivery Fee`}</Text>
              <Text
                style={{ ...FONTS.body3, color: COLORS.gray3 }}
              >{`₦${formattedBalance(orderdetails?.dispatchFee)}`}</Text>
            </View>
          )}
        </View>
        <View
          style={{
            borderBottomWidth: SIZES.thin / 2,
            height: SIZES.thin,
            borderColor: COLORS.gray4,
            marginVertical: SIZES.thin,
          }}
        ></View>

        {/* Order Total */}
        <View
          style={{
            paddingVertical: SIZES.base3,
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: SIZES.base2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: SIZES.wp(90),
              alignItems: "center",
            }}
          >
            <Text
              style={{ ...FONTS.h3, color: COLORS.accent }}
            >{`Order Total`}</Text>
            <Text
              style={{ ...FONTS.h3, color: COLORS.accent }}
            >{`₦${formattedBalance(orderdetails?.totalAmount)}`}</Text>
          </View>
        </View>
        <OrderStatusModel
          openOrderStatusModel={openOrderStatusModel}
          setOpenOrderStatusModel={setOpenOrderStatusModel}
          updateStatusCallback={updateStatus}
        />
      </ScrollView>
      <OrderConfirmModel
        openWalletInputModal={openWalletInputModal}
        setOpenWalletInputModal={setOpenWalletInputModal}
        gotoWalletInputModel={gotoWalletInputModel}
        setPin={setPin}
        pin={pin}
        ButtonName={"Confirm Pin"}
        Heading={`Mark as ${title}`}
        SubHeading={`To mark this order as ${title}, enter pin given to you by the delivery agent.`}
        InputHeading={"Enter Pin"}
        handleConfirmStatus={handleConfirmStatus}
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light,
  },
  errorText: {
    ...FONTS.h3,
    color: COLORS.error,
  },
});
