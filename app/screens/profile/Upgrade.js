import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Logo from "../../../assets/logo.png";
import CustomButton from "../../components/auth/CustomButton";

export default function Upgrade({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEader */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: SIZES.base,
          gap: SIZES.base2,
        }}
      >
        <View style={{ alignItems: "flex-start" }}>
          <Text
            style={{
              ...FONTS.header,
              color: COLORS.secondary,
              alignItems: "flex-start",
            }}
          >
            Upgrade to add{" "}
          </Text>
          <Text
            style={{
              ...FONTS.header,
              color: COLORS.secondary,
              alignItems: "flex-start",
            }}
          >
            listing{" "}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            borderRadius: SIZES.base3,
            backgroundColor: COLORS.gray4,
            width: SIZES.base3,
            height: SIZES.base3,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={SIZES.base2} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZES.base10 }}
      >
         <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: SIZES.thickness,
              borderWidth: SIZES.thin,
              borderColor: COLORS.gray3,
              borderRadius: SIZES.base,
              paddingHorizontal: SIZES.base2,
              paddingVertical: SIZES.base3,
              backgroundColor: COLORS.secondary,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: SIZES.base2,
              }}
            >
              <Image
                source={Logo}
                style={{
                  height: SIZES.base4,
                  width: SIZES.base4,
                  borderRadius: SIZES.base4,
                }}
              />
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                Premium
              </Text>
            </View>
            {/* <View style={{ borderColor: COLORS.white, borderWidth: SIZES.thin, borderRadius: SIZES.base2, paddingHorizontal: SIZES.base, paddingVertical: SIZES.thin}}>
           <Text style={{color: COLORS.gray3, ...FONTS.body4, }}>Current</Text>
         </View> */}
          </View>


          <View>
            <View
              style={{
                marginTop: SIZES.base3,
                borderWidth: SIZES.thin,
                borderColor: COLORS.gray3,
                borderRadius: SIZES.base,
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base,
              }}
            >
              <Text style={styles.heading}>Explore and Buy</Text>
              {/* First pair */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.base,
                }}
              >
                <Entypo
                  name="check"
                  size={SIZES.base2}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.accent2,
                  }}
                >
                  Current Neighbourhood
                </Text>
              </View>

              {/* Second pair */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.base,
                }}
              >
                <Entypo
                  name="check"
                  size={SIZES.base2}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.accent2,
                  }}
                >
                  Other Neighbourhood
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: SIZES.base3,
                borderWidth: SIZES.thin,
                borderColor: COLORS.gray3,
                borderRadius: SIZES.base,
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base,
              }}
            >
              <Text style={styles.heading}>Listings</Text>
              {/* First pair */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.base,
                }}
              >
                <Entypo
                  name="check"
                  size={SIZES.base2}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.accent2,
                  }}
                >
                  Product
                </Text>
              </View>

              {/* First pair */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.base,
                }}
              >
                <Entypo
                  name="check"
                  size={SIZES.base2}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.accent2,
                  }}
                >
                  Services
                </Text>
              </View>

              {/* First pair */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.base,
                }}
              >
                <Entypo
                  name="check"
                  size={SIZES.base2}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.accent2,
                  }}
                >
                  Events
                </Text>
              </View>
              {/* Second pair */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.base,
                }}
              >
                <Entypo
                  name="check"
                  size={SIZES.base2}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.accent2,
                  }}
                >
                  Delivery Requests
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: SIZES.base3,
                borderWidth: SIZES.thin,
                borderColor: COLORS.gray3,
                borderRadius: SIZES.base,
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base,
              }}
            >
              <Text style={styles.heading}>Insights</Text>
              {/* First pair */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.base,
                }}
              >
                <Entypo
                  name="check"
                  size={SIZES.base2}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.accent2,
                  }}
                >
                  Profile Trends
                </Text>
              </View>

              {/* First pair */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.base,
                }}
              >
                <Entypo
                  name="check"
                  size={SIZES.base2}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.accent2,
                  }}
                >
                  Product Engagement
                </Text>
              </View>

              {/* First pair */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.base,
                }}
              >
                <Entypo
                  name="check"
                  size={SIZES.base2}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.accent2,
                  }}
                >
                  Business Performance
                </Text>
              </View>
             
            </View>
            <View style={{marginTop: SIZES.base3}}>
            <CustomButton onPress={()=> navigation.navigate("Upgrade")} text={"Upgrade for ₦3000/month"} fill={true}/>
            </View>
            
          </View>


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
  heading: {
    ...FONTS.h4,
    color: COLORS.accent2,
  },
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base2,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
});
