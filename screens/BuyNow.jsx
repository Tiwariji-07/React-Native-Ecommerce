import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { COLORS, SIZES } from "../constants";
import ItemTile from "../components/cart/ItemTile";
import styles from "./Favorite.style";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components";
import { useStripe } from "@stripe/stripe-react-native";
import AddressTile from "../components/address/AddressTile";
import { useRoute } from "@react-navigation/native";

const BuyNow = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params;
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const price = +product.price.replace("$", "");
  const deliveryCahrge = 99;
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const setAddress = (id) => {
    setSelectedAddress(id);
  };
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const getAddresses = async () => {
    setIsLoading(true);
    const id = await AsyncStorage.getItem("id");

    try {
      const endpoint = `${baseUrl}/api/address/${JSON.parse(id)}`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        if (response.data) {
          setAddresses(response.data);
        } else {
          setAddresses([]);
        }
      }
    } catch (error) {
      Alert.alert("Couldn't get address", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async () => {
    setQuantity(() => quantity + 1);
  };

  const deleteItem = async () => {
    navigation.goBack();
  };

  const decrementItem = async () => {
    if (quantity > 1) {
      setQuantity(() => quantity - 1);
    } else {
      deleteItem();
    }
  };

  useEffect(() => {
    // checkUser();
    getAddresses();
  }, []);

  const getPaymentIntent = async () => {
    try {
      const endpoint = `${baseUrl}/api/payment`;
      const price = +product.price.replace("$", "") * quantity + deliveryCahrge;
      const data = { amount: Math.floor(price * 100) };
      // console.log(endpoint + " " + price);
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        console.log(response.data);
        return response.data.paymentIntent;
      } else {
        Alert.alert("Something went wrong", response.data);
      }
    } catch (error) {
      Alert.alert("Something went wrong", `${error}`);
    }
  };

  const getPaymentStatus = async (id) => {
    try {
      const endpoint = `${baseUrl}/api/payment/${id}`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        console.log(response.data.paymentIntent.status);
        return response.data.paymentIntent.status;
      } else {
        Alert.alert("Something went wrong", response.data.error);
      }
    } catch (error) {
      Alert.alert("Something went wrong", `${error.message}`);
    }
  };

  const createOrder = async (transactionId, paymentStatus, product) => {
    const id = await AsyncStorage.getItem("id");
    try {
      const endpoint = `${baseUrl}/api/order/create`;
      const item = product;
      const subtotal = +item.price.split("$")[1];
      const total = subtotal * quantity;
      const data = {
        userId: JSON.parse(id),
        transactionId: transactionId,
        productId: `${item._id}`,
        quantity: quantity,
        subtotal: subtotal,
        payment_status: paymentStatus,
        total: total,
        addressId: selectedAddress,
      };
      // console.log(data);
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        navigation.navigate("Success");
        console.log("Successfully created order");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onCreateOrder = async (transactionId, paymentStatus) => {
    // cart.forEach((product) =>
    createOrder(transactionId, paymentStatus, product);
    // );
  };

  const onBuy = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        // 1. Create a payment intent
        const paymentIntent = await getPaymentIntent();
        // 2. Initialize the Payment sheet
        const initResponse = await initPaymentSheet({
          merchantDisplayName: "Furnish",
          paymentIntentClientSecret: paymentIntent,
        });
        if (initResponse.error) {
          console.log(initResponse.error);
          Alert.alert("Something went wrong");
          return;
        }
        // 3. Present the Payment Sheet from Stripe
        const paymentResult = await presentPaymentSheet();
        // 4. If payment ok -> create the order
        const status = await getPaymentStatus(
          paymentIntent.split("_secret_")[0]
        );
        // console.log("status: " + status);
        if (status === "succeeded") {
          onCreateOrder(paymentIntent.split("_secret_")[0], status);
        }
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Error in onBuy");
    }
  };

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
        <Text style={styles.heading}>Order Summary</Text>
      </View>

      <View style={{}}>
        {isLoading ? (
          <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
        ) : !product ? (
          <View style={styles.emptyResult}>
            <Image
              source={require("../assets/images/Pose23.png")}
              style={styles.emptyImg}
            />
          </View>
        ) : (
          <View style={styles.cartWrapper}>
            <Text style={styles.cardSubhead}>Select Address</Text>
            <FlatList
              data={addresses}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <AddressTile
                  address={item}
                  onPress={setAddress}
                  activeId={selectedAddress}
                />
              )}
              contentContainerStyle={{ rowGap: 5, height: 180 }}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />

            <ItemTile
              product={product}
              quantity={quantity}
              id={product._id}
              onDelete={deleteItem}
              onIncrement={addToCart}
              onDecrement={decrementItem}
            />
          </View>
        )}
      </View>
      <View style={styles.cartFooter}>
        <Text style={styles.footerHeading}>Order Details</Text>
        <View style={styles.priceBreakdown}>
          <Text style={styles.desc}>Cart Total</Text>
          <Text style={styles.desc}>$ {price * quantity}</Text>
        </View>
        <View style={styles.priceBreakdown}>
          <Text style={styles.desc}>Delivery Charges</Text>
          <Text style={styles.desc}>$ {deliveryCahrge.toFixed(2)}</Text>
        </View>
        <View style={styles.priceBreakdown}>
          <Text style={styles.payable}>Amount Payable</Text>
          <Text style={styles.payable}>
            $ {price * quantity + deliveryCahrge}
          </Text>
        </View>
        <Button
          title={"C H E C K O U T"}
          onPress={!selectedAddress ? () => {} : () => onBuy()}
          isValid={!selectedAddress ? false : true}
          loader={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default BuyNow;
