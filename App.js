import "./ignoreWarnings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import {
  ProductDetails,
  Login,
  Orders,
  Favorites,
  Cart,
  Register,
  Success,
  AllProducts,
  Address,
  OrderDetails,
  BuyNow,
} from "./screens";
import { StripeProvider } from "@stripe/stripe-react-native";

const STRIPE_KEY =
  "pk_test_51O1UzOSJGdeU3lE0IEQyk7B7QxI0pvpnaPDJTbld8GR4mDgD2pXqeyOOF9C5w9yWhpxqdxJYi8ZQTwNUl5roKf7E00JyCv6i0W";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Bottom Navigation"
              component={BottomTabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Orders"
              component={Orders}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Success"
              component={Success}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Products"
              component={AllProducts}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Address"
              component={Address}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Order Details"
              component={OrderDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Buy Now"
              component={BuyNow}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
