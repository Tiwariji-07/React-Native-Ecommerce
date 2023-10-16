import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    // padding: SIZES.large,
    gap: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    width: SIZES.width - 30,
    alignItems: "center",
    // justifyContent:''
  },
  name: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  img: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 10,
  },
  details: {
    width: "50%",
  },
  label: {
    fontFamily: "regular",
    color: COLORS.gray,
  },
});

export default styles;
