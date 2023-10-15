import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "./Login.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton, Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";

const Register = ({ navigation }) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [obsecureText, setObsecureText] = useState(true);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Must be 6 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    username: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("Required"),
    location: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("Required"),
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

  const register = async (values) => {
    // console.log(values);
    setLoader(true);
    try {
      const endpoint = `${baseUrl}/api/register`;
      const data = values;
      const response = await axios.post(endpoint, data);
      if (response.status === 201) {
        // console.log(respons e.data);
        setLoader(false);

        navigation.replace("Login");
      } else {
        Alert.alert("Error Registering", `${response.data}`, [
          {
            text: "okay",
            onPress: () => console.log("okay"),
          },

          // { defaultIndex: 0 },
        ]);
      }
    } catch (error) {
      Alert.alert("Error Registering", `${error}`, [
        {
          text: "okay",
          onPress: () => console.log("okay"),
        },

        // { defaultIndex: 0 },
      ]);
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackButton onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/signup-bk.png")}
            style={{
              height: SIZES.height / 3,
              width: SIZES.width - 60,
              resizeMode: "contain",
              marginBottom: SIZES.xxLarge,
            }}
          />

          <Formik
            initialValues={{
              email: "",
              password: "",
              location: "",
              username: "",
            }}
            onSubmit={(values) => register(values)}
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
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter email"
                      onFocus={() => setFieldTouched("email")}
                      onBlur={() => setFieldTouched("email", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.email}
                      onChangeText={handleChange("email")}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.username ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="face-man-profile"
                      size={20}
                      color={COLORS.primary}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter username"
                      onFocus={() => setFieldTouched("username")}
                      onBlur={() => setFieldTouched("username", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.username}
                      onChangeText={handleChange("username")}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Location</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.location ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter location"
                      onFocus={() => setFieldTouched("location")}
                      onBlur={() => setFieldTouched("location", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.location}
                      onChangeText={handleChange("location")}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text style={styles.errorMessage}>{errors.location}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder="Enter password"
                      onFocus={() => setFieldTouched("password")}
                      onBlur={() => setFieldTouched("password", "")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      value={values.password}
                      onChangeText={handleChange("password")}
                    />

                    <TouchableOpacity
                      onPress={() => setObsecureText(!obsecureText)}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                <Button
                  loader={loader}
                  title={"S I G N U P"}
                  onPress={isValid ? handleSubmit : invalidForm}
                  isValid={isValid}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Register;
