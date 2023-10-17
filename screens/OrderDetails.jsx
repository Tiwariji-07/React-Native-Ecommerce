import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./OrderDetails.style";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProductTile from "../components/products/ProductTile";
import AddressTile from "../components/address/AddressTile";
import { SIZES } from "../constants";
const OrderDetails = ({ navigation }) => {
  const route = useRoute();
  const { order } = route.params;
  return (
    <SafeAreaView>
      <View style={styles.headingWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <Text style={styles.heading}>Order Details</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={[styles.label, { marginLeft: SIZES.medium }]}>
          {order.delivery_status}
        </Text>
        <View style={styles.wrapper1}>
          <ProductTile product={order.productId} />
        </View>
        <View style={styles.wrapper1}>
          <Text style={styles.label}>Delivery Address</Text>
          <AddressTile address={order.addressId} />
        </View>
        <View style={styles.wrapper1}>
          <Text style={styles.label}>Order Payment Details</Text>
          <View style={styles.priceBreakdown}>
            <Text style={styles.desc}>SubTotal</Text>
            <Text style={styles.desc}>$ {order.subtotal}</Text>
          </View>
          <View style={styles.priceBreakdown}>
            <Text style={styles.desc}>Quantity</Text>
            <Text style={styles.desc}>{order.quantity}</Text>
          </View>
          <View style={styles.priceBreakdown}>
            <Text style={styles.desc}>Total</Text>
            <Text style={styles.desc}>$ {order.total}</Text>
          </View>
          <View style={styles.priceBreakdown}>
            <Text style={styles.desc}>Delivery Charges</Text>
            <Text style={styles.desc}>$ 99</Text>
          </View>
          <View style={styles.priceBreakdown}>
            <Text style={styles.payable}>Order Total</Text>
            <Text style={styles.payable}>$ {order.total + 99}</Text>
          </View>
        </View>
        <View style={styles.wrapper1}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text>Order ID:</Text>
            <Text style={{ fontFamily: "medium" }}>{order._id}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text>Placed On:</Text>
            <Text style={{ fontFamily: "medium" }}>
              {order.createdAt.split("T")[0]}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;
