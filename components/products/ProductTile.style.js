import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: SIZES.width - 20,
    height: 150,
    // padding: SIZES.small,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    // gap: SIZES.medium,
  },
  imgContainer: {
    flex: 2,
    // width: 170,
    height: "100%",
    // marginLeft: SIZES.small / 2,
    // marginTop: SIZES.small / 2,
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
  },
  img: {
    resizeMode: "contain",
    width: "100%",
  },
  detailsContainer: {
    flex: 3,
    padding: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    // fontWeight:
    fontFamily: "bold",
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  price: {
    fontSize: SIZES.large,
    // fontWeight:
    fontFamily: "bold",
  },
});

export default styles;
