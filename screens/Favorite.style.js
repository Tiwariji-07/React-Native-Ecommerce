import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  headingWrapper: {
    padding: SIZES.xLarge,
    flexDirection: "row",
    gap: SIZES.medium,
    alignItems: "center",
  },
  heading: {
    color: COLORS.primary,
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
  },
  favoritesWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyResult: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // width: 200,
    marginTop: 300,
    flex: 1,
    // overflow: "hidden",
  },
  emptyImg: {
    width: 250,
    resizeMode: "contain",
    alignSelf: "center",
  },
  cartFooter: {
    position: "absolute",
    bottom: 0,
    zIndex: 99,
    width: "100%",
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.large,
  },
  footerHeading: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  priceBreakdown: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  desc: {
    fontFamily: "regular",
  },
  payable: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
  },
});

export default styles;
