import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, memo } from "react";
import styles from "./ItemTile.style";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";

const ItemTile = ({
  product,
  quantity,
  id,
  onDelete,
  onIncrement,
  onDecrement,
}) => {
  const [count, setCount] = useState(quantity);

  const navigation = useNavigation();

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/fn2.jpg")}
          style={styles.img}
        />
      </View>
      <TouchableOpacity
        style={styles.detailsWrapper}
        onPress={() => navigation.navigate("ProductDetails", { product })}
      >
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.supplier} numberOfLines={1}>
          {product.supplier}
        </Text>
        <Text style={styles.price} numberOfLines={1}>
          $ {+product.price.split("$")[1] * quantity}
        </Text>
      </TouchableOpacity>
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={() => onDelete(id)}>
          <Ionicons name="trash" size={SIZES.xLarge} color={COLORS.red} />
        </TouchableOpacity>
        <View style={styles.quantity}>
          <TouchableOpacity onPress={() => onIncrement(product._id)}>
            <SimpleLineIcons name="plus" size={20} />
          </TouchableOpacity>
          <Text style={styles.quantityText}> {"  " + quantity + "  "} </Text>
          <TouchableOpacity onPress={() => onDecrement(product._id)}>
            <SimpleLineIcons name="minus" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(ItemTile);
