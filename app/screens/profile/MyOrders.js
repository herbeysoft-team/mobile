import { StyleSheet, Text, View, Pressable } from "react-native";
import React,{useRef, useState, useCallback, useMemo} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import { TabView, TabBar } from "react-native-tab-view";
import HeaderMedium from "../../components/general/HeaderMedium";
import OrderMade from "../../components/profile/OrderMade";
import OrderRecieved from "../../components/profile/OrderRecieved";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useDispatch, } from "react-redux";
import {
  updateOrderStatus
} from "../../context/features/orderSlice.js";
import GeneralModal from "../../components/general/GeneralModal.js";
import Toast from "react-native-toast-message";

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
export default function MyOrders({ navigation }) {
  const dispatch = useDispatch();
  // ref
  const bottomSheetOrderOptionRef = useRef(null);
  const [openSetting, setOpenSetting] = useState(false);
  const [openGeneralModal, setOpenGeneralModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [sure, setSure] = useState(false);
  // variables
  const snapPoints = useMemo(() => (sure ? ["40%"] : ["30%"]), [sure]);

  const handleCloseBottomSheet = () =>
    bottomSheetOrderOptionRef.current?.close();
  const handleOpenBottomSheet = () =>
    bottomSheetOrderOptionRef.current?.expand();

  const handleOpenBottomSheetSetting = () => {
    setOpenSetting(true);
    handleOpenBottomSheet();
  };

  const gotoGeneralModal = () => {
    setOpenGeneralModal(true)
    handleCloseBottomSheet();
  };

  // const handleSettingChanged = (value) => {
  //   setOrderId(value?.id);
  //   setOpenSetting(value?.status);
  //   handleOpenBottomSheet();
  // };

  // const handleMarkAsDelivered = () => {
  //   handleCloseBottomSheet();
  //   if(orderId){
  //       dispatch(updateOrderStatus({formData:{
  //           orderId,
  //           status: "delivered"
  //       }, Toast}))
  //     }
  // }
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
        return (
          <OrderMade
            navigation={navigation}
            //handleSettingChangeFunction={handleSettingChanged}
          />
        );
      case "1":
        return (
          <OrderRecieved
            navigation={navigation}
          />
        );
      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "0", title: "Made" },
    { key: "1", title: "Recieved" },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderMedium navigation={navigation} title={"My Orders"} />
      </View>
     
      {/* {loadingvendorlisting && (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      )} */}
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
          ref={bottomSheetOrderOptionRef}
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
                onPress={handleMarkAsDelivered}
                style={{
                  flexDirection: "row",
                  gap: SIZES.base2,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingVertical: SIZES.base2,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.accent,
                    textAlign: "left",
                  }}
                >
                  Mark As Delivered
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
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.red,
                    textAlign: "left",
                  }}
                >
                  Cancel Order
                </Text>
                {/* {deleteloading ? (
                  <ActivityIndicator size="small" color={COLORS.tertiary} />
                ) : null} */}
              </Pressable>
            </View>
            
          </View>
        </BottomSheet>
      )}
       <GeneralModal
          openGeneralModal={openGeneralModal}
          setOpenGeneralModal={setOpenGeneralModal}
          gotoGeneralModal={gotoGeneralModal}
          ButtonName={"Cancel Order"}
          Heading={"Cancel Order"}
          SubHeading={"Are you sure you want to cancel this order?"}
          handleDelete={""}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
});
