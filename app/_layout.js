import React from "react";
import { Stack, useRouter } from "expo-router";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";

const StackLayout = () => {
  setStatusBarBackgroundColor("#080E1E", false);
  setStatusBarStyle("light");

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#10101E",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="(main)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
