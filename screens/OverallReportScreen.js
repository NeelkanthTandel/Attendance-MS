import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import color from "../Constants/Color";
import CustomText from "../Constants/CustomText";
import Global from "../components/utils/global";

const OverallReportScreen = () => {
  const [overallAtt, setOverallAtt] = useState();
  const [totalWorkD, setTotalWorkD] = useState();

  const fetchAllAttendance = async () => {
    try {
      const data = await Global.httpPOST("/getOverallAttendance", {
        classId: Global.user.class_id,
      });
      console.log(data);
      if (!data.isError) {
        setOverallAtt(data.totalStuAtt);
        setTotalWorkD(data.totalWorkDays);
      } else {
        //handle error
      }
    } catch (err) {
      console.log("Fetch overall att error:", err);
      //handle error
    }
  };

  useEffect(() => {
    fetchAllAttendance();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 30 }}>
        <View style={{ paddingTop: 30, paddingBottom: 45 }}>
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
        <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 20 }}>
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
            <CustomText style={{ width: "58%", fontWeight: "700" }}>
              Name
            </CustomText>
            <CustomText
              style={{ width: "18%", minWidth: 28, fontWeight: "700" }}
            >
              P/D
            </CustomText>
            <CustomText
              style={{ width: "12%", minWidth: 28, fontWeight: "700" }}
            >
              Perc
            </CustomText>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            {overallAtt ? (
              overallAtt.map((item, index) => {
                let noOfPres = item.attendance.length;

                return (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      marginBottom: 15,
                    }}
                    key={index}
                  >
                    <CustomText style={{ width: "12%", minWidth: 18 }}>
                      {item.stu_id.charAt(3) + item.stu_id.charAt(4)}
                    </CustomText>
                    <CustomText style={{ width: "58%" }}>
                      {item.name}
                    </CustomText>
                    <CustomText style={{ width: "18%", minWidth: 28 }}>
                      {noOfPres}/{totalWorkD}
                    </CustomText>
                    <CustomText style={{ width: "12%", minWidth: 28 }}>
                      {(noOfPres * 100) / totalWorkD}%
                    </CustomText>
                  </View>
                );
              })
            ) : (
              <CustomText style={{ textAlign: "center", marginBottom: 10 }}>
                Loading Data...
              </CustomText>
            )}
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
});

export default OverallReportScreen;
