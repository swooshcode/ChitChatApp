import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export const COLORS = {
    // base colors
    pink:"#FF48DC",
    lightPink: "#FFC7B6",
    orange:"#FFA064",
    red:"#FF6471",
    lightRed:"#FF7B86",
    darkRed:"#FF3333",
    blue: "#2662FA",
    white:"#FAFFD8",
    mehron:"#FF4A4A",

    

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    lightGray: "#eff2f5",
    gray: "#8b9097",
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height
};
export const FONTS = {
    largeTitle: { fontFamily: "Poppins-Bold", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Poppins-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Poppins-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Poppins-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Poppins-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Poppins-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Poppins-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Poppins-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Poppins-Regular", fontSize: SIZES.body4, lineHeight: 22 },
};

export const ALIGNMENT = {
    align: "center",
    evenly: "space-evenly",
    around: "space-around",
    between: "space-between",
    row: "row",
    column: "column",
    absolute: "absolute",
    relative: "relative",
    wp,
    hp,
    width: wp("95%"),
}

const appTheme = { COLORS, SIZES, FONTS ,ALIGNMENT};

export default appTheme;
