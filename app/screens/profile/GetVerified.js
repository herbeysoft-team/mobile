import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import CustomButton from "../../components/auth/CustomButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
// import * as FaceDetector from 'expo-face-detector';
import * as ImagePicker from "expo-image-picker";
import { submitVerification } from "../../context/features/userSlice";
import CustomTextInputWithPicker from "../../components/auth/CustomTextInputWithPicker";

export default function GetVerified({ navigation }) {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const { userProfile } = useSelector((state) => state.user);
  const steps = [1, 2, 3];
  const stepsb = [1, 2, 3];
  const [currentStep, setCurrentStep] = useState(0);
  const [idFront, setIDFront] = useState("");
  const [idBack, setIDBack] = useState("");
  const [facial, setFacial] = useState("");
  const [cac, setCac] = useState("");
  const [idType, setIDType] = useState("");

  const { loadingSubmitV } = useSelector((state) => state.user);

  // Check camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const verification = [
    { label: "National ID", value: "National ID" },
    { label: "Voters Card", value: "Voters Card" },
    { label: "International Passport", value: "International Passport" },
  ];

  const handleDropdownChange = (value) => {
    setIDType(value);
  };

  const handleContinue = () => {
    if (!idFront) {
      Toast.show({
        type: "error",
        text1: "Upload the Front Page",
      });
    } else if (!idBack) {
      Toast.show({
        type: "error",
        text1: "Upload the Back Page",
      });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleContinueFacial = () => {
    if (cameraRef.current) {
      cameraRef.current
        .takePictureAsync()
        .then((data) => {
          // Handle the captured image data
          console.log("Captured image:", data);
          setFacial(data?.uri);
          setCurrentStep(currentStep + 1); // Move to the next step after capturing the image
        })
        .catch((error) => {
          console.error("Error taking picture:", error);
        });
    } else {
      console.error("Camera is not ready or mounted.");
    }
  };

  const handleSubmit = () => {
    if (userProfile?.userType === "business") {
      const images = [idFront, idBack, facial, cac];
      // Create a new FormData object
      const formData = new FormData();

      // Iterate over the images array and append each image to the FormData object
      images.forEach((image, index) => {
        formData.append(`files`, {
          uri: image,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });
      formData.append("idType", idType);
      dispatch(submitVerification({ formData, Toast, navigation }));
    } else {
      const images = [idFront, idBack, facial];
      // Create a new FormData object
      const formData = new FormData();

      // Iterate over the images array and append each image to the FormData object
      images.forEach((image, index) => {
        formData.append(`files`, {
          uri: image,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });
      formData.append("idType", idType);
      dispatch(submitVerification({ formData, Toast, navigation }));
    }
    // navigation.navigate("Profile");
  };
  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const uploadImage = async (file) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        const imageSize = result.assets[0].fileSize;
        if (imageSize > maxSize) {
          Toast.show({
            type: "info",
            text1: "Selected image is too large.",
            text2: "Please select an image smaller than 5MB",
          });

          return; // Stop further processing
        }
        if (file === "front") {
          console.log("front");
          setIDFront(result.assets[0].uri);
        }

        if (file === "back") {
          console.log("back");
          setIDBack(result.assets[0].uri);
        }

        if (file === "cac") {
          console.log("cac");
          setCac(result.assets[0].uri);
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.error,
      });
    }
  };

  // Handle face detection
  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      // Face detected, trigger an action
      console.log("Face detected:", faces);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Get Verified"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZES.base3 }}
      >
        {userProfile?.userType === "individual" ? (
          <>
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
              <KeyboardAvoidingView>
                <Text style={styles.subheading}>Government Issued ID</Text>
                <View style={{ marginTop: SIZES.base3 }}>
                  <Text style={styles.inputheading}>Category</Text>
                  <CustomTextInputWithPicker
                    placeholder="Select ID"
                    items={verification}
                    onValueChange={handleDropdownChange}
                  />
                </View>
                <TouchableOpacity onPress={() => uploadImage("front")}>
                  <View
                    style={{
                      marginTop: SIZES.base3,
                      paddingVertical: SIZES.base3,
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      borderWidth: SIZES.thickness / 3,
                      borderColor: COLORS.tertiary,
                      color: COLORS.tertiary,
                      // width: SIZES.wp(90),
                      padding: SIZES.base2,
                      borderRadius: SIZES.radius / 2,
                    }}
                  >
                    {idFront ? (
                      <Image
                        resizeMode="cover"
                        source={idFront ? { uri: idFront } : null}
                        style={{
                          height: SIZES.base8,
                          width: "100%",

                          // borderRadius: SIZES.base8,
                        }}
                      />
                    ) : (
                      <SimpleLineIcons
                        name="picture"
                        size={SIZES.base4}
                        color={COLORS.tertiary}
                      />
                    )}
                    <Text style={styles.inputheading}>Upload Front Page</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => uploadImage("back")}>
                  <View
                    style={{
                      marginTop: SIZES.base3,
                      paddingVertical: SIZES.base3,
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      borderWidth: SIZES.thickness / 3,
                      borderColor: COLORS.tertiary,
                      color: COLORS.tertiary,
                      // width: SIZES.wp(90),
                      padding: SIZES.base2,
                      borderRadius: SIZES.radius / 2,
                    }}
                  >
                    {idBack ? (
                      <Image
                        resizeMode="cover"
                        source={idFront ? { uri: idBack } : null}
                        style={{
                          height: SIZES.base8,
                          width: "100%",

                          // borderRadius: SIZES.base8,
                        }}
                      />
                    ) : (
                      <SimpleLineIcons
                        name="picture"
                        size={SIZES.base4}
                        color={COLORS.tertiary}
                      />
                    )}
                    <Text style={styles.inputheading}>Upload Back Page</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: SIZES.base6,
                    height: SIZES.hp(2),
                    alignItems: "center",
                  }}
                />

                <CustomButton
                  text={"Continue"}
                  onPress={handleContinue}
                  fill={true}
                />
              </KeyboardAvoidingView>
            )}

            {currentStep == 1 && (
              <View>
                <Text style={styles.subheading}>Facial Recognition</Text>
                <View
                  style={{
                    marginTop: SIZES.base3,
                    borderWidth: SIZES.base,
                    height: SIZES.hp(45),
                    borderColor: COLORS.gray4,
                    borderRadius: SIZES.base10 * 10,
                    marginHorizontal: SIZES.base4,
                    overflow: "hidden",
                  }}
                >
                  {hasPermission ? (
                    <Camera
                      style={{ flex: 1 }}
                      type={Camera.Constants.Type.front}
                      ref={cameraRef}
                      //  onFacesDetected={handleFacesDetected} // Handle face detection
                      // faceDetectorSettings={{
                      //   mode: FaceDetector.FaceDetectorMode.fast,
                      //   detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                      //   runClassifications: FaceDetector.FaceDetectorClassifications.none,
                      //   minDetectionInterval: 100,
                      //   tracking: true,
                      // }}
                    />
                  ) : (
                    <Text>No access to camera</Text>
                  )}
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    ...FONTS.body3,
                    marginVertical: SIZES.base2,
                    color: COLORS.gray3,
                  }}
                >
                  {"Make sure to fit your face\ninto the oval"}
                </Text>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: SIZES.base,
                    marginTop: SIZES.base3,
                  }}
                >
                  <CustomButton
                    text={"Take Shot!"}
                    onPress={handleContinueFacial}
                    fill={true}
                  />
                  <CustomButton text={"Back"} onPress={goBack} fill={false} />
                </View>
              </View>
            )}

            {currentStep == 2 && (
              <View>
                <Text style={styles.subheading}>Submit Document</Text>
                <View
                  style={{
                    marginTop: SIZES.base3,
                    borderWidth: SIZES.base,
                    height: SIZES.hp(45),
                    borderColor: COLORS.gray4,
                    borderRadius: SIZES.base10 * 10,
                    marginHorizontal: SIZES.base4,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    resizeMode="cover"
                    source={facial ? { uri: facial } : null}
                    style={{
                      width: "100%",
                      height: SIZES.hp(45),

                      // borderRadius: SIZES.base8,
                    }}
                  />
                  {/* <Text style={styles.inputheading}>Upload Front Page</Text> */}
                </View>
                {loadingSubmitV && (
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
                    text={"Submit"}
                    onPress={handleSubmit}
                    fill={true}
                  />
                  <CustomButton text={"Back"} onPress={goBack} fill={false} />
                </View>
              </View>
            )}
          </>
        ) : (
          <>
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
              {stepsb.map((_, index) => (
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
              <KeyboardAvoidingView>
                <Text style={styles.subheading}>Government Issued ID</Text>
                <View style={{ marginTop: SIZES.base3 }}>
                  <Text style={styles.inputheading}>Category</Text>
                  <CustomTextInputWithPicker
                    value={idType}
                    placeholder="Select ID"
                    items={verification}
                    onValueChange={handleDropdownChange}
                  />
                </View>
                <TouchableOpacity onPress={() => uploadImage("front")}>
                  <View
                    style={{
                      marginTop: SIZES.base3,
                      paddingVertical: SIZES.base3,
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      borderWidth: SIZES.thickness / 3,
                      borderColor: COLORS.tertiary,
                      color: COLORS.tertiary,
                      // width: SIZES.wp(90),
                      padding: SIZES.base2,
                      borderRadius: SIZES.radius / 2,
                    }}
                  >
                    {idFront ? (
                      <Image
                        resizeMode="cover"
                        source={idFront ? { uri: idFront } : null}
                        style={{
                          height: SIZES.base8,
                          width: "100%",

                          // borderRadius: SIZES.base8,
                        }}
                      />
                    ) : (
                      <SimpleLineIcons
                        name="picture"
                        size={SIZES.base4}
                        color={COLORS.tertiary}
                      />
                    )}
                    <Text style={styles.inputheading}>Upload Front Page</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => uploadImage("back")}>
                  <View
                    style={{
                      marginTop: SIZES.base3,
                      paddingVertical: SIZES.base3,
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      borderWidth: SIZES.thickness / 3,
                      borderColor: COLORS.tertiary,
                      color: COLORS.tertiary,
                      // width: SIZES.wp(90),
                      padding: SIZES.base2,
                      borderRadius: SIZES.radius / 2,
                    }}
                  >
                    {idBack ? (
                      <Image
                        resizeMode="cover"
                        source={idFront ? { uri: idBack } : null}
                        style={{
                          height: SIZES.base8,
                          width: "100%",

                          // borderRadius: SIZES.base8,
                        }}
                      />
                    ) : (
                      <SimpleLineIcons
                        name="picture"
                        size={SIZES.base4}
                        color={COLORS.tertiary}
                      />
                    )}
                    <Text style={styles.inputheading}>Upload Back Page</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: SIZES.base,
                    height: SIZES.hp(5),
                    alignItems: "center",
                  }}
                />

                <CustomButton
                  text={"Continue"}
                  onPress={handleContinue}
                  fill={true}
                />
              </KeyboardAvoidingView>
            )}

            {currentStep == 1 && (
              <View>
                <Text style={styles.subheading}>Facial Recognition</Text>
                <View
                  style={{
                    marginTop: SIZES.base3,
                    borderWidth: SIZES.base,
                    height: SIZES.hp(45),
                    borderColor: COLORS.gray4,
                    borderRadius: SIZES.base10 * 10,
                    marginHorizontal: SIZES.base4,
                    overflow: "hidden",
                  }}
                >
                  {hasPermission ? (
                    <Camera
                      style={{ flex: 1 }}
                      type={Camera.Constants.Type.front}
                      ref={cameraRef}
                      //  onFacesDetected={handleFacesDetected} // Handle face detection
                      // faceDetectorSettings={{
                      //   mode: FaceDetector.FaceDetectorMode.fast,
                      //   detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                      //   runClassifications: FaceDetector.FaceDetectorClassifications.none,
                      //   minDetectionInterval: 100,
                      //   tracking: true,
                      // }}
                    />
                  ) : (
                    <Text>No access to camera</Text>
                  )}
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    ...FONTS.body3,
                    marginVertical: SIZES.base2,
                    color: COLORS.gray3,
                  }}
                >
                  {"Make sure to fit your face\ninto the oval"}
                </Text>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: SIZES.base,
                    marginTop: SIZES.base3,
                  }}
                >
                  <CustomButton
                    text={"Continue"}
                    onPress={handleContinueFacial}
                    fill={true}
                  />
                  <CustomButton text={"Back"} onPress={goBack} fill={false} />
                </View>
              </View>
            )}

            {currentStep == 2 && (
              <View>
                <Text style={styles.subheading}>CAC Document</Text>
                <TouchableOpacity onPress={() => uploadImage("cac")}>
                  <View
                    style={{
                      marginTop: SIZES.base3,
                      paddingVertical: SIZES.base3,
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      borderWidth: SIZES.thickness / 3,
                      borderColor: COLORS.tertiary,
                      color: COLORS.tertiary,
                      // width: SIZES.wp(90),
                      padding: SIZES.base2,
                      borderRadius: SIZES.radius / 2,
                    }}
                  >
                    {cac ? (
                      <Image
                        resizeMode="cover"
                        source={cac ? { uri: cac } : null}
                        style={{
                          height: SIZES.base8,
                          width: "100%",

                          // borderRadius: SIZES.base8,
                        }}
                      />
                    ) : (
                      <SimpleLineIcons
                        name="picture"
                        size={SIZES.base4}
                        color={COLORS.tertiary}
                      />
                    )}
                    <Text style={styles.inputheading}>Upload CAC </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: SIZES.base,
                    marginTop: SIZES.base3,
                  }}
                >
                  {loadingSubmitV && (
                    <ActivityIndicator size="small" color={COLORS.tertiary} />
                  )}
                  <CustomButton
                    text={"Submit"}
                    onPress={handleSubmit}
                    fill={true}
                  />
                  <CustomButton text={"Back"} onPress={goBack} fill={false} />
                </View>
              </View>
            )}
          </>
        )}
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
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base2,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
  subheading: {
    color: COLORS.tertiary,
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  inputheading: {
    color: COLORS.tertiary,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
});
