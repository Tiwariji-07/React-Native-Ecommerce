import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    padding: SIZES.large,
    gap: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    width: SIZES.width - 100,
  },
  name: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  address: {
    color: COLORS.gray,
    fontFamily: "regular",
    // width: "85%",
  },
  phContainer: {
    flexDirection: "row",
    gap: 5,
  },
  phone: {
    fontFamily: "semibold",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: SIZES.xxLarge,
  },
  active: {
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
});

export default styles;
