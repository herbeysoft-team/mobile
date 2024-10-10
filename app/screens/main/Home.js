import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Platform,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import placeholder from "../../../assets/placeholder.png";
import SearchBar from "../../components/home/SearchBar";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import CustomButton from "../../components/auth/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import AppMapView from "../../components/home/AppMapView";
import { setUserLocation } from "../../context/features/mapSlice";
import {
  getVendorsByLocation,
  getVendorListings,
} from "../../context/features/vendorSlice";
import { useDispatch, useSelector } from "react-redux";
import FloatingBotton from "../../components/general/FloatingBotton";
import DistanceMapModel from "../../components/general/DistanceMapModel";
import { getItem, removeItem } from "../../utils/asyncStorage.js";
import { getUserProfile } from "../../context/features/userSlice";
import { getSubscriptionPlan } from "../../context/features/subscriptionSlice.js";
import UpgradeBasicModal from "../../components/general/UpgradeBasicModal.js";
import UpgradeDeliverModal from "../../components/general/UpgradeDeliverModal.js";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.map);
  const selectedDistance = useSelector((state) => state.map.selectedDistance);
  const [openMapTimeModal, setOpenMapTimeModal] = useState(false);
  const [openUpgradeBasicModal, setOpenUpgradeBasicModal] = useState(false);
  const [openUpgradeDeliverModal, setOpenUpgradeDeliverModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const { vendorbylocation, vendorlistings } =
    useSelector((state) => state.vendor);
  // ref
  const bottomSheetRefHome = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["50%"], ["80%"]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const handleCloseBottomSheet = () => bottomSheetRefHome.current?.close();
  const handleOpenBottomSheet = () => bottomSheetRefHome.current?.expand();

  // Set default location in Nigeria (Lagos)
  const defaultRegion = {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.10922,
    longitudeDelta: 0.0921,
  };

  const [mapRegion, setMapRegion] = useState(defaultRegion);

  const handleCloseVendor = (item) => {
    setSelectedVendor(null);
    setMapRegion({
      latitude: userLocation?.latitude || defaultRegion.latitude,
      longitude: userLocation?.longitude || defaultRegion.longitude,
      latitudeDelta:
        selectedDistance == 20
          ? 0.20922
          : selectedDistance == 30
          ? 0.30922
          : 0.10922,
      longitudeDelta:
        selectedDistance == 20
          ? 0.1821
          : selectedDistance == 30
          ? 0.2721
          : 0.0921,
    });
    setIsBottomSheetOpen(false);
    handleCloseBottomSheet();
  };

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(null);
    setSelectedVendor(vendor);
    setMapRegion({
      latitude: vendor?.location?.coordinates[1],
      longitude: vendor?.location?.coordinates[0],
      latitudeDelta:
        selectedDistance == 20
          ? 0.20922
          : selectedDistance == 30
          ? 0.30922
          : 0.10922,
      longitudeDelta:
        selectedDistance == 20
          ? 0.1821
          : selectedDistance == 30
          ? 0.2721
          : 0.0921,
    });
    setIsBottomSheetOpen(true);
    dispatch(getVendorListings(vendor._id));
    handleOpenBottomSheet(); // Open the bottom sheet when a vendor is selected
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
  // render
  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        style={styles.itemContainer}
        onPress={() => navigation.navigate("Listing-Detail", item)}
      >
        <View
          style={{
            paddingVertical: SIZES.thickness,
            borderRadius: SIZES.base,
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: SIZES.base,
            marginBottom: SIZES.thin,
            // borderBottomColor: COLORS.gray4,
            // borderBottomWidth: SIZES.thin,
          }}
        >
          <View >
            <Image
              source={{ uri: `${URLBASE.imageBaseUrl}${item?.image[0]}` }}
              style={{
                height: SIZES.hp(12),
                width: SIZES.hp(12),
                borderRadius: SIZES.base,
                resizeMode: "cover",
              }}
            />
            <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
              {item?.type == "product"
                ? `₦${item?.price}`
                : `₦${item?.price}/${item?.unit}`}
            </Text>
            <Text style={{ ...FONTS.body4, color: COLORS.accent2,  }}>
              {item?.name?.length > 14 ? `${item?.name.substring(0,15)}..`: item?.name}
            </Text>
          </View>
        </View>
      </Pressable>
    ),
    []
  );

  const [selectedVendor, setSelectedVendor] = useState(null);

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     // Request permission to access location
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     // Get current position
  //     let location = await Location.getCurrentPositionAsync({});
  //     if (location) {
  //       console.log(location);
  //       dispatch(setUserLocation(location.coords)); // Dispatch the user's location to Redux

  //       // Set map region based on selected distance
  //       setMapRegion({
  //         latitude: location.coords?.latitude,
  //         longitude: location.coords?.longitude,
  //         latitudeDelta:
  //           selectedDistance == 20
  //             ? 0.20922
  //             : selectedDistance == 30
  //             ? 0.30922
  //             : 0.10922,
  //         longitudeDelta:
  //           selectedDistance == 20
  //             ? 0.1821
  //             : selectedDistance == 30
  //             ? 0.2721
  //             : 0.0921,
  //       });
  //     }
  //   };

  //   fetchLocation(); // Call the location fetcher on mount and when `selectedDistance` changes
  // }, [selectedDistance]); // Dependency array: run the effect when `selectedDistance` changes


  const fetchLocation = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "warn",
          text1:"Permission to access location was denied",
        });
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        dispatch(setUserLocation(location.coords));
        setMapRegion({
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
          latitudeDelta:
            selectedDistance == 20
              ? 0.20922
              : selectedDistance == 30
              ? 0.30922
              : 0.10922,
          longitudeDelta:
            selectedDistance == 20
              ? 0.1821
              : selectedDistance == 30
              ? 0.2721
              : 0.0921,
        });
      }
    } catch (error) {
      setErrorMsg("Failed to fetch location. Please try again.");
      console.error("Error fetching location:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDistance, dispatch]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const handleRefresh = () => {
    fetchLocation();
  };

  const location = {
    longitude: userLocation?.longitude,
    latitude: userLocation?.latitude,
  };

  useEffect(() => {
    if (userLocation?.longitude) {
      dispatch(getVendorsByLocation({ location, selectedDistance }));
    }
  }, [userLocation?.longitude, selectedDistance]);

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const getId = await getItem("trowmartuserId");
        if (getId) {
          dispatch(getUserProfile(getId));
          dispatch(getSubscriptionPlan());
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <CustomButton
          text={"Refresh"}
          onPress={handleRefresh}
          fill={true}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        setOpenMapTimeModal={setOpenMapTimeModal}
        navigation={navigation}
      />
      <AppMapView
        vendor={vendorbylocation}
        mapRegion={mapRegion}
        isBottomSheetOpen={isBottomSheetOpen}
        onVendorSelect={handleVendorSelect}
      />
      {/* BottomSheet  */}
      {selectedVendor !== null && (
        <BottomSheet
          ref={bottomSheetRefHome}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ color: COLORS.primary }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.base2,
              backgroundColor: COLORS.white,
              zIndex: 3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderColor: COLORS.gray4,
                paddingVertical: SIZES.thickness,
                borderBottomWidth: SIZES.thin / 2,
                marginBottom: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <Image
                  source={
                    selectedVendor?.profile
                      ? {
                          uri: `${URLBASE.imageBaseUrl}${selectedVendor?.profile}`,
                        }
                      : placeholder
                  }
                  style={{
                    height: SIZES.base6,
                    width: SIZES.base6,
                    borderRadius: SIZES.base6,
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: SIZES.base,
                    }}
                  >
                    <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
                      {selectedVendor?.fullname || selectedVendor?.businessName}
                    </Text>
                    {selectedVendor?.verifiedAccount && (
                      <MaterialIcons
                        name="verified"
                        size={SIZES.base2}
                        color={COLORS.primary}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: SIZES.base,
                    }}
                  >
                    <FontAwesome
                      name="star"
                      size={SIZES.base2}
                      color={COLORS.amber}
                    />
                    <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                      {`${selectedVendor?.rating} (${selectedVendor?.ratingCount})`}
                    </Text>
                  </View>
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
                    <Text
                      numberOfLines={1}
                      style={{ ...FONTS.body4, color: COLORS.gray3 }}
                    >
                      {`${selectedVendor?.address?.slice(0, 20)} . ${parseInt(
                        selectedVendor?.travelTimeMinutes
                      )}min away`}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={handleCloseVendor}>
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.gray2,
                    borderRadius: SIZES.base4,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign
                    name="close"
                    size={SIZES.base2}
                    color={COLORS.tertiary}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={{ ...FONTS.h3, color: COLORS.tertiary, paddingBottom: SIZES.base }}>
              {vendorlistings.length > 0 ? "Recent Listings" : ""}
            </Text>
            {vendorlistings.length > 0 ? (
              <FlatList
                data={vendorlistings}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <View>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.gray,
                    paddingVertical: SIZES.base3,
                  }}
                >
                  No Listing Yet!
                </Text>
              </View>
            )}
            <CustomButton
              fill={false}
              text={"View Vendor"}
              onPress={() =>
                navigation.navigate("Vendor-Profile", {
                  vendor: selectedVendor,
                })
              }
            />
          </View>
        </BottomSheet>
      )}

      {selectedVendor === null && <FloatingBotton setOpenUpgradeDeliverModal={setOpenUpgradeDeliverModal} navigation={navigation} />}

      <DistanceMapModel
        openMapTimeModal={openMapTimeModal}
        setOpenMapTimeModal={setOpenMapTimeModal}
        setOpenUpgradeBasicModal={setOpenUpgradeBasicModal}
        
      />

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
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    shadowColor: COLORS.gray4, // Add shadow color for Android
    shadowOffset: { width: 0, height: SIZES.thin }, // Add shadow offset for Android
    shadowOpacity: 0.3, // Add shadow opacity for Android
    shadowRadius: 4, // Add shadow radius for Android
    elevation: SIZES.thickness, // Add elevation for Android
  },
  header: {
    ...FONTS.header,
    color: COLORS.accent,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    width: SIZES.base6,
    height: SIZES.base6,
    borderRadius: SIZES.base6,
    borderColor: COLORS.gray4,
    borderWidth: SIZES.thin,
    elevation: SIZES.thickness,
    shadow: SIZES.thickness,
    shadowColor: COLORS.gray2,
    shadowOffset:
      Platform.OS === "ios" ? { width: 0, height: SIZES.thickness } : undefined,
    shadowOpacity: Platform.OS === "ios" ? 0.3 : undefined,
    shadowRadius: Platform.OS === "ios" ? 4 : undefined,
    zIndex: 2,
  },
  arrow: {
    position: "relative",
    top: -SIZES.base2,
    width: 0,
    height: 0,
    borderTopWidth: SIZES.base3,
    borderRightWidth: SIZES.base3,
    borderBottomWidth: 0,
    borderLeftWidth: SIZES.base3,
    borderTopColor: COLORS.white,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    elevation: SIZES.thickness,
    shadow: SIZES.thickness,
    shadowOffset: SIZES.thin,
    shadowColor: COLORS.gray2,
  },
  contentContainer: {
    flexDirection: "row", // Ensure items are laid out horizontally
    alignItems: "center", // Align items in the center
    paddingBottom: SIZES.base
  },
  itemContainer: {
    marginHorizontal: SIZES.base,
  },
  errorMsg:{

  }
});
