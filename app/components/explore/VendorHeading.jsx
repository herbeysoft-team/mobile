import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useEffect, useMemo } from "react";
  import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
  import { useDispatch, useSelector } from "react-redux";
  import { getVendorHeader } from "../../context/features/vendorSlice";
 
  
  export default function VendorHeading({ navigation, user }) {
    const dispatch = useDispatch();
  
    // Filter the vendor based on the user ID
    const vendorheader = useSelector((state) => state.vendor[user])

    useEffect(() => {
     if (user) {
        dispatch(getVendorHeader({ id: user }));
      }
    }, [user]);
  
    const vendorHeader = useMemo(() => vendorheader, [vendorheader]);

    return (
      <Text style={{ ...FONTS.h3, color: COLORS.accent2 }}>
        {`Vendor : ${vendorHeader?.fullname || vendorHeader?.businessName}`}
      </Text>
       
    );
  }
  
  const styles = StyleSheet.create({});
  