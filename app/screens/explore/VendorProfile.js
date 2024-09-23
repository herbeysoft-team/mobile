import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import React, { useEffect } from "react";
import { FONTS, SIZES, COLORS,URLBASE } from "../../constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Ionicons, MaterialIcons} from "@expo/vector-icons";
import HeaderMini from "../../components/general/HeaderMini";
import { FontAwesome } from "@expo/vector-icons";
import VendorReviewCard from "../../components/explore/VendorReviewCard";
import placeholder from "../../../assets/placeholder.png";
import ListingRoute from "../../components/explore/ListingRoute";
import ReviewRoute from "../../components/explore/ReviewRoute";
import { increaseProfileViews } from "../../context/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    renderLabel={({ route, focused, index }) => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            color: focused ? COLORS.primary : COLORS.gray3,
            margin: 8,
            ...FONTS.body1,
          }}
        >
          {route.title}
        </Text>
      </View>
    )}
    indicatorStyle={{ backgroundColor: COLORS.primary }}
    style={{ backgroundColor: COLORS.white }}
  />
);
export default function VendorProfile({ navigation }) {
  const route = useRoute();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "0", title: "Listings" },
    { key: "1", title: "Reviews" },
  ]);
  const dispatch = useDispatch();
  const {
    id,
    profile,
    fullname,
    businessName,
    address,
    profession,
    industry,
    physicalStore,
    rating,
    ratingCount,
    location
  } = route.params.vendor;

  useEffect(() => {
    if(id){
      dispatch(increaseProfileViews(id))
    }
  }, []);

  useEffect(() => {
    console.log(route.params?.vendor)
  }, []);

  const onDirectionClick=()=>{
      const url = Platform.select({
        ios: "maps:"+location?.coordinates?.longitude + "," +location?.coordinates?.latitude + "?q=" + address,
        android: "geo:"+location?.coordinates?.longitude + "," +location?.coordinates?.latitude + "?q=" + address,
      });
      Linking.openURL(url)
    }


  const renderScene = ({ route }) => {
    switch (route.key) {
      case "0":
        return <ListingRoute navigation={navigation} id={id} />;
      case "1":
        return <ReviewRoute navigation={navigation} id={id} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderMini title={"Vendor Profile"} navigation={navigation} />
      </View>
      <View
        style={{
          paddingTop: SIZES.base2,
          paddingHorizontal: SIZES.base2,
          alignItems: "center",
          gap: SIZES.base,
        }}
      >
        <Image
          source={
            profile ? { uri: `${URLBASE.imageBaseUrl}${profile}` } : placeholder
          }
          style={{
            height: SIZES.base8,
            width: SIZES.base8,
            borderRadius: SIZES.base6,
          }}
        />
     
        <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
          {fullname || businessName}
        </Text>
        <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
          {profession || industry}
        </Text>
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
            numberOfLines={2}
            style={{ ...FONTS.body4, color: COLORS.gray3 }}
          >
            {address}
          </Text>
        </View>

        {/**RATING HERE */}
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
                {`${rating?.toFixed(1)} (${ratingCount})`}
              </Text>
            </View>
        {
          physicalStore &&
        
        <TouchableOpacity
        onPress={()=>onDirectionClick()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: SIZES.thickness,
            backgroundColor: COLORS.primaryLight,
            borderRadius: SIZES.base,
            padding: SIZES.thickness,
          }}
        >
          <MaterialIcons name="storefront" size={SIZES.base2} color={COLORS.primary} />
          
          <Text
            numberOfLines={2}
            style={{ ...FONTS.body4, color: COLORS.primary }}
          >
            {"Physical Store"}
          </Text>
        </TouchableOpacity>
}
      </View>
      {/* the tabview  */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SIZES.wp(100) }}
        sceneContainerStyle={{ backgroundColor: COLORS.white }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
});
