import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Logo from "../../../assets/logo.png";
import CustomButton from "../../components/auth/CustomButton";
import {
  getSubscriptionPlan,
  subscriptionPlan
} from "../../context/features/subscriptionSlice.js";
import {
  getAccountBalance,
} from "../../context/features/transactionSlice.js";
import { getItem } from "../../utils/asyncStorage.js";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import LoadingOverlay from "../../components/general/LoadingOverlay.js";

export default function MySubscription({ navigation }) {
  const steps = [1, 2, 3];
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.transaction);
  const handleSwipe = (direction) => {
    if (direction === "left" && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (direction === "right" && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const { subscriptionInfo, loadingSub} =
    useSelector((state) => state.subscription);

  const handleSubscription = (plan) => {
    let amount =  plan == 'basic' ? 1000 : 3000;
    if(balance < amount){
      Toast.show({
        type: "error",
        text1: "You don't have sufficient fund. Fund your wallet!",
      });
    }else{
    dispatch(subscriptionPlan({
      formData:{
        plan: plan,
        amount: amount,
      },
      Toast
    }))
    setTimeout(() => {
      handleRefresh()
    }, 1000);
  }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getSubscriptionPlan())
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for refresh, remove this in your actual implementation
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"My Subscription"} />
      <PanGestureHandler
        onGestureEvent={(event) => {
          if (event.nativeEvent.translationX < -50) {
            handleSwipe("left");
          } else if (event.nativeEvent.translationX > 50) {
            handleSwipe("right");
          }
        }}
      >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZES.base10 }}
      >
        {/* the Pages here */}
        {currentStep == 0 && (
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
                Free Plan
              </Text>
            </View>
            {
              subscriptionInfo?.subscriptionType == "free" &&
            <View
              style={{
                borderColor: COLORS.white,
                borderWidth: SIZES.thin,
                borderRadius: SIZES.base2,
                paddingHorizontal: SIZES.base,
                paddingVertical: SIZES.thin,
              }}
            >
              <Text style={{ color: COLORS.gray3, ...FONTS.body4 }}>
                Current
              </Text>
            </View>
            }
          </View>
        )}

        {currentStep == 1 && (
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
                Basic Plan
              </Text>
            </View>
            {
              subscriptionInfo?.subscriptionType == "basic" &&
            <View style={{ borderColor: COLORS.white, borderWidth: SIZES.thin, borderRadius: SIZES.base2, paddingHorizontal: SIZES.base, paddingVertical: SIZES.thin}}>
           <Text style={{color: COLORS.gray3, ...FONTS.body4, }}>Current</Text>
             </View>
}
          </View>
        )}

        {currentStep == 2 && (
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
                Premium Plan
              </Text>
            </View>
            {
              subscriptionInfo?.subscriptionType == "premium" &&
            <View style={{ borderColor: COLORS.white, borderWidth: SIZES.thin, borderRadius: SIZES.base2, paddingHorizontal: SIZES.base, paddingVertical: SIZES.thin}}>
           <Text style={{color: COLORS.gray3, ...FONTS.body4, }}>Current</Text>
         </View>
}
          </View>
        )}

        {/* Indicator container */}
        <View
          style={{
            flex: 1,
            paddingBottom: SIZES.base,
            flexDirection: "row",
            marginTop: SIZES.base,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Render indicator */}
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentStep == index && {
                  backgroundColor: COLORS.primaryDeep,
                  width: SIZES.base3,
                  height: SIZES.thickness,
                },
              ]}
            />
          ))}
        </View>

        {/* the Pages here */}
        {currentStep == 0 && (
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
                <Feather
                  name="lock"
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
                <Feather
                  name="lock"
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
                <Feather
                  name="lock"
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
                <Feather
                  name="lock"
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
                <Feather
                  name="lock"
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
                <Feather
                  name="lock"
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
                <Feather
                  name="lock"
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
                <Feather
                  name="lock"
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
                  Business Performance
                </Text>
              </View>
            </View>
            {/* <View style={{ marginTop: SIZES.base3 }}>
              <CustomButton
                onPress={() => setCurrentStep(1)}
                text={"Upgrade for ₦3000/month"}
                fill={true}
              />
            </View> */}
          </View>
        )}

        {currentStep == 1 && (
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
                 <Feather
                  name="lock"
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
                 <Feather
                  name="lock"
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
                 <Feather
                  name="lock"
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
                 <Feather
                  name="lock"
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
                 <Feather
                  name="lock"
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
                 <Feather
                  name="lock"
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
                  Business Performance
                </Text>
              </View>
            </View>
            <View style={{ marginTop: SIZES.base3 }}>
            {subscriptionInfo?.subscriptionType == "free" &&
              <CustomButton
                onPress={() => handleSubscription('basic')}
                text={"Upgrade for ₦1000/month"}
                fill={true}
              />}
            </View>
          </View>
        )}

        {currentStep == 2 && (
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
                  Business Performance
                </Text>
              </View>
            </View>
            <View style={{ marginTop: SIZES.base3 }}>
              {subscriptionInfo?.subscriptionType == "basic" || subscriptionInfo?.subscriptionType == "free" &&
              <CustomButton
                onPress={() => handleSubscription('premium')}
                text={"Upgrade for ₦3000/month"}
                fill={true}
              />
              }
            </View>
          </View>
        )}
       <LoadingOverlay visible={loadingSub} />
      </ScrollView>
      </PanGestureHandler>
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
