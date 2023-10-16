import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: SIZES.width - 40,
    height: 120,
    // padding: SIZES.small,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    flexDirection: "row",
    // gap: SIZES.medium,
  },
  imageWrapper: {
    flex: 2,
    // width: 170,
    // height: "100%",
    // marginLeft: SIZES.small / 2,
    // marginTop: SIZES.small / 2,
    borderRadius: SIZES.medium,

    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
  },
  img: {
    resizeMode: "contain",
    width: "100%",
    borderRadius: SIZES.medium,
  },
  detailsWrapper: {
    flex: 3,
    padding: SIZES.medium,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: SIZES.medium,
    // fontWeight:
    fontFamily: "bold",
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  price: {
    fontSize: SIZES.medium,
    // fontWeight:
    fontFamily: "medium",
  },
  btnWrapper: {
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    paddingRight: 10,
  },
  quantity: {
    flexDirection: "row",
  },
  quantityText: {
    fontFamily: "medium",
  },
});

export default styles;
