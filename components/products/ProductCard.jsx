import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import styles from "./ProductCard.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { memo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  console.log("Product card getting rendered");
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  // const [cart, setCart] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const addToCart = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        try {
          const endpoint = `${baseUrl}/api/cart`;
          const data = {
            userId: JSON.parse(id),
            quantity: 1,
            cartItem: `${product._id}`,
          };
          const response = await axios.post(endpoint, data);
          if (response.status === 200) {
            Alert.alert("Success", "Product addded to bag", [
              {
                text: "okay",
                onPress: () => console.log("okay"),
              },

              // { defaultIndex: 0 },
            ]);
          } else {
            Alert.alert("Error Getting favorites", "Check the logs", [
              {
                text: "okay",
                onPress: () => console.log("okay"),
              },

              // { defaultIndex: 0 },
            ]);
          }
        } catch (error) {
          Alert.alert("Error Getting favorites", `${error}`, [
            {
              text: "okay",
              onPress: () => console.log("okay"),
            },

            // { defaultIndex: 0 },
          ]);
        }
      }
    } catch (error) {
      console.log("Error retrieving user");
    }
  };
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

        <TouchableOpacity style={styles.addBtn} onPress={() => addToCart()}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ProductCard);
