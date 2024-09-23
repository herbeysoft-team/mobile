import { StyleSheet, Platform, View, Text, Pressable } from "react-native";
import { FONTS, SIZES, COLORS } from "../../constant";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionPlan } from "../../context/features/subscriptionSlice.js";
import { setDistance } from "../../context/features/mapSlice";
import TickerButton from "../auth/TickerButtom.jsx";

const distanceOptions = {
  "10 Minutes Away": 10,
  "20 Minutes Away": 20,
  "30 Minutes Away": 30,
};

export default function DistanceMapModel({
  openMapTimeModal,
  setOpenMapTimeModal,
  setOpenUpgradeBasicModal
}) {
  const dispatch = useDispatch();
  const selectedDistance = useSelector((state) => state.map.selectedDistance);
  const subscriptionInfo = useSelector(
    (state) => state.subscription.subscriptionInfo
  );

  const handleDistanceChange = (distance) => {
    dispatch(setDistance(distance));
    setOpenMapTimeModal(false);
    dispatch(getSubscriptionPlan())
  };

  const renderOptionContent = (option, distance) => {
    if (distance === selectedDistance) {
      // Always show the check icon for the first option (10 minutes away)
      return (
        <Octicons name="check" size={SIZES.base2} color={COLORS.tealGreen} />
      );
    } else if (subscriptionInfo.subscriptionType === "free") {
      // Show the "Upgrade Plan" button for free subscription plans
      return (
        <TickerButton
          text={"Upgrade Plan"}
          onPress={() => {
            setOpenUpgradeBasicModal(true)
            setOpenMapTimeModal(false);
          }}
          fill={true}
          style={styles.upgradeButton}
        />
      );
    } else {
      // Show the check icon for other subscription plans
      return (
        distanceOptions[option] === selectedDistance && (
          <Octicons name="check" size={SIZES.base2} color={COLORS.tealGreen} />
        )
      );
    }
  };

  return (
    openMapTimeModal && (
      <View style={styles.container}>
        <Pressable onPress={() => setOpenMapTimeModal(false)}>
          <View>
            <Text style={{ ...FONTS.h3, color: COLORS.tertiary }}>
              Explore Other Neighborhoods
            </Text>
            <View style={styles.optionsContainer}>
              {Object.keys(distanceOptions).map((option) => (
                <Pressable
                  key={option}
                  onPress={() => {
                    if (subscriptionInfo.subscriptionType !== "free") {
                      handleDistanceChange(distanceOptions[option]);
                    } else {
                      setOpenUpgradeBasicModal(true)
                      setOpenMapTimeModal(false);
                    }
                  }}
                  style={[
                    styles.option,
                    distanceOptions[option] === selectedDistance &&
                      styles.selectedOption,
                  ]}
                >
                  <View
                    flexDirection="row"
                    gap={SIZES.base}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Octicons
                      name="plus"
                      size={SIZES.base}
                      color={COLORS.tertiary}
                      style={{ marginTop: SIZES.thickness }}
                    />
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                  {renderOptionContent(option, distanceOptions[option])}
                </Pressable>
              ))}
            </View>
          </View>
        </Pressable>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: SIZES.base14,
    right: SIZES.base3,
    left: SIZES.base3,
    elevation: SIZES.thickness,
    shadowColor: Platform.OS === "ios" ? COLORS.gray4 : undefined,
    shadowOffset:
      Platform.OS === "ios" ? { width: 0, height: SIZES.thin } : undefined,
    shadowOpacity: Platform.OS === "ios" ? 0.3 : undefined,
    shadowRadius: Platform.OS === "ios" ? 4 : undefined,
    backgroundColor: COLORS.white,
    zIndex: 1,
    flex: 1,
    borderRadius: SIZES.base,
    padding: SIZES.base2,
    flexDirection: "column",
    gap: SIZES.thickness,
  },
  optionsContainer: {
    marginTop: SIZES.base2,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.base,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.lightGray,
  },
  optionText: {
    ...FONTS.body3,
    color: COLORS.tertiary,
  },
  upgradeButton: {
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
  },
});
