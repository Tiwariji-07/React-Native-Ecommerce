import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
// import styles from "./AddressForm.style";
import styles from "../../screens/Login.style";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../Button";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import axios from "axios";
const AddressForm = ({ onClose, address, title, userId, reload }) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    contact_no: Yup.string()
      .min(10, "Must be 10 digit phone number")
      .required("Required"),
    pincode: Yup.string()
      .min(6, "Enter valid 6 digit pincode")
      .max(6)
      .required("Required"),
    city: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    state: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    flat_no: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    area: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    landmark: Yup.string().min(3, "Must be 3 characters or more"),
  });

  const invalidForm = () => {
    Alert.alert("Invalid Form", "Please provide required fields", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel"),
      },
      {
        text: "Continue",
        onPress: () => console.log("Continue"),
      },
      // { defaultIndex: 0 },
    ]);
  };

  const addAddress = async (address) => {
    try {
      const endpoind = `${baseUrl}/api/address`;
      const data = address;
      const response = await axios.post(endpoind, data);
      if (response.status === 200) {
        onClose();
        reload();
        Alert.alert("Success", "Address was successfully added");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const updateAddress = async (values) => {
    try {
      const endpoind = `${baseUrl}/api/address/update`;
      const addressId = address._id;
      const updatedAddress = values;
      const data = { addressId: addressId, address: updatedAddress };
      console.log(data);
      const response = await axios.post(endpoind, data);
      if (response.status === 200) {
        onClose();
        reload();

        Alert.alert("Success", "Address was successfully updated");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={styles.modalView}>
          <View style={styles.formHeader}>
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: "semibold",
                fontSize: SIZES.medium,
              }}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons
                name="close-circle"
                color={COLORS.primary}
                size={SIZES.large}
              />
            </TouchableOpacity>
          </View>
          <Formik
            initialValues={{
              userId: address.userId ? address.userId : JSON.parse(userId),
              name: address.name ? address.name : "",
              contact_no: address.contact_no ? address.contact_no : "",
              pincode: address.pincode ? address.pincode : 0,
              city: address.city ? address.city : "",
              state: address.state ? address.state : "",
              area: address.area ? address.area : "",
              flat_no: address.flat_no ? address.flat_no : "",
              landmark: address.landmark ? address.landmark : "",
              country: address.country ? address.country : "India",
            }}
            onSubmit={(values) =>
              title === "Add Address"
                ? addAddress(values)
                : updateAddress(values)
            }
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
              touched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Name</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.name ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter name"
                      onFocus={() => setFieldTouched("name")}
                      onBlur={() => setFieldTouched("name", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.name}
                      onChangeText={handleChange("name")}
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorMessage}>{errors.name}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Phone</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.contact_no ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="phone-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter phone number"
                      keyboardType="numeric"
                      onFocus={() => setFieldTouched("contact_no")}
                      onBlur={() => setFieldTouched("contact_no", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      maxLength={10}
                      value={values.contact_no}
                      onChangeText={handleChange("contact_no")}
                    />
                  </View>
                  {touched.contact_no && errors.contact_no && (
                    <Text style={styles.errorMessage}>{errors.contact_no}</Text>
                  )}
                </View>
                <Text style={{ color: COLORS.primary, fontFamily: "semibold" }}>
                  Address Info
                </Text>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Pincode</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.pincode ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="Enter Pincode"
                      keyboardType="numeric"
                      onFocus={() => setFieldTouched("pincode")}
                      onBlur={() => setFieldTouched("pincode", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.pincode.toString()}
                      maxLength={6}
                      onChangeText={handleChange("pincode")}
                    />
                  </View>
                  {touched.pincode && errors.pincode && (
                    <Text style={styles.errorMessage}>{errors.pincode}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>City</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.city ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="Enter city name"
                      onFocus={() => setFieldTouched("city")}
                      onBlur={() => setFieldTouched("city", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.city}
                      onChangeText={handleChange("city")}
                    />
                  </View>
                  {touched.city && errors.city && (
                    <Text style={styles.errorMessage}>{errors.city}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>State</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.state ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="Enter state name"
                      onFocus={() => setFieldTouched("state")}
                      onBlur={() => setFieldTouched("state", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.state}
                      onChangeText={handleChange("state")}
                    />
                  </View>
                  {touched.state && errors.state && (
                    <Text style={styles.errorMessage}>{errors.state}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Locality / Area</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.area ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="Enter area"
                      onFocus={() => setFieldTouched("area")}
                      onBlur={() => setFieldTouched("area", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.area}
                      onChangeText={handleChange("area")}
                    />
                  </View>
                  {touched.area && errors.area && (
                    <Text style={styles.errorMessage}>{errors.area}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Flat no / Building name</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.flat_no ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="Enter flat / building"
                      onFocus={() => setFieldTouched("flat_no")}
                      onBlur={() => setFieldTouched("flat_no", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.flat_no}
                      onChangeText={handleChange("flat_no")}
                    />
                  </View>
                  {touched.flat_no && errors.flat_no && (
                    <Text style={styles.errorMessage}>{errors.flat_no}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Landmark (optional)</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.landmark ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="Enter landmark"
                      onFocus={() => setFieldTouched("landmark")}
                      onBlur={() => setFieldTouched("landmark", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.landmark}
                      onChangeText={handleChange("landmark")}
                    />
                  </View>
                  {touched.landmark && errors.landmark && (
                    <Text style={styles.errorMessage}>{errors.landmark}</Text>
                  )}
                </View>
                <Button
                  loader={loader}
                  title={title}
                  onPress={handleSubmit}
                  isValid={true}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default AddressForm;
