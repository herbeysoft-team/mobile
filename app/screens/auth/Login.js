import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import CustomButton from "../../components/auth/CustomButton";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../context/features/authSlice";
import { setItem, getItem, removeItem } from "../../utils/asyncStorage.js";
import CustomTextInput from "../../components/auth/CustomTextInput.jsx";
import CustomTextInputPassword from "../../components/auth/CustomTextInputPassword.jsx";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loginloading, loginerror } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await getItem("trowmarttoken");
        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    loginerror &&
      Toast.show({
        type: "error",
        text1: loginerror.message,
      });
  }, [loginerror]);

  const handleLogin = () => {
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
      dispatch(login({ user, navigation, Toast }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZES.base10 }}
      >
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.header}>{"Sign in to your\naccount"}</Text>
          {loginloading ? (
            <ActivityIndicator size="large" color={COLORS.tertiary} />
          ) : null}
          <View style={{ marginTop: SIZES.base3 }}>
            <Text style={styles.inputheading}>Email</Text>
            <CustomTextInput
              placeholder={"Enter your Email"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Password</Text>

            <CustomTextInputPassword
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={"***********"}
            />
          </View>

          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text></Text>
            <Pressable onPress={() => navigation.navigate("Forget-Password")}>
              <Text style={{ ...FONTS.body4, color: COLORS.tertiary }}>
                Forgot Password ?
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: SIZES.base6,
              height: SIZES.hp(10),
              alignItems: "center",
            }}
          />

          <CustomButton text={"Sign In"} onPress={handleLogin} fill={true} />

          <Pressable
            onPress={() => navigation.navigate("Register", { step: 1 })}
            style={{ marginTop: 15 }}
          >
            <Text
              style={{ ...FONTS.h4, color: COLORS.accent, textAlign: "center" }}
            >
              Don't have an account?{" "}
              <Text style={{ color: COLORS.primary }}>Sign Up</Text>
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base3,
    paddingHorizontal: SIZES.base3,
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
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
