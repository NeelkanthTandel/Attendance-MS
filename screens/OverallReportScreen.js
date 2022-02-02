import React from "react";
import { View, StyleSheet } from "react-native";
import color from "../Constants/Color";
import CustomText from "../Constants/CustomText";

const OverallReportScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 30, marginHorizontal: 30, paddingBottom: 45 }}>
        <CustomText
          style={{ color: color.primary, fontWeight: "bold", fontSize: 18 }}
        >
          Overall Report
        </CustomText>
        <CustomText
          style={{
            paddingTop: 10,
            fontSize: 14,
            color: color.primary,
          }}
        >
          This report will show the total number of days the student was
          present.
        </CustomText>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 50,
          marginHorizontal: 30,
        }}
      >
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
            style={{ marginLeft: 10, minWidth: 18, fontWeight: "700" }}
          >
            Name
          </CustomText>
          <CustomText style={{ marginLeft: 45, fontWeight: "700" }}>
            Days/Days
          </CustomText>
          <CustomText
            style={{ marginLeft: 40, minWidth: 28, fontWeight: "700" }}
          >
            %Attend
          </CustomText>
        </View>
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
});

export default OverallReportScreen;
