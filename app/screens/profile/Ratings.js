import { StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import { TabView, TabBar } from "react-native-tab-view";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import Received from "../../components/profile/Received";
import Given from "../../components/profile/Given";
import { useDispatch, useSelector } from "react-redux";
import { getMyReviews,deleteReview } from "../../context/features/reviewSlice";
import { getItem } from "../../utils/asyncStorage.js";
import GeneralModal from "../../components/general/GeneralModal.js";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    renderLabel={({ route, focused, index }) => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            color: focused ? COLORS.primary : COLORS.gray3,
            margin: 8,
            ...FONTS.body1,
          }}
        >
          {route.title}
        </Text>
      </View>
    )}
    indicatorStyle={{ backgroundColor: COLORS.primary }}
    style={{ backgroundColor: COLORS.white }}
  />
);

export default function Ratings({ navigation }) {
  const dispatch = useDispatch();
  const { loadingdeletereview } = useSelector((state) => state.review);
  // ref
  const bottomSheetReviewOptionRef = useRef(null);
  const [openSetting, setOpenSetting] = useState(false);
  const [openGeneralModal, setOpenGeneralModal] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [sure, setSure] = useState(false);
  // variables
  const snapPoints = useMemo(() => (sure ? ["30%"] : ["30%"]), [sure]);

  const handleCloseBottomSheet = () =>
    bottomSheetReviewOptionRef.current?.close();
  const handleOpenBottomSheet = () =>
    bottomSheetReviewOptionRef.current?.expand();

  const handleOpenBottomSheetSetting = () => {
    setOpenSetting(true);
    handleOpenBottomSheet();
  };

  const gotoGeneralModal = () => {
    setOpenGeneralModal(true)
    handleCloseBottomSheet();
  };


  const handleDeleteReview = async () => {
    dispatch(deleteReview({reviewId: reviewId?._id, Toast, navigation}))
    const getId = await getItem("trowmartuserId");
    if (getId) {
      dispatch(getMyReviews(getId));
    }
    setTimeout(() => {
      handleCloseBottomSheet();
    }, 1000);
  };

  const handleSureDelete = async () => {
    setSure(true);
  };

  const handleEditReview = async () => {
    navigation.navigate("Edit-Rating", reviewId);
    handleCloseBottomSheet();
  };

  const handleSettingChanged = (value) => {
    setReviewId(value?.id);
    setOpenSetting(value?.status);
    handleOpenBottomSheet();
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "0":
        return <Received navigation={navigation} />;
      case "1":
        return (
          <Given
            navigation={navigation}
            handleSettingChangeFunction={handleSettingChanged}
          />
        );
      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "0", title: "Received" },
    { key: "1", title: "Given" },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderMedium navigation={navigation} title={"Ratings & Reviews"} />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SIZES.wp(100) }}
        sceneContainerStyle={{ backgroundColor: COLORS.white }}
        renderTabBar={renderTabBar}
      />
      {/* BottomSheet  */}
      {openSetting && (
        <BottomSheet
          ref={bottomSheetReviewOptionRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ color: COLORS.primary }}
        >
          <View
            style={{
              paddingVertical: SIZES.base,
              paddingHorizontal: SIZES.base2,
              backgroundColor: COLORS.white,
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.accent,
                textAlign: "center",
              }}
            >
              Actions
            </Text>

            <View
              style={{
                paddingVertical: SIZES.base,
                backgroundColor: COLORS.white,
              }}
            >
              <Pressable
                onPress={handleEditReview}
                style={{
                  flexDirection: "row",
                  gap: SIZES.base2,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingVertical: SIZES.base2,
                }}
              >
                <Feather
                  name="edit-2"
                  size={SIZES.base3}
                  color={COLORS.accent}
                />
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.accent,
                    textAlign: "left",
                  }}
                >
                  Edit Review
                </Text>
              </Pressable>

              <Pressable
                onPress={gotoGeneralModal}
                style={{
                  flexDirection: "row",
                  gap: SIZES.base2,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingVertical: SIZES.base,
                }}
              >
                <AntDesign
                  name="delete"
                  size={SIZES.base3}
                  color={COLORS.red}
                />
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.red,
                    textAlign: "left",
                  }}
                >
                  Delete Review
                </Text>
              </Pressable>
            </View>   
          </View>
        </BottomSheet>
      )}
      <GeneralModal
          openGeneralModal={openGeneralModal}
          setOpenGeneralModal={setOpenGeneralModal}
          gotoGeneralModal={gotoGeneralModal}
          ButtonName={"Delete Review"}
          Heading={"Delete Review"}
          SubHeading={"Are you sure you want to delete the review?"}
          handleDelete={handleDeleteReview}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
});
