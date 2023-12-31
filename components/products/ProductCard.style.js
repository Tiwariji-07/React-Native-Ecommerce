import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/index";

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: 5,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imgContainer: {
    flex: 1,
    // width: "100%",
    // marginLeft: SIZES.small / 2,
    // marginTop: SIZES.small / 2,
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: 10,

    // alignItems: "center",
  },
  image: {
    // aspectRatio: 1,
    resizeMode: "contain",
    width: 182,
    aspectRatio: 1,
    borderRadius: 10,
    // height: 150,
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});

export default styles;
