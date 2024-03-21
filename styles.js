
import { Platform } from "react-native";

const primary = "#0f0f10";
const secondary = "#eeeeee";
const white = "#fff";
const black = "#000000";
const ecoGreat = "rgb(50, 141, 100)";
const ecoGood =  "rgb(121, 207, 167)";
const gray = "#949eaa"
const ecoDanger = "rgb(207 61 82)";
const ecoWarning = "#d2852e"
const ecoNeutral = "#4a749d";
const highlight = "#1a1a1a"
const borderColor = "#202329"
const buttonBg = "#090a0b"
const verticalSpacing = 15
const bold = 800
const mediumFont = 19
const largeFont = 24
const spinnerTint = "#b3b3b3"
const screenPaddingTop = 3;
const defaultFont = 16;
const widgetBg = "#13161a"
const css = {
  primary,
  secondary,
  white,
  black,
  gray,
  ecoDanger,
  ecoGood,
  ecoGreat,
  widgetBg: "#13161a",
  ecoNeutral,
  spinnerTint,
  ecoWarning,
  widgetBg,
  highlight,
  borderColor,
  defaultFont: 16,
  smallFont: 14,
  mediumFont,
  largeFont,
  babyBlue: "#7288c5",
  bold: bold,
  homeSpacing: 20,
  screenPaddingTop,
  buttonBg,
  skeletonGradient: [highlight, spinnerTint, borderColor],
  verticalSpacing,
  headerContentGap: 30,
  modalBorderRadius: 12,
  productScreenAnimDelay: 300,
  
  header: {
    fontWeight: bold,
    fontSize: 24,
  },

  subHeader: {
    fontWeight: 900,
    fontSize: mediumFont
  },

  spacingLeft: {
    paddingLeft: verticalSpacing,
  },

  widget: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: widgetBg,
  },


  screen: {
    paddingTop: 30,
    height: "100%",
    paddingHorizontal: 10
  },

  active: {
    color: white,
  },

  A: ecoGreat,

  B: ecoNeutral,

  C: ecoWarning,

  D: ecoDanger,

  F: ecoDanger,

  route: {
    alignItems: "center",
    gap: 7,
    fontSize: 10
  },
  
  textInput: {
    backgroundColor: highlight,
    color: secondary,
    paddingVertical: 9.5,
    paddingHorizontal: 10,
    borderRadius: Platform.select({ios: 4, android: 0})
  },

  defaultBtn: {
    paddingHorizontal: 45,
    paddingVertical: 5,
    borderRadius: 3,
    borderColor: gray,
    backgroundColor: buttonBg,
    borderWidth: .2,
    alignItems: "center",
    alignSelf: "center",
    width: 240,
    height: 50,
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 0
  },

  buttonText: {
    fontSize: 12,
    color: black
  },

  co2eDigit: {
    fontWeight: 800,
    fontSize: defaultFont
  },

  border: {
    borderColor,
    borderWidth: .4
  },

  boxShadow: {
    elevation: 5,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: black,
    backgroundColor: primary,
  }
}

export default css;