import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { debounce } from 'lodash';
import { AntDesign } from '@expo/vector-icons'; 
import { FONTS, SIZES, COLORS } from "../../constant";

const GOOGLE_PLACES_API_KEY = 'AIzaSyDgSyLmL2N4abIHtWRY7HnCFx3XZwpCb3M'; // Replace with your actual API key

const GooglePlaceAutocomplete = ({ onPlaceSelected, placeholder, countryCode, icon, ...rest }) => {
    const [query, setQuery] = useState('');
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
      };
    
      const handleBlur = () => {
        setIsFocused(false);
      };
  
    const searchPlaces = useRef(
      debounce(async (input) => {
        if (input.length > 3) {
          setIsLoading(true);
          try {
            let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_PLACES_API_KEY}`;
            
            // Add country restriction if countryCode is provided
            if (countryCode) {
              url += `&components=country:${countryCode}`;
            }
  
            const response = await fetch(url);
            const data = await response.json();
            setPlaces(data.predictions);
          } catch (error) {
            console.error('Error fetching places:', error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setPlaces([]);
        }
      }, 300)
    ).current;
  
    useEffect(() => {
      searchPlaces(query);
    }, [query]);

    const getPlaceDetails = async (placeId) => {
      try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${GOOGLE_PLACES_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.result && data.result.geometry && data.result.geometry.location) {
          return {
            latitude: data.result.geometry.location.lat,
            longitude: data.result.geometry.location.lng
          };
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
      return null;
    };
  
    const handleSelectPlace = async (place) => {
      onPlaceSelected(place);
      setQuery(place.description);
      setPlaces([]);

      const coordinates = await getPlaceDetails(place.place_id);
      onPlaceSelected({ ...place, coordinates });
    };
  
    return (
      <View 
      onFocus={handleFocus}
      onBlur={handleBlur} 
      style={{
        ...FONTS.body3,
        borderWidth: SIZES.thickness / 3,
        borderColor: isFocused ? COLORS.primary : COLORS.gray4,
        color: COLORS.tertiary,
        marginVertical: SIZES.thickness,
      
        // flexDirection:"row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: SIZES.base,
        padding: SIZES.base,
        borderRadius: SIZES.radius / 2,
      }}>
        <View style={{flexDirection:"row", gap: SIZES.base/2, marginTop: SIZES.base3/2, paddingLeft: SIZES.base/2, alignItems: "center"}}>
        {icon && <AntDesign name={icon} size={SIZES.base3} color={COLORS.gray3} />} 
        <TextInput
          style={{
            flex:1,
            ...FONTS.body3,
            color: COLORS.tertiary,
          }}
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor={COLORS.tertiary}
        />
           </View>
        {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestion}
              onPress={() => handleSelectPlace(item)}
            >
              <Text style={styles.suggestionText}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
    },
    input: {
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      backgroundColor: COLORS.white,
    },
    loadingText: {
      marginTop: SIZES.base2,
      color: COLORS.accent,
      fontStyle: 'italic',
      ...FONTS.body4
    },
    suggestion: {
      backgroundColor: COLORS.white,
      padding: SIZES.base2,
      borderBottomWidth: SIZES.thin,
      borderBottomColor: COLORS.gray4,
      
    },
    suggestionText: {
      ...FONTS.body3,
      color: COLORS.gray3
    },
  });
  
  export default GooglePlaceAutocomplete;