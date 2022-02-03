import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  StyleSheet,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import CustomText from "../Constants/CustomText";
import color from "../Constants/Color";
import Global from "../components/utils/global";

const screenWidth = Dimensions.get("screen").width;

const ProfileScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageURI, setImageURI] = useState();
  // console.log(imageURI);
  // const openGallery = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     includeBase64: true,
  //     cropperCircleOverlay: true,
  //   })
  //     .then(image => {
  //       // console.log(image.path);
  //       setImageURI('data:image/jpg;base64,' + image.data);
  //       setModalVisible(false);
  //     })
  //     .catch(err => {
  //       console.log('Profile update error: ', err.message);
  //     });
  // };

  // const openCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     useFrontCamera: true,
  //     includeBase64: true,
  //     cropperCircleOverlay: true,
  //   })
  //     .then(image => {
  //       // console.log(image.path);
  //       setImageURI('data:image/jpg;base64,' + image.data);
  //       setModalVisible(false);
  //     })
  //     .catch(err => {
  //       console.log('Profile update error: ', err.message);
  //     });
  // };

  return (
    <View key={Global.token} style={styles.screen}>
      <View
        style={{
          width: 0.4 * screenWidth,
          height: 0.4 * screenWidth,
          backgroundColor: "#CAD1D4",
          borderRadius: (0.4 * screenWidth) / 2,
          marginTop: 30,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomText
          style={{ fontWeight: "bold", fontSize: 60, color: color.primary }}
        >
          {Global.user.name.charAt(0)}
        </CustomText>
      </View>
      <View style={{ marginTop: 30, width: "100%", paddingHorizontal: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <FontAwesome5 name="user-alt" size={18} color="#646464" />
          <View style={{ flex: 1, marginLeft: 30 }}>
            <CustomText style={{ fontSize: 14, color: "#646464" }}>
              Name
            </CustomText>
            <CustomText style={{ fontSize: 16, color: color.primary }}>
              {Global.user.name}
            </CustomText>
          </View>
          {/* <MaterialIcons name="edit" size={23} color={color.primary} /> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Ionicons
            name="location"
            size={23}
            color="#646464"
            style={{ marginLeft: -3 }}
          />
          <View style={{ flex: 1, marginLeft: 28 }}>
            <CustomText style={{ fontSize: 14, color: "#646464" }}>
              Address
            </CustomText>
            <CustomText style={{ fontSize: 16, color: color.primary }}>
              {Global.user.address}
            </CustomText>
          </View>
          {/* <MaterialIcons name="edit" size={23} color={color.primary} /> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <FontAwesome
            name="phone"
            size={18}
            color="#646464"
            style={{ marginLeft: 2 }}
          />
          <View style={{ flex: 1, marginLeft: 32 }}>
            <CustomText style={{ fontSize: 14, color: "#646464" }}>
              Phone
            </CustomText>
            <CustomText style={{ fontSize: 16, color: color.primary }}>
              {Global.user.phone_number}
            </CustomText>
          </View>
          {/* <MaterialIcons name="edit" size={23} color={color.primary} /> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <MaterialCommunityIcons
            name="email"
            size={20}
            color="#646464"
            style={{ marginLeft: 1 }}
          />
          <View style={{ flex: 1, marginLeft: 29 }}>
            <CustomText style={{ fontSize: 14, color: "#646464" }}>
              Email
            </CustomText>
            <CustomText style={{ fontSize: 16, color: color.primary }}>
              {Global.user.mail_id}
            </CustomText>
          </View>
          {/* <MaterialIcons name="edit" size={23} color={color.primary} /> */}
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

export default ProfileScreen;
