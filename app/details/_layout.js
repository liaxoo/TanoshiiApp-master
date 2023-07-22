import { View, Text } from "react-native";
import React from "react";

import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import AnimeDetails from "./[id]";
import { COLORS } from "../styling/styles";
import { createNavigationContainer } from "react-navigation";

const Stack = createStackNavigator();
const Layout = () => {
  setStatusBarBackgroundColor("#080E1E", false);
  setStatusBarStyle("light");
  return (
    <Stack.Navigator
      initialRouteName="[id]"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        component={AnimeDetails}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: COLORS.WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Layout;
