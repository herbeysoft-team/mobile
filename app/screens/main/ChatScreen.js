import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRoute } from "@react-navigation/native";
import { FONTS, SIZES, COLORS } from "../../constant";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderChat from "../../components/general/HeaderChat";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  sendMessage,
  getChatList,
} from "../../context/features/messageSlice";
import { getItem } from "../../utils/asyncStorage.js";
import moment from "moment";
import ChatInputBox from "../../components/general/ChatInputBox.js";
import MessageListingCardView from "../../components/explore/MessageListingCardView.jsx";
import ListingCardView from "../../components/explore/ListingCardView.jsx";

export default function ChatScreen({ navigation }) {
  const route = useRoute();
  const content = route.params;
  const userId = content?.recepientId || route.params;
  const dispatch = useDispatch();
  const { chathistory, loadingsend } = useSelector((state) => state.message);
  const [senderId, setSenderId] = useState("");
  const [message, setMessage] = useState("");
  const [showListingCard, setShowListingCard] = useState(
    content?.messageType === "listing"
  );
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");
        setSenderId(id);
        if (id) {
          dispatch(getMessages({ senderId: id, recepientId: userId }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeChatHistory = useMemo(() => chathistory, [chathistory]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const handleSend = () => {
    const newMessage = {
      senderId,
      recepientId: userId,
      textMessage: message,
      messageType: content?.messageType || "text",
      listingId:
        content?.messageType === "listing" ? content?.listing?._id : null,
    };

    if (message) {
      dispatch(sendMessage(newMessage));
      setShowListingCard(false);
    }

    setTimeout(() => {
      dispatch(getMessages({ senderId, recepientId: userId }));
      dispatch(getChatList(senderId));
    }, 500);

    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderChat userId={userId} navigation={navigation} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        {memoizeChatHistory.map((item, index) => {
          if (item.messageType === "text") {
            return (
              <Pressable
                key={item._id || index} // Use a unique key
                style={[
                  item?.senderId !== userId
                    ? styles.sentMessage
                    : styles.receivedMessage,
                  { textAlign: item?.senderId !== userId ? "right" : "left" },
                ]}
              >
                <View
                  style={[
                    item?.senderId !== userId
                      ? styles.sentText
                      : styles.receivedText,
                  ]}
                >
                  <Text
                    style={{
                      ...FONTS.body3,
                      textAlign: "left",
                      paddingHorizontal: SIZES.base2,
                      color:
                        item?.senderId !== userId
                          ? COLORS.white
                          : COLORS.accent,
                    }}
                  >
                    {item?.textMessage}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: item?.senderId !== userId ? "right" : "left",
                    ...FONTS.body3,
                    color: COLORS.gray3,
                    marginBottom: SIZES.thickness,
                  }}
                >
                  {moment(item?.timeStamp).format("dddd h:mma")}
                </Text>
              </Pressable>
            );
          }
          if (item.messageType === "listing") {
            return (
              <React.Fragment key={item._id || index}>
                <MessageListingCardView
                  listing={item?.listing}
                  navigation={navigation}
                />
                <Pressable
                  style={[
                    item?.senderId !== userId
                      ? styles.sentMessage
                      : styles.receivedMessage,
                    { textAlign: item?.senderId !== userId ? "right" : "left" },
                    { marginTop: -SIZES.base2 },
                  ]}
                >
                  <View
                    style={[
                      item?.senderId !== userId
                        ? styles.sentText
                        : styles.receivedText,
                    ]}
                  >
                    <Text
                      style={{
                        ...FONTS.body3,
                        textAlign: "left",
                        paddingHorizontal: SIZES.base2,
                        color:
                          item?.senderId !== userId
                            ? COLORS.white
                            : COLORS.accent,
                      }}
                    >
                      {item?.textMessage}
                    </Text>
                  </View>
                  <Text
                    style={{
                      textAlign: item?.senderId !== userId ? "right" : "left",
                      ...FONTS.body3,
                      color: COLORS.gray3,
                      marginBottom: SIZES.thickness,
                    }}
                  >
                    {moment(item?.timeStamp).format("dddd h:mma")}
                  </Text>
                </Pressable>
              </React.Fragment>
            );
          }
        })}
      </ScrollView>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        {showListingCard && (
          <ListingCardView listing={content?.listing} navigation={navigation} />
        )}
      </View>

      {loadingsend ? (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      ) : null}
      <KeyboardAvoidingView behavior="padding">
        <ChatInputBox
          handleSend={handleSend}
          setMessage={setMessage}
          message={message}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
  sentMessage: {
    alignSelf: "flex-end",
    padding: SIZES.base,
    maxWidth: "100%",
    borderRadius: SIZES.thickness,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    borderRadius: SIZES.thickness,
    padding: SIZES.base,
    maxWidth: "100%",
  },
  sentText: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base2,
    maxWidth: "100%",
    borderTopLeftRadius: SIZES.base,
    borderBottomLeftRadius: SIZES.base,
    borderBottomRightRadius: SIZES.base,
  },
  receivedText: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.gray4,
    paddingVertical: SIZES.base2,
    width: "100%",
    borderTopRightRadius: SIZES.base,
    borderBottomLeftRadius: SIZES.base,
    borderBottomRightRadius: SIZES.base,
    maxWidth: "100%",
  },
});
