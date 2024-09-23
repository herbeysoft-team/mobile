import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useMemo } from "react";
import NotificationBox from "./NotificationBox";
import { FONTS, SIZES, COLORS } from "../../constant";
import { getMyNotifications } from "../../context/features/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../utils/asyncStorage.js";

export default function NotificationRoute({
  handleSettingChangeFunction,
}) {
  const dispatch = useDispatch();
  const { loadingNot, errorNot, notify } = useSelector(
    (state) => state.notification
  );
  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");
        if (id) {
          dispatch(getMyNotifications(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeNotify = useMemo(() => notify, [notify]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.base2,
        paddingHorizontal: SIZES.base2,
        marginBottom: SIZES.base3,
      }}
    >
      {loadingNot ? (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      ) : null}
      {memoizeNotify?.length == null ? (
        <View style={styles.noNotificationContainer}>
          <Text style={styles.noNotificationText}>No Notifications</Text>
        </View>
      ) : (
        memoizeNotify?.map((notification) => (
          <NotificationBox
            key={notification._id}
            id={notification._id}
            title={notification.heading}
            subtitle={notification.description}
            time={notification.createdAt}
            handleSettingChange={handleSettingChangeFunction}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  noNotificationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.base2,
  },
  noNotificationText: {
    fontSize: SIZES.font,
    color: COLORS.gray,
  },
});
