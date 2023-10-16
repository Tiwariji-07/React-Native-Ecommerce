import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { Button } from "../components";

const Success = ({ navigation }) => {
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "white" }}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Order Success</Text>
      </View>
      <View styles={styles.imgWrapper}>
        <Image
          style={styles.img}
          source={require("../assets/images/order_success.png")}
        />
        <View style={styles.labelWrapper}>
          <MaterialCommunityIcons
            name="check-circle"
            color={COLORS.green}
            size={SIZES.xLarge}
          />
          <Text style={styles.successLabel}>Your Order has been placed</Text>
        </View>
      </View>
      <View style={styles.btnWrapper}>
        <Button
          title="K E E P  S H O P P I N G"
          isValid={true}
          onPress={() => navigation.navigate("Bottom Navigation")}
        />
        <Button
          title="V I E W  O R D E R S"
          isValid={false}
          onPress={() => navigation.navigate("Orders")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Success;

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
  imgWrapper: {
    alignContent: "center",
    // flex: 1,
    gap: 0,
  },
  img: {
    resizeMode: "contain",
    alignSelf: "center",
    width: SIZES.width - 50,
    position: "relative",
  },
  labelWrapper: {
    position: "absolute",
    top: 200,
    textAlign: "center",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btnWrapper: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    padding: SIZES.medium,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  successLabel: {
    color: COLORS.green,

    fontFamily: "medium",
    fontSize: SIZES.large,
  },
});
