import { Tabs, Stack } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../styling/styles";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";

import HomeIconFilled from "../assets/icons/homeOutline.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import HomeIcon from "../assets/icons/home.svg";
import ProfileIconFilled from "../assets/icons/profileFilled.svg";
import Watching from "../assets/icons/watching.svg";
import WatchingFilled from "../assets/icons/watching-filled.svg";
const SIZE = 30;

export default () => {
  setStatusBarBackgroundColor("#080E1E", false);
  setStatusBarStyle("light");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.NAVBAR_ACTIVE_TINT,

        tabBarStyle: {
          backgroundColor: COLORS.NAVBAR_BACKGROUND,
          height: "12 %",
          position: "absolute",
          borderTopWidth: 0,
          padding: 6,
        },

        tabBarLabelStyle: {
          marginBottom: 12, // Adjust the spacing between text and icon
          fontFamily: "Montserrat-SemiBold",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          headerTitle: "Home Screen",
          statusBarHidden: true,

          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HomeIconFilled width={SIZE} height={SIZE} color={color} />
            ) : (
              <HomeIcon width={SIZE} height={SIZE} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="watching"
        options={{
          tabBarLabel: "Watching",
          headerTitle: "Watching Screen",
          statusBarHidden: true,

          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <WatchingFilled width={SIZE} height={SIZE} color={color} />
            ) : (
              <Watching width={SIZE} height={SIZE} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          headerTitle: "My Account",
          statusBarHidden: true,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ProfileIconFilled width={SIZE} height={SIZE} color={color} />
            ) : (
              <ProfileIcon width={SIZE} height={SIZE} color={color} />
            ),
        }}
      />
    </Tabs>
  );
};
