import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserAnalytics } from "../../context/features/userSlice.js";
import { RefreshControl } from "react-native-gesture-handler";
import CustomTextInputWithPicker from "../../components/auth/CustomTextInputWithPicker.jsx";

export default function Insights({ navigation }) {
  let Balance = 2500;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState(null);
  const { userAnalytics, loadinganalytics, erroranalytics } = useSelector(
    (state) => state.user
  );
  const memoizedAnalytics = useMemo(() => userAnalytics, [userAnalytics]);

  useEffect(() => {
    dispatch(getUserAnalytics(period));
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    const loadAnalytics = async () => {
      try {
        dispatch(getUserAnalytics("monthly"));
      } catch (error) {
        console.log(error);
      }
    };
    loadAnalytics();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for refresh, remove this in your actual implementation
  };

  if (loadinganalytics) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </SafeAreaView>
    );
  }

  if (erroranalytics) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{errororderdetails}</Text>
      </SafeAreaView>
    );
  }

  const insigthsOption = [
    { label: "This Week", value: "weekly" },
    { label: "This Month", value: "monthly" },
    { label: "This Year", value: "yearly" },
  ];

  const handleInsightPeriod = (value) => {
    setPeriod(value);
    dispatch(getUserAnalytics(value));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Insights"} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, marginBottom: SIZES.base10 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={{ marginTop: SIZES.base }}>
          <CustomTextInputWithPicker
            placeholder="This week"
            items={insigthsOption}
            onValueChange={handleInsightPeriod}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: SIZES.base,
            marginTop: SIZES.base3,
            marginBottom: SIZES.base3,
          }}
        >
          
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: SIZES.base,
              borderWidth: SIZES.thin,
              borderColor: COLORS.gray3,
              borderRadius: SIZES.base,
              paddingHorizontal: SIZES.base2,
              paddingVertical: SIZES.base2,
              backgroundColor: COLORS.secondary,
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.white }}>
                Total Listings
              </Text>
              <Feather
                name={"arrow-up-right"}
                size={SIZES.base2}
                color={COLORS.white}
              />
            </View>
            <Text
              style={{ ...FONTS.header, color: COLORS.white }}
            >{`${memoizedAnalytics?.totalListings}`}</Text>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: SIZES.base,
              borderWidth: SIZES.thin,
              borderColor: COLORS.gray3,
              borderRadius: SIZES.base,
              paddingHorizontal: SIZES.base2,
              paddingVertical: SIZES.base2,
              backgroundColor: COLORS.secondary,
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.white }}>
                Total Sales
              </Text>
              <Feather
                name={"arrow-down-left"}
                size={SIZES.base2}
                color={COLORS.white}
              />
            </View>
            <Text
              style={{ ...FONTS.header, color: COLORS.white }}
            >{`₦${memoizedAnalytics?.totalSales}`}</Text>
          </View>
        </View>

        {/* Top Selling List */}
        <Text style={{ ...FONTS.listHead, color: COLORS.primary }}>
          Top Selling Listings
        </Text>
              {/* Display products or no listings message */}
        <View style={styles.gridContainer}>
          {memoizedAnalytics?.mostSoldListings?.length > 0 ? (
            memoizedAnalytics?.mostSoldListings?.map((listing, index) => (
              <View key={index} style={styles.gridItem}>
                <Image source={{ uri: `${URLBASE.imageBaseUrl}${listing?.listing?.image[0]}` }} style={styles.image} />
                <Text style={styles.name}>{listing?.listing?.name?.length > 14 ? `${listing?.listing?.name.substring(0,15)}..`: listing?.listing?.name}</Text>
                <Text style={styles.price}>{`₦${listing?.listing?.price}`}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noListings}>No listings sold yet</Text>
          )}
        </View>
        {/* Profile View Card */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: SIZES.base,
            marginTop: SIZES.base3,
            marginBottom: SIZES.base3,
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: SIZES.base,
              borderWidth: SIZES.thin,
              borderColor: COLORS.gray3,
              borderRadius: SIZES.base,
              paddingHorizontal: SIZES.base2,
              paddingVertical: SIZES.base2,
              backgroundColor: COLORS.secondary,
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.white }}>
                Profile Views
              </Text>
              <Feather
                name={"arrow-up-right"}
                size={SIZES.base2}
                color={COLORS.white}
              />
            </View>
            <Text
              style={{ ...FONTS.header, color: COLORS.white }}
            >{`${memoizedAnalytics?.profileViews}`}</Text>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: SIZES.base,
              borderWidth: SIZES.thin,
              borderColor: COLORS.gray3,
              borderRadius: SIZES.base,
              paddingHorizontal: SIZES.base2,
              paddingVertical: SIZES.base2,
              backgroundColor: COLORS.secondary,
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.white }}>
                Product Views
              </Text>
              <Feather
                name={"arrow-up-right"}
                size={SIZES.base2}
                color={COLORS.white}
              />
            </View>
            <Text
              style={{ ...FONTS.header, color: COLORS.white }}
            >{`${memoizedAnalytics?.listingViews}`}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light,
  },
  errorText: {
    ...FONTS.h3,
    color: COLORS.error,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: SIZES.base,
  },
  gridItem: {
    width: "48%",
    alignItems: "flex-start",
    marginBottom: SIZES.base,
    padding: SIZES.base,
    
  },
  image: {
    height: SIZES.hp(20),
    width: SIZES.hp(20),
    borderRadius: SIZES.base,
    resizeMode: "cover",
  },
  name: {
    ...FONTS.body4, 
    color: COLORS.accent2
  },
  price: {
    ...FONTS.h3, 
    color: COLORS.primary
  },
  noListings: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: "center",
    width: "100%",
    marginTop: SIZES.base,
  },
});
