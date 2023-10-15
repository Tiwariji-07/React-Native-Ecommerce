import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      style={styles.btn(isValid ? COLORS.primary : COLORS.gray)}
      onPress={onPress}
    >
      {loader ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  text: {
    fontFamily: "bold",
    color: "white",
    fontSize: SIZES.large - 2,
  },
  btn: (bgc) => ({
    height: 50,
    width: "100%",
    marginVertical: 20,
    backgroundColor: bgc,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  }),
});
