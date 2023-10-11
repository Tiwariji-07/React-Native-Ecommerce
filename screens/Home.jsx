import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Home.style";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Heading from "../components/home/Heading";
// import ProductRow from "../components/products/ProductRow";
const Home = () => {
  // const screens = [<Welcome />, <Carousel />, <Heading />, <ProductRow />];

  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.location}>Hyderabad India</Text>

          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>1</Text>
            </View>

            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <FlatList data={screens} renderItem={({ item }) => item} vertical /> */}
      <ScrollView>
        <Welcome />
        <Carousel />
        <Heading />
        {/* <ProductRow /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
