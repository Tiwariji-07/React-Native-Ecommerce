import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { memo } from "react";
import styles from "./OrderCard.style";
import { COLORS, SHADOWS, SIZES } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const OrderCard = ({ order }) => {
  const date = order.createdAt;
  const parsedDate = date.split("T")[0];
  //   console.log(parsedDate);
  return (
    <TouchableOpacity style={[styles.container, SHADOWS.medium]}>
      <Image
        source={require("../../assets/images/fn1.jpg")}
        style={styles.img}
      />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {order.productId.title}
        </Text>
        <Text style={styles.label}>
          Delivery Status : {order.delivery_status}
        </Text>
        <Text style={styles.label}>{parsedDate}</Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={27}
        color={COLORS.gray2}
      />
    </TouchableOpacity>
  );
};

export default memo(OrderCard);
