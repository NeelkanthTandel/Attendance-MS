import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";

import Global from "../components/utils/global";
import color from "../Constants/Color";
import CustomText from "../Constants/CustomText";
import { API_URL } from "../keys";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const signInHandler = async () => {
    if (!username || !password) {
      //alert
      return Alert.alert("Alert", "Credentials cannot be Empty", [
        { text: "OK", onPress: () => console.log("Empty Credentials") },
      ]);
    }
    try {
      const data = await Global.httpPOST("/auth/login", {
        teacherId: username,
        password: password,
      });
      console.log("Data: ", data);
      if (!data.isError && data.isCredMatch) {
        Global.setUserInfo(data.user, data.token);
        // console.log("Global data: ", Global.user);
        AsyncStorage.setItem("token", data.token);
        return props.navigation.dispatch(StackActions.replace("Home"));
      }
      if (data.isError) {
        //alert
        console.log("Login error: ", data.message);
        return Alert.alert(
          "Alert",
          "Something went wrong, please try again later.",
          [{ text: "OK", onPress: () => console.log("Login error message") }]
        );
      }
      if (!data.isCredMatch) {
        return Alert.alert("Alert", "Invalid Credential", [
          { text: "OK", onPress: () => console.log("Invalid Credential") },
        ]);
      }
    } catch (err) {
      console.log("Login error: ", err);
      Alert.alert("Alert", "Something went wrong, please try again later.", [
        { text: "OK", onPress: () => console.log("Server down") },
      ]);

      //server down
    }
  };

  useEffect(() => {
    // isServerUp();
  }, []);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          position: "absolute",
          marginBottom: "30%",
          bottom: 0,
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <Image
            source={require("../assets/images/icon.png")}
            style={{ height: 100, width: 100, marginBottom: 60 }}
          />
          <CustomText
            style={{
              fontSize: 18,
              color: color.primary,
              fontWeight: "bold",
            }}
          >
            Welcome to AppName!
          </CustomText>
        </View>
        <View style={{ paddingTop: 120, paddingHorizontal: 30 }}>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 10,
              paddingVertical: 8,
              backgroundColor: color.background,
              borderRadius: 10,
            }}
          >
            <TextInput
              placeholder="User Id"
              placeholderTextColor={"#656565"}
              // placeholderStyle={{ marginTop: 9 }}
              onChangeText={(value) => {
                setUsername(value);
              }}
              value={username}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <View
              style={{
                width: "100%",
                paddingVertical: 8,
                paddingHorizontal: 10,
                backgroundColor: "#f6f6f6",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                placeholderTextColor={"#656565"}
                onChangeText={(value) => {
                  setPassword(value);
                }}
                style={{ flex: 1 }}
                value={password}
              />
              <TouchableOpacity
                style={{
                  paddingLeft: 10,
                  borderLeftWidth: 0.5,
                  borderColor: "#bcbcbc",
                }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 30, paddingTop: 35 }}>
          <View
            style={{
              width: 300,
              padding: 10,
              backgroundColor: color.primary,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                signInHandler();
                // props.navigation.navigate("Home");
              }}
            >
              <CustomText
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                Login
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 123,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity>
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: color.primary,
              }}
            >
              Forgot Password?
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
