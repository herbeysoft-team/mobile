import { View, Text, ScrollView } from "react-native";
import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
import React,{useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendorListings } from "../../context/features/vendorSlice";
import VendorListingCardView from "./VendorListingCardView";

const ListingRoute = ({ navigation, id }) => {
  const dispatch = useDispatch();
  const { loadingvendorlisting, vendorlistings } = useSelector(
    (state) => state.vendor
  );

  useEffect(() => {
    if(id){
    dispatch(getVendorListings(id));
    }
  }, [id]);

  const memoizeVendorListings = useMemo(() => vendorlistings, [vendorlistings]);
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.base2,
      }}
    >
      {memoizeVendorListings.length > 0 &&
        memoizeVendorListings
          .map((item, index) => (
            <VendorListingCardView
              key={item._id}
              listing={item}
              navigation={navigation}
            />
          ))}
    </ScrollView>
  );
};

export default ListingRoute;
