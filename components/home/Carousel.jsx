import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS, SIZES } from "../../constants";
const Carousel = () => {
  const slides = [
    require("../../assets/images/fn1.jpg"),
    require("../../assets/images/fn2.jpg"),
    require("../../assets/images/fn3.jpg"),
  ];
  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveColor={COLORS.secondary}
        autoplay
        circleLoop
        ImageComponentStyle={{
          borderRadius: SIZES.medium,
          width: "93%",
          marginTop: SIZES.medium,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Carousel;
