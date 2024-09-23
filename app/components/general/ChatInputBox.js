import { View, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import React, { useState } from "react";
import CustomTextInput from "../auth/CustomTextInput";

const ChatInputBox = ({ handleSend, setMessage, message }) => {


  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SIZES.base2,
        paddingVertical: SIZES.base,
        borderTopWidth: SIZES.thin,
        borderTopColor: COLORS.gray4,
        gap: SIZES.base2,
      }}
    >
      <CustomTextInput
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={styles.input}
        placeholder="Type a message..."
      />
      
      <Pressable
        onPress={() => {handleSend(message), setMessage("")}} // Assuming handleSend requires a message parameter
        style={styles.btn}
      >
        <Feather name="send" size={SIZES.base3} color={COLORS.white} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray4,
    borderRadius: SIZES.thickness,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base2,
    ...FONTS.body3,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.thickness,
    height: SIZES.base6,
    width: SIZES.base6,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatInputBox;
