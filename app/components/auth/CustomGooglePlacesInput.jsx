import React, { useState, useRef, useEffect } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FONTS, SIZES, COLORS } from "../../constant";
import { EXPO_PUBLIC_GOOGLE_API_KEY } from "@env";

export default function CustomGooglePlacesInput({
  value,
  setLocation,
  placeholder,
  icon,
  ...rest
}) {
  const locationref = useRef();

  useEffect(() => {
    locationref.current?.setAddressText("");
  }, [setLocation]);

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        ...FONTS.body3,
        borderWidth: SIZES.thickness / 3,
        borderColor: isFocused ? COLORS.primary : COLORS.gray4,
        color: COLORS.tertiary,
        marginVertical: SIZES.thin,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: SIZES.base2,
        padding: SIZES.base2,
        borderRadius: SIZES.radius / 2,
        zIndex:3000,
      }}
    >
      <GooglePlacesAutocomplete
        ref={locationref}
        placeholder={placeholder}
        minLength={3}
        value={value}
        disableScroll
        fetchDetails={true}
        // debounce={200}
        onPress={(data, details = null) => {
          //console.log(data?.description)
          //setLocation({"address": data?.description, "lat":details?.geometry.location.lat, "lng":details?.geometry.location.lng }); // Use the callback to set the location
          setLocation(data?.description)
          // handlePress({
          //   latitude: details?.geometry.location.lat,
          //   longitude: details?.geometry.location.lng,
          //   address: data.description,
          // });
        }}
        query={{
          key: EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
          components: "country:NG",
        }}
        renderLeftButton={() => (
          <AntDesign
            name={icon}
            size={SIZES.base3}
            color={isFocused ? COLORS.primary : COLORS.gray3}
          />
        )}
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            width: "100%",
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            
          },
          textInput: {
            height: SIZES.base4,
            color: COLORS.accent2,
            ...FONTS.body3,
            backgroundColor: "transparent",
            borderWidth: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingRight: 0,
          },
          listView: {
            position: "absolue",
            top: 0,
            width: "100%",
            shadowColor: COLORS.gray3,
            zIndex: 4000,
            left: -SIZES.base2,
            right: -SIZES.base2,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
          },
        }}
        textInputProps={{
          placeholderTextColor: COLORS.tertiary,
          placeholder: placeholder,
        }}
        enablePoweredByContainer={false}
        {...rest}
      />
    </View>
  );
}
