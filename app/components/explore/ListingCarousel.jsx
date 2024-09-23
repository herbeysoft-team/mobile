import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useState, useRef } from "react";
import { FONTS, COLORS, SIZES, URLBASE } from "../../constant";
import placeholder from "../../../assets/placeholder.png";

export default function ListingCarousel({ images }) {
  const flatListRef = useRef(null);
  const [slides, setSlides] = useState(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZES.width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SIZES.width}
        snapToAlignment="center"
        decelerationRate={"fast"}
        pagingEnabled={true}
        onScroll={(images) => {
          const offset = images.nativeEvent.contentOffset.x / SIZES.width;
          const slideIndex = parseInt(offset + 1);
          setSlides(slideIndex);
        }}
        scrollEventThrottle={0}
        horizontal={true}
        data={images}
        renderItem={({ item }) => {
          return (
            <View style={{ width: SIZES.wp(100) }}>
              <Image
                source={item ? { uri: `${URLBASE.imageBaseUrl}${item}`} : placeholder}
                style={{
                  flex: 1,
                  width: SIZES.width,
                  height: SIZES.hp(25),
                  resizeMode: "cover",
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: SIZES.base,
                  left: SIZES.base3,
                  paddingHorizontal: SIZES.base,
                  paddingVertical: SIZES.thickness,
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.base,
                  alignItems:"center",
                  justifyContent:"center"
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.white }}>
                  {`${slides}/${images.length} `}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {/* Indicator container */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: SIZES.base,
        }}
      >
        {/* Render indicator */}
        {images.map((_, index) => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
});
