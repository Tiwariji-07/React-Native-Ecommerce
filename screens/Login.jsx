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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const [obsecureText, setObsecureText] = useState(true);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Must be 6 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
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

  const login = async (values) => {
    setLoader(true);
    try {
      const endpoint = `${baseUrl}/api/login`;
      const data = values;
      console.log(data);
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        // console.log(respons e.data);
        setLoader(false);
        setResponseData(response.data);
        await AsyncStorage.setItem(
          `user${response.data._id}`,
          JSON.stringify(response.data)
        );
        await AsyncStorage.setItem(`id`, JSON.stringify(response.data._id));

        navigation.replace("Bottom Navigation");
      } else {
        Alert.alert("Error logging in", "Please provide valid credentials", [
          {
            text: "okay",
            onPress: () => console.log("okay"),
          },

          // { defaultIndex: 0 },
        ]);
      }
    } catch (error) {
      Alert.alert("Error logging in", "Please provide valid credentials!", [
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
            source={require("../assets/images/login-bk1.png")}
            style={styles.cover}
          />

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => login(values)}
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
                  title={"L O G I N"}
                  onPress={isValid ? handleSubmit : invalidForm}
                  isValid={isValid}
                />

                <Text
                  style={styles.register}
                  onPress={() => navigation.navigate("Register")}
                >
                  New Here? Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
