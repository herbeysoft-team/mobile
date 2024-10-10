import {
  Image,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Circle, PROVIDER_GOOGLE, } from "react-native-maps";
import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "../../../assets/placeholder.png";

const customMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];
const AppMapView = ({ vendor, mapRegion, onVendorSelect, isBottomSheetOpen }) => {
  const [selectedVendor, setSelectedVendor] = useState(null)
  const selectedDistance = useSelector((state) => state.map.selectedDistance);
  // Define different radii for the circles
  const handleVendorSelect = (vendor) => {
    onVendorSelect(vendor);
    setSelectedVendor(vendor);
  };
  useEffect(() => {
    if (!isBottomSheetOpen) {
      setSelectedVendor(null); // Reset selectedVendor when the bottom sheet is closed
    }
  }, [isBottomSheetOpen]);

  const circleData = [
    {
      radius: selectedDistance == 20 ? 200: selectedDistance == 30 ? 300 : 100,
      fillColor: "rgba(10, 161, 221, 1.0)",
      strokeColor: "rgba(10, 161, 221, 1.0)",
    },
    {
      radius: selectedDistance == 20 ? 2000: selectedDistance == 30 ? 3000 : 1000,
      fillColor: "rgba(255, 255, 255, 1.0)",
      strokeColor: "rgba(255, 255, 255, 1.0)",
    },
    {
      radius: selectedDistance == 20 ? 4000: selectedDistance == 30 ? 6000 : 2000,
      fillColor: "rgba(10, 161, 221, 0.3)",
      strokeColor: "rgba(10, 161, 221, 0.3)",
      
    },
    {
      radius: selectedDistance == 20 ? 6000: selectedDistance == 30 ? 9000 : 3000,
      fillColor: "rgba(10, 161, 221, 0.1)",
      strokeColor: "rgba(10, 161, 221, 0.1)",
    },
    {
      radius: selectedDistance == 20 ? 9000: selectedDistance == 30 ? 13500 : 4500,
      fillColor: "rgba(192, 192, 192, 0.2)",
      strokeColor: "rgba(192, 192, 192, 0.2)",
    },
  ];
  return (
    mapRegion.latitude && (
      <MapView
        style={styles.map}
        customMapStyle={customMapStyle}
        provider={Platform.OS === "ios" ? PROVIDER_GOOGLE : PROVIDER_GOOGLE} // Apple Maps on iOS, Google Maps on Android
        showsUserLocation={true}
        region={mapRegion}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        {/* Circle to represent the radar */}
        {circleData?.map((circle, index) => (
          <Circle
            key={index}
            center={mapRegion}
            radius={circle.radius} // Use different radii from the circleData array
            fillColor={circle.fillColor} // Use different fill colors
            strokeColor={circle.strokeColor} // Use different stroke colors
            strokeWidth={2}
          />
        ))}
        {vendor?.length > 0 && vendor.map((item, index) => (
          <Marker
            onPress={() => handleVendorSelect(item)}
            key={item._id}
            coordinate={{
              latitude: item.location.coordinates[1],
              longitude: item.location.coordinates[0],
            }}
          >
            <View style={{ alignItems: "center", shadow: SIZES.base3, elevation:4, shadowColor: COLORS.gray, zindex: 4 }}>
              <View
                style={[
                  styles.marker,
                  {
                    backgroundColor:
                      selectedVendor?._id === item?._id
                        ? COLORS.primary
                        : COLORS.white,
                  },
                ]}
              >
                <Image
                  source={
                    item?.profile
                      ? { uri: `${URLBASE.imageBaseUrl}${item?.profile}` }
                      : placeholder
                  }
                  style={{
                    height: SIZES.base5,
                    width: SIZES.base5,
                    borderRadius: SIZES.base5,
                    resizeMode: "cover",
                  }}
                />
              </View>
              <View
                style={[
                  styles.arrow,
                  {
                    borderTopColor:
                      selectedVendor?._id === item?._id
                        ? COLORS.primary
                        : COLORS.white,
                  },
                ]}
              />
            </View>
          </Marker>
        ))}
      </MapView>
    )
  );
};

export default AppMapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
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
    // shadowOffset:
    //   Platform.OS === "ios" ? { width: 0, height: SIZES.thickness } : undefined,
    // shadowOpacity: Platform.OS === "ios" ? 0.3 : undefined,
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
    shadowOffset: SIZES.thin,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
  },
  contentContainer: {
    flexDirection: "row", // Ensure items are laid out horizontally
    alignItems: "center", // Align items in the center
  },
  itemContainer: {
    marginHorizontal: SIZES.base,
  },
});
