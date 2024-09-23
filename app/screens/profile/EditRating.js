import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderMedium from "../../components/general/HeaderMedium";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import { getItem } from "../../utils/asyncStorage.js";
import { useRoute } from "@react-navigation/native";
import { RatingInput } from "react-native-stock-star-rating";
import CustomMultiLineInput from "../../components/auth/CustomMultiLineInput.jsx";
import CustomButton from "../../components/auth/CustomButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateReview, getMyReviews } from "../../context/features/reviewSlice";
import Toast from "react-native-toast-message";

export default function EditRating({ navigation }) {
  const dispatch = useDispatch();
  const route = useRoute();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { loadingupdatereview } = useSelector((state) => state.review);

  useEffect(() => {
    setRating(route?.params?.rating);
    setReview(route?.params?.comment);
  }, []);

  const handleUpdateRating = () => {
    try {
      const formData = {
        reviewId: route?.params?._id,
        rating: rating,
        comment: review,
      };
      dispatch(
        updateReview({
          formData,
          Toast,
          navigation,
        })
      );
      setTimeout(async () => {
        const getId = await getItem("trowmartuserId");
        if (getId) {
          dispatch(getMyReviews(getId));
        }
      }, 1000);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderMedium navigation={navigation} title={"Edit Review"} />
        <KeyboardAvoidingView behavior="padding">
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: SIZES.base16 }}
          >
            <View
              style={{
                marginTop: SIZES.base,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.gray4,
                color: COLORS.tertiary,
                marginVertical: SIZES.thickness,
                padding: SIZES.base,
                borderRadius: SIZES.radius / 2,
              }}
            >
              <RatingInput
                rating={rating}
                setRating={setRating}
                size={SIZES.base4}
                maxStars={5}
                bordered={false}
              />
            </View>
            {loadingupdatereview && (
              <ActivityIndicator size="small" color={COLORS.tertiary} />
            )}
            <View style={{ marginTop: SIZES.base, marginBottom: SIZES.base2 }}>
              <Text style={styles.inputheading}>Review</Text>
              <CustomMultiLineInput
                multiline={true}
                value={review}
                onChangeText={(text) => setReview(text)}
                placeholder="Review"
              />
            </View>
           
            <CustomButton
              text={"Submit"}
              onPress={handleUpdateRating}
              fill={true}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
  header: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base2,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
  subheading: {
    color: COLORS.tertiary,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
  inputheading: {
    color: COLORS.gray3,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
  underheading: {
    color: COLORS.gray3,
    ...FONTS.body4,
    marginTop: SIZES.thickness,
    lineHeight: SIZES.base2,
  },
});
