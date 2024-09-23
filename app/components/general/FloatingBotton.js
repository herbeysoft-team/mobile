import React from "react";
import { StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SIZES, COLORS } from "../../constant";
import {  useSelector } from "react-redux";

export default function FloatingBotton({ navigation, setOpenUpgradeDeliverModal }) {
//   const navigation = useNavigation();
const subscriptionInfo = useSelector(
  (state) => state.subscription.subscriptionInfo
);

  const handlePress = () => {
    if (subscriptionInfo.subscriptionType !== "free") {
      navigation.navigate("Request-Delivery");
    } else {
      setOpenUpgradeDeliverModal(true);
    }    
  };

  return (
    <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
      <Feather name="truck" size={SIZES.base2} color={COLORS.gray4} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: SIZES.base18,
    right: SIZES.base3,
    backgroundColor: COLORS.primary, // You can change the color as per your preference
    borderRadius: SIZES.base6,
    width: SIZES.base6,
    height: SIZES.base6,
    alignItems: "center",
    justifyContent: "center",
    elevation: SIZES.thickness,
    shadow: SIZES.thickness,
    shadowOffset: SIZES.thin,
    shadowColor: COLORS.gray2,
    shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    zIndex: 5,
    shadowColor: COLORS.accent2,
  },
});
