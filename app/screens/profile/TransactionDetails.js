import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from '../../components/general/HeaderMedium';
import moment from "moment";

export default function TransactionDetails({navigation}) {
  const route = useRoute();
  console.log(route.params);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Transaction Details"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: SIZES.base3 }}
      >
      
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: SIZES.base,
          borderWidth: SIZES.thin,
          borderColor: COLORS.gray2,
          borderRadius: SIZES.base,
          paddingHorizontal: SIZES.base2,
          paddingVertical: SIZES.base4,
          backgroundColor: COLORS.gray4,
        }}
      >
        <View style={{paddingVertical: SIZES.base2, flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderBottomWidth: SIZES.thin, borderColor: COLORS.white}}>
          <Text style={{ ...FONTS.body4, color: COLORS.black, flex:1 }}>
              Reference No:
            </Text>
            <Text
              style={{ ...FONTS.body4, color: COLORS.black }}
            >{route.params.reference}</Text>
        </View >
        <View style={{paddingVertical: SIZES.base2, flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderBottomWidth: SIZES.thin, borderColor: COLORS.white}}>
          <Text style={{ ...FONTS.body4, color: COLORS.black, flex:1 }}>
              Transaction Type:
            </Text>
            <Text
              style={{ ...FONTS.body4, color: COLORS.black }}
            >{route.params.type}</Text>
        </View >
        <View style={{paddingVertical: SIZES.base2, flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderBottomWidth: SIZES.thin, borderColor: COLORS.white}}>
          <Text style={{ ...FONTS.body4, color: COLORS.black, flex:1 }}>
              Recipient:
            </Text>
            <Text
              style={{ ...FONTS.body4, color: COLORS.black }}
            >{route.params.type =="Top Up" ? "Wallet" : route.params.to}</Text>
        </View >

        <View style={{paddingVertical: SIZES.base2, flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderBottomWidth: SIZES.thin, borderColor: COLORS.white}}>
          <Text style={{ ...FONTS.body4, color: COLORS.black, flex:1 }}>
              Amount:
            </Text>
            <Text
              style={{ ...FONTS.body4, color: COLORS.black }}
            >{`₦${route.params.amount}`}</Text>
        </View >
        <View style={{paddingVertical: SIZES.base2, flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderBottomWidth: SIZES.thin, borderColor: COLORS.white}}>
          <Text style={{ ...FONTS.body4, color: COLORS.black, flex:1 }}>
              Status:
            </Text>
            <Text
              style={{ ...FONTS.body4, color: COLORS.success }}
            >{route.params.status}</Text>
        </View >
        <View style={{paddingVertical: SIZES.base2, flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderBottomWidth: SIZES.thin, borderColor: COLORS.white}}>
          <Text style={{ ...FONTS.body4, color: COLORS.black, flex:1 }}>
              Timestamp:
            </Text>
            <Text
              style={{ ...FONTS.body4, color: COLORS.black }}
            >{moment(route.params.date).format('MMM Do YYYY, h:mmA')
            }</Text>
        </View >
          
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
});
