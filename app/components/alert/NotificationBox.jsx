import { View, Text, Pressable } from "react-native";
import React from "react";
import {FONTS, COLORS, SIZES } from "../../constant";
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

const NotificationBox = ({id, title, subtitle, time, handleSettingChange}) => {
  const formattedTime = moment(time).fromNow();

  const handleOpenBottomSheet = () => {
    if (handleSettingChange) {
      handleSettingChange({ id, title, subtitle, time });
      // console.log(listing._id)
    } else {
      console.error("handleSettingChange is not defined");
    }
  };
  return (
    <Pressable
    onPress={handleOpenBottomSheet}
      style={{
        paddingHorizontal: SIZES.base2,
        paddingVertical: SIZES.base2,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.gray2,
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
        gap: SIZES.base,
        marginBottom:SIZES.base
      }}
    >
      <Feather name="box" size={SIZES.base2} color={COLORS.pink} />
      <View style={{flexDirection:"column", flex:3}}>
        <Text style={{...FONTS.h4, color: COLORS.tertiary}}>{title}</Text>
        <Text  style={{...FONTS.body4, color: COLORS.gray3}}>{subtitle.length > 40 ? `${subtitle.substring(0,40)}...` : subtitle}</Text>
      </View>
      <Text style={{...FONTS.body4, color: COLORS.gray3}}>
        {formattedTime}
      </Text>
    </Pressable>
  );
};

export default NotificationBox;
