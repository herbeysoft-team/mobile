import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../auth/CustomButton";
import { Entypo } from "@expo/vector-icons";
import Logo from "../../../assets/logo.png";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import {
  getSubscriptionPlan,
  subscriptionPlan,
} from "../../context/features/subscriptionSlice.js";

export default function UpgradeBasicModal({
  openUpgradeBasicModal,
  setOpenUpgradeBasicModal,
  plan,
  heading,
  subheading,
}) {
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.transaction);
  const [refreshing, setRefreshing] = useState(false);
  const handleSubscription = (plan) => {
    console.log(plan);
    let amount = plan == "basic" ? 1000 : 3000;
    if (balance < amount) {
      Toast.show({
        type: "error",
        text1: "You don't have sufficient fund. Fund your wallet!",
      });
    } else {
      dispatch(
        subscriptionPlan({
          formData: {
            plan: plan,
            amount: amount,
          },
          Toast,
        })
      );
      setTimeout(() => {
        handleRefresh();
        setOpenUpgradeBasicModal(false);
      }, 1000);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getSubscriptionPlan());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for refresh, remove this in your actual implementation
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openUpgradeBasicModal}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.base2,
            paddingHorizontal: SIZES.base3,
            paddingTop: SIZES.base4,
            width: SIZES.wp(100),
            height: SIZES.hp(95),
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
          {/* HEader */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: SIZES.base3,
              gap: SIZES.base2,
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <Text
                style={{
                  ...FONTS.header,
                  color: COLORS.secondary,
                  alignItems: "flex-start",
                }}
              >
                {`${heading} `}
              </Text>
              <Text
                style={{
                  ...FONTS.header,
                  color: COLORS.secondary,
                  alignItems: "flex-start",
                }}
              >
                {`${subheading} `}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                borderRadius: SIZES.base3,
                backgroundColor: COLORS.gray4,
                width: SIZES.base3,
                height: SIZES.base3,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setOpenUpgradeBasicModal(false)}
            >
              <AntDesign name="close" size={SIZES.base2} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: SIZES.base5, width: "100%" }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: SIZES.thickness,
                borderWidth: SIZES.thin,
                borderColor: COLORS.gray3,
                borderRadius: SIZES.base,
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base3,
                backgroundColor: COLORS.secondary,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <Image
                  source={Logo}
                  style={{
                    height: SIZES.base4,
                    width: SIZES.base4,
                    borderRadius: SIZES.base4,
                  }}
                />
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                  {`${plan} Plan`}
                </Text>
              </View>
              {/* <View style={{ borderColor: COLORS.white, borderWidth: SIZES.thin, borderRadius: SIZES.base2, paddingHorizontal: SIZES.base, paddingVertical: SIZES.thin}}>
           <Text style={{color: COLORS.gray3, ...FONTS.body4, }}>Current</Text>
         </View> */}
            </View>

            <View>
              <View
                style={{
                  marginTop: SIZES.base3,
                  borderWidth: SIZES.thin,
                  borderColor: COLORS.gray3,
                  borderRadius: SIZES.base,
                  paddingHorizontal: SIZES.base2,
                  paddingVertical: SIZES.base,
                }}
              >
                <Text style={styles.heading}>Explore and Buy</Text>
                {/* First pair */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.base,
                  }}
                >
                  <Entypo
                    name="check"
                    size={SIZES.base2}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      marginLeft: SIZES.base,
                      ...FONTS.body4,
                      color: COLORS.accent2,
                    }}
                  >
                    Current Neighbourhood
                  </Text>
                </View>

                {/* Second pair */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.base,
                  }}
                >
                  <Entypo
                    name="check"
                    size={SIZES.base2}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      marginLeft: SIZES.base,
                      ...FONTS.body4,
                      color: COLORS.accent2,
                    }}
                  >
                    Other Neighbourhood
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: SIZES.base3,
                  borderWidth: SIZES.thin,
                  borderColor: COLORS.gray3,
                  borderRadius: SIZES.base,
                  paddingHorizontal: SIZES.base2,
                  paddingVertical: SIZES.base,
                }}
              >
                <Text style={styles.heading}>Listings</Text>
                {/* First pair */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.base,
                  }}
                >
                  {plan == "Basic" ? (
                    <Feather
                      name="lock"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Entypo
                      name="check"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  )}
                  <Text
                    style={{
                      marginLeft: SIZES.base,
                      ...FONTS.body4,
                      color: COLORS.accent2,
                    }}
                  >
                    Product
                  </Text>
                </View>

                {/* First pair */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.base,
                  }}
                >
                  {plan == "Basic" ? (
                    <Feather
                      name="lock"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Entypo
                      name="check"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  )}
                  <Text
                    style={{
                      marginLeft: SIZES.base,
                      ...FONTS.body4,
                      color: COLORS.accent2,
                    }}
                  >
                    Services
                  </Text>
                </View>

                {/* First pair */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.base,
                  }}
                >
                  {plan == "Basic" ? (
                    <Feather
                      name="lock"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Entypo
                      name="check"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  )}
                  <Text
                    style={{
                      marginLeft: SIZES.base,
                      ...FONTS.body4,
                      color: COLORS.accent2,
                    }}
                  >
                    Events
                  </Text>
                </View>
                {/* Second pair */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.base,
                  }}
                >
                  <Entypo
                    name="check"
                    size={SIZES.base2}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      marginLeft: SIZES.base,
                      ...FONTS.body4,
                      color: COLORS.accent2,
                    }}
                  >
                    Delivery Requests
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: SIZES.base3,
                  borderWidth: SIZES.thin,
                  borderColor: COLORS.gray3,
                  borderRadius: SIZES.base,
                  paddingHorizontal: SIZES.base2,
                  paddingVertical: SIZES.base,
                }}
              >
                <Text style={styles.heading}>Insights</Text>
                {/* First pair */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.base,
                  }}
                >
                  {plan == "Basic" ? (
                    <Feather
                      name="lock"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Entypo
                      name="check"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  )}
                  <Text
                    style={{
                      marginLeft: SIZES.base,
                      ...FONTS.body4,
                      color: COLORS.accent2,
                    }}
                  >
                    Profile Trends
                  </Text>
                </View>

                {/* First pair */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.base,
                  }}
                >
                  {plan == "Basic" ? (
                    <Feather
                      name="lock"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Entypo
                      name="check"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  )}
                  <Text
                    style={{
                      marginLeft: SIZES.base,
                      ...FONTS.body4,
                      color: COLORS.accent2,
                    }}
                  >
                    Product Engagement
                  </Text>
                </View>

                {/* First pair */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.base,
                  }}
                >
                  {plan == "Basic" ? (
                    <Feather
                      name="lock"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Entypo
                      name="check"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  )}
                  <Text
                    style={{
                      marginLeft: SIZES.base,
                      ...FONTS.body4,
                      color: COLORS.accent2,
                    }}
                  >
                    Business Performance
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: SIZES.base3 }}>
                <CustomButton
                  text={
                    plan == "Basic"
                      ? "Upgrade for ₦1000/month"
                      : "Upgrade for ₦3000/month"
                  }
                  onPress={() =>
                    plan == "Basic"
                      ? handleSubscription("basic")
                      : handleSubscription("premium")
                  }
                  fill={true}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
  heading: {
    ...FONTS.h4,
    color: COLORS.accent2,
  },
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base2,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
});
