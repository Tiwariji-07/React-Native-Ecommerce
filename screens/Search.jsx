import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import styles from "./search.style";
import ProductCard from "../components/products/ProductCard";
import ProductTile from "../components/products/ProductTile";
const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

  const handleSearch = async () => {
    // console.log(searchKey);

    if (searchKey) {
      setIsLoading(true);

      try {
        await fetch(`${baseUrl}/api/products/search/${searchKey}`)
          .then((response) => response.json())
          .then((res) => {
            // console.log("***************************");
            // console.log(res);
            // console.log("***************************");
            setSearchResult(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // useEffect(() => {
  //   return handleSearch();
  // }, [searchKey]);
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={24} style={styles.searchIcon} />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for"
            value={searchKey}
            onChangeText={setSearchKey}
            autoFocus={true}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Feather
              name="search"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultContainer}>
        {isLoading ? (
          <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong!</Text>
        ) : searchResult.length === 0 ? (
          <View style={styles.emptyResult}>
            {/* <Text>Empty</Text> */}
            <Image
              source={require("../assets/images/Pose23.png")}
              style={styles.emptyImg}
            />
          </View>
        ) : (
          <FlatList
            data={searchResult}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ProductTile product={item} />}
            contentContainerStyle={{ rowGap: SIZES.small }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
