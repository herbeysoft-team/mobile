import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
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
import { addReview } from "../../context/features/reviewSlice.js";
import moment from "moment";
import Toast from "react-native-toast-message";
import { RatingInput } from "react-native-stock-star-rating";
import CustomMultiLineInput from "../../components/auth/CustomMultiLineInput.jsx";
import OrderConfirmModel from "../../components/profile/OrderConfirmModel";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { RefreshControl } from "react-native-gesture-handler";

export default function MyOderDetails({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const { orderdetails, loadingorderdetails, errororderdetails } = useSelector(
    (state) => state.order
  );
  const [refreshing, setRefreshing] = useState(false);

  // ref
  const bottomSheetOrderOptionRef = useRef(null);
  const [readyForDelivery, setReadyForDelivery] = useState(true);
  const [orderId, setOrderId] = useState("");
  const [openWalletInputModal, setOpenWalletInputModal] = useState(false);
  const [pickup, setPickup] = useState(true);
  const [delivered, setDelivered] = useState(true);
  const [openSetting, setOpenSetting] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [openOrderStatusModel, setOpenOrderStatusModel] = useState(false);
  const [pin, setPin] = useState("");
  const [sure, setSure] = useState(false);

  // variables
  const snapPoints = useMemo(() => (sure ? ["70%"] : ["70%"]), [sure]);

  const handleCloseBottomSheet = () =>
    bottomSheetOrderOptionRef.current?.close();
  const handleOpenBottomSheet = () =>
    bottomSheetOrderOptionRef.current?.expand();

  const handleOpenBottomSheetSetting = () => {
    setOpenSetting(true);
    handleOpenBottomSheet();
  };

  const handleCloseBottomSheetSetting = () => {
    setOpenSetting(false);
    handleCloseBottomSheet();
  };

  const gotoWalletInputModel = () => {
    if (!delivered) {
      setOpenWalletInputModal(true);
    } else {
      Toast.show({
        type: "error",
        text1: "Already mark as delivered",
      });
    }
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

  const handleConfirmStatus = () => {
    if (!readyForDelivery || !pickup) {
      Toast.show({
        type: "error",
        text1: "Order is yet to be ready for delivery or pick up",
      });
    } else {
      if (pin && pin == route?.params?.otp) {
        //compare the pin and the order pin
        if (!delivered) {
          setOpenWalletInputModal(false);
          setPin("");
          dispatch(
            updateOrderStatus({
              formData: {
                orderId: route.params?._id,
                status: "delivered",
              },
              Toast,
            })
          );
          setTimeout(() => {
            handleRefresh();
            handleOpenBottomSheetSetting();
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
    }
  };

  const handleSubmitRating = () => {
    try {
      console.log({
        vendorId: route?.params?.vendor?._id,
        rating: rating,
        comment: review,
      });
      const formData = {
        vendorId: route?.params?.vendor?._id,
        rating: rating,
        comment: review,
      };
      dispatch(
        addReview({
          formData,
          Toast,
        })
      );

      setRating(0);
      setReview("");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      console.log(error);
    }
    setTimeout(() => {
      handleCloseBottomSheetSetting();
    }, 1000);
  };

  // Format the balance
  const formattedBalance = (balance) =>
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(balance);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getOrderDetails(orderId));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating a delay for refresh, remove this in your actual implementation
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
        style={{ marginBottom: SIZES.base5 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {console.log(orderdetails)}
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
          <Text style={{ ...FONTS.h2, color: COLORS.accent2 }}>
            {`Order #${orderdetails?.orderId}`}
          </Text>
          <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
            {orderdetails?.vendor?.fullname ||
              orderdetails?.vendor?.businessName}
          </Text>
          <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
            {`Order Pin: ${orderdetails?.otp}`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: SIZES.thickness,
              marginBottom: SIZES.base2,
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
                  ? orderdetails?.vendor?.address
                  : orderdetails?.user?.address
              }`}
            </Text>
          </View>
        </View>
        <CustomButton
          onPress={() => gotoWalletInputModel()}
          text={"Mark as delivered"}
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
                color={
                  orderdetails?.readyForDelivery ? COLORS.primary : COLORS.white
                }
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
      </ScrollView>
      <OrderConfirmModel
        openWalletInputModal={openWalletInputModal}
        setOpenWalletInputModal={setOpenWalletInputModal}
        gotoWalletInputModel={gotoWalletInputModel}
        setPin={setPin}
        pin={pin}
        ButtonName={"Confirm Pin"}
        Heading={`Mark as Delivered`}
        SubHeading={`To mark this order as Delivered, enter pin given to you by the delivery agent.`}
        InputHeading={"Enter Pin"}
        handleConfirmStatus={handleConfirmStatus}
      />

      {/* BottomSheet  */}
      {openSetting && (
        <BottomSheet
          ref={bottomSheetOrderOptionRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ color: COLORS.primary }}
        >
          <KeyboardAvoidingView behavior="padding">
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: SIZES.base16 }}
            >
              <View
                style={{
                  paddingVertical: SIZES.base,
                  paddingHorizontal: SIZES.base2,
                  backgroundColor: COLORS.white,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.accent,
                    textAlign: "center",
                  }}
                >
                  Rate your experience
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: SIZES.base,
                    marginTop: SIZES.base4,
                    marginBottom: SIZES.base4,
                  }}
                >
                  <Image
                    source={
                      route?.params?.vendor?.profile
                        ? {
                            uri: `${URLBASE.imageBaseUrl}${orderdetails?.vendor?.profile}`,
                          }
                        : placeholder
                    }
                    style={{
                      height: SIZES.base6,
                      width: SIZES.base6,
                      borderRadius: SIZES.base6,
                    }}
                  />
                  <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
                    {orderdetails?.vendor?.fullname ||
                      orderdetails?.vendor?.businessName}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: SIZES.base,
                    borderWidth: SIZES.thickness / 3,
                    borderColor: COLORS.gray4,
                    color: COLORS.tertiary,
                    marginVertical: SIZES.thickness,
                    padding: SIZES.base,
                    borderRadius: SIZES.radius / 2,
                  }}
                >
                  <RatingInput
                    rating={rating}
                    setRating={setRating}
                    size={SIZES.base4}
                    maxStars={5}
                    bordered={false}
                  />
                </View>
                {/* {loadingupdatereview && (
              <ActivityIndicator size="small" color={COLORS.tertiary} />
            )} */}
                <View
                  style={{ marginTop: SIZES.base, marginBottom: SIZES.base2 }}
                >
                  <Text style={styles.inputheading}>Review</Text>
                  <CustomMultiLineInput
                    multiline={true}
                    value={review}
                    onChangeText={(text) => setReview(text)}
                    placeholder="Review"
                  />
                </View>

                <CustomButton
                  text={"Submit"}
                  onPress={handleSubmitRating}
                  fill={true}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </BottomSheet>
      )}
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
