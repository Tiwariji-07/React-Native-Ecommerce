import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Favorite.style";
import axios from "axios";
import { COLORS, SIZES } from "../constants";
import AddressCard from "../components/address/AddressCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./Login";
import AddressForm from "../components/address/AddressForm";

const Address = ({ navigation }) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [editAddress, setEditAddress] = useState({});
  const [title, setTitle] = useState("");

  const getAddresses = async () => {
    setIsLoading(true);
    const id = await AsyncStorage.getItem("id");
    setUserId(id);

    try {
      const endpoint = `${baseUrl}/api/address/${JSON.parse(id)}`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        if (response.data) {
          setAddress(response.data);
        } else {
          setAddress([]);
        }
      }
    } catch (error) {
      Alert.alert("Couldn't get address", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (id) => {
    try {
      const endpoint = `${baseUrl}/api/address/${id}`;
      const response = await axios.delete(endpoint);
      if (response.status === 200) {
        getAddresses();
      }
    } catch (error) {
      Alert.alert("Error deleting address", error);
    }
  };

  const onEdit = (address) => {
    setTitle("Update Address");
    setEditAddress(address);
    setModalVisible(true);
  };

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <AddressForm
          onClose={() => setModalVisible(!modalVisible)}
          address={editAddress}
          title={title}
          userId={userId}
          reload={() => getAddresses()}
        />
      </Modal>
      <View style={styles.headingWrapper}>
        <View style={styles.headWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back-circle" size={30} />
          </TouchableOpacity>
          <Text style={styles.heading}>Addresses</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              setTitle("Add Address");
              setEditAddress({});
              setModalVisible(true);
            }}
          >
            <Ionicons name="add-circle" size={SIZES.xLarge} />
            {/* <Text style={{ color: COLORS.primary, fontSize: SIZES.medium }}>
              Add
            </Text> */}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: SIZES.xSmall,
          //   backgroundColor: COLORS.lightWhite,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
        ) : address.length === 0 ? (
          <View style={styles.emptyResult}>
            <Image
              source={require("../assets/images/Pose23.png")}
              style={styles.emptyImg}
            />
          </View>
        ) : (
          <FlatList
            data={address}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <AddressCard address={item} onDelete={onDelete} onEdit={onEdit} />
            )}
            contentContainerStyle={{ rowGap: 5, paddingBottom: 70 }}
            showsVerticalScrollIndicator={false}
            onRefresh={() => getAddresses()}
            refreshing={isLoading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Address;
