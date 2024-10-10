import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS, deliveryoption } from "../../constant";
import CustomButton from "../../components/auth/CustomButton";
import HeaderListing from "../../components/general/HeaderLising";
import CustomTextInput from "../../components/auth/CustomTextInput";
import CustomMultiLineInput from "../../components/auth/CustomMultiLineInput";
import CustomTextInputWithIcon from "../../components/auth/CustomTextInputWithIcon";
import Toast from "react-native-toast-message";
import { EXPO_PUBLIC_GOOGLE_API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";

import {
  createDelivery,
  setDeliveryStatus,
} from "../../context/features/deliverySlice";
import LoadingOverlay from "../../components/general/LoadingOverlay";
import DeliveryCompleteModel from "../../components/general/DeliveryCompleteModel";
import { ScrollView as GestureScrollView } from "react-native-gesture-handler";
import GooglePlaceAutocomplete from "../../components/auth/GooglePlaceAutoComplete";

export default function RequestDelivery({ navigation }) {
  const dispatch = useDispatch();
  const { deliverystatus, loadingcreatedelivery } = useSelector(
    (state) => state.delivery
  );
  const { userProfile } = useSelector((state) => state.user);
  const [deliveryOption, setDeliveryOption] = useState("");
  const [packagename, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [plocation, setpLocation] = useState("");
  const [dlocation, setdLocation] = useState("");
  const [pcontact, setpContact] = useState("");
  const [dcontact, setdContact] = useState("");
  const [estimate, setEstimate] = useState(0);
  const [openDeliveryCompleteModel, setOpenDeliveryCompleteModel] =
    useState(false);


  const handleAddRequest = () => {
    if (
      !packagename ||
      !description ||
      !plocation ||
      !dlocation ||
      !pcontact ||
      !dcontact ||
      !deliveryOption ||
      !estimate
    ) {
      console.log({plocation, dlocation})
      Toast.show({
        type: "info",
        text1: "All field required!!!",
      });
    } else {
      dispatch(
        createDelivery({
          formData: {
            user: userProfile?._id,
            parcelName: packagename,
            parcelDescription: description,
            pickUpLocation: plocation,
            pickUpContact: pcontact,
            dropOffLocation: dlocation,
            dropOffContact: dcontact,
            deliveryOption: deliveryOption?.title,
            deliveryCost: estimate,
          },
          Toast,
        })
      );

      setPackageName("");
      setDescription("");
      setpContact("");
      setdContact("");
      setpLocation("");
      setdLocation("");
      setDeliveryOption("");
      setEstimate(0);

    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // Calculate estimate based on distance whenever distance changes
    if (plocation && dlocation) {
      calculateEstimate();
    }
  }, [plocation, dlocation, deliveryOption]);

  const calculateEstimate = async () => {
    if (plocation && dlocation && deliveryOption) {
      try {
        // Make API call to Google Distance Matrix API
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${plocation}&destinations=${dlocation}&key=${EXPO_PUBLIC_GOOGLE_API_KEY}`
        );

        // Parse the distance from the API response
        const distanceText =
          response?.data?.rows[0]?.elements[0]?.distance?.text;
        if (distanceText) {
          // Update the distance state
          // setDistance(distanceText);

          // Calculate estimate based on distance (replace with your actual logic)
          const baseRatePerKm = 200; // Example base rate per kilometer
          const distanceInKm = parseFloat(distanceText.replace(" km", ""));
          let newEstimate;
          if (deliveryOption?.id == 3) {
            newEstimate = baseRatePerKm * distanceInKm * 5;
          } else if (deliveryOption?.id == 2) {
            newEstimate = baseRatePerKm * distanceInKm * 3;
          } else {
            newEstimate = baseRatePerKm * distanceInKm;
          }
          // Round down the estimate to remove the decimal part
          const roundedEstimate = Math.floor(newEstimate);
          setEstimate(Number(roundedEstimate));
        }
      } catch (error) {
        console.error("Error fetching distance:", error);
        setEstimate(0);
      }
    } else {
      setEstimate(0);
    }
  };

  useEffect(() => {
    deliverystatus && gotoDeliveryComplete();
  }, [deliverystatus]);

  const gotoDeliveryComplete = () => {
    setOpenDeliveryCompleteModel(true);
  };

  const gotoHome = () => {
    setOpenDeliveryCompleteModel(false);
    dispatch(setDeliveryStatus());
    navigation.navigate("Home");
  };



  return (
    <SafeAreaView style={styles.container}>
      <HeaderListing title={"Request Delivery"} navigation={navigation} />
      <GestureScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={SIZES.base5}
          behavior="padding"
        >
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Package Name</Text>
            <CustomTextInput
              value={packagename}
              onChangeText={(text) => setPackageName(text)}
              placeholder="Enter Package Name"
            />
          </View>
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Package Description</Text>
            <CustomMultiLineInput
              multiline={true}
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Enter Package Description"
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Pick Up Location</Text>
            <GooglePlaceAutocomplete
              onPlaceSelected={(place) => setpLocation(place?.description)}
              placeholder="Enter Pick Up Location"
              countryCode="NG"
              icon="enviromento"
            />
          </View>
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Pick Up Contact</Text>
            <CustomTextInputWithIcon
              value={pcontact}
              onChangeText={(text) => setpContact(text)}
              placeholder="Enter Pick Up Contact"
              icon="phone"
              keyboardType="numeric"
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Drop Off Location</Text>

            <GooglePlaceAutocomplete
              onPlaceSelected={(place) => setdLocation(place?.description)}
              placeholder="Enter Drop Off Location"
              countryCode="NG"
              icon="enviromento"
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Drop Off Contact</Text>
            <CustomTextInputWithIcon
              value={dcontact}
              onChangeText={(text) => setdContact(text)}
              placeholder="Enter Drop Off Contact"
              icon="phone"
              keyboardType="numeric"
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Preferred Carrier</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                marginBottom: SIZES.base3,
              }}
            >
              {deliveryoption?.map((item, index) => (
                <Pressable
                  onPress={() => setDeliveryOption(item)}
                  key={item?.id}
                  style={{
                    borderWidth: SIZES.thickness / 3,
                    borderColor:
                      deliveryOption && deliveryOption.id === item?.id
                        ? COLORS.primary
                        : COLORS.gray4,
                    paddingVertical: SIZES.base3,
                    paddingHorizontal: SIZES.base3,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                    width: SIZES.base10,
                    height: SIZES.base10,
                    marginVertical: SIZES.base,
                    borderRadius: SIZES.base,
                    backgroundColor: COLORS.gray2,
                  }}
                >
                  <Image
                    source={item?.icon}
                    style={{
                      height: SIZES.base5,
                      width: SIZES.base5,
                      resizeMode: "contain",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </Pressable>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ ...FONTS.h3, color: COLORS.accent }}
              >{`Order Estimate`}</Text>
              <Text
                style={{ ...FONTS.h3, color: COLORS.accent }}
              >{`₦${estimate}`}</Text>
            </View>
          </View>
          <LoadingOverlay visible={loadingcreatedelivery} />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              gap: SIZES.base,
              marginTop: SIZES.base3,
            }}
          >
            <CustomButton
              text={"Send Request"}
              onPress={handleAddRequest}
              fill={true}
            />
            <CustomButton text={"Back"} onPress={handleGoBack} fill={false} />
          </View>
        </KeyboardAvoidingView>
      </GestureScrollView>

      <DeliveryCompleteModel
        openDeliveryCompleteModel={openDeliveryCompleteModel}
        gotoHome={gotoHome}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base3,
    paddingHorizontal: SIZES.base3,
    backgroundColor: COLORS.white,
  },
  header: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base2,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
  subheading: {
    color: COLORS.tertiary,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
  inputheading: {
    color: COLORS.gray3,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
  underheading: {
    color: COLORS.gray3,
    ...FONTS.body4,
    marginTop: SIZES.thickness,
    lineHeight: SIZES.base2,
  },
  textInputContainer: {
    width: "100%",
    borderWidth: SIZES.thin,
    borderRadius: SIZES.base,
    borderColor: COLORS.accent2,
    marginBottom: SIZES.base2,
  },
  textInput: {
    height: SIZES.base6,
    color: COLORS.accent2,
    ...FONTS.body3,
  },
});
