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
  const [attendanceDetail, setAttendanceDetail] = useState();
  const [filteredAttDet, setFilteredAttDet] = useState();
  const [isPresentAll, setIsPresentAll] = useState();
  // const [updatedAttIds, setUpdatedAttIds] = useState([]);
  let updatedAttIds = [];
  const [date, setDate] = useState(new Date());

  const fetchStuAttendance = async () => {
    setAttendanceDetail();
    setFilteredAttDet();
    const data = await Global.httpPOST("/getAttendance", { date });
    console.log("att det:  Fetch compelete");
    if (!data.isError) {
      // console.log("att det: ", data);
      setAttendanceDetail(data.stu_att);
      setFilteredAttDet(data.stu_att);
    }
  };

  useEffect(() => {
    // if (!attendanceDetail) {
    console.log("fetch");
    fetchStuAttendance();
    // }
  }, [date]);

  const [isPresentCheck, setIsPresentCheck] = useState(false);
  const [isAbsentCheck, setIsAbsentCheck] = useState(false);

  const TableRow = (props) => {
    const [isPresentACheck, setIsPresentACheck] = useState(props.isPresent);
    // const [isModified, setIsModified] = useState(false);

    const toggleAttendance = () => {
      let currentStatus = isPresentACheck;
      console.log(currentStatus);
      setIsPresentACheck((data) => !data);
      const index = updatedAttIds.findIndex((d) => d.attId == props.attId);
      console.log(index);

      if (index >= 0) {
        console.log("Removing");
        updatedAttIds.splice(index, 1);
      } else {
        console.log("Inserting");
        updatedAttIds.push({
          stuId: props.stuId,
          attId: props.attId,
          status: !currentStatus,
        });
      }

      // console.log(updatedAttIds);
    };

    // useEffect(() => {
    //   // const updData = attendanceDetail.find(
    //   //   (data) => data.stu_id == props.stuId
    //   // );
    //   // setUpdatedAttDet((data) => );
    //   if (isModified) {

    //   }
    // }, [isPresentACheck]);

    return (
      <TouchableOpacity
        style={{
          borderBottomWidth: filteredAttDet.length - 1 == props.index ? 0 : 1,
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
        onPress={toggleAttendance}
      >
        <View style={{ flexDirection: "row", width: "100%" }}>
          <CustomText style={{ width: "12%" }}>{props.id}</CustomText>
          <CustomText
            style={{ width: "78%" }}
            numberOfLines={1}
            // onPress={toggleAttendance}
          >
            {props.name}
          </CustomText>
          <CustomText style={{ width: "10%" }}>
            <CheckBox
              isChecked={isPresentACheck}
              onClick={toggleAttendance}
              tintColors={{
                true: color.primary,
              }}
            />
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (attendanceDetail && attendanceDetail[0]) {
      if (
        (!isPresentCheck && !isAbsentCheck) ||
        (isPresentCheck && isAbsentCheck)
      ) {
        setFilteredAttDet(attendanceDetail);
      } else if (isPresentCheck && !isAbsentCheck) {
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
    }

    // console.log(attendanceDetail);
    // console.log(filteredAttDet);
  }, [attendanceDetail, isPresentCheck, isAbsentCheck]);

  const onSaveHandler = async () => {
    if (!updatedAttIds[0]) {
      return console.log("Nothing to update");
    }

    const response = await fetch(`${API_URL}/modifyAttendance`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + Global.token,
      },
      body: JSON.stringify({
        updAttDet: updatedAttIds,
      }),
    });
    const data = await response.json();
    console.log(data);
    fetchStuAttendance();
    if (date.getUTCDate() == new Date().getUTCDate()) {
      Global.fetchStuAttendance(new Date());
    }
  };

  const [search, setSearch] = useState("");
  const handleSearch = (text) => {
    setIsAbsentCheck(false);
    setIsPresentCheck(false);
    const formatedText = text.toLowerCase();
    if (attendanceDetail[0]) {
      const filteredData = attendanceDetail.filter((stu) =>
        stu.name.toLowerCase().includes(formatedText)
      );
      setFilteredAttDet(filteredData);
    }
  };

  return (
    <View style={styles.container} key={Global.token}>
      <View>
        <View
          style={{
            // height: 258,
            paddingVertical: 15,
            width: "100%",
            backgroundColor: color.primary,
            // borderBottomRightRadius: 20,
            // borderBottomLeftRadius: 20,
            paddingHorizontal: 30,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SearchBar
            placeholder="Search Id or Name"
            onChangeText={(val) => {
              console.log(val);
              setSearch(val);
              handleSearch(val);
            }}
            value={search}
            inputContainerStyle={{
              backgroundColor: "white",
              borderRadius: 8,
              // height: 0,
              height: 35,
              // width: "90%",
            }}
            lightTheme
            containerStyle={{
              padding: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRadius: 8,
              // marginBottom: 30,
              // height: 0,
              // width: "90%",
              flex: 1,
            }}
          />
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
                setSearch("");
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
                setSearch("");
              }}
            >
              Show Present
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
              paddingBottom: 30,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                // disabled={true }
                isChecked={isAbsentCheck}
                onClick={() => {
                  setIsAbsentCheck(!isAbsentCheck);
                  setSearch("");
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
                  setSearch("");
                }}
              >
                Show Absent
              </CustomText>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setIsModalVisible(!isModalVisible)}
              >
                <CustomText
                  style={{
                    color: color.primary,
                    fontWeight: "bold",
                  }}
                >
                  {date.getUTCDate() +
                    "/" +
                    (date.getUTCMonth() + 1) +
                    "/" +
                    date.getUTCFullYear()}
                </CustomText>
              </TouchableOpacity>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                  setIsModalVisible(!isModalVisible);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      width: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderColor: color.primary,
                        borderBottomWidth: 0.5,
                        borderColor: color.primary,
                        paddingVertical: 10,
                        paddingHorizontal: 15,

                        backgroundColor:
                          date.getDate() == new Date().getDate()
                            ? "#d3d3d3"
                            : "white",
                      }}
                      onPress={() => {
                        setDate(new Date());
                        setIsModalVisible(false);
                      }}
                    >
                      <CustomText
                        style={{
                          color: color.primary,
                          fontSize: 16,
                        }}
                      >
                        Today
                      </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        backgroundColor:
                          date.getDate() != new Date().getDate()
                            ? "#d3d3d3"
                            : "white",
                      }}
                      onPress={() => {
                        let prevDate = new Date();
                        prevDate.setDate(prevDate.getDate() - 1);
                        setDate(prevDate);
                        setIsModalVisible(false);
                      }}
                    >
                      <CustomText
                        style={{ color: color.primary, fontSize: 16 }}
                      >
                        Yesterday
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
        <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
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
              <CheckBox
                isChecked={setIsPresentAll}
                // onClick={toggleAttendance}
                tintColors={{
                  true: color.primary,
                }}
              />
            </CustomText>
          </View>
          <View style={{}}>
            {filteredAttDet ? (
              filteredAttDet.map((item, index) => (
                <TableRow
                  id={item.stu_id.charAt(3) + item.stu_id.charAt(4)}
                  name={item.name}
                  attId={item.attendance[0] ? item.attendance[0].id : null}
                  isPresent={
                    item.attendance[0] ? item.attendance[0].status : false
                  }
                  stuId={item.stu_id}
                  index={index}
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
          onPress={onSaveHandler}
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
