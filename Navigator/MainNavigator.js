import * as React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import color from "../Constants/Color";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ModifyAttendScreen from "../screens/ModifyAttendScreen";
import ViewAttendScreen from "../screens/ViewAttendScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function MainNaviator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={LoginScreen}
          name="Login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={HomeScreen}
          name="Home"
          options={{
            headerStyle: { backgroundColor: color.primary },
            headerShadowVisible: false,
            headerTintColor: color.secondary,
            headerTitleStyle: {
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: 18,
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          component={ModifyAttendScreen}
          name="ModifyAttend"
          options={{
            title: "Modify Attendance",
            headerStyle: { backgroundColor: color.primary },
            headerShadowVisible: false,
            headerTintColor: color.secondary,
            headerTitleStyle: {
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: 18,
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          component={ViewAttendScreen}
          name="ViewAttend"
          options={{
            title: "View Attendance",
            headerStyle: { backgroundColor: color.primary },
            headerShadowVisible: false,
            headerTintColor: color.secondary,
            headerTitleStyle: {
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: 18,
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          component={ProfileScreen}
          name="Profile"
          options={{
            title: "Profile Screen",
            headerStyle: {
              backgroundColor: color.primary,
              borderBottomRightRadius: 20,
              borderBottomRightRadius: 20,
            },
            headerShadowVisible: false,
            headerTintColor: color.secondary,
            headerTitleStyle: {
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: 18,
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
