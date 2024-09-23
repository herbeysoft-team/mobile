import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import placeholder from "../../../assets/placeholder.png";
import moment from "moment";

const MessageBox = ({
  profilePic,
  user,
  message,
  time,
  number,
  userId,
  navigation,
}) => {
  return (
    <Pressable onPress={() => navigation.navigate("Chat-Screen", userId)}>
      <View
        style={{
          paddingHorizontal: SIZES.base2,
          paddingVertical: SIZES.base2,
          borderRadius: SIZES.base,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: SIZES.base,
          marginBottom: SIZES.base,
          borderBottomColor: COLORS.gray4,
          borderBottomWidth: SIZES.thin,
        }}
      >
        <Image
          source={
            profilePic
              ? { uri: `${URLBASE.imageBaseUrl}${profilePic}` }
              : placeholder
          }
          style={{
            height: SIZES.base6,
            width: SIZES.base6,
            borderRadius: SIZES.base6,
          }}
        />
        <View style={{ flexDirection: "column", flex: 3, gap: SIZES.base }}>
          <Text
            numberOfLines={1}
            style={{ ...FONTS.h4, color: COLORS.accent2 }}
          >
            {user}
            {"\t"}
            <Text style={{ ...FONTS.body4, color: COLORS.tertiary }}>
              {moment(time).fromNow()}
            </Text>
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...FONTS.body4, color: COLORS.gray3 }}
          >
            {message}
          </Text>
        </View>
        {parseInt(number) != 0 && (
          <View
            style={{
              width: SIZES.base2,
              height: SIZES.base2,
              borderRadius: SIZES.base,
              backgroundColor: COLORS.red,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{number}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default MessageBox;
