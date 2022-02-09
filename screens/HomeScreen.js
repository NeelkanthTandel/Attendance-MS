import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import color from "../Constants/Color";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { StackActions, useIsFocused } from "@react-navigation/native";

import CustomText from "../Constants/CustomText";
import Global from "../components/utils/global";
import { API_URL } from "../keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem("token");
            Global.logOutHandler();
            return props.navigation.dispatch(StackActions.replace("Login"));
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
    fetchStuAttendance();
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log("updating");
      // fetchStuAttendance();
      if (Global.stuTodayAtt[0]) {
        let present = 0;
        let absent = 0;
        Global.stuTodayAtt.forEach((val) =>
          val.attendance[0]
            ? val.attendance[0].status
              ? (present += 1)
              : (absent += 1)
            : null
        );
        setNoOfPresent(present);
        setNoOfAbsent(absent);
      }
    }
  }, [isFocused, Global.stuTodayAtt]);

  const [noOfPresent, setNoOfPresent] = useState(0);
  const [noOfAbsent, setNoOfAbsent] = useState(0);

  const fetchStuAttendance = async () => {
    const stu_att = await Global.fetchStuAttendance(new Date());
    if (stu_att[0]) {
      let present = 0;
      let absent = 0;
      Global.stuTodayAtt.forEach((val) =>
        val.attendance[0]
          ? val.attendance[0].status
            ? (present += 1)
            : (absent += 1)
          : null
      );
      setNoOfPresent(present);
      setNoOfAbsent(absent);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          // paddingBottom: 60,
          width: "100%",
          backgroundColor: color.primary,

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
          Today's{" "}
          <CustomText style={{ color: color.secondary }}>
            {Global.user.class_id.charAt(0).toUpperCase() +
              Global.user.class_id.slice(1) +
              " "}
          </CustomText>
          attendance status:
        </CustomText>
        <CustomText style={{ color: "white", marginTop: 5 }}>
          Present :{" "}
          <CustomText
            style={{ color: "#00B812", fontWeight: "bold", fontSize: 18 }}
          >
            {noOfPresent}
          </CustomText>
        </CustomText>
        <CustomText
          style={{
            color: "white",
            // marginTop: 5,
            // marginLeft: 30,
            marginBottom: 30,
          }}
        >
          Absent :{" "}
          <CustomText
            style={{ color: "#FF5F5F", fontWeight: "bold", fontSize: 18 }}
          >
            {noOfAbsent}
          </CustomText>
        </CustomText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          // position: "absolute",
          // marginHorizontal: 30,
          // bottom: 0,
          // left: 30,
        }}
      >
        <View
          style={{
            width: Dimensions.get("screen").width,
            position: "absolute",
            backgroundColor: color.primary,
            height: "40%",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        />
        <TouchableOpacity
          style={{ ...styles.tabs, marginRight: 15 }}
          activeOpacity={0.9}
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
          activeOpacity={0.9}
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
    // shadowRadius: 10,
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
