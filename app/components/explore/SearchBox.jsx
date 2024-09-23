import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { FONTS, COLORS, SIZES } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { filterListingsBySearch, getListingsByLocation } from "../../context/features/listingSlice";

const SearchBox = ({ handleOpenBottomSheetSetting }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const { userLocation } = useSelector((state) => state.map);
  const listingSelectedDistance = useSelector(
    (state) => state.map.listingSelectedDistance
  );
  const location = {
    longitude: userLocation?.longitude,
    latitude: userLocation?.latitude,
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if(text.length > 3){
      dispatch(filterListingsBySearch(text))
    }else{
      if(text.length == 0){
        dispatch(getListingsByLocation({ location, listingSelectedDistance }));
      }
    }
  };

  return (
    <View style={styles.SearchBox}>
      <View
        style={{
          paddingHorizontal: SIZES.base2,
          paddingVertical: SIZES.base2,
          flexDirection: 'row',
          borderRadius: SIZES.base,
          borderColor: COLORS.gray4,
          borderWidth: SIZES.thin,
          flex: 6,
          alignItems: 'center',
          gap: SIZES.base2,
        }}
      >
        <Feather name="search" size={SIZES.base2} color={COLORS.gray3} />
        <TextInput
          placeholder="Search listings"
          placeholderTextColor={COLORS.gray3}
          style={{ ...FONTS.body3, color: COLORS.gray3asdx }}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity onPress={handleOpenBottomSheetSetting}>
        <View
          style={{
            paddingHorizontal: SIZES.base,
            paddingVertical: SIZES.base,
            flex: 1,
            borderRadius: SIZES.base,
            borderColor: COLORS.gray4,
            borderWidth: SIZES.thin,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="options-outline" size={SIZES.base4} color={COLORS.gray3} />
        </View>
      </TouchableOpacity>
    </View>
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
});

export default SearchBox;
