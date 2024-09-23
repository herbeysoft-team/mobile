import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderBig from "../../components/general/HeaderBig";
import NotificationRoute from "../../components/alert/NotificationRoute";
import MessageRoute from "../../components/alert/MessageRoute";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const Alerts = ({navigation}) => {

  const [notify, setNotiify] = useState(null)
  // ref
  const bottomSheetNotRef = useRef(null);
  const [openSetting, setOpenSetting] = useState(false);
  const snapPoints = useMemo(() => ["30%"], ["80%"]);

  const handleCloseBottomSheet = () =>
    bottomSheetNotRef.current?.close();
  const handleOpenBottomSheet = () =>
    bottomSheetNotRef.current?.expand();

  const handleOpenBottomSheetSetting = () => {
    setOpenSetting(true);
    handleOpenBottomSheet();
  };

  const handleSettingChanged = (value) => {
    setNotiify(value)
    handleOpenBottomSheetSetting()
  };

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "0", title: "Notications" },
    { key: "1", title: "Messages" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "0":
        return <NotificationRoute handleSettingChangeFunction={handleSettingChanged}/>;
      case "1":
        return <MessageRoute navigation={navigation}/>;
      default:
        return null;
    }
  };

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
          {/* {route.key === "0" && (
            <View
              style={{
                width: SIZES.base2,
                height: SIZES.base2,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.red,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>1</Text>
            </View>
          )}
          {route.key === "1" && (
            <View
              style={{
                width: SIZES.base2,
                height: SIZES.base2,
                borderRadius: SIZES.base,
                backgroundColor: memoizeChatList?.totalUnreadMessages > 0 ? COLORS.red : COLORS.white,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{memoizeChatList?.totalUnreadMessages > 0 ? memoizeChatList?.totalUnreadMessages: 0}</Text>
            </View>
          )} */}
        </View>
      )}
      indicatorStyle={{ backgroundColor: COLORS.primary }}
      style={{ backgroundColor: COLORS.white }}
    />
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderBig title={"Alerts"} />
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
          ref={bottomSheetNotRef}
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
                paddingBottom: SIZES.base2
              }}
            >
              {notify?.title}
            </Text>

            <View
              style={{
                paddingVertical: SIZES.base,
                backgroundColor: COLORS.white,
              }}
            >
             <Text
              style={{
                ...FONTS.body3,
                color: COLORS.gray3,
                textAlign: "left",
              }}
            >
              {notify?.subtitle}
            </Text>

            </View>
            
          </View>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
  header: {
    ...FONTS.header,
    color: COLORS.accent,
  },
});
