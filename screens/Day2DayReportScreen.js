import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import color from "../Constants/Color";
import CustomText from "../Constants/CustomText";
import { useIsFocused } from "@react-navigation/native";
import Global from "../components/utils/global";

const Day2DayReportScreen = () => {
  const [allDayAtt, setAllDayAtt] = useState();
  const [workingDays, setWorkingDays] = useState();
  const isFocused = useIsFocused();

  const fetchAllAttendance = async () => {
    try {
      const data = await Global.httpPOST("/getDayAttendance", {
        classId: Global.user.class_id,
      });
      if (!data.isError) {
        console.log("fetch overall att complete");
        // console.log(data.totalStuAtt);
        setAllDayAtt(data.totalStuAtt);
        setWorkingDays(data.workingDays);
      } else {
        //handle error
      }
    } catch (err) {
      console.log("Fetch overall att error:", err);
      //handle error
    }
  };

  useEffect(() => {
    if (!allDayAtt) {
      fetchAllAttendance();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ paddingTop: 30, paddingBottom: 45 }}>
          <CustomText
            style={{ color: color.primary, fontWeight: "bold", fontSize: 16 }}
          >
            Day-to-Day Report
          </CustomText>
          <CustomText
            style={{ paddingTop: 10, fontSize: 12, color: color.primary }}
          >
            This report will show attendance of every single day.
          </CustomText>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 50,
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              marginRight: 0,
              paddingVertical: 10,
              borderRightWidth: 1,
            }}
          >
            <CustomText
              style={{
                fontWeight: "700",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderBottomWidth: 0.5,
              }}
            >
              Id
            </CustomText>
            <CustomText
              style={{
                fontWeight: "700",
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontSize: 14,
                borderBottomWidth: 0.5,
              }}
            >
              Name
            </CustomText>

            {workingDays && workingDays[0]
              ? workingDays.map((data, index) => (
                  <CustomText
                    style={{
                      fontWeight: "700",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderBottomWidth:
                        index == workingDays.length - 1 ? 0 : 0.5,
                    }}
                    key={index}
                  >
                    {new Date(data.date).getDate() +
                      "/" +
                      (new Date(data.date).getMonth() + 1) +
                      "/" +
                      new Date(data.date).getFullYear().toString().slice(2, 4)}
                  </CustomText>
                ))
              : null}
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            indicatorStyle={"black"}
          >
            <View style={{ flexDirection: "row" }}>
              {allDayAtt && allDayAtt[0] ? (
                allDayAtt.map((data, index) => (
                  <View
                    style={{
                      flexDirection: "column",
                      paddingVertical: 10,
                      borderRightWidth: index == allDayAtt.length - 1 ? 0 : 0.5,
                    }}
                    key={index}
                  >
                    <CustomText style={{ padding: 5, borderBottomWidth: 0.5 }}>
                      {data.stu_id.slice(3, 5)}
                    </CustomText>
                    <CustomText
                      style={{
                        padding: 5,
                        borderBottomWidth: 0.5,
                        fontSize: 14,
                      }}
                    >
                      {data.name}
                    </CustomText>
                    {data.attendance && data.attendance[0]
                      ? data.attendance.map((att, ind) => (
                          <CustomText
                            style={{
                              padding: 5,
                              borderBottomWidth:
                                ind == data.attendance.length - 1 ? 0 : 0.5,
                            }}
                            key={ind}
                          >
                            {att.status ? "P" : "A"}
                          </CustomText>
                        ))
                      : null}
                  </View>
                ))
              ) : (
                <CustomText>Loading Data...</CustomText>
              )}
            </View>
          </ScrollView>
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

export default Day2DayReportScreen;
