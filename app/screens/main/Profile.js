import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import HeaderBig from "../../components/general/HeaderBig";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import GetVerifiedModel from "../../components/general/GetVerifiedModel";
import LogOutModel from "../../components/general/LogOutModel";
import { getItem, removeItem } from "../../utils/asyncStorage.js";
import { calculateDistance } from "../../utils/distanceUtil.js";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateProfileLocation } from "../../context/features/userSlice";
import placeholder from "../../../assets/placeholder.png";
import { RefreshControl } from "react-native-gesture-handler";
import UpgradeDeliverModal from "../../components/general/UpgradeDeliverModal.js";

const Profile = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const { userLocation } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [openUpgradeDeliverModal, setOpenUpgradeDeliverModal] = useState(false)
  const subscriptionInfo = useSelector(
    (state) => state.subscription.subscriptionInfo
  );


  const handleRefresh = () => {
    setRefreshing(true);
    const checkUserId = async () => {
      try {
        const getId = await getItem("trowmartuserId");
        if (getId) {
          dispatch(getUserProfile(getId));
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
  const [openGetVerified, setOpenGetVerified] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  const { userProfile } = useSelector((state) => state.user);

  const memoizeUserProfile = useMemo(() => userProfile, [userProfile]);

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const getId = await getItem("trowmartuserId");
        if (getId) {
          dispatch(getUserProfile(getId));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
    updateUserLocation();
  }, []);

  //update user location if changed
  const updateUserLocation = async () => {
    try {
      if(userLocation != null && userProfile != null){
      //check if the user has physcialStore
      if(userProfile?.physicalStore != true){
        if(userLocation?.location?.coordinates[1] == undefined){
          dispatch(
            updateProfileLocation({
              formData: {
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude,
              },
            })
          );
        }
        //get the distance between the two location
        const distance = calculateDistance(
          userProfile?.location?.coordinates[1],
          userProfile?.location?.coordinates[0],
          userLocation?.latitude,
          userLocation?.longitude
        );

        if(distance && distance > 10.0){
          console.log("Distance is truly greater than 10")
          //update the user locaction
          dispatch(
            updateProfileLocation({
              formData: {
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude,
              },
            })
          );
        }
      }else{
        console.log("Physical Store")
      }
    }
    } catch (error) {
      console.log(error);
    }
  };

  const gotoEditProfle = () => {
    navigation.navigate("Edit-Profile", userProfile);
  };

  const gotoGetVerifiedModal = () => {
    if(memoizeUserProfile?.verificationstatus === "under review"){
      Toast.show({
        type: "error",
        text1: "Your document is under review",
      });
    }else{
      setOpenGetVerified(true);
    }
    
  };

  const gotoLogOutModal = () => {
    setOpenLogOut(true);
  };

  const gotoLogOut = () => {
    removeItem("trowmarttoken");
    removeItem("trowmartemail");
    removeItem("trowmartuserId");
    removeItem("trowmartOTP");
    removeItem("trowmartcart");
    removeItem("trowmartUserPreferences")
    navigation.navigate("Onboard");
    setOpenLogOut(false);
  };

  const gotoGetVerified = () => {
    navigation.navigate("Get-Verified");
    setOpenGetVerified(false);
  };

  const gotoMyListing = () => {
    navigation.navigate("My-Listing");
  };

  const gotoMyOrders = () => {
    navigation.navigate("My-Order");
  };

  const gotoMyDeliveryRequests = () => {
    navigation.navigate("Delivery-Request");
  };

  const gotoInsights = () => {
    if (subscriptionInfo.subscriptionType === "premium") {
      navigation.navigate("Insight");
    } else {
      setOpenUpgradeDeliverModal(true)
    }    
    
  };

  const gotoWallet = () => {
    navigation.navigate("Wallet");
  };

  const gotoRating = () => {
    navigation.navigate("Rating");
  };

  const gotoNotification = () => {
    navigation.navigate("Setting");
  };

  const gotoMySubscription = () => {
    navigation.navigate("My-Subscription");
  };

  const gotoHelp = () => {
    navigation.navigate("Help");
  };

  const gotoChangePassword = () => {
    navigation.navigate("Change-Password");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBig title={"Profile"} navigation={navigation} />
      <ScrollView 
          contentContainerStyle={{ flexGrow: 1 , marginBottom: SIZES.base10}}
          showsVerticalScrollIndicator={false} 
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          >
        {/* user section */}
        <View style={styles.userSection}>
          <Pressable onPress={gotoEditProfle}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
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
                  source={
                    memoizeUserProfile?.profile
                      ? {
                          uri: `${URLBASE.imageBaseUrl}${memoizeUserProfile?.profile}`,
                        }
                      : placeholder
                  }
                  style={{
                    height: SIZES.base6,
                    width: SIZES.base6,
                    borderRadius: SIZES.base6,
                    resizeMode: "cover",
                  }}
                />

                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: SIZES.base,
                    }}
                  >
                    <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
                      {memoizeUserProfile?.userType === "business"
                        ? memoizeUserProfile?.businessName
                        : memoizeUserProfile?.fullname}
                    </Text>
                    {memoizeUserProfile?.verifiedAccount && (
                      <MaterialIcons
                        name="verified"
                        size={SIZES.base2}
                        color={COLORS.primary}
                      />
                    )}
                  </View>
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    {memoizeUserProfile?.email}
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoGetVerifiedModal}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Octicons
                    name="verified"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Get Verified
                  </Text>
                  <View
                    style={{
                      borderColor: COLORS.amber,
                      borderWidth: SIZES.thin,
                      paddingHorizontal: SIZES.base,
                      borderRadius: SIZES.base,
                    }}
                  >
                    <Text style={{ ...FONTS.body4, color: COLORS.amber }}>
                      {memoizeUserProfile?.verificationstatus}
                    </Text>
                  </View>
                </View>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
        </View>

        {/* next section */}
        <View style={styles.userSection}>
          <Pressable onPress={gotoMyListing}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.red,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Ionicons
                    name="grid-outline"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    My Listings
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoMyOrders}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.pink,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather name="box" size={SIZES.base2} color={COLORS.white} />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    My Orders
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoMyDeliveryRequests}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.brown,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather
                    name="truck"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Deliveries
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoInsights}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.purple,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <MaterialIcons
                    name="insights"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Insights
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoWallet}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.lightGreen,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <SimpleLineIcons
                    name="wallet"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Wallet
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoRating}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.amber,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather
                    name="star"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Ratings & Reviews
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
        </View>

        {/* next section */}
        <View style={styles.userSection}>
          <Pressable onPress={gotoNotification}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.blue,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather
                    name="settings"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Notifications
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoMySubscription}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.cadetBlue,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <FontAwesome
                    name="money"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    My Subscription
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoHelp}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.indigo,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather
                    name="help-circle"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Help & Support
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoChangePassword}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.tealGreen,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather name="lock"  size={SIZES.base2}
                    color={COLORS.white}/>
                  {/* <MaterialIcons
                    name="insights"
                    size={SIZES.base2}
                    color={COLORS.white}
                  /> */}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Security
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoLogOutModal}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
                marginBottom: SIZES.base3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.gray3,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather
                    name="log-out"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Log Out
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View style={{marginBottom: SIZES.base2, height: SIZES.base2}}/>

        </View>
        <GetVerifiedModel
          openGetVerifiedModel={openGetVerified}
          setOpenGetVerifiedModel={setOpenGetVerified}
          gotoGetVerified={gotoGetVerified}
        />
        <LogOutModel
          openLogOutModel={openLogOut}
          setOpenLogOutModel={setOpenLogOut}
          gotoLogOut={gotoLogOut}
        />

        <UpgradeDeliverModal
        openUpgradeDeliverModal={openUpgradeDeliverModal}
        setOpenUpgradeDeliverModal={setOpenUpgradeDeliverModal}
        navigation={navigation}
        plan={"Premium"}
        heading={"Upgrade to view"}
        subheading={"insights"}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.white,
    // marginBottom: SIZES.base,
  },
  userSection: {
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.base,
    marginBottom: SIZES.base,
  },
});
