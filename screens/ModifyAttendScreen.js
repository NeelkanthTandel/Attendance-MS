import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import CustomText from "../Constants/CustomText";
import color from "../Constants/Color";
import { API_URL } from "../keys";
import Global from "../components/utils/global";

const ModifyAttendScreen = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [attendanceDetail, setAttendanceDetail] = useState(Global.stuTodayAtt);
  const [filteredAttDet, setFilteredAttDet] = useState();
  const fetchStuAttendance = async () => {
    // let prevDate = new Date();
    // prevDate.setDate(prevDate.getDate() - 1);
    let today = new Date();
    const response = await fetch(`${API_URL}/getAttendance`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + Global.token,
      },
      body: JSON.stringify({
        date: today,
      }),
    });
    const data = await response.json();
    console.log("att det: ", data);
    if (!data.isError) {
      setAttendanceDetail(data.stu_att);
      setFilteredAttDet(data.stu_att);
    }
  };

  useEffect(() => {
    if (!attendanceDetail) {
      fetchStuAttendance();
    }
  }, []);

  const [isPresentCheck, setIsPresentCheck] = useState(false);
  const [isAbsentCheck, setIsAbsentCheck] = useState(false);

  const TableRow = (props) => {
    const [isPresentACheck, setIsPresentACheck] = useState(props.isPresent);

    return (
      <View style={{ flexDirection: "row", width: "100%", marginBottom: 15 }}>
        <CustomText style={{ width: "12%" }}>{props.id}</CustomText>
        <CustomText
          style={{ width: "78%" }}
          numberOfLines={1}
          onPress={() => {
            setIsPresentACheck(!isPresentACheck);
          }}
        >
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
      setFilteredAttDet(attendanceDetail);
    } else if (isPresentCheck) {
      //keep stu with status true
      setFilteredAttDet(
        attendanceDetail.filter((data) => data.attendance[0].status)
      );
    } else if (isAbsentCheck) {
      //keep stu with status false
      setFilteredAttDet(
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
          <View>
            <TouchableOpacity
              onPress={() => setIsModalVisible(!isModalVisible)}
            >
              <FontAwesome5 name="calendar-alt" size={23} color="white" />
            </TouchableOpacity>
            {/* <Modal
              animationType={"fade"}
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                setIsModalVisible(!isModalVisible);
              }}
            >
              <View style={{ backgroundColor: "white" }}>
                <TouchableOpacity>
                  <CustomText
                    style={{
                      color: color.primary,
                      fontSize: 14,
                      borderColor: color.primary,
                    }}
                  >
                    Today
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <CustomText style={{ color: color.primary, fontSize: 14 }}>
                    Yesterday
                  </CustomText>
                </TouchableOpacity>
              </View>
            </Modal> */}
          </View>
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
              onPress={() => {
                setIsPresentCheck(!isPresentCheck);
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
              onClick={() => {
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
              onPress={() => {
                setIsAbsentCheck(!isAbsentCheck);
              }}
            >
              Show Absent
            </CustomText>
          </View>
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
            {filteredAttDet ? (
              filteredAttDet.map((item, index) => (
                <TableRow
                  id={item.stu_id.charAt(3) + item.stu_id.charAt(4)}
                  name={item.name}
                  isPresent={
                    item.attendance[0] ? item.attendance[0].status : false
                  }
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
        <TouchableOpacity
          style={{
            marginHorizontal: "75%",
            width: "25%",
            padding: 10,
            borderRadius: 10,
            backgroundColor: color.primary,
            marginBottom: 50,
          }}
        >
          <CustomText
            style={{
              color: color.secondary,
              fontWeight: "bold",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Save
          </CustomText>
        </TouchableOpacity>
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
