import { StyleSheet, TextInput, View, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { Octicons } from "@expo/vector-icons";

export default function CustomTextInputPassword({ placeholder, secureTextEntry, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View 
      style={[
        styles.inputContainer,
        { borderColor: isFocused ? COLORS.primary : COLORS.gray4 },
      ]}
    >
      <TextInput
        value={text}
        onChangeText={(value) => setText(value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        secureTextEntry={!isPasswordVisible}
        style={styles.textInput}
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <Octicons
            name={isPasswordVisible ? "eye-closed" : "eye"}
            size={SIZES.base3}
            color={COLORS.tertiary}
          />
        </TouchableOpacity>
      )}
    </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: SIZES.thickness / 3,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.base2,
    marginVertical: SIZES.thickness,
  },
  textInput: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.tertiary,
    paddingVertical: SIZES.base2,
  },
  iconContainer: {
    marginLeft: SIZES.base2,
  },
});
