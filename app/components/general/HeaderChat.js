import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useMemo } from "react";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getChatUser } from "../../context/features/messageSlice";
import placeholder from "../../../assets/placeholder.png";

export default function HeaderChat({ navigation, userId }) {
  const dispatch = useDispatch();
  const { chatuser } = useSelector((state) => state.message);
  useEffect(() => {
    if (userId) {
      dispatch(getChatUser(userId));
    }
  }, [userId]);

  const memoizeChatUser = useMemo(() => chatuser, [chatuser]);
  
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: SIZES.base3,
        marginTop: SIZES.base,
        paddingBottom: SIZES.base2,
        gap: SIZES.base2,
        borderBottomColor: COLORS.gray4,
        borderBottomWidth: SIZES.thin,

      }}
    >
      <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={SIZES.base2} color={COLORS.gray} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: SIZES.base,
        }}
      >
        <Image
          source={
            memoizeChatUser?.profile
              ? { uri: `${URLBASE.imageBaseUrl}${memoizeChatUser?.profile}` }
              : placeholder
          }
          style={{
            height: SIZES.base6,
            width: SIZES.base6,
            borderRadius: SIZES.base6,
          }}
        />

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.secondary,
            textAlign: "center",
          }}
        >
          {memoizeChatUser?.fullname || memoizeChatUser?.businessName}
        </Text>
      </View>
      {/* <View style={{ flex: 1 }}></View> */}
    </View>
  );
}
