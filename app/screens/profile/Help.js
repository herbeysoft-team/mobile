import {  StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export default function Help({ navigation }) {

  const onWhatsAppClick=()=>{
  const phoneNumber = "+2348022407013";
  const message = "Surfing%20on%20Trowmart%20App.%20I%20need%20your%20help!";
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
  const platformURL = Platform.select({
    ios: url,
    android: url,
  });
  Linking.openURL(platformURL)
  .catch(err => console.error("Error opening WhatsApp URL", err));
  }
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Help & Support"} />

      <Text
        style={{
          ...FONTS.body3,
          color: COLORS.accent2,
          paddingBottom: SIZES.base2,
        }}
      >
        Got a question or problem? Feel free to ask our capable representatives
        on WhatsApp
      </Text>

      <TouchableOpacity style={styles.outerRectangle} onPress={()=>onWhatsAppClick()}>
        <View style={styles.innerRectangle}>
        <View
        style={{
          alignItems: "center",
          gap: SIZES.base,
          flexDirection:"row"
        }}
      >
        <MaterialCommunityIcons name="face-man-profile" size={SIZES.base6} color={COLORS.whatsApp} />
        <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
          {`Abiodun Adam`}
        </Text>
        </View>
        <Fontisto name="whatsapp" size={SIZES.base3} color={COLORS.whatsApp} />
          
        </View>

        
      </TouchableOpacity>

      <TouchableOpacity style={styles.outerRectangle} onPress={()=>onWhatsAppClick()}>
        <View style={styles.innerRectangle}>
        <View
        style={{
          alignItems: "center",
          gap: SIZES.base,
          flexDirection:"row"
        }}
      >
        <MaterialCommunityIcons name="face-woman-profile" size={SIZES.base6} color={COLORS.whatsApp} />
        <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
          {`Faith Ideowor`}
        </Text>
        </View>
        <Fontisto name="whatsapp" size={SIZES.base3} color={COLORS.whatsApp} />
          
        </View>

      </TouchableOpacity>
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
  outerRectangle: {
    height: SIZES.base10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SIZES.thickness,
    borderWidth: SIZES.thin,
    borderColor: COLORS.gray3,
    borderRadius: SIZES.base2,
    backgroundColor: COLORS.whatsApp,
    marginVertical: SIZES.base,
    position: "relative",
  },
  innerRectangle: {
    height: SIZES.base10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SIZES.thickness,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray2,
    position: "absolute",
    left: SIZES.base,
    padding: SIZES.base2,
  },
  item: {
    color: COLORS.black,
    fontSize: SIZES.base3,
  },
});
