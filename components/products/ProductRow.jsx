import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import styles from "./ProductRow.style";
import { COLORS, SIZES } from "../../constants";
import ProductCard from "./ProductCard";
import useFetch from "../../hook/useFetch";

const ProductRow = () => {
  // const products = [{id: 1, name: "product"},{id: 2, name: "product"},{id: 3, name: "product"}];
  const { products, isLoading, error } = useFetch();
  // console.log(products);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong!</Text>
      ) : (
        <FlatList
          data={products.slice(0, 3)}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCard product={item} />}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.xLarge }}
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={6}
          windowSize={3}
        />
      )}
    </View>
  );
};

export default ProductRow;
