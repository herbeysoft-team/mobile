import { StyleSheet, View } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";

const Pagination = ({slides, }) => {
  return (
    <View
      style={{
        height: height * 0.25,
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      {/* Indicator container */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {/* Render indicator */}
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && {
                backgroundColor: COLORS.white,
                width: 25,
              },
            ]}
          />
        ))}
      </View>

      {/* Render buttons */}
      <View style={{ marginBottom: 20 }}>
        {currentSlideIndex == slides.length - 1 ? (
          <View style={{ height: 50 }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.replace("HomeScreen")}
            >
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  borderColor: COLORS.white,
                  borderWidth: 1,
                  backgroundColor: "transparent",
                },
              ]}
              onPress={skip}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: COLORS.white,
                }}
              >
                SKIP
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={goToNextSlide}
              style={styles.btn}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dots: {
    height: 10,
    width: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 10,
    borderRadius: 1,
  },
});
