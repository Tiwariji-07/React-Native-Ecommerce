import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Favorite.style";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { COLORS, SIZES } from "../constants";
import ProductTile from "../components/products/ProductTile";
import { Ionicons } from "@expo/vector-icons";

const Favorites = ({ navigation }) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkIsFavorite();
  }, []);

  const getAllFavorites = async (userId) => {
    setIsLoading(true);
    try {
      const endpoint = `${baseUrl}/api/favorite/${JSON.parse(userId)}`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        const products = response.data.products;
        // console.log(products);
        // setFavorites(products)
        setFavorites(products);
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
    } finally {
      setIsLoading(false);
    }
  };

  const checkIsFavorite = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        getAllFavorites(id);
      }
    } catch (error) {
      console.log("Error retrieving user");
    }
  };
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
        <Text style={styles.heading}>My Favorites</Text>
      </View>
      <View style={styles.favoritesWrapper}>
        {isLoading ? (
          <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
        ) : favorites.length === 0 ? (
          <View style={styles.emptyResult}>
            {/* <Text>Empty</Text> */}
            <Image
              source={require("../assets/images/Pose23.png")}
              style={styles.emptyImg}
            />
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ProductTile product={item.favoriteItem} />
            )}
            contentContainerStyle={{ rowGap: SIZES.small }}
            showsVerticalScrollIndicator={false}
            onRefresh={() => checkIsFavorite()}
            refreshing={isLoading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
