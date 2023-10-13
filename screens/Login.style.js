import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "regular",
    textAlign: "right",
    fontSize: SIZES.small,
    marginBottom: 5,
    marginEnd: 5,
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.small,
  },
  register: {
    marginTop: 20,
    textAlign: "center",
    fontFamily: "medium",
    color: COLORS.primary,
  },
});

export default styles;
