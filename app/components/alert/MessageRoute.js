import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
import React, {useEffect, useMemo} from "react";
import ProfilePic from "../../../assets/profilepic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { getChatList } from "../../context/features/messageSlice";
import { getItem } from "../../utils/asyncStorage.js";
import MessageBox from "./MessageBox";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";

export default function MessageRoute({ navigation, chatList }) {
  const dispatch = useDispatch();
  const { loadingchatlist, errorchatlist, chatlist } = useSelector(
    (state) => state.message
  );

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");
        if (id) {
          dispatch(getChatList(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeChatList = useMemo(() => chatlist, [chatlist]);

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
      {loadingchatlist ? (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      ) : null}
        {memoizeChatList?.userDetails?.length > 0 ? (
          memoizeChatList?.userDetails?.map((chat, index) => (
            <MessageBox
              key={index}
              profilePic={chat?.image == null ? profilePic : chat?.image}
              user={chat?.fullname || chat?.businessName }
              message={chat?.lastMessage}
              time={chat?.lastMessageTime}
              number={chat?.unreadMessageCount}
              userId={chat?.userId}
              navigation={navigation}
            />
          ))):(
            <View style={styles.noNotificationContainer}>
              <Text style={styles.noNotificationText}>No Chat Yet!</Text>
          </View>
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

