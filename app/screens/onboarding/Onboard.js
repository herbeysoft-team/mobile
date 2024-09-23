import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS, slides } from "../../constant";
import CustomButton from "../../components/auth/CustomButton";
import { setItem } from '../../utils/asyncStorage.js';

const Slide = ({ item }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: SIZES.wp(100),
        height: SIZES.hp(75),
      }}
    >
      <Image source={item?.image} style={styles.image} />
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const Onboard = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZES.width);
    setCurrentSlideIndex(currentIndex);
  };

  // const goToNextSlide = () => {
  //   const nextSlideIndex = currentSlideIndex + 1;
  //   if (nextSlideIndex != slides.length) {
  //     const offset = nextSlideIndex * SIZES.width;
  //     ref?.current.scrollToOffset({ offset });
  //     setCurrentSlideIndex(currentSlideIndex + 1);
  //   }
  // };
  
  const goToSignIn = () => {
    navigation.replace("Login");
    setItem('trowmartonboarded', '1');
  };

  const goToSignUp = () => {
    navigation.replace("Register");
    setItem('trowmartonboarded', '1');
  };
  const Footer = () => {
    return (
      <View
        style={{
          width: SIZES.wp(75),
          height: SIZES.hp(25),
          alignContent: "center",
          justifyContent: "space-evenly",
          paddingHorizontal: 20,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: SIZES.base,
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.primaryDeep,
                  width: SIZES.base3,
                  height: SIZES.thickness,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: SIZES.base6 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                gap: SIZES.base,
              }}
            >
              <CustomButton text={"Sign Up"} onPress={goToSignUp} fill={true}/>
              <CustomButton text={"Sign In"} onPress={goToSignIn} fill={false}/>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                gap: SIZES.base,
              }}
            >
              <CustomButton text={"Sign Up"} onPress={goToSignUp} fill={true}/>
              <CustomButton text={"Sign In"} onPress={goToSignIn} fill={false}/>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        horizontal={true}
        data={slides}
        pagingEnabled={true}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  subtitle: {
    color: COLORS.tertiary,
    ...FONTS.body4,
    marginTop: SIZES.base,
    maxWidth: SIZES.wp(75),
    textAlign: "center",
    lineHeight: SIZES.base2,
  },
  title: {
    color: COLORS.secondary,
    ...FONTS.header,
    marginTop: SIZES.base6,
    textAlign: "center",
    lineHeight: SIZES.base4,
  },
  image: {
    height: SIZES.onboardImageWidth,
    width: SIZES.onboardImageWidth,
    resizeMode: "contain",
  },
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
  btnFill: {
    height: SIZES.base5,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  btnOutline: {
    height: SIZES.base5,
    borderRadius: SIZES.base,
    borderWidth: SIZES.thickness / 3,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "colomn",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});
