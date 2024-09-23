import React, { useState } from "react";
import { View, TextInput, Text, FlatList, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { FONTS, SIZES, COLORS } from "../../constant";
import { EXPO_PUBLIC_GOOGLE_API_KEY } from "@env";

const API_KEY = "YOUR_GOOGLE_PLACES_API_KEY"; // Add your Google API key here

export default function CustomGooglePlacesInput2({ placeholder, icon, textIcon, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const fetchPlaces = async (input) => {
    if (input.length > 2) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${EXPO_PUBLIC_GOOGLE_API_KEY}&types=address`
      );
      const result = await response.json();
      setSuggestions(result.predictions);
    } else {
      setSuggestions([]);
    }
  };

  const handleChangeText = (value) => {
    setText(value);
    fetchPlaces(value);  // Fetch Google Places suggestions
  };

  const handleSelectSuggestion = (description) => {
    setText(description);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <View>
      <View
        style={{
          ...FONTS.body3,
          borderWidth: SIZES.thickness / 3,
          borderColor: isFocused ? COLORS.primary : COLORS.gray4,
          color: COLORS.tertiary,
          marginVertical: SIZES.thickness,
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: SIZES.base,
          padding: SIZES.base2,
          borderRadius: SIZES.radius / 2,
        }}
      >
        {icon && <AntDesign name={icon} size={SIZES.base3} color={COLORS.gray3} />} 
        {textIcon && <Text style={{ ...FONTS.h2, color: COLORS.gray3 }}>{textIcon}</Text>}
        <TextInput
          value={text}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            flex: 1,
            ...FONTS.body3,
            color: COLORS.tertiary,
          }}
          placeholder={placeholder}
          {...rest}
        />
      </View>

      {/* Display suggestions in a dropdown list */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectSuggestion(item.description)}>
              <Text
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.gray4,
                }}
              >
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
