import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import color from "../Constants/Color";
import CustomText from "../Constants/CustomText";

const ViewAttendScreen = (props) => {
  //   const [isOverall, setIsOverall] = useState(false);
  //   const [isDay2Day, setIsDay2Day] = useState(false);

  //   const ConfirmHandler = (props) => {
  //     if (!isOverall && isDay2Day) {
  //       return props.navigation.navigate("Overall");
  //     }
  //   };
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: 45,
          marginLeft: "10%",
          flexDirection: "row",
          paddingBottom: 45,
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.tabs,
            // borderWidth: isOverall ? 1 : 0,
            // borderColor: isOverall ? color.primary : null,
          }}
          onPress={() => props.navigation.navigate("Overall")} //setIsOverall(false)}
        >
          <CustomText style={styles.tabText}>Overall Report</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.tabs,
            marginLeft: "10%",
            // borderWidth: isDay2Day ? 1 : 0,
            // borderColor: isDay2Day ? color.primary : null,
          }}
          onPress={() => props.navigation.navigate("Day2Day")} //setIsDay2Day(false)}
        >
          <CustomText style={styles.tabText}>Day-2-Day Report</CustomText>
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          width: 300,
          padding: 10,
          backgroundColor: color.primary,
          borderRadius: 10,
          marginLeft: "9%",
        }}
      >
        <TouchableOpacity>
          <CustomText
            style={{
              fontSize: 16,
              color: color.secondary,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Confirm
          </CustomText>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
  },
  tabs: {
    width: "40%",
    // paddingBottom: 45,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    elevation: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: color.primary,
    textAlign: "center",
    marginVertical: "20%",
  },
});

export default ViewAttendScreen;
