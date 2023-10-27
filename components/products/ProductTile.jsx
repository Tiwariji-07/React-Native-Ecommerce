import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import styles from "./ProductTile.style";
import { useNavigation } from "@react-navigation/native";

const ProductTile = ({ product }) => {
  const navigation = useNavigation();
  const imageUrl = product.imageUrl;
  console.log(typeof imageUrl);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetails", { product });
      }}
    >
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            // source={require("../../assets/images/fn2.jpg")}
            source={{
              uri: product.imageUrl,
            }}
            style={[styles.img]}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {product.supplier}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            {product.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ProductTile);
