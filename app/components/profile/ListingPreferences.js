import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import CustomButton from "../auth/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { setItem, getItem } from "../../utils/asyncStorage.js";

const ListingPreferences = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState({
    Products: [],
    Services: [],
    Events: [],
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const preferences = await getItem("trowmartUserPreferences");
        if (preferences) {
          setSelectedCategories(JSON.parse(preferences));
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  const toggleSubcategory = (category, subcategory) => {
    setSelectedCategories((prevCategories) => ({
      ...prevCategories,
      [category]: prevCategories[category].includes(subcategory)
        ? prevCategories[category].filter((item) => item !== subcategory)
        : [...prevCategories[category], subcategory],
    }));
  };

  const savePreferences = async () => {
    try {
      await setItem(
        "trowmartUserPreferences",
        JSON.stringify(selectedCategories)
      );
      Toast.show({
        type: "success",
        text1: "User preferences saved successfully",
      });

      navigation.goBack();
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  const subcategories = {
    Products: [
      "Groceries",
      "Health & Beauty",
      "Home & Office",
      "Phone & Gadget",
      "Computing",
      "Electronics",
      "Baby Products",
      "Gaming",
      "Automobile",
      "Sporting Goods",
      "Oil & Gas",
      "Others",
    ],
    Services: [
      "Home",
      "Educational",
      "Transportation",
      "Technical",
      "Proffessional",
      "Personal",
      "Financial",
      "Hospitality",
      "Others",
    ],
    Events: ["Community", "Corporate", "Entertainment", "Cultural", "Social"],
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Listing Preferences"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        marginBottom={SIZES.base6}
      >
        {Object.keys(selectedCategories).map((category) => (
          <View key={category}>
            <Text style={styles.category}>{category}</Text>
            <View style={styles.subcategoryContainer}>
              {subcategories[category].map((subcategory) => (
                <TouchableOpacity
                  display="flex"
                  flexDirection="row"
                  key={subcategory}
                  style={[
                    styles.subcategory,
                    {
                      backgroundColor: selectedCategories[category].includes(
                        subcategory
                      )
                        ? COLORS.primary
                        : COLORS.white,
                    },
                  ]}
                  onPress={() => toggleSubcategory(category, subcategory)}
                >
                  <View style={styles.subcategoryRow}>
                    <FontAwesome
                      name={
                        selectedCategories[category].includes(subcategory)
                          ? "plus"
                          : "check"
                      }
                      size={SIZES.base3 / 2}
                      color={
                        selectedCategories[category].includes(subcategory)
                          ? COLORS.white
                          : COLORS.primary
                      }
                    />
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: selectedCategories[category].includes(
                          subcategory
                        )
                          ? COLORS.white
                          : COLORS.primary,
                      }}
                    >
                      {subcategory}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <CustomButton onPress={savePreferences} text={"Done"} fill={true} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListingPreferences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
  category: {
    ...FONTS.h3,
    color: COLORS.secondary,
    marginBottom: SIZES.base2,
  },
  subcategoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: SIZES.base2,
  },
  subcategory: {
    backgroundColor: COLORS.white,
    borderWidth: SIZES.thin,
    borderColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base2,
    marginRight: SIZES.base,
    marginBottom: SIZES.base,
    color: COLORS.primary,
  },
  subcategoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.base,
  },
});
