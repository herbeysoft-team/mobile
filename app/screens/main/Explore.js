import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderBig from "../../components/general/HeaderBig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Categories from "../../components/explore/Categories";
import ListingCardView from "../../components/explore/ListingCardView";
import ListingCardViewGrid from "../../components/explore/ListingCardViewGrid";
import { FlashList } from "@shopify/flash-list";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import CustomButton from "../../components/auth/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getListingsByLocation,
  setListingSettings,
} from "../../context/features/listingSlice";

import {
  setListingDistance
} from "../../context/features/mapSlice";
import LoadingOverlay from "../../components/general/LoadingOverlay";
import SearchBox from "../../components/explore/SearchBox.jsx";
import Slider from "../../components/explore/Slider.jsx";
import MinMaxLabels from "../../components/explore/MinMaxLabels.jsx";
import FloatingBotton from "../../components/general/FloatingBotton.js";
import { RefreshControl } from "react-native-gesture-handler";
import UpgradeBasicModal from "../../components/general/UpgradeBasicModal.js";
import UpgradeDeliverModal from "../../components/general/UpgradeDeliverModal.js";

const Explore = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { userLocation } = useSelector((state) => state.map);
  const [activeOption, setActiveOption] = useState("This Week");
  const [openUpgradeBasicModal, setOpenUpgradeBasicModal] = useState(false);
  const [openUpgradeDeliverModal, setOpenUpgradeDeliverModal] = useState(false);
  const [distanceOption, SetDistanceOption] = useState(10);
  const { subscriptionInfo } =
  useSelector((state) => state.subscription);

  const handleOptionSelect = (option) => {
    setActiveOption(option);
  };

  const handleOptionSelectDistance = (option) => {
    SetDistanceOption(option)
    
  };
  
  
  const listingSelectedDistance = useSelector(
    (state) => state.map.listingSelectedDistance
  );
  const listingSettings = useSelector((state) => state.listing.listingSettings);
  // Destructuring listingSettings object
  const { minimumPrice, maximumPrice, gridView } = listingSettings;
  const [minPrice, setMinPrice] = useState(minimumPrice);
  const [maxPrice, setMaxPrice] = useState(maximumPrice);
  const [gridV, setGridV] = useState(gridView)
  const handleViewSelect = (option) => {
    setGridV(option);
  };
  useEffect(() => {
    setMinPrice(minimumPrice);
    setMaxPrice(maximumPrice);
  }, [listingSettings]);

  const {
    listingsbylocation,
    loadinglistingsbylocation,
    errorlistingsbylocation,
  } = useSelector((state) => state.listing);

  const location = {
    longitude: userLocation?.longitude,
    latitude: userLocation?.latitude,
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getListingsByLocation({ location, listingSelectedDistance }));

    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for refresh, remove this in your actual implementation
  };

  useEffect(() => {
    dispatch(getListingsByLocation({ location, listingSelectedDistance }));
  }, [listingSelectedDistance]);

  const memoizedListingsByLocation = useMemo(
    () => listingsbylocation,
    [listingsbylocation]
  );

  const updatedData = [
    ...memoizedListingsByLocation,
    {
      id: "explore_other_neighborhood", // Some unique identifier
      componentType: "Pressable", // Identifier for Pressable
    },
  ];

  // ref
  const bottomSheetRef = useRef(null);
  const bottomSheetRefPremium = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["60%"], []);
  const snapPointsPremium = useMemo(() => ["40%"], []);
  const [openSetting, setOpenSetting] = useState(false);
  const [openSettingPremium , setOpenSettingPremium] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredData, setFilteredData] = useState(updatedData);

  const [categories, setCategories] = useState([
    { id: 0, name: "Products", key: "product" },
    { id: 1, name: "Events", key: "event" },
    { id: 2, name: "Services", key: "service" },
  ]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    if (!category) {
      // If the active category is null (reset filter), show all data
      setFilteredData(updatedData);
    } else {
      // Filter the data based on the selected category
      const filtered = updatedData.filter((item) => {
        // Modify this condition based on your category filtering logic
        return item.type === category.key; // For instance, filter by category key
      });
      setFilteredData(filtered);
    }
  };

  const handleValueChange = useCallback((low, high) => {
    setMinPrice(low);
    setMaxPrice(high);
  }, [listingSettings]);

  const handleCloseBottomSheet = () => bottomSheetRef.current?.close();
  const handleOpenBottomSheet = () => bottomSheetRef.current?.expand();
  const handleCloseBottomSheetPremium = () => bottomSheetRefPremium.current?.close();
  const handleOpenBottomSheetPremium = () => bottomSheetRefPremium.current?.expand();

  const handleShowSearchResult = () => {
    dispatch(setListingSettings({ minimumPrice: minPrice, maximumPrice: maxPrice, eventTime: activeOption, gridView: gridV }));
    handleCloseBottomSheet();
  }

  const handleExplore = () => {
    dispatch(setListingDistance(distanceOption));
    handleCloseBottomSheetPremium();
    handleCloseBottomSheet();
  }

  const handleResetSettings = () =>{
    dispatch(setListingSettings({ minimumPrice: 0, maximumPrice: 100000, eventTime: "This Week", gridView: false }))
    setActiveOption("This Week")
    setGridV(false);
    setMaxPrice(100000)
    setMinPrice(0)
    handleCloseBottomSheet();
  }
  const handleOpenBottomSheetSetting = () => {
    setOpenSetting(true);
    handleOpenBottomSheet();
  };

  const handleOpenBottomSheetSettingPremium = () => {
    setOpenSettingPremium(true);
    handleOpenBottomSheetPremium();
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

  const navigateToRequestSceen = () => {
    navigation.navigate("Request-Delivery");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBig title={"Explore"} navigation={navigation} />
      {/* Search components */}
      <SearchBox handleOpenBottomSheetSetting={handleOpenBottomSheetSetting} />

      {/* categories section */}
      <View>
        {categories.length > 0 && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        )}
      </View>
      {/* Listing Section */}
      {loadinglistingsbylocation ? (
        <LoadingOverlay visible={loadinglistingsbylocation} />
      ) : (
        <>
          <FlashList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            contentContainerStyle={{ paddingBottom: SIZES.base12 }}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            data={!activeCategory ? updatedData : filteredData}
            renderItem={({ item }) =>
              item.componentType === "Pressable" ? (
                <Pressable onPress={handleOpenBottomSheetSettingPremium}>
                  <Text
                    style={{
                      textAlign: "center",
                      ...FONTS.h4,
                      color: COLORS.primary,
                      borderWidth: SIZES.thin,
                      borderColor: COLORS.gray4,
                      padding: SIZES.base,
                    }}
                  >{`Explore other Neighborhood`}</Text>
                </Pressable>
              ) : gridView ? (
                <ListingCardViewGrid listing={item} navigation={navigation} />
              ) : (
                <ListingCardView listing={item} navigation={navigation} />
              )
            }
          />
        </>
      )}

      <View
        style={{
          position: "absolute",
          paddingVertical: SIZES.base2,
          alignItems: "center",
          justifyContent: "center",
          bottom: SIZES.base7,
          right: 0,
          left: 0,
          borderTopWidth: SIZES.thin,
          borderColor: COLORS.gray4,
          backgroundColor: COLORS.white,
          elevation: SIZES.base,
        }}
      >
        <Text
          style={{ textAlign: "center", ...FONTS.body4 }}
        >{`${!activeCategory ? updatedData.length-1 : filteredData.length} results in your Neighborhood`}</Text>
      </View>
      {/* BottomSheet  */}
      {openSetting && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ color: COLORS.primary }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingVertical: SIZES.base2,
              paddingHorizontal: SIZES.base2,
              backgroundColor: COLORS.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Pressable onPress={() => {}}>
                <Text style={{ ...FONTS.body4, color: COLORS.white, flex: 1 }}>
                  Reset
                </Text>
              </Pressable>
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h3,
                  color: COLORS.accent,
                  textAlign: "center",
                }}
              >
                Filter List
              </Text>
              <Pressable onPress={handleResetSettings}>
                <Text
                  style={{ ...FONTS.body3, color: COLORS.primary, flex: 1 }}
                >
                  Reset
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base2,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>Price</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                  gap: SIZES.base,
                }}
              >
                <Slider
                  min={0}
                  max={100000}
                  initialMin={minPrice}
                  initialMax={maxPrice}
                  handleValueChange={handleValueChange}
                />
              </View>
              <MinMaxLabels min={0} max={`100000+`} />
            </View>

            <View
              style={{
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base2,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>Event Time</Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                  gap: SIZES.base,
                  justifyContent: "space-between",
                }}
              >
                {["This Week", "This Month", "Next Month"].map(
                  (option, index) => (
                    <View
                      key={index}
                      style={[
                        styles.option,
                        activeOption === option && styles.activeOption,
                      ]}
                      onTouchEnd={() => handleOptionSelect(option)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          activeOption === option && styles.activeOptionText,
                        ]}
                      >
                        {option}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base2,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>View</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                  gap: SIZES.base,
                }}
              >
                <Pressable
                  onPress={() => handleViewSelect(false)}
                  style={{
                    width: SIZES.base5,
                    height: SIZES.base5,
                    borderRadius: SIZES.base5,
                    borderWidth: SIZES.thin,
                    borderColor: !gridV ? COLORS.white : COLORS.gray4,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: !gridV ? COLORS.primaryLight : null,
                  }}
                >
                  <MaterialCommunityIcons
                    name="view-list"
                    size={SIZES.base3}
                    color={!gridV ? COLORS.primary : COLORS.gray3}
                  />
                </Pressable>
                <Pressable
                  onPress={() => handleViewSelect(true)}
                  style={{
                    width: SIZES.base5,
                    height: SIZES.base5,
                    borderRadius: SIZES.base5,
                    borderWidth: SIZES.thin,
                    borderColor: gridV ? COLORS.white : COLORS.gray4,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: gridV ? COLORS.primaryLight : null,
                  }}
                >
                  <MaterialCommunityIcons
                    name="view-day"
                    size={SIZES.base3}
                    color={gridV ? COLORS.primary : COLORS.gray3}
                  />
                </Pressable>
              </View>
            </View>
            <CustomButton
              onPress={handleShowSearchResult}
              text={"Show Result"}
              fill={true}
            />
          </ScrollView>
        </BottomSheet>
      )}
      {!openSetting  && !openSettingPremium && <FloatingBotton setOpenUpgradeDeliverModal={setOpenUpgradeDeliverModal} navigation={navigation} />}
      {openSettingPremium && (
        <BottomSheet
          ref={bottomSheetRefPremium}
          index={0}
          snapPoints={snapPointsPremium}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ color: COLORS.primary }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingVertical: SIZES.base2,
              paddingHorizontal: SIZES.base2,
              backgroundColor: COLORS.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h3,
                  color: COLORS.accent,
                  textAlign: "center",
                }}
              >
                Explore Other Neighborhoods
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: SIZES.base,
                paddingVertical: SIZES.base3,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>Distance from you</Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                  gap: SIZES.base,
                  justifyContent: "space-between",
                }}
              >
                {[10, 20, 30].map(
                  (option, index) => (
                    <View
                      key={index}
                      style={[
                        styles.option,
                       distanceOption === option && styles.activeOption,
                      ]}
                      onTouchEnd={() => 
                        {
                          if (subscriptionInfo.subscriptionType !== "free") {
                            handleOptionSelectDistance(option);
                          
                          } else {
                            setOpenUpgradeBasicModal(true)
                            setOpenSetting(false)
                            setOpenSettingPremium(false)
                            handleCloseBottomSheetPremium();
                            handleCloseBottomSheet();
                          }    
                          }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          distanceOption === option && styles.activeOptionText,
                        ]}
                      >
                        {option == 10 ? "+10 min" : option == 20 ? "+20 min" : "+30 min"}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
           
            <CustomButton
              onPress={handleExplore}
              text={"Explore"}
              fill={true}
            />
          </ScrollView>
        </BottomSheet>
      )}
      <UpgradeBasicModal
        openUpgradeBasicModal={openUpgradeBasicModal}
        setOpenUpgradeBasicModal={setOpenUpgradeBasicModal}
        navigation={navigation}
        plan={"Basic"}
        heading={"Upgrade to explore"}
        subheading={"other neighborhoods"}
      />
       <UpgradeDeliverModal
        openUpgradeDeliverModal={openUpgradeDeliverModal}
        setOpenUpgradeDeliverModal={setOpenUpgradeDeliverModal}
        navigation={navigation}
        plan={"Basic"}
        heading={"Upgrade to Request"}
        subheading={"delivery"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
  SearchBox: {
    gap: SIZES.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.base3,
  },
  slider: {
    flex: 1,
    alignSelf: "center",
    // Add any other styles you want for the slider container
  },
  thumb: {
    width: SIZES.base2,
    height: SIZES.base2,
    borderRadius: SIZES.base2,
    backgroundColor: COLORS.gray4,
    borderColor: COLORS.gray4,
    // Customize thumb styles as needed
  },
  rail: {
    flex: 1,
    height: SIZES.thickness,
    backgroundColor: COLORS.gray4,
    // Customize rail styles as needed
  },
  railSelected: {
    flex: 1,
    height: SIZES.thickness,
    backgroundColor: COLORS.primary,
    // Customize selected rail styles as needed
  },
  label: {
    textAlign: "center",
    color: COLORS.accent,
    // Customize label styles as needed
  },
  notch: {
    width: SIZES.thin,
    height: SIZES.thin,
    borderRadius: SIZES.base2,
    backgroundColor: COLORS.primary,
    // Customize notch styles as needed
  },
  option: {
    borderRadius: SIZES.thickness,
    borderWidth: SIZES.thin,
    borderColor: COLORS.gray4,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base,
  },
  activeOption: {
    borderColor: COLORS.primary,
  },
  optionText: {
    ...FONTS.body4,
    color: COLORS.gray3,
  },
  activeOptionText: {
    color: COLORS.primary,
  },
});

export default Explore;
