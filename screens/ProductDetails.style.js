import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 100,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
    height: SIZES.width,
    // width: 400,
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    // paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: SIZES.width,
    top: 20,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
    // justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",
  },
  price: {
    fontFamily: "semibold",
    // textAlign: "center",
    fontSize: SIZES.large,
    paddingHorizontal: SIZES.xSmall,
    // paddingVertical: SIZES.xSmall,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    top: 10,
    justifyContent: "space-between",
    marginHorizontal: SIZES.medium,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // marginHorizontal: SIZES.medium,
    top: 15,
  },
  ratingText: {
    fontFamily: "medium",
    color: COLORS.gray,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.medium,
  },
  description: {
    fontFamily: "medium",
    fontSize: SIZES.large - 2,
  },
  descriptionTxt: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },

  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    marginHorizontal: SIZES.small,
    padding: 5,
    borderRadius: SIZES.large,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SIZES.small,
  },
  buyBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.large,
    alignItems: "center",
    justifyContent: "center",
  },
  cartTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },
  cartBtn: {
    // height: 37,
    // width: 37,
    padding: SIZES.medium,
    borderRadius: SIZES.large,
    // borderRadius:50%,
    margin: SIZES.small,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
