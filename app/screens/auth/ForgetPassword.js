import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import Toast from "react-native-toast-message";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/auth/CustomButton";
import {
  resetPasswordOTP,
  resetPassword,
} from "../../context/features/authSlice";
import CustomTextInput from "../../components/auth/CustomTextInput";

const ForgetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [forgetView, setForgetView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [code, setCode] = useState("");
  const { resetOTPloading, resetOTPstatus, resetOTPerror, resetpasswordloading, resetpassworderror, resetpasswordstatus } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    resetOTPerror &&
      Toast.show({
        type: "error",
        text1: resetOTPerror.message,
      });
  }, [resetOTPerror]);

  useEffect(() => {
    resetpassworderror &&
      Toast.show({
        type: "error",
        text1: resetpassworderror.message,
      });
  }, [resetpassworderror]);

  useEffect(() => {
    resetOTPstatus && setForgetView(true);
  }, [resetOTPstatus]);

  const handleForgetPassword = () => {
    const user = {
      email: email,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Email Required...!",
      });
    } else if (email.includes(" ")) {
      Toast.show({
        type: "error",
        text1: "Invalid Email...!",
      });
    } else if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email Format...!",
      });
    } else {
      // Proceed with authentication or further actions
      dispatch(resetPasswordOTP({ user, Toast }));
    }
  };

  const handleResetPassword = () => {
    // navigation.navigate("Login");
    const user = {
      email: email,
      newPassword: password,
      code: code,
    };

    const verifyCodeRegex = /^\d{7}$/;
    const passwordRegex = /^[A-Za-z0-9]{6,}$/;

    if (!verifyCodeRegex.test(code)) {
      Toast.show({
        type: "error",
        text1: "Invalid Verification Code",
        text2: "It should be a seven-digit numeric code.",
      });
    } else if (!password) {
      Toast.show({
        type: "error",
        text1: "Password Required...!",
      });
    } else if (password.includes(" ")) {
      Toast.show({
        type: "error",
        text1: "Invalid Password...!",
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
    } else if (password !== cpassword) {
      Toast.show({
        type: "error",
        text1: "Password should be the same with Confirm Passowrd",
      });
    } else {
      // Proceed with authentication or further actions
      dispatch(resetPassword({ user, navigation, Toast }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZES.base10 }}
      >
      {!forgetView && (
        <KeyboardAvoidingView>
          <Text style={styles.header}>{"Forget\nPassword?"}</Text>
          <Text style={styles.subheading}>
            {
              "Enter the email address you used when you joined and we’ll send you instructions to reset your password."
            }
          </Text>
          {resetOTPloading ? (
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

          <View
            style={{
              marginTop: SIZES.base6,
              height: SIZES.hp(10),
              alignItems: "center",
            }}
          />

          <CustomButton
            text={"Send Reset Instruction"}
            onPress={handleForgetPassword}
            fill={true}
          />
        </KeyboardAvoidingView>
      )}

      {forgetView && (
        <KeyboardAvoidingView>
          <Text style={styles.header}>{"Reset\nPassword?"}</Text>
          <Text style={styles.subheading}>
            {"Enter the code sent to your email and your new password"}
          </Text>
          {resetpasswordloading ? (
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
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>New Password</Text>

            <CustomTextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder={"***********"}
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Confirm Password</Text>

            <CustomTextInput
              value={cpassword}
              onChangeText={(text) => setCPassword(text)}
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

          <CustomButton
            text={"Reset Password"}
            onPress={handleResetPassword}
            fill={true}
          />
        </KeyboardAvoidingView>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base3,
    paddingHorizontal: SIZES.base3,
    backgroundColor: COLORS.white,
  },
  subheading: {
    color: COLORS.tertiary,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
  header: {
    ...FONTS.header,
    color: COLORS.secondary,
  },
  inputheading: {
    color: COLORS.gray3,
    ...FONTS.body4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
});
