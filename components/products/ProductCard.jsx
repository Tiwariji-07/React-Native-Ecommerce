import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./ProductCard.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
const ProductCard = ({ product }) => {
  const slides = [
    // require(props.product.imageUrl),
    // require("../../assets/images/fn2.jpg"),
    // require("../../assets/images/fn3.jpg"),
  ];

  const navigation = useNavigation();
  // console.log(typeof product.imageUrl);
  // const image = product.imageUrl;
  // console.log(image);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetails", { product });
      }}
    >
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={require("../../assets/images/fn4.jpg")}
            // source={image}
            style={styles.image}
            // width={170}
            // height={}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {product.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {product.supplier}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            {product.price}
          </Text>
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
