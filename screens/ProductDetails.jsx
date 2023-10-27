import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./ProductDetails.style";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useStripe } from "@stripe/stripe-react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const ProductDetails = ({ navigation }) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [addedToBag, setAddedToBag] = useState(false);
  // const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkIsFavorite();
  }, []);
  const route = useRoute();
  const { product } = route.params;
  // console.log(product);

  const getAllFavorites = async (userId) => {
    try {
      const endpoint = `${baseUrl}/api/favorite/${JSON.parse(userId)}`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        const products = response.data.products;
        // console.log(products);
        // setFavorites(products)
        let flag = false;
        products.forEach((item) => {
          if (item.favoriteItem._id === product._id) {
            // setIsFavorite(true)
            flag = true;
            setFavoriteId(item._id);
          }
        });
        if (flag) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
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
      // Alert.alert("Error Getting favorites", `${error}`, [
      //   {
      //     text: "okay",
      //     onPress: () => console.log("okay"),
      //   },
      //   // { defaultIndex: 0 },
      // ]);
    }
  };

  const checkIsFavorite = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        getAllFavorites(id);
      }
    } catch (error) {
      console.log("Error retrieving user");
    }
  };

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        if (isFavorite) {
          removeFavorites(id);
        } else {
          addToFavorites(id);
        }
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Error retrieving user");
    }
  };

  const addToFavorites = async (userId) => {
    // console.log(userId);
    try {
      const endpoint = `${baseUrl}/api/favorite/add`;
      const data = {
        userId: JSON.parse(userId),
        favoriteItem: product._id,
      };
      let data1 = {
        userId: JSON.parse(userId),
        favoriteItem: `${product._id}`,
      };
      // console.log(data);

      const response = await axios.post(endpoint, data1);
      if (response.status === 200) {
        setIsFavorite(true);
        console.log(response.data);
      } else {
        Alert.alert("Error Adding to favorites", "Check the logs", [
          {
            text: "okay",
            onPress: () => console.log("okay"),
          },

          // { defaultIndex: 0 },
        ]);
      }
    } catch (error) {
      Alert.alert("Error Adding to favorites", `${error}`, [
        {
          text: "okay",
          onPress: () => console.log("okay"),
        },

        // { defaultIndex: 0 },
      ]);
    }
  };

  const removeFavorites = async (userId) => {
    try {
      const endpoint = `${baseUrl}/api/favorite/remove/${favoriteId}`;
      const response = await axios.delete(endpoint);
      if (response.status === 200) {
        setIsFavorite(false);
        // console.log(response.data);
      } else {
        Alert.alert("Error Removing favorites", "Check the logs", [
          {
            text: "okay",
            onPress: () => console.log("okay"),
          },

          // { defaultIndex: 0 },
        ]);
      }
    } catch (error) {
      Alert.alert("Error Removing favorites", `${error}`, [
        {
          text: "okay",
          onPress: () => console.log("okay"),
        },

        // { defaultIndex: 0 },
      ]);
    }
  };

  const addToCart = async () => {
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
            cartItem: `${product._id}`,
          };
          const response = await axios.post(endpoint, data);
          if (response.status === 200) {
            setAddedToBag(true);
            Alert.alert("Success", "Product addded to bag", [
              {
                text: "okay",
                onPress: () => console.log("okay"),
              },
            ]);
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
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Error retrieving user");
    }
  };

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };
  // const showToast = () => {
  //   Toast.show({
  //     type: "success",
  //     text1: "Hello",
  //     text2: "This is some something 👋",
  //   });
  // };

  // const getPaymentIntent = async () => {
  //   try {
  //     const endpoint = `${baseUrl}/api/payment`;
  //     const price = +product.price.replace("$", "");
  //     const data = { amount: Math.floor(price * 100) };
  //     // console.log(endpoint + " " + price);
  //     const response = await axios.post(endpoint, data);
  //     if (response.status === 200) {
  //       console.log(response.data);
  //       return response.data.paymentIntent;
  //     } else {
  //       Alert.alert("Something went wrong", response.data);
  //     }
  //   } catch (error) {
  //     Alert.alert("Something went wrong", `${error}`);
  //   }
  // };

  // const getPaymentStatus = async (id) => {
  //   try {
  //     const endpoint = `${baseUrl}/api/payment/${id}`;
  //     const response = await axios.get(endpoint);
  //     if (response.status === 200) {
  //       console.log(response.data.paymentIntent.status);
  //       return response.data.paymentIntent.status;
  //     } else {
  //       Alert.alert("Something went wrong", response.data.error);
  //     }
  //   } catch (error) {
  //     Alert.alert("Something went wrong", `${error.message}`);
  //   }
  // };

  // const createOrder = async (transactionId, paymentStatus, product) => {
  //   const id = await AsyncStorage.getItem("id");
  //   try {
  //     const endpoint = `${baseUrl}/api/order/create`;
  //     const item = product;
  //     const subtotal = +item.price.split("$")[1];
  //     const total = subtotal * 1;
  //     const data = {
  //       userId: JSON.parse(id),
  //       transactionId: transactionId,
  //       productId: `${item._id}`,
  //       quantity: 1,
  //       subtotal: subtotal,
  //       payment_status: paymentStatus,
  //       total: total,
  //       addressId: selectedAddress,
  //     };
  //     // console.log(data);
  //     const response = await axios.post(endpoint, data);
  //     if (response.status === 200) {
  //       await clearCart();
  //       navigation.navigate("Success");

  //       console.log("Successfully created order");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const onCreateOrder = async (transactionId, paymentStatus) => {
  //   // cart.forEach((product) =>
  //   createOrder(transactionId, paymentStatus, product);
  //   // );
  // };

  const onBuy = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        navigation.navigate("Buy Now", { product });
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Error in onBuy");
    }
  };

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.upperRow}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="chevron-back-circle" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => checkExistingUser()}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={require("../assets/images/fn5.jpg")}
            // source=product.imageUrl }}
            style={styles.image}
          />

          <View style={styles.details}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{product.title}</Text>
              <View style={styles.priceWrapper}>
                <Text style={styles.price}>{product.price}</Text>
              </View>
            </View>

            <View style={styles.ratingRow}>
              <View style={styles.rating}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <Ionicons key={index} name="star" size={24} color="gold" />
                ))}
                <Text style={styles.ratingText}> (4.9)</Text>
              </View>

              {/* <View style={styles.rating}>
              <TouchableOpacity onPress={increment}>
                <SimpleLineIcons name="plus" size={20} />
              </TouchableOpacity>
              <Text style={styles.ratingText}> {"  " + count + "  "} </Text>
              <TouchableOpacity onPress={decrement}>
                <SimpleLineIcons name="minus" size={20} />
              </TouchableOpacity>
            </View> */}
            </View>

            <View style={styles.descriptionWrapper}>
              <Text style={styles.description}>Description</Text>
              <Text style={styles.descriptionTxt}>{product.description}</Text>
            </View>

            <View style={{ marginBottom: SIZES.small }}>
              <View style={styles.location}>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="location-outline" size={20} />
                  <Text>{product.product_location}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={20}
                  />
                  <Text> Free Delivery</Text>
                </View>
              </View>
            </View>

            <View style={styles.cartRow}>
              <TouchableOpacity onPress={() => onBuy()} style={styles.buyBtn}>
                <Text style={styles.cartTitle}>BUY NOW</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addToCart()}
                style={styles.cartBtn}
              >
                <Fontisto
                  name="shopping-bag"
                  size={20}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default ProductDetails;
