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
  label: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
    textTransform: "capitalize",
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
  wrapper: {
    justifyContent: "center",
    // alignItems: "center",
    // padding: SIZES.xSmall,
    gap: 10,
  },
  wrapper1: {
    backgroundColor: COLORS.lightWhite,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.xSmall,
  },
});

export default styles;
