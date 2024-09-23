import {
  StyleSheet,
  Platform,
  View,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import Logo from "../../../assets/logo.png";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

distanceOptions = {
  "10 Minutes Away": 10,
  "20 Minutes Away": 20,
  "30 Minutes Away": 30,
};
export default function SearchBar({ setOpenMapTimeModal, navigation }) {
  const selectedDistance = useSelector((state) => state.map.selectedDistance);

  return (
    <View style={styles.search}>
      <View>
        <Image
          source={Logo}
          style={{
            height: SIZES.base4,
            width: SIZES.base4,
            borderRadius: SIZES.base4,
          }}
        />
      </View>
      <Pressable
        onPress={() => {
          setOpenMapTimeModal((prev) => !prev);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: SIZES.thickness,
            flex: 3,
          }}
        >
          <Text style={{ ...FONTS.body3, color: COLORS.gray3 }}>
            {selectedDistance == 10
              ? "10 Minutes Away"
              : selectedDistance == 20
              ? "20 Minutes Away"
              : "30 Minutes Away"}
          </Text>

          <EvilIcons
            name="chevron-up"
            size={SIZES.base2}
            color={COLORS.gray3}
          />
        </View>
      </Pressable>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <View
          style={{
            width: SIZES.base4,
            height: SIZES.base4,
            backgroundColor: COLORS.gray4,
            borderRadius: SIZES.base4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="shoppingcart"
            size={SIZES.base2}
            color={COLORS.gray3}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    position: "absolute",
    top: SIZES.base6,
    right: SIZES.base3,
    left: SIZES.base3,
    elevation: SIZES.thickness,
    shadowColor: Platform.OS === "ios" ? COLORS.gray4 : undefined, // Shadow properties for iOS
    shadowOffset:
      Platform.OS === "ios" ? { width: 0, height: SIZES.thin } : undefined,
    shadowOpacity: Platform.OS === "ios" ? 0.3 : undefined,
    shadowRadius: Platform.OS === "ios" ? 4 : undefined,
    backgroundColor: COLORS.white,
    zIndex: 1,
    height: SIZES.base7,
    flex: 1,
    borderRadius: SIZES.base,
    padding: SIZES.base2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SIZES.thickness,
  },
});
