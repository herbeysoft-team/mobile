import React, { useState, useMemo, useRef, useCallback } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { FONTS, COLORS, SIZES } from "../../constant";

const CustomBottomSheet = ({
  handleCloseBottomSheet,
  renderBackdrop,
  handleOpenBottomSheetSetting,
}) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["60%"], []);
  const [gridView, setGridView] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const handleOpenBottomSheet = () => bottomSheetRef.current?.expand();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ color: COLORS.primary }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: SIZES.base2,
          paddingHorizontal: SIZES.base2,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => {}}>
            <Text style={{ ...FONTS.body4, color: COLORS.white, flex: 1 }}>
              Reset
            </Text>
          </Pressable>
          <Text
            style={{
              flex: 1,
              ...FONTS.h3,
              color: COLORS.accent,
              textAlign: "center",
            }}
          >
            Filter List
          </Text>
          <Pressable onPress={() => {}}>
            <Text style={{ ...FONTS.body3, color: COLORS.primary, flex: 1 }}>
              Reset
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            paddingHorizontal: SIZES.base2,
            paddingVertical: SIZES.base2,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>Price</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.base,
              gap: SIZES.base,
            }}
          >
            <Slider handleValueChange={handleValueChange} />
          </View>
          <MinMaxLabels min={0} max={`100000+`} />
        </View>
        {/* <View
              style={{
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base2,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>Distance from you</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                  gap: SIZES.base,
                }}
              >
                <View
                  style={{
                    borderRadius: SIZES.thickness,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    paddingHorizontal: SIZES.base,
                    paddingVertical: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    Less than 30 min
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: SIZES.thickness,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    paddingHorizontal: SIZES.base,
                    paddingVertical: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    More than 30 min
                  </Text>
                </View>
              </View>
            </View> */}
        <View
          style={{
            paddingHorizontal: SIZES.base2,
            paddingVertical: SIZES.base2,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>Event Time</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.base,
              gap: SIZES.base,
            }}
          >
            <View
              style={{
                borderRadius: SIZES.thickness,
                borderWidth: SIZES.thin,
                borderColor: COLORS.gray4,
                paddingHorizontal: SIZES.base,
                paddingVertical: SIZES.base,
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                This Week
              </Text>
            </View>
            <View
              style={{
                borderRadius: SIZES.thickness,
                borderWidth: SIZES.thin,
                borderColor: COLORS.gray4,
                paddingHorizontal: SIZES.base,
                paddingVertical: SIZES.base,
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                This Month
              </Text>
            </View>
            <View
              style={{
                borderRadius: SIZES.thickness,
                borderWidth: SIZES.thin,
                borderColor: COLORS.gray4,
                paddingHorizontal: SIZES.base,
                paddingVertical: SIZES.base,
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                Next Month
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: SIZES.base2,
            paddingVertical: SIZES.base2,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>View</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.base,
              gap: SIZES.base,
            }}
          >
            <View
              style={{
                width: SIZES.base5,
                height: SIZES.base5,
                borderRadius: SIZES.base5,
                borderWidth: SIZES.thin,
                borderColor: !gridView ? COLORS.white : COLORS.gray4,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: !gridView ? COLORS.primaryLight : null,
              }}
            >
              <MaterialCommunityIcons
                name="view-list"
                size={SIZES.base3}
                color={!gridView ? COLORS.primary : COLORS.gray3}
              />
            </View>
            <View
              style={{
                width: SIZES.base5,
                height: SIZES.base5,
                borderRadius: SIZES.base5,
                borderWidth: SIZES.thin,
                borderColor: gridView ? COLORS.white : COLORS.gray4,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: gridView ? COLORS.primaryLight : null,
              }}
            >
              <MaterialCommunityIcons
                name="view-day"
                size={SIZES.base3}
                color={gridView ? COLORS.primary : COLORS.gray3}
              />
            </View>
          </View>
        </View>
        <CustomButton
          onPress={handleCloseBottomSheet}
          text={"Show Result"}
          fill={true}
        />
      </ScrollView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
