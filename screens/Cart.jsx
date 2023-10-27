import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
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
import {
  ScrollView,
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

const Cart = ({ navigation }) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const deliveryCahrge = 99;
  const [payable, setPayable] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

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

  const checkUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        getCart(id);
      }
    } catch (error) {
      console.log("Error retrieving user");
    }
  };

  const getCart = async (id) => {
    setIsLoading(true);
    try {
      const endpoint = `${baseUrl}/api/cart/find/${JSON.parse(id)}`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        if (response.data) {
          const products = response.data.products;
          // console.log(products);
          setCart(products);
          getTotal(products);
        } else {
          setCart([]);
        }
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

  const deleteItem = async (id) => {
    setIsLoading(true);
    try {
      const endpoint = `${baseUrl}/api/cart/${id}`;
      const response = await axios.delete(endpoint);
      if (response.status === 200) {
        checkUser();
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

  const addToCart = async (productId) => {
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
            cartItem: `${productId}`,
          };
          const response = await axios.post(endpoint, data);
          if (response.status === 200) {
            checkUser();
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

  const decrementItem = async (productId) => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        try {
          const endpoint = `${baseUrl}/api/cart/quantity`;
          const data = {
            userId: JSON.parse(id),
            cartItem: `${productId}`,
          };
          const response = await axios.post(endpoint, data);
          if (response.status === 200) {
            checkUser();
            console.log(response.data);
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

  useEffect(() => {
    checkUser();
    getAddresses();
  }, []);

  const getTotal = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      let price = +item.cartItem.price.split("$")[1];
      let quantity = item.quantity;
      let totalPrice = price * quantity;
      total += totalPrice;
    });
    let payable = total + deliveryCahrge;
    setPayable(payable.toFixed(2));
    setTotal(total.toFixed(2));
  };

  const getPaymentIntent = async () => {
    try {
      const endpoint = `${baseUrl}/api/payment`;
      const data = { amount: Math.floor(payable * 100) };
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        console.log(response.data);
        return response.data.paymentIntent;
      } else {
        Alert.alert("Something went wrong", response.data.error);
      }
    } catch (error) {
      Alert.alert("Something went wrong", `${error.message}`);
    }
  };

  const clearCart = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        try {
          const endpoint = `${baseUrl}/api/cart/delete/${JSON.parse(id)}`;

          const response = await axios.delete(endpoint);
          if (response.status === 200) {
            checkUser();
            console.log("deleted" + response.data);
          } else {
            Alert.alert("Error Clearing Cart", "Check the logs", [
              {
                text: "okay",
                onPress: () => console.log("okay"),
              },

              // { defaultIndex: 0 },
            ]);
          }
        } catch (error) {
          Alert.alert("Error Clearing Cart", `${error}`, [
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
      const item = product.cartItem;
      const subtotal = +item.price.split("$")[1];
      const total = subtotal * product.quantity;
      const data = {
        userId: JSON.parse(id),
        transactionId: transactionId,
        productId: `${item._id}`,
        quantity: product.quantity,
        subtotal: subtotal,
        payment_status: paymentStatus,
        total: total,
        addressId: selectedAddress,
      };
      // console.log(data);
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        await clearCart();
        navigation.navigate("Success");

        console.log("Successfully created order");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onCreateOrder = async (transactionId, paymentStatus) => {
    cart.forEach((product) =>
      createOrder(transactionId, paymentStatus, product)
    );
  };

  const onCheckout = async () => {
    // console.log(selectedAddress);
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
    const status = await getPaymentStatus(paymentIntent.split("_secret_")[0]);

    if (status === "succeeded") {
      onCreateOrder(paymentIntent.split("_secret_")[0], status);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headingWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back-circle" size={30} />
          </TouchableOpacity>
          <Text style={styles.heading}>Cart</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
          ) : cart.length === 0 ? (
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
              <Text style={styles.cardSubhead}>{cart.length} Products</Text>

              <FlatList
                data={cart}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <ItemTile
                    product={item.cartItem}
                    quantity={item.quantity}
                    id={item._id}
                    onDelete={deleteItem}
                    onIncrement={addToCart}
                    onDecrement={decrementItem}
                  />
                )}
                contentContainerStyle={{ marginVertical: 20 }}
                ItemSeparatorComponent={<View style={{ height: 30 }} />}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </ScrollView>
        <View style={styles.cartFooter}>
          <Text style={styles.footerHeading}>Order Details</Text>
          <View style={styles.priceBreakdown}>
            <Text style={styles.desc}>Cart Total</Text>
            <Text style={styles.desc}>{`$ ${total}`}</Text>
          </View>
          <View style={styles.priceBreakdown}>
            <Text style={styles.desc}>Delivery Charges</Text>
            <Text style={styles.desc}>
              {cart.length === 0
                ? (0.0).toFixed(2)
                : `$ ${deliveryCahrge.toFixed(2)}`}
            </Text>
          </View>
          <View style={styles.priceBreakdown}>
            <Text style={styles.payable}>Amount Payable</Text>
            <Text style={styles.payable}>
              {cart.length === 0 ? (0.0).toFixed(2) : `$ ${payable}`}
            </Text>
          </View>
          <Button
            title={"C H E C K O U T"}
            onPress={
              cart.length === 0
                ? () => {}
                : !selectedAddress
                ? () => {}
                : () => onCheckout()
            }
            isValid={
              cart.length === 0 ? false : !selectedAddress ? false : true
            }
            loader={false}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Cart;
