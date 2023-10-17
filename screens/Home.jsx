import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Home.style";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Heading from "../components/home/Heading";
import ProductRow from "../components/products/ProductRow";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  // const screens = [<Welcome />, <Carousel />, <Heading />, <ProductRow />];
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Waiting...");

  const [errorMsg, setErrorMsg] = useState(null);
  const [cart, setCart] = useState([]);
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    setLocation(location);
    let address = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: lon,
    });
    setAddress(address[0].city + " " + address[0].region);
  };

  useEffect(() => {
    checkExistingUser();
    getCurrentLocation();
  }, []);
  console.log("home rendered");

  const checkExistingUser = useCallback(async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
        // getCart(id);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Error retrieving user");
    }
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = address[0].city + " " + address[0].region;
    // text = JSON.stringify(location.coords);
  }

  const getCart = async (id) => {
    setIsLoading(true);
    try {
      const endpoint = `${baseUrl}/api/cart/find/${JSON.parse(id)}`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        const products = response.data.products;
        // console.log(products);
        setCart(products);
      } else {
        Alert.alert("Error Getting cart", "Check the logs", [
          {
            text: "okay",
            onPress: () => console.log("okay"),
          },

          // { defaultIndex: 0 },
        ]);
      }
    } catch (error) {
      Alert.alert("Error Getting cart", `${error}`, [
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>
            <TouchableOpacity
              onPress={() => {
                getCurrentLocation;
              }}
            >
              <Ionicons name="location-outline" size={24} />
            </TouchableOpacity>

            <Text style={styles.location}>{address}</Text>

            <View style={{ alignItems: "flex-end" }}>
              {/* <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>{cart.length}</Text>
              </View> */}

              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <Fontisto name="shopping-bag" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Text>{text}</Text> */}

        {/* <FlatList
          data={screens}
          renderItem={({ item }) => item}
          vertical
          contentContainerStyle={{
            flexGrow: 1,
          }}
        /> */}
      </View>
      <ScrollView>
        <Welcome />
        <Carousel />
        <Heading />
        <ProductRow />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
