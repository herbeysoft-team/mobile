import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import HeaderMini from "../../components/general/HeaderMini";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/auth/CustomButton";
import VendorHeading from "../../components/explore/VendorHeading";
import { setItem, getItem, removeItem } from "../../utils/asyncStorage.js";

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  const calculateTotalAmount = (items) => {
    let total = 0;
    items.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };

  const getTotalItems = (items) => {
    let totalItems = 0;
    items.forEach((item) => {
      totalItems += item.quantity;
    });
    return totalItems;
  };

  const fetchCartItemsByUser = async () => {
    try {
      const cartItems = await getItem("trowmartcart");
      if (cartItems !== null) {
        const parsedCartItems = JSON.parse(cartItems);
        if (
          typeof parsedCartItems === "object" &&
          !Array.isArray(parsedCartItems)
        ) {
          return parsedCartItems;
        } else {
          console.error("Parsed cart items are not in expected format");
          return {};
        }
      } else {
        return {};
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return {};
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchCartItemsByUser();
        setCartItems(items);
        const totalAmt = calculateTotalAmount(Object.values(items).flat());
        const totalItm = getTotalItems(Object.values(items).flat());
        setTotalAmount(totalAmt);
        setTotalItem(totalItm);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchData();
  }, []);

  const handleQuantityChange = async (productId, action) => {
    const updatedCartItems = { ...cartItems };
    const productToUpdate = Object.values(updatedCartItems)
      .flat()
      .find((product) => product._id === productId);

    if (productToUpdate) {
      if (action === "add") {
        productToUpdate.quantity++;
      } else if (action === "minus") {
        if (productToUpdate.quantity > 1) {
          productToUpdate.quantity--;
        } else {
          const userCart = updatedCartItems[productToUpdate.user];
          const indexToRemove = userCart.findIndex(
            (item) => item._id === productId
          );
          if (indexToRemove !== -1) {
            userCart.splice(indexToRemove, 1);
          }
          if (userCart.length === 0) {
            delete updatedCartItems[productToUpdate.user];
          }
        }
      }

      setCartItems(updatedCartItems);
      setTotalAmount(
        calculateTotalAmount(Object.values(updatedCartItems).flat())
      );
      setTotalItem(getTotalItems(Object.values(updatedCartItems).flat()));

      try {
        await setItem("trowmartcart", JSON.stringify(updatedCartItems));
      } catch (error) {
        console.error("Error saving cart to AsyncStorage:", error);
      }
    }
  };

  const handleClearItems = async (vendorId) => {
    const updatedCartItems = { ...cartItems };
    delete updatedCartItems[vendorId];
    setCartItems(updatedCartItems);
    setTotalAmount(
      calculateTotalAmount(Object.values(updatedCartItems).flat())
    );
    setTotalItem(getTotalItems(Object.values(updatedCartItems).flat()));

    try {
      await setItem("trowmartcart", JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error("Error saving cart to AsyncStorage:", error);
    }
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

   // Format the balance
const formattedBalance = (cash) => new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}).format(cash);


  return (
    <SafeAreaView style={styles.container}>
      <HeaderMini title={"Cart"} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isEmpty(cartItems) ? 
        <>
        <Text
          style={{
            alignSelf: "center",
            justifyContent: "center",
            ...FONTS.body4,
            padding: SIZES.base2,
          
          }}
        >
          No item in the cart
        </Text>
        </> :
        <View style={styles.itemContainer}>
          {Object.keys(cartItems).map((vendorId) => {
            const vendorItems = cartItems[vendorId];
            const vendorTotalAmount = calculateTotalAmount(vendorItems);
            const vendorTotalItems = getTotalItems(vendorItems);

            return (
              <View key={vendorId}>
                <VendorHeading navigation={navigation} user={vendorId} />
                {vendorItems.map((product) => (
                  <View
                    key={product?._id}
                    style={{
                      width: SIZES.wp(90),
                      paddingVertical: SIZES.base,
                      borderRadius: SIZES.base,
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: SIZES.base,
                    }}
                  >
                    <Image
                      source={{
                        uri: `${URLBASE.imageBaseUrl}${product?.image[0]}`,
                      }}
                      style={{
                        height: SIZES.base12,
                        width: SIZES.base12,
                        // flex: 1,
                        borderRadius: SIZES.base,
                        resizeMode: "cover",
                      }}
                    />
                    <View
                      style={{
                        // flex: 2,
                        gap: SIZES.base,
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{ ...FONTS.listHead, color: COLORS.accent2 }}
                      >
                        {product?.name?.length > 20 ? `${product?.name.substring(0,19)}..`: product?.name}
                      </Text>
                      <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
                        {product?.type == "product"
                          ? `₦${formattedBalance(product?.price)}`
                          : `₦${formattedBalance(product.price)}/${product?.unit}`}
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
                          {product?.location?.address}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        gap: SIZES.base,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          handleQuantityChange(product._id, "minus")
                        }
                      >
                        <View
                          style={{
                            width: SIZES.base3,
                            height: SIZES.base3,
                            backgroundColor: COLORS.gray4,
                            borderRadius: SIZES.base3,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text>-</Text>
                        </View>
                      </TouchableOpacity>
                      
                      <Text>{product?.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => handleQuantityChange(product._id, "add")}
                      >
                        <View
                          style={{
                            width: SIZES.base3,
                            height: SIZES.base3,
                            backgroundColor: COLORS.gray4,
                            borderRadius: SIZES.base3,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text>+</Text>
                        </View>
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                ))}
                <View style={styles.summaryContainer}>
                  <Text style={{ ...FONTS.body3, color: COLORS.gray3 }}>
                    {`Items (${vendorTotalItems})`}
                  </Text>
                  <Text style={{ ...FONTS.body3, color: COLORS.gray3 }}>
                    {`₦${formattedBalance(vendorTotalAmount)}`}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: SIZES.base,
                    marginTop: SIZES.base3,
                  }}
                >
                  <CustomButton
                    onPress={() =>
                      navigation.navigate("Checkout", {
                        isComingFromCart: true,
                        cartItems: vendorItems,
                      })
                    }
                    text={"Proceed to checkout"}
                    fill={true}
                  />
                  <CustomButton
                    onPress={() => handleClearItems(vendorId)}
                    text={"Clear Items"}
                    fill={false}
                  />
                </View>
              </View>
            );
          })}
        </View>

        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
    paddingTop: SIZES.base2,
    paddingHorizontal: SIZES.base2,
  },
  itemContainer: {
    paddingVertical: SIZES.base2,
    borderRadius: SIZES.base,
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: SIZES.base2,
    borderBottomColor: COLORS.gray4,
    borderBottomWidth: SIZES.thin,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SIZES.wp(90),
    alignItems: "center",
    paddingVertical: SIZES.base3,
    borderBottomColor: COLORS.gray4,
    borderBottomWidth: SIZES.thin,
  },
});
