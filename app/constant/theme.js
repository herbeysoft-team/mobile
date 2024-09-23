import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const COLORS = {
  background: "#031F2B",
  primary: "#0AA1DD",
  primaryLight: "#E6F8FF",
  primaryDeep: "#006E99",
  secondary: "#003D55",
  indicator: "#E0E0E0",
  tertiary: "#757575",
  accent: "#343434",
  accent2: "#616161",
  white: "#FFFFFF",
  whiteRed: "#FEF1F5",
  whiteGreen: "rgba(74, 175, 87, 0.1)",
  whatsApp: "rgba(37, 211, 102, 1)",
  gray: "#424242",
  gray3: "#9E9E9E",
  gray2: "#F9F9F9",
  gray4: "#EEEEEE",
  black: "#32343E",
  success: "#00C247",
  pink: "#EA1E61",
  error: "#FF3333",
  red: "#F54336",
  brown: "#7A5548",
  purple: "#9D28AC",
  lightGreen: "#8BC255",
  amber: "#FFC02D",
  indigo: "#3F51B2",
  blue: "#0000FF",
  cadetBlue: "#5F9EA0",
  tealGreen: "#006D5B"
};

export const SIZES = {
  // GLOBAL SIZES
  thin: hp(0.1),
  thickness: hp(0.5),
  base: hp(1),
  base2: hp(2),
  base3: hp(3),
  base4: hp(4),
  base5: hp(5),
  base6: hp(6),
  base7: hp(7),
  base8: hp(8),
  base9: hp(9),
  base10: hp(10),
  base11: hp(11),
  base12: hp(12),
  base13: hp(13),
  base14: hp(14),
  base16: hp(16),
  base18: hp(18),
  base20: hp(20),
  font: 14,
  radius: hp(2.5),
  button: hp(5),
  padding: hp(8),
  padding2: hp(12),
  padding3: hp(16),
  tabHeight: hp(10),
  onboardImageWidth: wp(67.2),
  onboardImageHeight: hp(32.1),

  // FONTS SIZES
  rating: hp(8),
  h0: hp(4.1),
  h1: hp(3.1),
  h2: hp(2.6),
  h3: hp(2.1),
  h4: hp(1.6),
  body1: hp(2.2),
  body2: hp(2.0),
  body3: hp(1.8),
  body4: hp(1.4),

  // APP DIMENSIONS
  width,
  height,
  wp,
  hp,
};

export const FONTS = {
  header: { fontFamily: "semi", fontSize: SIZES.h0, fontWeight: "700" },
  h1: { fontFamily: "semi", fontSize: SIZES.h1, fontWeight: "700" },
  h2: { fontFamily: "semi", fontSize: SIZES.h2, fontWeight:"700" },
  h3: { fontFamily: "semi", fontSize: SIZES.h3, fontWeight: "700" },
  h4: { fontFamily: "semi", fontSize: SIZES.h4, fontWeight: "700" },
  rating: { fontFamily: "semi", fontSize: SIZES.rating, fontWeight: "700" },
  body1: { fontFamily: "medium", fontSize: SIZES.body1, fontWeight: "400" },
  body2: { fontFamily: "medium", fontSize: SIZES.body2, fontWeight: "400" },
  body3: { fontFamily: "medium", fontSize: SIZES.body3, fontWeight: "400" },
  body4: { fontFamily: "medium", fontSize: SIZES.body4 },
  listHead: {fontFamily: "semi", fontSize: SIZES.body3, fontWeight: "700"}
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
