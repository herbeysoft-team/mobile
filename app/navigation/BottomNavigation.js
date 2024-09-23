import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { FONTS, SIZES, COLORS } from "../constant";
import Home from "../screens/main/Home";
import Explore from "../screens/main/Explore";
import AddListing from "../screens/main/AddListing";
import Alerts from "../screens/main/Alerts";
import Profile from "../screens/main/Profile";
import ProfileNavigation from "./ProfileNavigation";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          height: SIZES.tabHeight,
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.gray4,
          borderTopWidth: SIZES.thin,
          elevation: Platform.OS === "android" ? 0 : undefined,
          shadowOpacity: Platform.OS === "ios" ? 0 : undefined,
          zIndex:100,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: SIZES.base,
              }}
            >
              <Feather
                name="home"
                size={24}
                style={{ color: focused ? COLORS.primary : COLORS.accent2 }}
              />
              <Text
                style={{
                  ...FONTS.body4,
                  color: focused ? COLORS.primary : COLORS.accent2,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: SIZES.base,
              }}
            >
              <Feather
                name="search"
                size={24}
                style={{ color: focused ? COLORS.primary : COLORS.accent2 }}
              />
              <Text
                style={{
                  ...FONTS.body4,
                  color: focused ? COLORS.primary : COLORS.accent2,
                }}
              >
                Explore
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddListing"
        component={AddListing}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.primary,
                    width: SIZES.button,
                    height: SIZES.button,
                    top: -SIZES.radius / 2,
                    borderRadius: SIZES.radius,
                  }}
                >
                  <Feather
                    name="plus"
                    size={24}
                    style={{ color: COLORS.white }}
                  />
                </View>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: focused ? COLORS.primary : COLORS.accent2,
                  }}
                >
                  Add Listing
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={Alerts}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: SIZES.base,
              }}
            >
              <Feather
                name="bell"
                size={24}
                style={{ color: focused ? COLORS.primary : COLORS.accent2 }}
              />
              <Text
                style={{
                  ...FONTS.body4,
                  color: focused ? COLORS.primary : COLORS.accent2,
                }}
              >
                Alerts
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile-Main"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: SIZES.base,
              }}
            >
              <Octicons
                name="person"
                size={24}
                style={{ color: focused ? COLORS.primary : COLORS.accent2 }}
              />
              <Text
                style={{
                  ...FONTS.body4,
                  color: focused ? COLORS.primary : COLORS.accent2,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
