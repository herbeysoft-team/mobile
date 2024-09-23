import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderSmall from "../../components/general/HeaderSmall";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import VendorCard from "../../components/explore/VendorCard";
import CustomButton from "../../components/auth/CustomButton";
import ListingCarousel from "../../components/explore/ListingCarousel";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  sendMessage,
  getChatList,
} from "../../context/features/messageSlice";

import {
  increaseListingViews
} from "../../context/features/listingSlice";
import SimilarListing from "../../components/explore/SimilarListing.jsx";
import { setItem, getItem } from "../../utils/asyncStorage.js";
import Toast from "react-native-toast-message";

export default function ListingDetails({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.map);
  const [senderId, setSenderId] = useState("");
  const userId = route.params?.user;
  const { loadingsend } = useSelector((state) => state.message);
  const listingcontent = {
    id: route.params?._id,
    longitude: userLocation?.longitude,
    latitude: userLocation?.latitude,
  };

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");

        if (id) {
          setSenderId(id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  useEffect(() => {
    if(route.params){
      dispatch(increaseListingViews(route.params?._id))
    }
  }, []);


  const addToCart = async (product) => {
    try {
      // Fetch existing cart items from AsyncStorage
      const existingCartItems = await getItem("trowmartcart");
      let cart = {};
  
      if (existingCartItems !== null) {
        // If there are existing items, parse and update the cart object
        cart = JSON.parse(existingCartItems);
      }
  
      // Check if the product's user exists in the cart
      if (cart[product.user]) {
        // Check if the product is already in the cart
        const productExists = cart[product.user].find((item) => item._id === product._id);
  
        if (productExists) {
          // Show a message that the product is already in the cart
          Toast.show({
            type: "error",
            text1: "Product already in cart",
          });
          return;
        } else {
          // Add the new product to the user's cart array
          cart[product.user].push({ ...product, quantity: 1 });
        }
      } else {
        // If the user doesn't exist in the cart, create a new entry for the user
        cart[product.user] = [{ ...product, quantity: 1 }];
      }
  
      // Save the updated cart object back to AsyncStorage
      await setItem("trowmartcart", JSON.stringify(cart));
      Toast.show({
        type: "success",
        text1: "Product successfully added to cart",
      });
  
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  
  const handleSend = () => {
    const content = {
      senderId,
      recepientId: userId,
      messageType: "listing",
      listing: route.params,
    };

    navigation.navigate("Chat-Screen", content);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderSmall
          title={
            route?.params?.type == "product"
              ? "Product"
              : route?.params?.type == "event"
              ? "Event"
              : "Service"
          }
          navigation={navigation}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*Listing Carousel */}
        <ListingCarousel images={route.params?.image} />
        <View style={{ paddingHorizontal: SIZES.base2 }}>
          {/* Listing Description  */}
          <View
            style={{
              flex: 2,
              gap: SIZES.base,
              alignItems: "flex-start",
              borderBottomWidth: SIZES.thin / 2,
              borderColor: COLORS.gray4,
              paddingVertical: SIZES.base2,
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.accent2 }}>
              {route.params?.name}
            </Text>
            <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
              {route.params?.type == "product"
                ? `₦${route.params?.price}`
                : `₦${route.params?.price}/${route.params?.unit}`}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: SIZES.thickness,
              }}
            >
              <Ionicons
                name="location-outline"
                size={SIZES.base2}
                color={COLORS.gray3}
              />
              <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                {route.params?.location?.address}
              </Text>
            </View>
            <Text style={{ ...FONTS.body3, color: COLORS.gray3 }}>
              {route.params?.description}
              {/* <Text style={{ color: COLORS.primary }}>Read more</Text> */}
            </Text>
          </View>
          {/* Vendor of the listing */}
          <VendorCard navigation={navigation} user={route.params?.user} />
          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              gap: SIZES.base,
              flex: 1,
            }}
          >
            {loadingsend ? (
              <ActivityIndicator size="small" color={COLORS.tertiary} />
            ) : null}
            <CustomButton
              onPress={() => {
                navigation.navigate("Checkout", {
                  isComingFromCart: false,
                  productItems: [route?.params],
                });
              }}
              // onPress={()=> console.log(route?.params)}
              text={
                route.params?.type == "product" ? "Buy Now" : "Visit Website"
              }
              fill={true}
            />
            {route.params?.type == "product" ? (
              <CustomButton
                onPress={() => {
                  addToCart(route?.params);
                }}
                text={"Add to Cart"}
                fill={false}
              />
            ) : null}

            <CustomButton
              onPress={handleSend}
              text={"Message Vendor"}
              fill={false}
            />
          </View>
          <SimilarListing
            navigation={navigation}
            listingcontent={listingcontent}
          />
        </View>
      </ScrollView>
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
