import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AntDesign } from "@expo/vector-icons";
import color from "../Constants/Color";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ModifyAttendScreen from "../screens/ModifyAttendScreen";
import ViewAttendScreen from "../screens/ViewAttendScreen";
import ProfileScreen from "../screens/ProfileScreen";
import OverallReportScreen from "../screens/OverallReportScreen";
import Day2DayReportScreen from "../screens/Day2DayReportScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../keys";
import Global from "../components/utils/global";
import CustomText from "../Constants/CustomText";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function MainNaviator(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: color.primary,
          tabBarIndicatorStyle: { backgroundColor: color.primary },
        }}
      >
        <Tab.Screen
          component={OverallReportScreen}
          name="Overall"
          options={
            {
              // tabBarStyle: { fontSize: 14, color: "red" },
            }
          }
        />
        <Tab.Screen
          component={Day2DayReportScreen}
          name="Day2Day"
          options={
            {
              // tabBarStyle: { fontSize: 14, color: color.primary },
            }
          }
        />
      </Tab.Navigator>
    );
  };

  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.user) {
          setIsLoggedIn(true);
          Global.setUserInfo(data.user, token);
        }
      } catch (err) {
        console.log("Get user error: ", err);
      }
    } else {
      console.log("No token found");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <CustomText>Loading...</CustomText>
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            {isLoggedIn ? (
              <>
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
                  component={LoginScreen}
                  name="Login"
                  options={{ headerShown: false }}
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
                  component={TabNavigator}
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
              </>
            ) : (
              <>
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
                  component={TabNavigator}
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
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
