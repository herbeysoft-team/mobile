import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import CustomButton from "../../components/auth/CustomButton";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { getItem } from "../../utils/asyncStorage.js";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOTP,
  resendOTP,
  register,
  completeReg,
  completeRegIndividual,
} from "../../context/features/authSlice";
import * as ImagePicker from "expo-image-picker";
import placeholder from "../../../assets/placeholder.png";
import CustomTextInput from "../../components/auth/CustomTextInput.jsx";
import CheckBoxComponent from "../../components/auth/CheckBoxComponent.jsx";
import CustomTextInputPassword from "../../components/auth/CustomTextInputPassword.jsx";
import CustomTextInputWithPicker from "../../components/auth/CustomTextInputWithPicker.jsx";
import GooglePlaceAutocomplete from "../../components/auth/GooglePlaceAutoComplete.jsx";

export default function Register({ navigation }) {
  
  const {
    verifyloading,
    verifyerror,
    regloading,
    regerror,
    resendloading,
    resenderror,
    verifystatus,
    regstatus,
    completeregloading,
    completeregerror,
    completeregstatus,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const route = useRoute();
  const steps = [1, 2, 3, 4];

  const [image, setImage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [fullname, setFullname] = useState("");
  const [businessname, setBusinessname] = useState("");
  const [industry, setIndustry] = useState("");
  const [proffession, setProffession] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const profileOption = [
    {
      id: 1,
      title: "Business",
      subtitle: "Buy and Sell as a Business",
      icon: (
        <Ionicons
          name="ios-business-outline"
          size={SIZES.base2}
          color={COLORS.gray3}
        />
      ),
    },
    {
      id: 2,
      title: "Individual",
      subtitle: "Buy and Sell as an Individual",
      icon: (
        <MaterialCommunityIcons
          name="account-outline"
          size={SIZES.base2}
          color={COLORS.gray3}
        />
      ),
    },
  ];

  const industries = [
    { label: "Agriculture", value: "Agriculture" },
    { label: "Automotive", value: "Automotive" },
    { label: "Construction", value: "Construction" },
    { label: "Education", value: "Education" },
    { label: "Finance", value: "Finance" },
    { label: "Food & Beverage", value: "Food & Beverage" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Hospitality", value: "Hospitality" },
    { label: "Information Technology", value: "Information Technology" },
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Media & Entertainment", value: "Media & Entertainment" },
    { label: "Retail", value: "Retail" },
    { label: "Real Estate", value: "Real Estate" },
    { label: "Telecommunications", value: "Telecommunications" },
    {
      label: "Transportation & Logistics",
      value: "Transportation & Logistics",
    },
    { label: "Utilities", value: "Utilities" },
    { label: "Wholesale", value: "Wholesale" },
  ];

  useEffect(() => {
    resenderror &&
      Toast.show({
        type: "error",
        text1: resenderror.message,
      });
  }, [resenderror]);

  useEffect(() => {
    regerror &&
      Toast.show({
        type: "error",
        text1: regerror.message,
      });
  }, [regerror]);

  useEffect(() => {
    verifyerror &&
      Toast.show({
        type: "error",
        text1: verifyerror.message,
      });
  }, [verifyerror]);

  useEffect(() => {
    completeregerror &&
      Toast.show({
        type: "error",
        text1: completeregerror.message,
      });
  }, [completeregerror]);

  useEffect(() => {
    if (route.params?.step) {
      setCurrentStep(route.params?.step - 1);
    }
    checkIfWeHaveEmail();
  }, [route.params]);

  useEffect(() => {
    regstatus && setCurrentStep((currentStep) => currentStep + 1);
  }, [regstatus]);

  useEffect(() => {
    verifystatus && setCurrentStep((currentStep) => currentStep + 1);
  }, [verifystatus]);

  const checkIfWeHaveEmail = async () => {
    let tempEmail = await getItem("trowmartemail");
    setEmail(tempEmail);
  };

  const handleBusinessChange = (value) => {
    setIndustry(value);
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSignUp = () => {
    // setCurrentStep(currentStep + 1);
    const user = {
      email: email,
      password: password,
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[A-Za-z0-9]{6,}$/;

    if (!(email && password)) {
      Toast.show({
        type: "error",
        text1: "Email & Password Required...!",
      });
    } else if (!email) {
      Toast.show({
        type: "error",
        text1: "Email Required...!",
      });
    } else if (!password) {
      Toast.show({
        type: "error",
        text1: "Password Required...!",
      });
    } else if (email.includes(" ")) {
      Toast.show({
        type: "error",
        text1: "Invalid Email...!",
      });
    } else if (password.includes(" ")) {
      Toast.show({
        type: "error",
        text1: "Invalid Password...!",
      });
    } else if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email Format...!",
      });
    } else if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Password must be more than 6 characters long",
      });
    } else if (!passwordRegex.test(password)) {
      Toast.show({
        type: "error",
        text1: "Password must be Alphanumeric",
      });
    } else {
      // Proceed with authentication or further actions
      dispatch(register({ user, navigation, Toast }));
    }
  };

  const handleConfirm = () => {
    const user = {
      email: email,
      code: code,
    };

    const verifyCodeRegex = /^\d{7}$/;

    if (!verifyCodeRegex.test(code)) {
      Toast.show({
        type: "error",
        text1: "Invalid Verification Code",
        text2: "It should be a seven-digit numeric code.",
      });
    } else {
      // Proceed with authentication or further actions
      dispatch(verifyOTP({ user, navigation, Toast }));
    }
    verifystatus && setCurrentStep(currentStep + 1);
  };

  const handleResendCode = () => {
    // setCurrentStep(currentStep + 1)
    const user = {
      email: email,
    };
    if (email) {
      dispatch(resendOTP({ user, navigation, Toast }));
    }
  };

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const getStartedBusiness = () => {
    const userType = "business";
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (!image || !businessname || !industry || !phone) {
      Toast.show({
        type: "info",
        text1: "All field required!!!",
      });
    } else if (phone.includes(" ")) {
      Toast.show({
        type: "info",
        text1: "Wrong Phone Number...!",
      });
    } else if (!phoneRegex.test(phone)) {
      Toast.show({
        type: "info",
        text1: "Phone Number must be international format +23480XXX",
      });
    } else {
      const formData = new FormData();
      formData.append("file", {
        uri: image, // Local file path on the device
        type: "image/jpeg", // Adjust the type as needed
        name: "file.jpg",
      });
      formData.append("email", email);
      formData.append("businessname", businessname);
      formData.append("industry", industry);
      formData.append("address", address);
      formData.append("address", address);
      formData.append("longitude", longitude);
      formData.append("latitude", latitude);
      formData.append("userType", userType);
      formData.append("physicalStore", isChecked);
      dispatch(completeReg({ formData, navigation, Toast }));
    }
  };

  const getStartedIndividual = () => {
    const userType = "individual";
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (!image || !fullname || !proffession || !phone) {
      Toast.show({
        type: "info",
        text1: "All field required!!!",
      });
    } else if (phone.includes(" ")) {
      Toast.show({
        type: "info",
        text1: "Wrong Phone Number...!",
      });
    } else if (!phoneRegex.test(phone)) {
      Toast.show({
        type: "info",
        text1: "Phone Number must be international format +23480XXX",
      });
    } else {
      const formData = new FormData();
      formData.append("file", {
        uri: image, // Local file path on the device
        type: "image/jpeg", // Adjust the type as needed
        name: "file.jpg",
      });
      formData.append("email", email);
      formData.append("fullname", fullname);
      formData.append("proffession", proffession);
      formData.append("phone", phone);
      formData.append("userType", userType);
      dispatch(completeRegIndividual({ formData, navigation, Toast }));
    }
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const uploadImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        const imageSize = result.assets[0].fileSize;
        if (imageSize > maxSize) {
          Toast.show({
            type: "info",
            text1: "Selected image is too large.",
            text2: "Please select an image smaller than 2MB",
          });

          return; // Stop further processing
        }
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: SIZES.base10 }}
      >
        {/* Indicator container */}
        <View
          style={{
            flex: 1,
            paddingBottom: SIZES.base3,
            flexDirection: "row",
            marginTop: SIZES.base,
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
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.header}>{"Create your\naccount"}</Text>
            {regloading ? (
              <ActivityIndicator size="large" color={COLORS.tertiary} />
            ) : null}
            <View style={{ marginTop: SIZES.base3 }}>
              <Text style={styles.inputheading}>Email</Text>
              <CustomTextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your Email"
              />
            </View>

            <View style={{ marginTop: SIZES.base }}>
              <Text style={styles.inputheading}>Password</Text>
              <CustomTextInputPassword
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder={"***********"}
              />
            </View>

            <View
              style={{
                marginTop: SIZES.base6,
                height: SIZES.hp(10),
                alignItems: "center",
              }}
            />

            <CustomButton text={"Sign Up"} onPress={handleSignUp} fill={true} />

            <Pressable
              onPress={() => navigation.navigate("Login")}
              style={{ marginTop: 15 }}
            >
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.accent,
                  textAlign: "center",
                }}
              >
                Already have an account?{" "}
                <Text style={{ color: COLORS.primary }}>Sign In</Text>
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        )}

        {currentStep == 1 && (
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.header}>{"Verify email"}</Text>
            <Text style={styles.subheading}>
              {
                "This helps us keep your account secure by verifying it’s really you."
              }
            </Text>
            {verifyloading ? (
              <ActivityIndicator size="large" color={COLORS.tertiary} />
            ) : null}
            {resendloading ? (
              <ActivityIndicator size="large" color={COLORS.tertiary} />
            ) : null}
            <View style={{ marginTop: SIZES.base3 }}>
              <Text style={styles.inputheading}>Verification Code</Text>
              <CustomTextInput
                keyboardType="numeric"
                value={code}
                onChangeText={(text) => setCode(text)}
                placeholder={`7 digit code sent to email (${email})`}
              />
            </View>

            <View
              style={{
                marginTop: SIZES.base6,
                height: SIZES.hp(10),
                alignItems: "center",
              }}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                gap: SIZES.base,
              }}
            >
              <CustomButton
                text={"Confirm"}
                onPress={handleConfirm}
                fill={true}
              />
              <CustomButton
                text={"Resend Code"}
                onPress={handleResendCode}
                fill={false}
              />
            </View>
          </KeyboardAvoidingView>
        )}

        {currentStep == 2 && (
          <View>
            <Text style={styles.header}>{"Profile Type"}</Text>
            <Text style={styles.subheading}>
              {"Select how you appear to potential buyers and sellers."}
            </Text>
            <View style={{ marginTop: SIZES.base3 }}>
              {profileOption?.map((item, index) => (
                <Pressable
                  onPress={() => setSelectedOption(item)}
                  key={item?.id}
                  style={{
                    borderWidth: SIZES.thickness / 3,
                    borderColor:
                      selectedOption && selectedOption.id === item?.id
                        ? COLORS.primary
                        : COLORS.gray3,
                    padding: SIZES.base2,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 5,
                    marginVertical: SIZES.base,
                    borderRadius: SIZES.thickness,
                  }}
                >
                  <View style={{ flexDirection: "row", gap: SIZES.base }}>
                    <View
                      style={{
                        width: SIZES.base4,
                        height: SIZES.base4,
                        backgroundColor: COLORS.gray4,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item?.icon}
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={{ ...FONTS.body3, color: COLORS.accent }}>
                        {item?.title}
                      </Text>
                      <Text style={{ ...FONTS.body4, color: COLORS.accent }}>
                        {item?.subtitle}
                      </Text>
                    </View>
                  </View>
                  {selectedOption && selectedOption.id === item?.id ? (
                    <FontAwesome5
                      name="dot-circle"
                      size={SIZES.base3}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Entypo
                      onPress={() => setSelectedOption(item)}
                      name="circle"
                      size={SIZES.base3}
                      color="gray"
                    />
                  )}
                </Pressable>
              ))}
            </View>

            <View
              style={{
                marginTop: SIZES.base6,
                height: SIZES.hp(10),
                alignItems: "center",
              }}
            />

            <CustomButton
              text={"Continue"}
              onPress={handleContinue}
              fill={true}
            />
          </View>
        )}

        {currentStep == 3 && (
          <KeyboardAvoidingView behavior="padding">
            {selectedOption?.id == 1 && (
              <View>
                <Text style={styles.header}>
                  {"Tell us about\nyour business"}
                </Text>
                {completeregloading ? (
                  <ActivityIndicator size="large" color={COLORS.tertiary} />
                ) : null}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: SIZES.base2,
                    marginTop: SIZES.base,
                  }}
                >
                  <TouchableOpacity onPress={uploadImage}>
                    <Image
                      source={image ? { uri: image } : placeholder}
                      style={{
                        width: SIZES.base10,
                        height: SIZES.base10,
                        backgroundColor: COLORS.gray4,
                        borderRadius: SIZES.base10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.primary,
                        paddingVertical: SIZES.base,
                      }}
                    >
                      Upload Business Logo
                    </Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.tertiary }}>
                      Shouldn't be more than 2mb in Size
                    </Text>
                  </View>
                </View>
                {/* form here */}
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Business Name</Text>
                  <CustomTextInput
                    value={businessname}
                    onChangeText={(text) => setBusinessname(text)}
                    placeholder="Enter Business Name"
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Industry</Text>

                  <CustomTextInputWithPicker
                    placeholder="Select your Industry"
                    items={industries}
                    onValueChange={handleBusinessChange}
                  />
                </View>

                {/* <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Industry</Text>

                  <CustomTextInput
                    value={industry}
                    onChangeText={(text) => setIndustry(text)}
                    placeholder="Select your Industry"
                  />
                </View> */}

                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Phone Number</Text>

                  <CustomTextInput
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    placeholder="Enter your Phone number"
                  />
                </View>
                {isChecked && (
                  <View style={{ marginTop: SIZES.base }}>
                    <Text style={styles.inputheading}>Address</Text>

                    <GooglePlaceAutocomplete
                      onPlaceSelected={(place) => (
                        
                        setAddress(place?.description),
                        setLatitude(place?.coordinates?.latitude),
                        setLongitude(place.coordinates?.longitude)
                        
                      )}
                      placeholder="Enter your Address"
                      countryCode="NG"
                      icon="enviromento"
                    />
                    {/* <CustomTextInput
                      value={address}
                      onChangeText={(text) => setAddress(text)}
                      placeholder="street address, district, city, state, country"
                    /> */}
                  </View>
                )}

                {/* Add the checkbox and text below the phone input */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.base,
                  }}
                >
                  {/* Checkbox component */}
                  <CheckBoxComponent
                    isChecked={isChecked}
                    onPress={toggleCheckbox}
                  />

                  {/* Text */}
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.gray3,
                      marginLeft: SIZES.base,
                    }}
                  >
                    Do you have a physical store ?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: SIZES.base,
                    marginTop: SIZES.base3,
                  }}
                >
                  <CustomButton
                    text={"Get Started"}
                    onPress={getStartedBusiness}
                    fill={true}
                  />
                  <CustomButton text={"Back"} onPress={goBack} fill={false} />
                </View>
              </View>
            )}
            {selectedOption?.id == 2 && (
              <View>
                <Text style={styles.header}>{"Tell us about\nyourself"}</Text>
                {completeregloading ? (
                  <ActivityIndicator size="large" color={COLORS.tertiary} />
                ) : null}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: SIZES.base2,
                    marginVertical: SIZES.base,
                  }}
                >
                  <TouchableOpacity onPress={uploadImage}>
                    <Image
                      source={image ? { uri: image } : placeholder}
                      style={{
                        width: SIZES.base10,
                        height: SIZES.base10,
                        backgroundColor: COLORS.gray4,
                        borderRadius: SIZES.base10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.primary,
                        paddingVertical: SIZES.base,
                      }}
                    >
                      Upload Profile Picture
                    </Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.tertiary }}>
                      Shouldn't be more than 2mb in Size
                    </Text>
                  </View>
                </View>
                {/* form here */}
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Full Name</Text>
                  <CustomTextInput
                    value={fullname}
                    onChangeText={(text) => setFullname(text)}
                    placeholder="Enter your Full Name"
                  />
                </View>

                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Profession</Text>

                  <CustomTextInput
                    value={proffession}
                    onChangeText={(text) => setProffession(text)}
                    placeholder="Enter your Profession"
                  />
                </View>
                {/* <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Address</Text>

                  <CustomTextInput
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    placeholder="street address, district, city, state, country"
                  />
                </View> */}
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Phone Number</Text>

                  <CustomTextInput
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    placeholder="Enter your Phone number"
                  />
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: SIZES.base,
                    marginTop: SIZES.base3,
                  }}
                >
                  <CustomButton
                    text={"Get Started"}
                    onPress={getStartedIndividual}
                    fill={true}
                  />
                  <CustomButton text={"Back"} onPress={goBack} fill={false} />
                </View>
              </View>
            )}
          </KeyboardAvoidingView>
        )}
      </ScrollView>
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
    ...FONTS.header,
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
});
