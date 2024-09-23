import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import { useRoute } from "@react-navigation/native";
import ProfilePic from "../../../assets/profilepic.jpeg";
import CustomButton from "../../components/auth/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../utils/asyncStorage.js";
import { updateProfile, getUserProfile, updateProfilePic } from "../../context/features/userSlice";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import CheckBoxComponent from "../../components/auth/CheckBoxComponent.jsx";

export default function EditProfile({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState("");
  const [businessname, setBusinessname] = useState("");
  const [industry, setIndustry] = useState("");
  const [proffession, setProffession] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { loadingUpdate } = useSelector((state) => state.user);

  useEffect(() => {
    setBusinessname(route?.params?.businessName);
    setFullname(route?.params?.fullname);
    setProfile(route?.params?.profile);
    setIndustry(route?.params?.industry);
    setProffession(route?.params?.profession);
    setPhone(route?.params?.phoneNumber);
    setAddress(route?.params?.address);
    setIsChecked(route?.params?.physicalStore);
  }, []);

  const handleUpdateProfile = () => {
    if (address && phone) {
      dispatch(
        updateProfile({
          formData: {
            businessName: businessname,
            fullname,
            profession: proffession,
            industry,
            address,
            phoneNumber: phone,
            physicalStore: isChecked,
          },
          Toast,
          navigation,
        })
      );
      
      setTimeout(async () => {
        const getId = await getItem("trowmartuserId");
        if (getId) {
          dispatch(getUserProfile(getId))
        }
      }, 1000);
    } else {
      Toast.show({
        type: "error",
        text1: "Kindly fill the neccessary details",
      });
    }
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
        const formData = new FormData();
        formData.append("file", {
          uri: result.assets[0].uri, // Local file path on the device
          type: "image/jpeg", // Adjust the type as needed
          name: "file.jpg",
        });
        
        // dispatch(completeReg({ formData, navigation, Toast }));
        setImage(result.assets[0].uri);
        dispatch(
          updateProfilePic({
            formData,
            Toast
          })
        );
        
        setTimeout(async () => {
          const getId = await getItem("trowmartuserId");
          if (getId) {
            dispatch(getUserProfile(getId))
          }
        }, 1000);

      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Edit Profile"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: SIZES.base2,
              marginTop: SIZES.base,
              marginBottom: SIZES.base3,
            }}
          >
            <View
              style={{
                width: SIZES.base8,
                height: SIZES.base8,
                backgroundColor: COLORS.gray4,
                borderRadius: SIZES.base8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
             
              <Image
                source={
                  image
                    ? { uri: image }
                    : profile ? { uri: `${URLBASE.imageBaseUrl}${profile}` }: ProfilePic
                }
                style={{
                  height: SIZES.base8,
                  width: SIZES.base8,
                  borderRadius: SIZES.base8,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
               <TouchableOpacity onPress={uploadImage}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary,
                  paddingVertical: SIZES.base,
                }}
              >
                Upload Image
              </Text>
              </TouchableOpacity>
              <Text style={{ ...FONTS.body4, color: COLORS.tertiary }}>
                Shouldn't be more than 2mb in Size
              </Text>
            </View>
          </View>
          {/* form here */}
          {route?.params?.userType === "business" ? (
            <View style={{ marginTop: SIZES.base }}>
              <Text style={styles.inputheading}>Business Name</Text>
              <TextInput
                value={businessname}
                onChangeText={(text) => setBusinessname(text)}
                style={{
                  ...FONTS.body3,
                  borderWidth: SIZES.thickness / 3,
                  borderColor: COLORS.tertiary,
                  color: COLORS.tertiary,
                  marginVertical: SIZES.thickness,
                  // width: SIZES.wp(90),
                  padding: SIZES.base2,
                  borderRadius: SIZES.radius / 2,
                }}
                placeholder="Bk's Pasteries"
              />
            </View>
          ) : (
            <View style={{ marginTop: SIZES.base }}>
              <Text style={styles.inputheading}>Full Name</Text>
              <TextInput
                value={fullname}
                onChangeText={(text) => setFullname(text)}
                style={{
                  ...FONTS.body3,
                  borderWidth: SIZES.thickness / 3,
                  borderColor: COLORS.tertiary,
                  color: COLORS.tertiary,
                  marginVertical: SIZES.thickness,
                  // width: SIZES.wp(90),
                  padding: SIZES.base2,
                  borderRadius: SIZES.radius / 2,
                }}
                placeholder="Bk's Pasteries"
              />
            </View>
          )}
          {route?.params?.userType === "business" ? (
            <View style={{ marginTop: SIZES.base }}>
              <Text style={styles.inputheading}>Industry</Text>

              <TextInput
                value={industry}
                onChangeText={(text) => setIndustry(text)}
                style={{
                  ...FONTS.body3,
                  borderWidth: SIZES.thickness / 3,
                  borderColor: COLORS.tertiary,
                  color: COLORS.tertiary,
                  marginVertical: SIZES.thickness,
                  // width: SIZES.wp(90),
                  padding: SIZES.base2,
                  borderRadius: SIZES.radius / 2,
                }}
                placeholder="Catering"
              />
            </View>
          ) : (
            <View style={{ marginTop: SIZES.base }}>
              <Text style={styles.inputheading}>Profession</Text>

              <TextInput
                value={proffession}
                onChangeText={(text) => setProffession(text)}
                style={{
                  ...FONTS.body3,
                  borderWidth: SIZES.thickness / 3,
                  borderColor: COLORS.tertiary,
                  color: COLORS.tertiary,
                  marginVertical: SIZES.thickness,
                  // width: SIZES.wp(90),
                  padding: SIZES.base2,
                  borderRadius: SIZES.radius / 2,
                }}
                placeholder="Catering"
              />
            </View>
          )}
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Address</Text>

            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={{
                ...FONTS.body3,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.tertiary,
                color: COLORS.tertiary,
                backgroundColor: COLORS.gray4,
                marginVertical: SIZES.thickness,
                // width: SIZES.wp(90),
                padding: SIZES.base2,
                borderRadius: SIZES.radius / 2,
              }}
              placeholder="Oloje Ilorin"
              editable={false}
            />
          </View>
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Phone Number</Text>

            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              style={{
                ...FONTS.body3,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.tertiary,
                color: COLORS.tertiary,
                marginVertical: SIZES.thickness,
                // width: SIZES.wp(90),
                padding: SIZES.base2,
                borderRadius: SIZES.radius / 2,
              }}
              placeholder="08022407013"
              keyboardType="numeric"
            />
          </View>
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
          {loadingUpdate && (
            <ActivityIndicator size="small" color={COLORS.tertiary} />
          )}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              gap: SIZES.base,
              marginTop: SIZES.base3,
            }}
          >
            <CustomButton
              text={"Save"}
              onPress={handleUpdateProfile}
              fill={true}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  userSection: {
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.base,
    marginBottom: SIZES.base2,
  },
});
