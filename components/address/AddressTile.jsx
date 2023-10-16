import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import styles from "./AddressTile.style";
import { SHADOWS } from "../../constants";
const AddressTile = ({ address, onPress, activeId }) => {
  const fullAddress =
    address.flat_no +
    "," +
    address.area +
    "," +
    address.city +
    "," +
    address.state +
    "," +
    address.country +
    " - " +
    address.pincode;
  //   console.log(activeId);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        SHADOWS.medium,
        activeId === address._id ? styles.active : {},
      ]}
      onPress={() => onPress(address._id)}
    >
      <Text style={styles.name}>{address.name}</Text>
      <Text style={styles.address} numberOfLines={3}>
        {fullAddress}
      </Text>
      <View style={styles.phContainer}>
        <Text style={styles.address}>Phone :</Text>
        <Text style={styles.phone}>{address.contact_no}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(AddressTile);
