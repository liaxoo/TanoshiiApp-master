import React from "react";

import {
  // Import the creation function
  createStackNavigator,
  // Import the types
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import CharacterScreen from "./character";
import Settings from "./settings";
const Stack = createStackNavigator();
const Layout = () => {
  setStatusBarBackgroundColor("#080E1E", false);
  setStatusBarStyle("light");
  return (
    <Stack.Navigator options={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        component={ExtraAnime}
        options={{
          headerShown: false,
          statusBarHidden: true,
        }}
      />
      <Stack.Screen
        name="results"
        component={AnimeResults}
        options={{
          headerShown: false,
          statusBarHidden: true,
        }}
      />
      <Stack.Screen
        name="review"
        component={ExtendedReview}
        options={{
          headerShown: false,
          statusBarHidden: true,
        }}
      />
      <Stack.Screen
        name="character"
        component={CharacterScreen}
        options={{
          headerShown: false,
          statusBarHidden: true,
        }}
      />
      <Stack.Screen
        name="allReviews"
        component={AllReviews}
        options={{
          headerShown: false,
          statusBarHidden: true,
        }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          headerShown: false,
          statusBarHidden: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default Layout;
