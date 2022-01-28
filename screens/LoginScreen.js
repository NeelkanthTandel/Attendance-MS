import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import color from "../Constants/Color";
import CustomText from "../Constants/CustomText";

const LoginScreen = (props) => {
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
              props.navigation.navigate("Home");
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
