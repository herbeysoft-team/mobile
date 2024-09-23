import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import HeaderMini from "../../components/general/HeaderMini";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/auth/CustomButton";
import { createOrder, setOrderStatus } from "../../context/features/orderSlice";
import OrderCompleteModel from "../../components/general/OrderCompleteModel";
import VendorHeading from "../../components/explore/VendorHeading";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";
import LoadingOverlay from "../../components/general/LoadingOverlay";
import { getItem } from "../../utils/asyncStorage.js";
import {
  getAccountBalance,
  depositFund,
} from "../../context/features/transactionSlice.js";
import WalletInputModel from "../../components/profile/WalletInputModel.js";
import { paystackProps, Paystack } from "react-native-paystack-webview";

export default function Checkout({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const { orderstatus, loadingcreateorder } = useSelector(
    (state) => state.order
  );
  const [openWalletInputModal, setOpenWalletInputModal] = useState(false);
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);
  const [amount, setAmount] = useState("");
  const { balance } = useSelector((state) => state.transaction);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const { userProfile } = useSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPayOption, setSelectedPayOption] = useState("");
  const [isComingFromCart, setIsComingFromCart] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [openOrderCompleteModel, setOpenOrderCompleteModel] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const payOption = [
    {
      id: 1,
      title: "TrowMart Wallet",
    },
    {
      id: 2,
      title: "Cash",
    },
  ];

  const deliveryOption = [
    {
      id: 1,
      title: "TrowMart Courier",
    },
    {
      id: 2,
      title: "Pick Up",
    },
  ];

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const getId = await getItem("trowmartuserId");
        if (getId) {
          dispatch(getAccountBalance(getId));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const gotoWalletInputModel = () => {
    setOpenWalletInputModal(true);
  };

  const handlePay = () => {
    if (amount && parseFloat(amount) > 0) {
      paystackWebViewRef.current.startTransaction();
    } else {
      Toast.show({
        type: "error",
        text1: "Please input amount",
      });
    }
  };

  // Format the balance
  const formattedBalance = (cash) =>
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cash);

  useEffect(() => {
    if (route.params) {
      setCheckoutItems([]);
      setIsComingFromCart(route?.params?.isComingFromCart);
      if (route?.params?.isComingFromCart == true) {
        setCheckoutItems(route?.params?.cartItems);
      } else {
        setCheckoutItems(
          route?.params?.productItems?.map((item) => ({ ...item, quantity: 1 }))
        );
      }
    }
  }, []);

  useEffect(() => {
    orderstatus && gotoOrderComplete();
  }, [orderstatus]);

  const handleCheckOutCart = async () => {
    if (selectedOption === "") {
      Toast.show({
        type: "error",
        text1: "Select an option for delivery",
      });
    } else {
      try {
        if(selectedPayOption?.id == 1){
            //implement Wallet Payment System
            if(parseInt(balance) >= parseInt(orderTotal)){

                const products = checkoutItems?.map((item) => ({
                id: item._id,
                quantity: item.quantity,
                price: item.price,
                address: userProfile?.address,
              }));

              const formData = {
                user: userProfile?._id,
                vendor: checkoutItems?.length > 0 ? checkoutItems[0]?.user : null,
                totalAmount: orderTotal,
                deliveryType: selectedOption?.id == 1 ? "Courier" : "PickUp",
                dispatchFee: selectedOption?.id == 1 ? deliveryFee : 0,
                paymentType: selectedPayOption?.id == 1 ? "Wallet" : "Cash",
                products, // array of product objects
              };
              
              dispatch(
                createOrder({
                  formData,
                  Toast,
                })
              );
            }else{
              Toast.show({
                type: "error",
                text1: "Insufficient Fund. Kindly top up your account",
              });
            }
        }else{
          const products = checkoutItems?.map((item) => ({
            id: item._id,
            quantity: item.quantity,
            price: item.price,
            address: userProfile?.address,
          }));

          const formData = {
            user: userProfile?._id,
            vendor: checkoutItems?.length > 0 ? checkoutItems[0]?.user : null,
            totalAmount: orderTotal,
            deliveryType: selectedOption?.id == 1 ? "Courier" : "PickUp",
            dispatchFee: selectedOption?.id == 1 ? deliveryFee : 0,
            paymentType: selectedPayOption?.id == 1 ? "Wallet" : "Cash",
            products, // array of product objects
          };
          

          dispatch(
            createOrder({
              formData,
              Toast,
            })
          );
        }
        
        
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message || "An error occurred during checkout",
        });
        console.log(error);
      }
    }
  };

  const gotoOrderComplete = () => {
    setOpenOrderCompleteModel(true);
  };

  const gotoHome = () => {
    setOpenOrderCompleteModel(false);
    dispatch(setOrderStatus());
    navigation.navigate("Home");
  };

  const handleQuantityChangeCart = (productId, action) => {
    const updatedItems = checkoutItems.map((item) => {
      if (item._id === productId) {
        if (action === "add") {
          item.quantity++;
        } else if (action === "minus" && item.quantity > 1) {
          item.quantity--;
        }
      }
      return item;
    });
    setCheckoutItems(updatedItems);
  };

  const calculateDeliveryFee = () => {
    let calculatedFee = 0; // Default fee if no option is selected

    if (selectedOption?.id == 1) {
      const baseFee = 500; // Base delivery fee
      const ratePerMinute = 50; // Rate per minute

      calculatedFee =
        baseFee + checkoutItems[0]?.travelTimeMinutes * ratePerMinute;

      setDeliveryFee(calculatedFee);
    }

    return calculatedFee;
  };

  const calculateOrderTotalCart = (checkoutItems) => {
    const numberOfItemsCart = calculateTotalCost(checkoutItems);
    const deliveryFee = calculateDeliveryFee();

    const total = numberOfItemsCart + deliveryFee;
    setOrderTotal(total);
  };

  const calculateTotalNumberOfItems = (checkoutItems) => {
    return (checkoutItems ?? []).reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  const calculateTotalCost = (checkoutItems) => {
    return (checkoutItems ?? []).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Effect to calculate order total whenever dependencies change
  useEffect(() => {
    calculateOrderTotalCart(checkoutItems);
  }, [checkoutItems, selectedOption, selectedPayOption, deliveryFee]);

  const handleRefresh = () => {
    setRefreshing(true);
    const checkUserId = async () => {
      try {
        const getId = await getItem("trowmartuserId");
        
        if (getId) {
          dispatch(getAccountBalance(getId));
          dispatch(getTransactionsByUser(getId));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for refresh, remove this in your actual implementation
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMini title={"Checkout"} navigation={navigation} />
      {/* {console.log(checkoutItems)} */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZES.base2 }}
      >
        {checkoutItems != null &&
          checkoutItems.map((item, index) => (
            <React.Fragment key={item._id}>
              {index === 0 && (
                <VendorHeading navigation={navigation} user={item.user} />
              )}
              <View
                key={item._id}
                style={{
                  paddingVertical: SIZES.thickness,
                  borderRadius: SIZES.base,
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: SIZES.base,
                }}
              >
                <Image
                  source={{
                    uri: `${URLBASE.imageBaseUrl}${item.image[0]}`,
                  }}
                  style={{
                    height: SIZES.base12,
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
                  <Text style={{ ...FONTS.listHead, color: COLORS.accent2 }}>
                    {item?.name?.length > 20 ? `${item?.name.substring(0,19)}..`: item?.name}
                  </Text>
                  <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
                    {item.type == "product"
                      ? `₦${formattedBalance(item?.price)}`
                      : `₦${formattedBalance(item?.price)}/${item.unit}`}
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
                      {item.location?.address}
                    </Text>
                  </View>
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
                  <TouchableOpacity
                    onPress={() => handleQuantityChangeCart(item._id, "minus")}
                  >
                    <View
                      style={{
                        width: SIZES.base3,
                        height: SIZES.base3,
                        backgroundColor: COLORS.gray4,
                        borderRadius: SIZES.base3,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text>-</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <Text>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => handleQuantityChangeCart(item._id, "add")}
                  >
                    <View
                      style={{
                        width: SIZES.base3,
                        height: SIZES.base3,
                        backgroundColor: COLORS.gray4,
                        borderRadius: SIZES.base3,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text>+</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <View></View>
                </View>
              </View>
            </React.Fragment>
          ))}

        <View
          style={{
            borderBottomWidth: SIZES.thin / 2,
            height: SIZES.thin,
            borderColor: COLORS.gray4,
            marginVertical: SIZES.thin,
          }}
        />

        {/* Delivery Option*/}
        <View style={styles.itemContainer}>
          <Text
            style={{ ...FONTS.h3, color: COLORS.accent2 }}
          >{`Delivery Option`}</Text>
          <View>
            {deliveryOption?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedOption(item)}
                key={item?.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: SIZES.base2,
                  marginVertical: SIZES.base,
                  borderRadius: SIZES.thickness,
                }}
              >
                <View style={{ flexDirection: "row", gap: SIZES.base }}>
                  {selectedOption && selectedOption.id === item?.id ? (
                    <FontAwesome5
                      name="dot-circle"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Entypo
                      onPress={() => setSelectedOption(item)}
                      name="circle"
                      size={SIZES.base2}
                      color="gray"
                    />
                  )}
                  <Text style={{ ...FONTS.body3, color: COLORS.gray3 }}>
                    {item?.id == 1 ? `${item?.title} ` : `${item?.title}`}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: SIZES.thin / 2,
            height: SIZES.thin,
            borderColor: COLORS.gray4,
            marginVertical: SIZES.thin,
          }}
        />

        {/* Deliver to */}
        <View style={styles.itemContainer}>
          <Text style={{ ...FONTS.h3, color: COLORS.accent2 }}>
            {selectedOption?.id == 2 ? `Pick Up at` : `Deliver to`}
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

            <Text style={{ ...FONTS.body3, color: COLORS.gray3 }}>
              {selectedOption?.id == 1
                ? `${userProfile?.address} (My Location)`
                : `${checkoutItems[0]?.location?.address} (Vendor Location) `}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: SIZES.thin / 2,
            height: SIZES.thin,
            borderColor: COLORS.gray4,
            marginVertical: SIZES.thin,
          }}
        />

        {/* Pay with */}
        <View style={styles.itemContainer}>
          <Text
            style={{ ...FONTS.h3, color: COLORS.accent2 }}
          >{`Pay with`}</Text>
          <View style={{ width: "100%" }}>
            {payOption?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedPayOption(item)}
                key={item?.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: SIZES.base2,
                  marginVertical: SIZES.base,
                  borderRadius: SIZES.thickness,
                }}
              >
                <View style={{ flexDirection: "row", gap: SIZES.base }}>
                  {selectedPayOption && selectedPayOption?.id === item?.id ? (
                    <FontAwesome5
                      name="dot-circle"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Entypo
                      onPress={() => setSelectedPayOption(item)}
                      name="circle"
                      size={SIZES.base2}
                      color="gray"
                    />
                  )}
                  <Text style={{ ...FONTS.body3, color: COLORS.gray3 }}>
                    {item?.id == 1
                      ? `${item?.title} (₦${formattedBalance(balance)})`
                      : `${item?.title}`}
                  </Text>
                </View>

                {item?.id == 1 && (
                  <TouchableOpacity
                    style={{
                      paddingVertical: SIZES.base / 2,
                      paddingHorizontal: SIZES.base,
                      borderRadius: SIZES.radius,
                      alignItems: "flex-end",
                    }}
                    onPress={() => {
                      gotoWalletInputModel();
                    }}
                  >
                    <AntDesign
                      name="pluscircleo"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                )}
              </Pressable>
            ))}
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: SIZES.thin / 2,
            height: SIZES.thin,
            borderColor: COLORS.gray4,
            marginVertical: SIZES.thin,
          }}
        />

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
            >{`Item (${calculateTotalNumberOfItems(checkoutItems)})`}</Text>
            <Text
              style={{ ...FONTS.body3, color: COLORS.gray3 }}
            >{`₦${formattedBalance(calculateTotalCost(checkoutItems))}`}</Text>
          </View>

          {/* Calculate the distance and shipping fee */}
          {selectedOption?.id == 1 && (
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
              >{`₦${formattedBalance(deliveryFee)}`}</Text>
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
        />

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
            >{`₦${formattedBalance(orderTotal)}`}</Text>
          </View>
        </View>
        <LoadingOverlay visible={loadingcreateorder} />
        {selectedPayOption !== "" && (
          <CustomButton
            onPress={handleCheckOutCart}
            text={
              selectedPayOption?.id == 1 ? "Confirm and Pay" : "Confirm Order"
            }
            fill={true}
          />
        )}

        <OrderCompleteModel
          openOrderCompleteModel={openOrderCompleteModel}
          gotoHome={gotoHome}
        />

        <Paystack
          paystackKey="pk_test_e52e42c107480e08fd0cd3aa5c19fee0a84e7330"
          amount={amount}
          billingEmail={userProfile?.email}
          billingName={
            userProfile?.userType == "business"
              ? userProfile?.businessName
              : userProfile?.fullName
          }
          billingMobile={userProfile?.phoneNumber}
          activityIndicatorColor={COLORS.gray2}
          currency="NGN"
          onCancel={(e) => {
            // handle response here
            console.log(e);
            setOpenWalletInputModal(false);
            setAmount("");
          }}
          onSuccess={(res) => {
            // handle response here
            console.log(res);
            dispatch(
              depositFund({
                formData: {
                  message: res?.transactionRef?.message,
                  redirecturl: res?.transactionRef?.redirecturl,
                  reference: res?.transactionRef?.reference,
                  status: res?.transactionRef?.status,
                  transaction: res?.transactionRef?.trans,
                  type: "Deposit",
                  amount: amount,
                },
              })
            );
            setOpenWalletInputModal(false);
            setAmount("");
            if (userProfile) {
              dispatch(getAccountBalance(userProfile?._id));
            }
            setTimeout(() => {
              handleRefresh();
            }, 1000);
            
          }}
          // autoStart={true}
          ref={paystackWebViewRef}
        />
        <WalletInputModel
          openWalletInputModal={openWalletInputModal}
          setOpenWalletInputModal={setOpenWalletInputModal}
          gotoWalletInputModel={gotoWalletInputModel}
          setAmount={setAmount}
          amount={amount}
          ButtonName={"Confirm Amount"}
          Heading={"Wallet Topup"}
          InputHeading={"Amount"}
          handlePay={handlePay}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
    paddingTop: SIZES.base2,
    paddingHorizontal: SIZES.base2,
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
});
