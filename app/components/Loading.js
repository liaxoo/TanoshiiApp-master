import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { COLORS } from "../styling/styles";
const Loading = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.DARK_BACKGROUND,
        height: "100%",
        width: "100%",
      }}
    >
      <LottieView
        autoPlay
        style={{
          backgroundColor: COLORS.DARK_BACKGROUND,
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
        autoSize={true}
        source={require("../assets/lottie/1.json")}
      />
    </View>
  );
};

export default Loading;
