import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import {
  Stack,
  Tabs,
  Link,
  useSearchParams,
  useFocusEffect,
  useRouter,
} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import STYLES, { COLORS } from "../styling/styles";
import axios from "axios";
import {
  fullReviewQuery,
  searchAnimeQuery,
  searchByReviewId,
} from "../hooks/queryStrings";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { ScrollView } from "react-native-gesture-handler";
import StarGold from "../assets/icons/starGold.svg";
import ThumbsUp from "../assets/icons/thumbs-up.svg";
import ThumbsDown from "../assets/icons/thumbs-down.svg";
import Discord from "../assets/icons/discord.svg";
import ArrowLeft from "../assets/icons/arrow-left-white.svg";
import { StatusBar } from "expo-status-bar";
import { ReviewShortCards } from "../components/TagCards";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
const CLIPSIZE = 25;
const titleData = [
  { label: "English", value: "english" },
  { label: "Romaji", value: "romaji" },
  { label: "日本語", value: "japanese" },
];
const launchLocations = [
  { label: "Home", value: "home" },
  { label: "Watching", value: "watching" },
];

const Settings = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const [launchLocation, setLaunchLocation] = useState("home");
  const [titleLanguage, setTitleLanguage] = useState("english");
  const { id } = useSearchParams();
  const dimensions = useWindowDimensions();
  let content;
  const renderItem = (item) => {
    return (
      <View style={STYLES.MODAL.item}>
        <Text style={STYLES.MODAL.textItem}>{item.label}</Text>
      </View>
    );
  };
  async function changeLaunchLocation(value) {
    try {
      await AsyncStorage.setItem("launchLocation", value);
      setLaunchLocation(value);
    } catch (e) {
      console.log(e);
    }
  }
  async function changeTitleLanguage(value) {
    try {
      await AsyncStorage.setItem("titleDisplay", value);
      setTitleLanguage(value);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function getLaunchLocation() {
      AsyncStorage.getItem("launchLocation").then((value) => {
        if (value !== null) {
          setLaunchLocation(value);
        }
      });
      AsyncStorage.getItem("titleDisplay").then((value) => {
        if (value !== null) {
          setTitleLanguage(value);
        }
      });
    }
    getLaunchLocation();
    setLoaded(true);
  }, []);

  // Status bar height
  let statusBarHeight = 0;
  if (Platform.OS === "android") {
    statusBarHeight = StatusBar.currentHeight;
  } else {
    let insets = useSafeAreaInsets();
    statusBarHeight = insets.top;
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("home");
  };

  if (loaded) {
    content = (
      <View
        style={{
          backgroundColor: COLORS.DARK_BACKGROUND,
          flexGrow: 1,
          padding: 24,
          marginTop: statusBarHeight,
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginVertical: 24,
          }}
        >
          <TouchableOpacity
            onPressIn={router.back}
            style={{
              position: "absolute",
              left: 0,
              zIndex: 1,
            }}
          >
            <ArrowLeft width={20} height={20} />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.WHITE,
              fontSize: 18,
              fontFamily: "Montserrat-Medium",
              textAlign: "center",
              width: "100%",
            }}
          >
            Settings{" "}
          </Text>
        </View>
        <View style={{ flex: 1, height: dimensions.height }}>
          <Text style={STYLES.HOME.cardContainerTitle}>General</Text>
          <View style={STYLES.SETTINGS.sectionContainer}>
            <Text style={STYLES.HOME.showMore}>Title Display</Text>
            <Dropdown
              style={STYLES.MODAL.dropdown3}
              placeholderStyle={STYLES.MODAL.placeholderStyle}
              selectedTextStyle={STYLES.MODAL.selectedTextStyle}
              inputSearchStyle={STYLES.MODAL.inputSearchStyle}
              iconStyle={STYLES.MODAL.iconStyle}
              data={titleData}
              fontFamily="Montserrat-Medium"
              labelField="label"
              onChange={(item) => {
                changeTitleLanguage(item.value);
              }}
              valueField="value"
              value={titleLanguage}
              placeholder="Select an option"
              renderItem={renderItem}
            />
          </View>
          <View style={STYLES.SETTINGS.sectionContainer}>
            <Text style={STYLES.HOME.showMore}>Launch Location</Text>
            <Dropdown
              style={STYLES.MODAL.dropdown3}
              placeholderStyle={STYLES.MODAL.placeholderStyle}
              selectedTextStyle={STYLES.MODAL.selectedTextStyle}
              inputSearchStyle={STYLES.MODAL.inputSearchStyle}
              iconStyle={STYLES.MODAL.iconStyle}
              data={launchLocations}
              onChange={(item) => {
                changeLaunchLocation(item.value);
              }}
              fontFamily="Montserrat-Medium"
              labelField="label"
              valueField="value"
              placeholder="Select an option"
              value={launchLocation}
              renderItem={renderItem}
            />
          </View>
          <View
            style={[
              STYLES.DETAILS.sectionContainer,
              { position: "absolute", width: "100%", bottom: 60 },
            ]}
          >
            <TouchableOpacity
              style={STYLES.LOGIN.discordButton}
              onPress={() => {
                Linking.openURL("https://discord.gg/3KJrFatekv");
              }}
            >
              <Discord width={24} height={24} style={{ marginRight: 12 }} />
              <Text style={STYLES.LOGIN.settingsText}>Discord</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              STYLES.DETAILS.sectionContainer,
              { position: "absolute", width: "100%", bottom: 0 },
            ]}
          >
            <TouchableOpacity
              style={STYLES.LOGIN.logoutButton}
              onPress={handleLogout}
            >
              <Text style={STYLES.LOGIN.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    content = (
      <LottieView
        autoPlay
        style={{ backgroundColor: COLORS.DARK_BACKGROUND }}
        source={require("../assets/lottie/3.json")}
      />
    );
  }
  return content;
};

export default Settings;
