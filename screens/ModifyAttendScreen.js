import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../Constants/CustomText";
import color from "../Constants/Color";
import { API_URL } from "../keys";
import Global from "../components/utils/global";

const TableRow = (props) => {
  return (
    <View style={{ flexDirection: "row", width: "100%", marginBottom: 15 }}>
      <CustomText style={{ width: "12%" }}>{props.id}</CustomText>
      <CustomText style={{ width: "78%" }} numberOfLines={1}>
        {props.name}
      </CustomText>
      <CustomText style={{ width: "10%" }}>
        {props.isPresent ? "P" : "A"}
      </CustomText>
    </View>
  );
};

const ModifyAttendScreen = (props) => {
  const fetchStuAttendance = async () => {
    const response = await fetch(`${API_URL}/getAttendance`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + Global.token,
      },
      body: JSON.stringify({
        date: new Date(),
      }),
    });
    const data = await response.json();
    console.log("att det: ", data);
  };

  useEffect(() => {
    fetchStuAttendance();
  }, []);

  const dummyData = [
    {
      id: 1,
      name: "Neelkanth Tandel",
      isPresent: true,
    },
    {
      id: 2,
      name: "Hetvi Soni",
      isPresent: false,
    },
    {
      id: 3,
      name: "Neelkanth Tandel",
      isPresent: true,
    },
    {
      id: 4,
      name: "Hetvi Soni",
      isPresent: false,
    },
    {
      id: 5,
      name: "Neelkanth Tandel",
      isPresent: true,
    },
    {
      id: 6,
      name: "Hetvi Soni",
      isPresent: false,
    },
    {
      id: 7,
      name: "Neelkanth Tandel",
      isPresent: true,
    },
    {
      id: 8,
      name: "Hetvi Soni",
      isPresent: false,
    },
    {
      id: 9,
      name: "Neelkanth Tandel",
      isPresent: true,
    },
    {
      id: 10,
      name: "Hetvi Soni",
      isPresent: false,
    },
    {
      id: 11,
      name: "Neelkanth Tandel",
      isPresent: true,
    },
    {
      id: 12,
      name: "Hetvi Soni",
      isPresent: false,
    },
    {
      id: 13,
      name: "Neelkanth Tandel",
      isPresent: true,
    },
    {
      id: 14,
      name: "Hetvi Soni",
      isPresent: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            // height: 258,
            paddingVertical: 25,
            width: "100%",
            backgroundColor: color.primary,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            paddingHorizontal: 30,
            flexDirection: "row",
          }}
        >
          <SearchBar
            placeholder="Search"
            inputContainerStyle={{
              backgroundColor: "white",
              borderRadius: 8,
              height: 0,
              width: "90%",
            }}
            lightTheme
            containerStyle={{
              padding: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRadius: 8,
              marginBottom: 30,
              height: 0,
              width: "90%",
            }}
          />
          <Ionicons name="md-calendar" size={24} color="white" />
        </View>
      </View>
      <ScrollView
        style={{
          padding: 30,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Ionicons name={"ios-checkbox"} size={26} color={color.primary} />
            <CustomText
              style={{
                color: color.primary,
                fontSize: 16,
                paddingLeft: 10,
                paddingTop: 5,
              }}
            >
              Present
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 30,
            }}
          >
            <Ionicons name={"ios-checkbox"} size={26} color={color.primary} />
            <CustomText
              style={{
                color: color.primary,
                fontSize: 16,
                paddingLeft: 10,
                paddingTop: 5,
              }}
            >
              Absent
            </CustomText>
          </View>
        </View>
        <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 50 }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginBottom: 15,
              borderBottomWidth: 1,
              padding: 10,
            }}
          >
            <CustomText
              style={{ width: "12%", minWidth: 18, fontWeight: "700" }}
            >
              Id
            </CustomText>
            <CustomText style={{ width: "78%", fontWeight: "700" }}>
              Name
            </CustomText>
            <CustomText
              style={{ width: "10%", minWidth: 28, fontWeight: "700" }}
            >
              P/A
            </CustomText>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            {dummyData.map((item, index) => (
              <TableRow
                id={item.id}
                name={item.name}
                isPresent={item.isPresent}
                key={index}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
  },
  HeadStyle: {
    alignContent: "center",
  },
  TableText: {
    color: color.primary,
    fontSize: 16,
  },
});

export default ModifyAttendScreen;
