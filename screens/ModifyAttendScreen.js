import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import color from "../Constants/Color";

const table = [
  (tableHead = ["Id", "Student", "Attendance"]),
  (tableData = [
    ["1", "Hetvi", "P"],
    ["2", "Neelkanth", "A"],
  ]),
];

const ModifyAttendScreen = (props) => {
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
      <View>
        <View style={{ flexDirection: "row", paddingTop: 30, paddingLeft: 30 }}>
          <Ionicons name={"ios-checkbox"} size={26} color={color.primary} />
          <Text
            style={{
              color: color.primary,
              fontSize: 16,
              paddingLeft: 10,
              paddingTop: 5,
            }}
          >
            Present
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 10,
            paddingLeft: 30,
            paddingBottom: 30,
          }}
        >
          <Ionicons name={"ios-checkbox"} size={26} color={color.primary} />
          <Text
            style={{
              color: color.primary,
              fontSize: 16,
              paddingLeft: 10,
              paddingTop: 5,
            }}
          >
            Absent
          </Text>
        </View>
      </View>
      <View style={{ paddingLeft: 30, paddingRight: 30 }}>
        <ScrollView>
          <Table
            borderStyle={{
              borderWidth: 1,
              width: "90%",
            }}
            borderWidth="90%"
            borderColor={color.primary}
            style={{ borderRadius: 20 }}
          >
            <Row
              data={tableHead}
              style={styles.HeadStyle}
              textStyle={{
                fontWeight: "bold",
                color: color.primary,
                fontSize: 16,
              }}
            />
            <Rows data={tableData} textStyle={styles.TableText} />
          </Table>
        </ScrollView>
      </View>
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
