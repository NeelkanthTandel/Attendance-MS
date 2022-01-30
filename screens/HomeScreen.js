import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import color from "../Constants/Color";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";

import CustomText from "../Constants/CustomText";
import Global from "../components/utils/global";
import { API_URL } from "../keys";

const HomeScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <SimpleLineIcons
            name="logout"
            size={20}
            color={color.secondary}
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Profile");
          }}
        >
          <AntDesign
            name="user"
            size={20}
            color={color.secondary}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          // height: 258,
          paddingBottom: 60,
          width: "100%",
          backgroundColor: color.primary,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          paddingHorizontal: 30,
        }}
      >
        <CustomText style={styles.customText}>
          Welcome {Global.user.name}!
        </CustomText>
        <CustomText
          style={{
            color: "#b5b5b5",
            fontSize: 14,
            marginTop: 30,
            // marginLeft: 30,
          }}
        >
          Today's attendance status:
        </CustomText>
        <CustomText style={{ color: "white", marginTop: 5 }}>
          Present :{" "}
        </CustomText>
        <CustomText
          style={{
            color: "white",
            marginTop: 5,
            // marginLeft: 30,
            marginBottom: 30,
          }}
        >
          Absent :{" "}
        </CustomText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            // marginHorizontal: 30,
            bottom: -60,
            left: 30,
          }}
        >
          <TouchableOpacity
            style={{ ...styles.tabs, marginRight: 15 }}
            activeOpacity={0.6}
            onPress={() => {
              props.navigation.navigate("ModifyAttend");
            }}
          >
            <Feather
              name="edit"
              size={28}
              color={color.primary}
              style={{ marginLeft: 4 }}
            />
            <Text
              style={{
                color: "#1c2a40",
                fontSize: 13,
                marginTop: 15,
              }}
            >
              Modify Attendance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabs}
            onPress={() => {
              props.navigation.navigate("ViewAttend");
            }}
            activeOpacity={0.6}
          >
            <Feather
              name="user-check"
              size={29}
              color={color.primary}
              style={{ marginLeft: 5 }}
            />
            <Text
              style={{
                color: "#1c2a40",
                fontSize: 13,
                marginTop: 15,
              }}
            >
              View Attendance
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    justifyContent: "flex-start",
  },
  customText: {
    marginTop: 60,
    // marginLeft: 30,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  tabs: {
    elevation: 5,
    backgroundColor: "white",
    shadowRadius: 10,
    // width: "40%",
    flex: 1,
    // height: 100,
    alignItems: "center",
    paddingVertical: 30,
    paddingBottom: 15,
    borderRadius: 10,
  },
});

export default HomeScreen;
