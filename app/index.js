import { View, Text, Pressable, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import * as Font from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import LottieView from "lottie-react-native";

import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Login = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
          "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
          "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
          "Montserrat-LightItalic": require("./assets/fonts/Montserrat-LightItalic.ttf"),
          "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
          "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
          "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
          "Montserrat-Thin": require("./assets/fonts/Montserrat-Thin.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        if (Platform.OS === "android") {
          NavigationBar.setBackgroundColorAsync("white");
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (animationFinished && appIsReady) {
      await SplashScreen.hideAsync();

      router.replace("profile");
    }
  }, [animationFinished, appIsReady]);

  if (!appIsReady) {
    return null;
  }
  if (appIsReady && animationFinished) {
    handleRedirect();
  }
  async function handleRedirect() {
    try {
      const launchLocation = await AsyncStorage.getItem("launchLocation");
      console.log(`Redirecting to: ${launchLocation || "profile"}`);
      router.replace(launchLocation || "profile");
    } catch (error) {
      console.error("Failed to redirect: ", error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      {Platform.OS === "android" && <StatusBar backgroundColor={"white"} />}
      <LottieView
        autoPlay
        loop={false}
        onLayout={onLayoutRootView}
        onAnimationFinish={() => {
          setAnimationFinished(true);
        }}
        style={{ backgroundColor: "white" }}
        source={require("../app/assets/lottie/splash.json")}
      />
    </View>
  );
};

export default Login;
