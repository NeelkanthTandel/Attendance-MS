import React from "react";
import { View } from "react-native";
import color from "../Constants/Color";
import CustomText from "../Constants/CustomText";

const LoginScreen = (props) => {
  return (
    <View>
      <CustomText style={{ fontSize: 25, color: color.primary }}>
        Login Screen
      </CustomText>
    </View>
  );
};

export default LoginScreen;
