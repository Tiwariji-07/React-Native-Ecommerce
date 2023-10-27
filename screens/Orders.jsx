import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Favorite.style";
import { COLORS, SIZES } from "../constants";
import OrderCard from "../components/order/OrderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Orders = ({ navigation }) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = async () => {
    setIsLoading(true);
    const id = await AsyncStorage.getItem("id");

    try {
      const endpoint = `${baseUrl}/api/order/${JSON.parse(id)}`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        if (response.data) {
          setOrder(response.data);
        } else {
          setOrder([]);
        }
      }
    } catch (error) {
      Alert.alert("Couldn't get address", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={styles.headingWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <Text style={styles.heading}>Orders</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          // padding: SIZES.xSmall,
          width: "100%",
          //   backgroundColor: COLORS.lightWhite,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
        ) : order.length === 0 ? (
          <View style={styles.emptyResult}>
            <Image
              source={require("../assets/images/Pose23.png")}
              style={styles.emptyImg}
            />
          </View>
        ) : (
          <FlatList
            data={order}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <OrderCard order={item} />}
            contentContainerStyle={{ rowGap: 5, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            onRefresh={() => getOrders()}
            refreshing={isLoading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Orders;
