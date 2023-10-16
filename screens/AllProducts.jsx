import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Favorite.style";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { COLORS, SIZES } from "../constants";
import ProductCard from "../components/products/ProductCard";
import { Ionicons } from "@expo/vector-icons";

const AllProducts = ({ navigation }) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      const endpoint = `${baseUrl}/api/products`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        if (response.data) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } else {
        console.log("error fetching products");
      }
    } catch (error) {
      console.log("error fetching products " + error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.headingWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <Text style={styles.heading}>All Products</Text>
      </View>
      <View style={styles.favoritesWrapper}>
        {isLoading ? (
          <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
        ) : products.length === 0 ? (
          <View style={styles.emptyResult}>
            {/* <Text>Empty</Text> */}
            <Image
              source={require("../assets/images/Pose23.png")}
              style={styles.emptyImg}
            />
          </View>
        ) : (
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ProductCard product={item} />}
            contentContainerStyle={{
              rowGap: SIZES.xSmall,
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AllProducts;
