import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import color from "../Constants/Color";
import CustomText from "../Constants/CustomText";
import { API_URL } from "../keys";

const LoginScreen = (props) => {
  const signInHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          teacherId: username,
          password: password,
        }),
      });
      const data = await response.json();
      console.log("Data: ", data);
      if (!data.isError && data.isCredMatch) {
        return props.navigation.navigate("Home");
      }
      if (data.isError) {
        //alert
        console.log("Login error message: ", data.message);
      }
    } catch (err) {
      console.log("Login Error: ", err);
      //server down
    }
  };

  useEffect(() => {
    // isServerUp();
  }, []);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 88 }}>
        <Text
          style={{
            fontSize: 18,
            color: color.primary,
            fontWeight: "bold",
          }}
        >
          Welcome to AppName!
        </Text>
      </View>
      <View style={{ paddingTop: 120, paddingHorizontal: 30 }}>
        <View
          style={{
            width: 300,
            padding: 8,
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
              width: 300,
              padding: 8,
              backgroundColor: "#f6f6f6",
              borderRadius: 10,
            }}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"#656565"}
              onChangeText={(value) => {
                setPassword(value);
              }}
              value={password}
            />
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
            <Text
              style={{
                color: "white",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 123, paddingTop: 10 }}>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: color.primary,
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "85%",
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
  },
});

export default LoginScreen;
