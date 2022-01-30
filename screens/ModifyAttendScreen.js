import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import CustomText from "../Constants/CustomText";
import color from "../Constants/Color";
import { API_URL } from "../keys";
import Global from "../components/utils/global";

const ModifyAttendScreen = (props) => {
  const [attendanceDetail, setAttendanceDetail] = useState();
  const [updatedAttDet, setUpdatedAttDet] = useState();

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
    if (!data.isError) {
      setAttendanceDetail(data.stu_att);
      setUpdatedAttDet(data.stu_att);
    }
  };

  useEffect(() => {
    fetchStuAttendance();
  }, []);

  const [isPresentCheck, setIsPresentCheck] = useState(false);
  const [isAbsentCheck, setIsAbsentCheck] = useState(false);

  const TableRow = (props) => {
    const [isPresentACheck, setIsPresentACheck] = useState(props.isPresent);

    return (
      <View style={{ flexDirection: "row", width: "100%", marginBottom: 15 }}>
        <CustomText style={{ width: "12%" }}>{props.id}</CustomText>
        <CustomText style={{ width: "78%" }} numberOfLines={1}>
          {props.name}
        </CustomText>
        <CustomText style={{ width: "10%" }}>
          <CheckBox
            isChecked={isPresentACheck}
            onClick={() => {
              setIsPresentACheck(!isPresentACheck);
            }}
            tintColors={{
              true: color.primary,
            }}
          />
        </CustomText>
      </View>
    );
  };

  useEffect(() => {
    if (
      (!isPresentCheck && !isAbsentCheck) ||
      (isPresentCheck && isAbsentCheck)
    ) {
      setUpdatedAttDet(attendanceDetail);
    } else if (isPresentCheck) {
      //keep stu with status true
      setUpdatedAttDet(
        attendanceDetail.filter((data) => data.attendance[0].status)
      );
    } else if (isAbsentCheck) {
      //keep stu with status false
      setUpdatedAttDet(
        attendanceDetail.filter((data) => !data.attendance[0].status)
      );
    }
  }, [attendanceDetail, isPresentCheck, isAbsentCheck]);

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
          <TouchableOpacity>
            <FontAwesome5 name="calendar-alt" size={23} color="white" />
          </TouchableOpacity>
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
            <CheckBox
              isChecked={isPresentCheck}
              onClick={() => {
                setIsPresentCheck(!isPresentCheck);
              }}
              tintColors={{
                true: color.primary,
              }}
            />
            <CustomText
              style={{
                color: color.primary,
                fontSize: 16,
                paddingLeft: 10,
                paddingTop: 1,
              }}
            >
              Show Present
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 30,
            }}
          >
            <CheckBox
              // disabled={true }
              isChecked={isAbsentCheck}
              onClick={(v) => {
                setIsAbsentCheck(!isAbsentCheck);
              }}
              tintColors={{
                true: color.primary,
              }}
            />
            <CustomText
              style={{
                color: color.primary,
                fontSize: 16,
                paddingLeft: 10,
                paddingTop: 1,
              }}
            >
              Show Absent
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
            {updatedAttDet ? (
              updatedAttDet.map((item, index) => (
                <TableRow
                  id={item.stu_id.charAt(3) + item.stu_id.charAt(4)}
                  name={item.name}
                  isPresent={item.attendance[0].status}
                  key={index}
                  isPresentCheck={isPresentCheck}
                  isAbsentCheck={isAbsentCheck}
                />
              ))
            ) : (
              <CustomText style={{ textAlign: "center", marginBottom: 15 }}>
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
  HeadStyle: {
    alignContent: "center",
  },
  TableText: {
    color: color.primary,
    fontSize: 16,
  },
});

export default ModifyAttendScreen;
