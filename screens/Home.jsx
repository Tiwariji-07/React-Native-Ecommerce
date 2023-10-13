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
import ProductRow from "../components/products/ProductRow";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

const Home = () => {
  const screens = [<Welcome />, <Carousel />, <Heading />, <ProductRow />];

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Waiting...");

  const [errorMsg, setErrorMsg] = useState(null);

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
    (async () => {
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
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = address[0].city + " " + address[0].region;
    // text = JSON.stringify(location.coords);
  }

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
              <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>1</Text>
              </View>

              <TouchableOpacity>
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
