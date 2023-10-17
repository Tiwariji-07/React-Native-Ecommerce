import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import styles from "./AddressCard.style";
import { COLORS, SHADOWS } from "../../constants";
const AddressCard = ({ address, onDelete }) => {
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
  return (
    <View style={[styles.container, SHADOWS.medium]}>
      <Text style={styles.name}>{address.name}</Text>
      <Text style={styles.address} numberOfLines={3}>
        {fullAddress}
      </Text>
      <View style={styles.phContainer}>
        <Text style={styles.address}>Phone :</Text>
        <Text style={styles.phone}>{address.contact_no}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => onDelete(address._id)}>
          <Text
            style={{
              fontFamily: "semibold",
              color: COLORS.red,
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: "semibold",
              color: COLORS.green,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(AddressCard);
